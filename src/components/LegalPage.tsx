// /src/components/LegalPage.tsx
// The frame of the legal pages: plain type, a narrow column, numbered
// articles where useful. The texts are in src/i18n/legal/, in French (the
// reference), English and Japanese.

import type { ReactNode } from "react";
import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container, Todo } from "@/components/ui";

export type LegalSection = { id?: string; title: string; body: ReactNode };

/** The date the legal texts were last changed, in each language. */
export const LEGAL_UPDATED: Record<Locale, string> = { fr: "20 octobre 2026", en: "20 October 2026", ja: "2026年10月20日" };

export function LegalPage({
  lang,
  dict,
  path,
  title,
  intro,
  sections,
  numbered = false,
}: {
  lang: Locale;
  dict: Dictionary;
  /** The French path, e.g. "/cgv", for the link to the reference text. */
  path: string;
  title: string;
  intro?: ReactNode;
  sections: LegalSection[];
  numbered?: boolean;
}) {
  const t = dict.legal;
  return (
    <article>
      <header className="border-b hairline">
        <Container className="max-w-3xl py-16 sm:py-20">
          <p className="eyebrow text-seal">{t.label}</p>
          <h1 className="mt-5 text-4xl">{title}</h1>
          <p className="mt-5 text-sm text-ink-soft">{t.updated(LEGAL_UPDATED[lang])}</p>
          {t.translationNote && (
            <p className="mt-3 text-sm text-ink-soft">
              {t.translationNote}{" "}
              <Link href={localizedPath("fr", path)} hrefLang="fr" className="underline underline-offset-4">
                {t.translationLink}
              </Link>
            </p>
          )}
        </Container>
      </header>
      <Container className="max-w-3xl py-14">
        {intro && <div className="space-y-4 text-ink-soft">{intro}</div>}
        <div className={intro ? "mt-12 space-y-12" : "space-y-12"}>
          {sections.map((section, i) => (
            <section key={section.title} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl">{numbered ? t.article(i + 1, section.title) : section.title}</h2>
              <div className="mt-4 space-y-3 leading-relaxed">{section.body}</div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}

/** A legal fact still missing, shown as « [À COMPLÉTER : …] ». */
export function ToComplete({ dict, what }: { dict: Dictionary; what: string }) {
  return <Todo>{dict.legal.toComplete(what)}</Todo>;
}

/** The company block: who publishes the site, or who provides the service. */
export function CompanyIdentity({
  rows,
}: {
  rows: [string, ReactNode][];
}) {
  return (
    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
      {rows.map(([term, detail]) => (
        <div key={term} className="contents">
          <dt className="font-medium">{term}</dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
