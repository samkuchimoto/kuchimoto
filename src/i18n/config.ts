// /src/i18n/config.ts
// French is the site's language and lives at the root (/happy-homes);
// English lives under /en (/en/happy-homes) and Japanese under /ja
// (/ja/happy-homes). Every page sits in app/[lang], and proxy.ts rewrites
// an unprefixed URL to /fr internally.

export const locales = ["fr", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

export const localeMeta: Record<Locale, { name: string; short: string; ogLocale: string }> = {
  fr: { name: "Français", short: "FR", ogLocale: "fr_FR" },
  en: { name: "English", short: "EN", ogLocale: "en_GB" },
  ja: { name: "日本語", short: "日本語", ogLocale: "ja_JP" },
};

/** "/contact" in French, "/en/contact" in English. Hash links and external
 *  links are left alone. */
export function localizedPath(lang: Locale, path: string): string {
  if (lang === defaultLocale || !path.startsWith("/")) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

/** The space before a link inside a sentence: none in Japanese, which
 *  does not put spaces between words. */
export function wordSpace(lang: Locale): string {
  return lang === "ja" ? "" : " ";
}
