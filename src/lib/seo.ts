// /src/lib/seo.ts
// Title, description, canonical URL, hreflang and Open Graph tags for a
// page, in its language. French is x-default: it is the version at the
// root.

import type { Metadata } from "next";
import { SITE_URL, COMPANY } from "@/config/site";
import { defaultLocale, localeMeta, locales, localizedPath, type Locale } from "@/i18n/config";

/** { fr: "/contact", en: "/en/contact", "x-default": "/contact" } */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of locales) languages[lang] = localizedPath(lang, path);
  languages["x-default"] = localizedPath(defaultLocale, path);
  return languages;
}

export function pageMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
  noindex = false,
}: {
  lang: Locale;
  /** The French path, e.g. "/contact". */
  path: string;
  title: string;
  description: string;
  /** For the home page, whose title already carries the company name. */
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = localizedPath(lang, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${COMPANY.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY.name,
      title: fullTitle,
      description,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary", title: fullTitle, description },
    ...(noindex && { robots: { index: false } }),
  };
}

export { SITE_URL };
