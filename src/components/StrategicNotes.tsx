// /src/components/StrategicNotes.tsx
// "Architectures proposées & Notes stratégiques", on /lab (#notes):
// architecture proposals and studies. Worded as proposals, never as past
// client work, and naming no organisation.

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui";

export function StrategicNotes({
  t,
  intro,
  demoHref,
  demoLang,
}: {
  t: Dictionary["notes"];
  /** One line under the title, saying who the proposal was presented to. */
  intro?: string;
  /** The triage demo in the page's language, or the nearest one (/demo-triage, /en/demo-triage). */
  demoHref: string;
  demoLang: "fr" | "en";
}) {
  return (
    <section aria-labelledby="notes" className="border-t hairline">
      <Container className="py-16 sm:py-20">
        <h2 id="notes" className="text-2xl sm:text-3xl">
          {t.title}
        </h2>
        {intro && <p className="mt-4 max-w-3xl text-ink-soft">{intro}</p>}
        <article className="mt-10 max-w-4xl">
          <ul className="flex flex-wrap gap-3">
            {t.tags.map((tag) => (
              <li key={tag} className="border hairline px-4 py-2 text-sm">
                {tag}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-xl sm:text-2xl">{t.caseTitle}</h3>
          <dl className="mt-6 max-w-3xl space-y-5">
            <div>
              <dt className="text-sm font-medium">{t.contextLabel}</dt>
              <dd className="mt-1 text-ink-soft">{t.context}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">{t.problemLabel}</dt>
              <dd className="mt-1 text-ink-soft">{t.problem}</dd>
            </div>
          </dl>
          <h4 className="mt-10 text-sm font-medium">{t.proposalLabel}</h4>
          <dl className="mt-4 grid gap-8 md:grid-cols-2">
            {t.proposals.map(([name, detail], i) => (
              <div key={name} className="border-t border-lab pt-5">
                <dt className="font-display text-lg">{name}</dt>
                <dd className="mt-2 text-ink-soft">{detail}</dd>
                {/* The first proposal, the triage agent, has a live demo. */}
                {i === 0 && (
                  <dd className="mt-3 text-sm">
                    <Link href={demoHref} hrefLang={demoLang} className="font-medium text-lab underline underline-offset-4 hover:no-underline">
                      {t.demoLink}
                    </Link>
                    <span aria-hidden className="text-lab">
                      {" "}
                      →
                    </span>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </article>
      </Container>
    </section>
  );
}
