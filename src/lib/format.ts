// /src/lib/format.ts
// Numbers and prices, written the way each language writes them.

import type { Locale } from "@/i18n/config";
import { NBSP } from "@/lib/typography";

/** 1800 baht: "1 800 ฿" in French, "฿1,800" in English. */
export function baht(amount: number, lang: Locale): string {
  if (lang === "fr") return `${amount.toLocaleString("fr-FR").replace(/\s/g, NBSP)}${NBSP}฿`;
  return `฿${amount.toLocaleString("en-GB")}`;
}

/** 34.9 euros: "34,90 € TTC" in French, "€34.90" in English. */
export function euros(amount: number, lang: Locale): string {
  if (lang === "fr") return `${amount.toFixed(2).replace(".", ",")}${NBSP}€${NBSP}TTC`;
  return `€${amount.toFixed(2)}`;
}
