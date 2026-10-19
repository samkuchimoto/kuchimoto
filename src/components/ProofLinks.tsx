// /src/components/ProofLinks.tsx
// Under the Lab and Studio titles, the two things to see first: the live
// triage demo (/demo-triage, in French only) and the architecture note
// further down the same page (StrategicNotes, #notes).

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProofLinks({ t }: { t: Dictionary["proof"] }) {
  const link = "font-medium text-lab underline underline-offset-4 hover:no-underline";
  return (
    <ul className="mt-8 flex flex-col gap-3 border-l-2 border-lab pl-4 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
      <li>
        <Link href="/demo-triage" hrefLang="fr" className={link}>
          {t.demo}
        </Link>
        {t.demoLang && <span className="text-ink-soft">{t.demoLang}</span>}
        <span aria-hidden className="text-lab">
          {" "}
          →
        </span>
      </li>
      <li>
        <a href="#notes" className={link}>
          {t.notes}
        </a>
        <span aria-hidden className="text-lab">
          {" "}
          ↓
        </span>
      </li>
    </ul>
  );
}
