// /src/components/demo-triage/TriageTool.tsx
// "Testez l'agent sur vos vrais emails maintenant": paste inbox rows or
// whole emails, drop or paste a screenshot of an inbox (read in the
// browser), or load fifteen sample emails; then one button triages them
// and shows the brief. The local engine runs in the browser and is always
// available; an AI analysis is offered only when the server has a key,
// and only when the visitor ticks it, after being told where it goes.

"use client";

import { useCallback, useEffect, useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import { buildBrief, fromAi, triage, type Brief } from "@/lib/triage/engine";
import { SAMPLE_INBOX } from "@/lib/triage/sample";
import { readScreenshot, screenshotForAi, type OcrProgress } from "@/lib/triage/ocr";
import { inputClass } from "@/components/forms/Fields";
import { BriefView } from "./BriefView";

const NBSP = " ";

type Tab = "text" | "image" | "sample";
type Ocr = { status: "idle" | "running" | "done" | "error"; stage: OcrProgress["stage"]; progress: number; text: string };
type Result = { brief: Brief; mode: string };

const TABS: [Tab, string][] = [
  ["text", "Coller mes e-mails (texte brut)"],
  ["image", "Capture d'écran de boîte mail"],
  ["sample", "Charger un exemple réel"],
];

const IMAGE_TYPES = /^image\/(png|jpe?g|webp)$/;
const LOCAL_MODE = `Analyse locale, dans votre navigateur${NBSP}: rien n'a été envoyé.`;

export function TriageTool() {
  const [tab, setTab] = useState<Tab>("text");
  const [text, setText] = useState("");
  const [image, setImage] = useState<{ blob: Blob; url: string } | null>(null);
  const [ocr, setOcr] = useState<Ocr>({ status: "idle", stage: "loading", progress: 0, text: "" });
  const [ai, setAi] = useState<{ available: boolean; provider: string | null }>({ available: false, provider: null });
  const [useAi, setUseAi] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const output = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Is an AI analysis offered? Only the name of the provider comes back.
  useEffect(() => {
    fetch("/api/triage")
      .then((response) => response.json())
      .then((data: { ai?: boolean; provider?: string | null }) => setAi({ available: Boolean(data.ai), provider: data.provider ?? null }))
      .catch(() => undefined);
  }, []);

  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image.url);
  }, [image]);

  useEffect(() => {
    if (result) output.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  const acceptImage = useCallback((file: Blob | null) => {
    if (!file) return;
    if (!IMAGE_TYPES.test(file.type)) {
      setError(`Formats acceptés${NBSP}: PNG, JPG ou WebP.`);
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("Image trop lourde (15 Mo au maximum).");
      return;
    }
    setError(null);
    setResult(null);
    setImage({ blob: file, url: URL.createObjectURL(file) });
    setOcr({ status: "running", stage: "loading", progress: 0, text: "" });
    readScreenshot(file, (progress) => setOcr((current) => ({ ...current, ...progress })))
      .then((read) => setOcr({ status: "done", stage: "reading", progress: 1, text: read }))
      .catch(() => setOcr({ status: "error", stage: "reading", progress: 0, text: "" }));
  }, []);

  // Ctrl+V anywhere on the screenshot tab pastes the image.
  useEffect(() => {
    if (tab !== "image") return;
    const onPaste = (event: globalThis.ClipboardEvent) => {
      const file = [...(event.clipboardData?.files ?? [])].find((item) => IMAGE_TYPES.test(item.type));
      if (file) {
        event.preventDefault();
        acceptImage(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [tab, acceptImage]);

  async function analyze(source?: string) {
    setError(null);
    const fromImage = tab === "image" && !source;
    const input = source ?? (fromImage ? ocr.text : text);
    let note = "";

    if (useAi && ai.available) {
      setBusy(true);
      try {
        const body = fromImage && image ? { image: await screenshotForAi(image.blob) } : { text: input };
        const response = await fetch("/api/triage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await response.json().catch(() => ({}))) as { ok?: boolean; provider?: string; emails?: unknown };
        const emails = data.ok ? fromAi(data.emails) : [];
        if (emails.length) {
          setResult({ brief: buildBrief(emails), mode: `Analyse IA (${data.provider ?? ai.provider}).` });
          return;
        }
        note = ` L'analyse IA n'a pas abouti${NBSP}: voici le résultat du moteur local.`;
      } catch {
        note = ` L'analyse IA n'a pas abouti${NBSP}: voici le résultat du moteur local.`;
      } finally {
        setBusy(false);
      }
    }

    if (!input.trim()) {
      setResult(null);
      setError(
        fromImage
          ? ocr.status === "running"
            ? "La capture est encore en cours de lecture."
            : "Aucun texte lu sur la capture. Essayez une capture plus nette, ou collez le texte."
          : "Collez d'abord des e-mails, ajoutez une capture, ou chargez l'exemple.",
      );
      return;
    }
    const brief = triage(input);
    if (!brief.counts.total) {
      setResult(null);
      setError("Aucun e-mail reconnu. Collez des lignes de votre boîte de réception, ou un e-mail complet avec De et Objet.");
      return;
    }
    setResult({ brief, mode: `${LOCAL_MODE}${note}` });
  }

  function loadSample() {
    setText(SAMPLE_INBOX);
    setTab("text");
    void analyze(SAMPLE_INBOX);
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    acceptImage(event.dataTransfer.files?.[0] ?? null);
  };
  const onZonePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const file = [...event.clipboardData.files].find((item) => IMAGE_TYPES.test(item.type));
    if (file) {
      event.preventDefault();
      acceptImage(file);
    }
  };

  const reading = tab === "image" && ocr.status === "running";
  const percent = Math.round(ocr.progress * 100);

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Source des e-mails" className="flex flex-wrap gap-2">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={`inline-flex min-h-11 items-center border px-4 text-sm transition-colors ${
              tab === key ? "border-ink bg-ink text-paper" : "border-line text-ink hover:bg-washi"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 border hairline bg-paper p-5 sm:p-6">
        {tab === "text" && (
          <div role="tabpanel" id="panel-text" aria-labelledby="tab-text">
            <label htmlFor="triage-text" className="block text-sm font-medium">
              Collez vos e-mails
            </label>
            <p className="mt-1 text-sm text-ink-soft">
              Dans Gmail ou Outlook, sélectionnez 10 à 100 lignes de la boîte de réception (ou Ctrl+A), copiez avec Ctrl+C
              et collez ici. Les fils complets (De, Objet, Date) fonctionnent aussi.
            </p>
            <textarea
              id="triage-text"
              rows={12}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={"Expéditeur\tObjet - extrait du message\t10:42\n…"}
              className={`mt-3 font-mono text-sm ${inputClass}`}
            />
          </div>
        )}

        {tab === "image" && (
          <div role="tabpanel" id="panel-image" aria-labelledby="tab-image">
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInput.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInput.current?.click();
                }
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={onDrop}
              onPaste={onZonePaste}
              className="grid min-h-48 cursor-pointer place-items-center border border-dashed border-field bg-washi p-6 text-center transition-colors hover:bg-lab-wash focus-visible:bg-lab-wash"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element -- a local preview (blob URL), not an optimisable asset
                <img src={image.url} alt="Votre capture de boîte de réception" className="max-h-72 w-auto border hairline" />
              ) : (
                <div>
                  <p className="font-medium">Glissez une capture ici, collez-la (Ctrl+V) ou cliquez pour la choisir</p>
                  <p className="mt-1 text-sm text-ink-soft">Capture de Gmail ou d&apos;Outlook, en PNG, JPG ou WebP.</p>
                </div>
              )}
            </div>
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              tabIndex={-1}
              aria-hidden
              onChange={(event) => acceptImage(event.target.files?.[0] ?? null)}
            />
            {ocr.status === "running" && (
              <div className="mt-4" aria-live="polite">
                <p className="text-sm">
                  {ocr.stage === "loading"
                    ? "Chargement de la lecture de texte (une fois par visite)…"
                    : `Lecture de la capture… ${percent}${NBSP}%`}
                </p>
                <div aria-hidden className="mt-2 h-1.5 bg-line">
                  <div className="h-1.5 bg-lab transition-[width]" style={{ width: `${ocr.stage === "loading" ? 8 : Math.max(8, percent)}%` }} />
                </div>
              </div>
            )}
            {ocr.status === "error" && (
              <p className="mt-4 text-sm text-danger">La capture n&apos;a pas pu être lue. Essayez une autre image, ou collez le texte.</p>
            )}
            {ocr.status === "done" && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm">
                  Texte lu sur la capture ({ocr.text.split("\n").filter(Boolean).length} lignes) : vérifier ou corriger
                </summary>
                <textarea
                  rows={8}
                  value={ocr.text}
                  onChange={(event) => setOcr((current) => ({ ...current, text: event.target.value }))}
                  className={`mt-2 font-mono text-sm ${inputClass}`}
                  aria-label="Texte lu sur la capture"
                />
              </details>
            )}
          </div>
        )}

        {tab === "sample" && (
          <div role="tabpanel" id="panel-sample" aria-labelledby="tab-sample">
            <p className="text-ink-soft">
              Quinze e-mails bruts, tels que Gmail les donne quand on copie des lignes de la boîte de réception (expéditeurs
              fictifs). Ils sont placés dans la zone de texte et analysés aussitôt.
            </p>
            <button
              type="button"
              onClick={loadSample}
              className="mt-4 inline-flex min-h-12 items-center justify-center border border-ink px-6 py-3 text-sm font-medium hover:bg-washi"
            >
              Charger les 15 e-mails d&apos;exemple
            </button>
          </div>
        )}

        {ai.available && (
          <label className="mt-6 flex items-start gap-3 border-t hairline pt-5 text-sm">
            <input
              type="checkbox"
              checked={useAi}
              onChange={(event) => setUseAi(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink)]"
            />
            <span>
              Analyse approfondie par IA ({ai.provider}). Le contenu est alors envoyé à ce prestataire pour l&apos;analyse ;
              KUCHIMOTO ne le conserve pas.
            </span>
          </label>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => void analyze()}
            disabled={busy || reading}
            className="inline-flex min-h-12 items-center justify-center bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Analyse en cours…" : reading ? `Lecture de la capture… ${percent}${NBSP}%` : "Analyser et résumer mes emails →"}
          </button>
          <p className="text-xs text-ink-soft">
            {useAi && ai.available
              ? "Le contenu sera envoyé pour l'analyse par IA."
              : `Tout se passe dans votre navigateur${NBSP}: vos e-mails et captures ne sont envoyés nulle part.`}
          </p>
        </div>
        {error && (
          <p role="alert" className="mt-4 border-l-2 border-danger bg-washi px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div ref={output} className="scroll-mt-24">
        {result && (
          <div className="mt-12">
            <BriefView brief={result.brief} mode={result.mode} />
          </div>
        )}
      </div>
    </div>
  );
}
