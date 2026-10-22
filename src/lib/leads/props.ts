// /src/lib/leads/props.ts
// What every lead form needs, for a language: its copy, the budget chips
// with the prices written the way the language writes them, and the
// privacy and thank-you pages.

import { CONTACT, LAB } from "@/config/site";
import { localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { euroRange, fill, wholeEuros } from "@/lib/format";

/** The triage demo exists in French and English; Japanese visitors get the English one. */
export function demoPath(lang: Locale): { href: string; lang: "fr" | "en" } {
  return lang === "fr" ? { href: "/demo-triage", lang: "fr" } : { href: "/en/demo-triage", lang: "en" };
}

/** The prototype's pay page in the visitor's language, saying where they clicked. */
export function payPath(lang: Locale, from: "lab" | "studio" | "thank-you"): string {
  return `${localizedPath(lang, "/pay/prototype")}?from=${from}`;
}

/** /merci in French, /en/thank-you and /ja/thank-you. */
export function thanksPath(lang: Locale): string {
  return lang === "fr" ? "/merci" : `/${lang}/thank-you`;
}

export function leadFormProps(lang: Locale) {
  const t = getDictionary(lang).lead;
  return {
    lang,
    t,
    budgetLabels: {
      prototype: fill(t.budgets.prototype, { price: wholeEuros(LAB.prototype, lang) }),
      mid: euroRange(LAB.budgets.mid[0], LAB.budgets.mid[1], lang),
      high: euroRange(LAB.budgets.high[0], LAB.budgets.high[1], lang),
      unsure: t.budgets.unsure,
    },
    privacyHref: localizedPath(lang, "/confidentialite"),
    thanksHref: thanksPath(lang),
    contactEmail: CONTACT.email,
  };
}
