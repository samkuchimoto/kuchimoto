// /src/lib/format.ts
// Numbers and prices, written the way each language writes them.

import type { Locale } from "@/i18n/config";
import { NBSP } from "@/lib/typography";

/** 1500: "1 500", with a non-breaking space so the number never wraps. */
function frenchNumber(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/\s/g, NBSP);
}

/** 1800 baht: "1 800 ฿" in French, "฿1,800" in English. */
export function baht(amount: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(amount)}${NBSP}฿`;
  return `฿${amount.toLocaleString("en-GB")}`;
}

/** Whole euros: "1 290 €" in French, "€1,290" in English. */
export function wholeEuros(amount: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(amount)}${NBSP}€`;
  return `€${amount.toLocaleString("en-GB")}`;
}

/** A whole-euro range: "1 500 à 3 000 €" in French, "€1,500 to €3,000" in English. */
export function euroRange(min: number, max: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(min)} à ${wholeEuros(max, lang)}`;
  return `${wholeEuros(min, lang)} to ${wholeEuros(max, lang)}`;
}

/** 34.9 euros: "34,90 € TTC" in French, "€34.90" in English. */
export function euros(amount: number, lang: Locale): string {
  if (lang === "fr") return `${amount.toFixed(2).replace(".", ",")}${NBSP}€${NBSP}TTC`;
  return `€${amount.toFixed(2)}`;
}
