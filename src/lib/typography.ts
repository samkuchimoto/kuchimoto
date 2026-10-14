// /src/lib/typography.ts
// French punctuation, applied once to every French string instead of
// typed by hand: a non-breaking space before : ; ! ? and », after «, and
// between a number and € % or ฿. Written with ordinary spaces, the copy
// stays easy to edit and a line never breaks before a colon.

/** U+00A0, spelled out so it can be seen. */
export const NBSP = String.fromCharCode(0xa0);

export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;!?»])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/(\d) ([€%฿])/g, `$1${NBSP}$2`);
}

/** frenchSpacing on every string in an object or array, and on whatever
 *  a function in it returns. Idempotent. */
export function withFrenchSpacing<T>(value: T): T {
  if (typeof value === "string") return frenchSpacing(value) as T;
  if (typeof value === "function") {
    return ((...args: unknown[]) => withFrenchSpacing(value(...args))) as T;
  }
  if (Array.isArray(value)) return value.map(withFrenchSpacing) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, withFrenchSpacing(entry)]),
    ) as T;
  }
  return value;
}
