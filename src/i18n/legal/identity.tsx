// /src/i18n/legal/identity.tsx
// The publisher's identity rows, shared by the legal notice and the terms
// of sale. Every fact comes from config/site.ts; missing ones show as
// placeholders.

import type { ReactNode } from "react";
import { COMPANY, CONTACT } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Todo } from "@/components/ui";

const LABELS: Record<Locale, { name: string; status: string; address: string; email: string; phone: string }> = {
  fr: { name: "Nom", status: "Statut", address: "Adresse", email: "E-mail", phone: "Téléphone" },
  en: { name: "Name", status: "Status", address: "Address", email: "Email", phone: "Phone" },
  ja: { name: "氏名", status: "区分", address: "住所", email: "メール", phone: "電話" },
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
    [l.name, COMPANY.legalName],
    [l.status, COMPANY.status[lang]],
    [l.address, COMPANY.address],
    [l.email, email],
    [l.phone, phone],
  ];
}
