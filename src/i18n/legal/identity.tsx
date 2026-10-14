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
  const phone = CONTACT.phone ?? <Todo>{dict.common.placeholderPhone}</Todo>;
  const vat = COMPANY.vatNumber ?? <Todo>{dict.legal.toComplete(fr ? "numéro de TVA intracommunautaire" : "intra-community VAT number")}</Todo>;

  return [
    [fr ? "Dénomination" : "Company", COMPANY.legalName],
    [
      fr ? "Forme" : "Legal form",
      fr
        ? `Société par actions simplifiée unipersonnelle (SASU), au capital de ${COMPANY.capital}`
        : `Single-shareholder simplified joint-stock company (SASU), share capital ${COMPANY.capital}`,
    ],
    [fr ? "Siège social" : "Registered office", COMPANY.address],
    [fr ? "Immatriculation" : "Registration", COMPANY.registration[lang]],
    [fr ? "TVA intracommunautaire" : "VAT number", vat],
    [fr ? "Président" : "President", COMPANY.president],
    [fr ? "E-mail" : "Email", email],
    [fr ? "Téléphone" : "Phone", phone],
  ];
}
