// /src/i18n/legal/identity.tsx
// The publisher's identity rows, shared by the legal notice and the terms
// of sale. Every fact comes from config/site.ts; missing ones show as
// placeholders.

import type { ReactNode } from "react";
import { COMPANY, CONTACT } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Todo } from "@/components/ui";

const LABELS: Record<
  Locale,
  { company: string; office: string; email: string }
> = {
  fr: { company: "Société", office: "Siège social", email: "E-mail" },
  en: { company: "Company", office: "Registered office", email: "Email" },
  ja: { company: "法人", office: "登録事務所", email: "メール" },
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

  return [
    [l.company, COMPANY.publisher.identity[lang]],
    [l.office, COMPANY.publisher.office[lang]],
    [l.email, email],
  ];
}
