// /src/i18n/legal/identity.tsx
// The company's identity rows, shared by the legal notice and the terms of
// sale. Every fact comes from config/site.ts; missing ones show as
// placeholders.

import type { ReactNode } from "react";
import { COMPANY, CONTACT } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Todo } from "@/components/ui";

export function companyRows(lang: Locale, dict: Dictionary): [string, ReactNode][] {
  const fr = lang === "fr";
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
    [fr ? "Dénomination" : "Company", COMPANY.name],
    [
      fr ? "Forme" : "Legal form",
      fr ? `${COMPANY.form.fr}, au capital de ${COMPANY.capital}` : `${COMPANY.form.en}, share capital ${COMPANY.capital}`,
    ],
    [fr ? "Siège social" : "Registered office", COMPANY.address],
    [fr ? "Immatriculation" : "Registration", COMPANY.registration[lang]],
    [fr ? "SIREN et numéro de TVA intracommunautaire" : "SIREN and intra-community VAT number", COMPANY.numbersPending[lang]],
    [fr ? "Président" : "President", COMPANY.president],
    [fr ? "E-mail" : "Email", email],
    [fr ? "Téléphone" : "Phone", phone],
  ];
}
