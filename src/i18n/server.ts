// /src/i18n/server.ts
// The page's language for any server component: `lang` is the root
// segment (app/[lang]), so next/root-params reads it anywhere below.

import { lang as rootLang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getLang(): Promise<Locale> {
  const value = await rootLang();
  return isLocale(value) ? value : defaultLocale;
}
