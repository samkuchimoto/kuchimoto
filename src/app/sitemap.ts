import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { locales, localizedPath } from "@/i18n/config";
import { languageAlternates } from "@/lib/seo";

const ROUTES = [
  "/",
  "/happy-homes",
  "/happy-homes/thailande",
  "/happy-homes/canada",
  "/happy-homes/etats-unis",
  "/bambootails",
  "/lab",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
];

/** Every page in both languages, each listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, `${SITE_URL}${href}`]),
    );
    return locales.map((lang) => ({ url: `${SITE_URL}${localizedPath(lang, path)}`, alternates: { languages } }));
  });
}
