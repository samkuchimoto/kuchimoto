// /src/lib/format.ts
// Numbers and prices, written the way each language writes them.

import type { Locale } from "@/i18n/config";
import { NBSP } from "@/lib/typography";

/** 1500: "1 500", with a non-breaking space so the number never wraps. */
function frenchNumber(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/\s/g, NBSP);
}

/** 1800 baht: "1 800 ฿" in French, "฿1,800" in English, "1,800バーツ" in Japanese. */
export function baht(amount: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(amount)}${NBSP}฿`;
  if (lang === "ja") return `${amount.toLocaleString("ja-JP")}バーツ`;
  return `฿${amount.toLocaleString("en-GB")}`;
}

/** Whole euros: "1 290 €" in French, "€1,290" in English, "1,290ユーロ" in Japanese. */
export function wholeEuros(amount: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(amount)}${NBSP}€`;
  if (lang === "ja") return `${amount.toLocaleString("ja-JP")}ユーロ`;
  return `€${amount.toLocaleString("en-GB")}`;
}

/** A whole-euro range: "1 500 à 3 000 €", "€1,500 to €3,000", "1,500〜3,000ユーロ". */
export function euroRange(min: number, max: number, lang: Locale): string {
  if (lang === "fr") return `${frenchNumber(min)} à ${wholeEuros(max, lang)}`;
  if (lang === "ja") return `${min.toLocaleString("ja-JP")}〜${wholeEuros(max, lang)}`;
  return `${wholeEuros(min, lang)} to ${wholeEuros(max, lang)}`;
}

/** 34.9 euros, tax included: "34,90 € TTC", "€34.90", "34.90ユーロ（税込）". */
export function euros(amount: number, lang: Locale): string {
  if (lang === "fr") return `${amount.toFixed(2).replace(".", ",")}${NBSP}€${NBSP}TTC`;
  if (lang === "ja") return `${amount.toFixed(2)}ユーロ（税込）`;
  return `€${amount.toFixed(2)}`;
}
