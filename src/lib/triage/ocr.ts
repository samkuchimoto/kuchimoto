// /src/lib/triage/ocr.ts
// Reads a screenshot of a Gmail or Outlook inbox in the browser, with
// Tesseract (French and English). The image never leaves the page; only
// the OCR program and its language files are downloaded, from
// cdn.jsdelivr.net. The words come back with their positions: they are
// put back into inbox rows (same height = same email) and columns (a wide
// gap = a new cell), and the folder column on the left is dropped, so the
// triage engine reads the result like a pasted inbox.

type Box = { x0: number; y0: number; x1: number; y1: number };
type OcrWord = { text: string; confidence: number; bbox: Box };

// Folder names that mark the navigation column of Gmail and Outlook.
const NAV =
  /^(bo[iî]te de r[ée]ception|inbox|messages suivis|starred|en attente|snoozed|envoy[ée]s|sent|brouillons|drafts|plus|more|libell[ée]s|labels|spam|corbeille|trash|tous les messages|all mail|important|archive|[ée]l[ée]ments (envoy[ée]s|supprim[ée]s)|deleted items|sent items|courrier ind[ée]sirable|junk email|dossiers|folders|favoris|favorites|nouveau message|compose|new mail|nouveau courrier)\b/i;

/** The screenshot, enlarged if small and turned grey: Tesseract reads screen text better that way. */
async function prepare(image: Blob): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(image);
  const scale = bitmap.width < 1400 ? Math.min(2, 2800 / bitmap.width) : Math.min(1, 3200 / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = pixels.data;
  for (let i = 0; i < data.length; i += 4) {
    const grey = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = data[i + 1] = data[i + 2] = grey;
  }
  context.putImageData(pixels, 0, 0);
  return canvas;
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
};

/** Words back into rows and cells: tab between cells, one line per row. */
function toRows(words: OcrWord[], width: number): string {
  const kept = words.filter(
    (word) => word.confidence >= 35 && word.text.trim() && !/^[|©®°*•·¤○◯☐☆★⭐_~^`'"«»]+$/u.test(word.text.trim()),
  );
  if (!kept.length) return "";
  const height = median(kept.map((word) => word.bbox.y1 - word.bbox.y0)) || 12;

  const rows: OcrWord[][] = [];
  const centre = (word: OcrWord) => (word.bbox.y0 + word.bbox.y1) / 2;
  for (const word of [...kept].sort((a, b) => centre(a) - centre(b))) {
    const row = rows[rows.length - 1];
    const rowCentre = row ? row.reduce((sum, w) => sum + centre(w), 0) / row.length : 0;
    if (row && Math.abs(centre(word) - rowCentre) < height * 0.6) row.push(word);
    else rows.push([word]);
  }

  type Cell = { text: string; x0: number; x1: number };
  const table: Cell[][] = rows.map((row) => {
    const sorted = row.sort((a, b) => a.bbox.x0 - b.bbox.x0);
    const cells: Cell[] = [];
    let current: OcrWord[] = [];
    const close = () => {
      if (current.length)
        cells.push({ text: current.map((w) => w.text).join(" "), x0: current[0].bbox.x0, x1: current[current.length - 1].bbox.x1 });
      current = [];
    };
    for (const word of sorted) {
      const previous = current[current.length - 1];
      if (previous && word.bbox.x0 - previous.bbox.x1 > height * 1.6) close();
      current.push(word);
    }
    close();
    return cells;
  });

  // The navigation column shares rows with the first emails: it ends at
  // the right edge of its folder names, found in the left third.
  const navEdge = Math.max(
    0,
    ...table.flat().filter((cell) => cell.x1 < width * 0.35 && NAV.test(cell.text)).map((cell) => cell.x1),
  );
  return table
    .map((cells) => cells.filter((cell) => !navEdge || cell.x0 > navEdge + height).map((cell) => cell.text).join("\t"))
    .filter(Boolean)
    .join("\n");
}

export type OcrProgress = { stage: "loading" | "reading"; progress: number };

/** The text of an inbox screenshot, row by row. */
export async function readScreenshot(image: Blob, onProgress: (progress: OcrProgress) => void): Promise<string> {
  const canvas = await prepare(image);
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker(["fra", "eng"], 1, {
    logger: (message) =>
      onProgress({
        stage: message.status === "recognizing text" ? "reading" : "loading",
        progress: typeof message.progress === "number" ? message.progress : 0,
      }),
  });
  try {
    const { data } = await worker.recognize(canvas, {}, { text: true, blocks: true });
    const words: OcrWord[] = (data.blocks ?? []).flatMap((block) =>
      block.paragraphs.flatMap((paragraph) => paragraph.lines.flatMap((line) => line.words)),
    );
    return toRows(words, canvas.width) || data.text || "";
  } finally {
    await worker.terminate();
  }
}

/** The screenshot as a JPEG for an AI analysis: at most 1600 px wide, base64 without the prefix. */
export async function screenshotForAi(image: Blob): Promise<{ mediaType: "image/jpeg"; data: string }> {
  const bitmap = await createImageBitmap(image);
  const scale = Math.min(1, 1600 / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const url = canvas.toDataURL("image/jpeg", 0.85);
  return { mediaType: "image/jpeg", data: url.slice(url.indexOf(",") + 1) };
}
