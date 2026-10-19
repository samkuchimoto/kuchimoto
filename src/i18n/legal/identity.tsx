// /src/i18n/legal/identity.tsx
// The company's identity rows, shared by the legal notice and the terms of
// sale. Every fact comes from config/site.ts; missing ones show as
// placeholders.

import type { ReactNode } from "react";
import { COMPANY, CONTACT } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Todo } from "@/components/ui";

const LABELS: Record<
  Locale,
  { name: string; form: string; office: string; registration: string; numbers: string; president: string; email: string; phone: string }
> = {
  fr: {
    name: "Dénomination",
    form: "Forme",
    office: "Siège social",
    registration: "Immatriculation",
    numbers: "SIREN et numéro de TVA intracommunautaire",
    president: "Président",
    email: "E-mail",
    phone: "Téléphone",
  },
  en: {
    name: "Company",
    form: "Legal form",
    office: "Registered office",
    registration: "Registration",
    numbers: "SIREN and intra-community VAT number",
    president: "President",
    email: "Email",
    phone: "Phone",
  },
  ja: {
    name: "商号",
    form: "法人形態",
    office: "本店所在地",
    registration: "登記",
    numbers: "SIRENおよびEU域内VAT番号",
    president: "代表者（Président）",
    email: "メール",
    phone: "電話",
  },
};

/** The legal form and the share capital, as each language writes them. */
const FORM_WITH_CAPITAL: Record<Locale, string> = {
  fr: `${COMPANY.form.fr}, au capital de ${COMPANY.capital}`,
  en: `${COMPANY.form.en}, share capital ${COMPANY.capital}`,
  ja: `${COMPANY.form.ja}、資本金 ${COMPANY.capital}`,
};

export function companyRows(lang: Locale, dict: Dictionary): [string, ReactNode][] {
  const l = LABELS[lang];
  const email = CONTACT.email ? (
    <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">
      {CONTACT.email}
    </a>
  ) : (
    <Todo>{dict.common.placeholderEmail}</Todo>
  );
  const phone = (
    <a href={CONTACT.phoneHref} className="underline underline-offset-4">
      {CONTACT.phone[lang]}
    </a>
  );

  return [
    [l.name, COMPANY.name],
    [l.form, FORM_WITH_CAPITAL[lang]],
    [l.office, COMPANY.address],
    [l.registration, COMPANY.registration[lang]],
    [l.numbers, COMPANY.numbersPending[lang]],
    [l.president, COMPANY.president],
    [l.email, email],
    [l.phone, phone],
  ];
}
