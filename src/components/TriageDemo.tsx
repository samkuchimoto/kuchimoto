// /src/components/TriageDemo.tsx
// The interactive part of /demo-triage: one button "generates" the
// three-minute executive brief from the simulated inbox. Nothing is sent
// anywhere; the brief is written in advance from fictional messages.

"use client";

import { useEffect, useRef, useState } from "react";

export type TriageBrief = {
  button: string;
  generating: string;
  title: string;
  meta: string;
  decisions: { title: string; items: [string, string][] };
  agile: { title: string; items: string[] };
  station: { title: string; kpiLabel: string; kpiValue: string; kpiShare: number; items: string[] };
  footnote: string;
};

export function TriageDemo({ t, ctaHref, ctaLabel }: { t: TriageBrief; ctaHref: string; ctaLabel: string }) {
  const [state, setState] = useState<"idle" | "generating" | "done">("idle");
  const report = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== "generating") return;
    const timer = setTimeout(() => setState("done"), 1200);
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (state === "done") report.current?.focus();
  }, [state]);

  return (
    <div className="mt-8">
      {state !== "done" && (
        <button
          type="button"
          onClick={() => setState("generating")}
          disabled={state === "generating"}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state === "generating" ? t.generating : t.button}
        </button>
      )}
      <p aria-live="polite" className="sr-only">
        {state === "generating" ? t.generating : state === "done" ? t.title : ""}
      </p>

      {state === "done" && (
        <div ref={report} tabIndex={-1} className="border hairline outline-none">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b hairline bg-washi px-6 py-4 sm:px-8">
            <h3 className="text-xl">{t.title}</h3>
            <p className="text-sm text-ink-soft">{t.meta}</p>
          </div>

          <div className="space-y-10 px-6 py-8 sm:px-8">
            <section>
              <h4 className="eyebrow text-lab">{t.decisions.title}</h4>
              <ol className="mt-5 space-y-5">
                {t.decisions.items.map(([title, detail], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="font-display text-xl text-lab tabular-nums">{i + 1}</span>
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-ink-soft">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="border-t hairline pt-8">
              <h4 className="eyebrow text-lab">{t.agile.title}</h4>
              <ul className="mt-5 space-y-3">
                {t.agile.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-3 block h-px w-4 shrink-0 bg-lab" />
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t hairline pt-8">
              <h4 className="eyebrow text-lab">{t.station.title}</h4>
              <p className="mt-5 text-sm text-ink-soft">{t.station.kpiLabel}</p>
              <p className="mt-1 font-display text-2xl">{t.station.kpiValue}</p>
              <div aria-hidden className="mt-3 h-2 max-w-md bg-line">
                <div className="h-2 bg-lab" style={{ width: `${t.station.kpiShare}%` }} />
              </div>
              <ul className="mt-6 space-y-3">
                {t.station.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-3 block h-px w-4 shrink-0 bg-lab" />
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex flex-col gap-4 border-t hairline px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-xs text-ink-soft">{t.footnote}</p>
            <a
              href={ctaHref}
              className="inline-flex min-h-12 shrink-0 items-center justify-center bg-lab px-6 py-3 text-sm font-medium tracking-wide text-paper hover:opacity-90"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
