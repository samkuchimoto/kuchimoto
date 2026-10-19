// /src/components/demo-triage/MessageSummary.tsx
// "Tester sur un message réel": the visitor pastes an email or an alert
// and gets a three-line executive summary at once. Built in the browser
// by lib/demo/summarize.ts; the text never leaves the page.

"use client";

import { useState } from "react";
import { summarize, type Summary, type Urgency } from "@/lib/demo/summarize";
import { inputClass } from "@/components/forms/Fields";
import { UrgencyBadge } from "./UrgencyBadge";

export type SummaryStrings = {
  label: string;
  placeholder: string;
  submit: string;
  example: string;
  exampleText: string;
  empty: string;
  title: string;
  finding: string;
  impact: string;
  decision: string;
  urgency: Record<Urgency, string>;
  note: string;
};

export function MessageSummary({ t }: { t: SummaryStrings }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Summary | null | "empty">(null);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div>
        <label htmlFor="demo-message" className="block text-sm font-medium">
          {t.label}
        </label>
        <textarea
          id="demo-message"
          rows={9}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t.placeholder}
          className={`mt-2 ${inputClass}`}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setResult(summarize(text) ?? "empty")}
            className="inline-flex min-h-12 items-center justify-center bg-lab px-6 py-3 text-sm font-medium tracking-wide text-paper hover:opacity-90"
          >
            {t.submit}
          </button>
          <button
            type="button"
            onClick={() => {
              setText(t.exampleText);
              setResult(summarize(t.exampleText));
            }}
            className="inline-flex min-h-12 items-center justify-center border border-line px-6 py-3 text-sm hover:bg-washi"
          >
            {t.example}
          </button>
        </div>
        <p className="mt-4 text-xs text-ink-soft">{t.note}</p>
      </div>

      <div aria-live="polite">
        {result === "empty" && <p className="border-l-2 border-line px-4 py-3 text-sm text-ink-soft">{t.empty}</p>}
        {result && result !== "empty" && (
          <div className="border hairline">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b hairline bg-washi px-5 py-3">
              <h3 className="text-lg">{t.title}</h3>
              <UrgencyBadge urgency={result.urgency} label={t.urgency[result.urgency]} />
            </div>
            <dl className="divide-y divide-line">
              {(
                [
                  [t.finding, result.finding],
                  [t.impact, result.impact],
                  [t.decision, result.decision],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="px-5 py-4">
                  <dt className="eyebrow text-lab">{label}</dt>
                  <dd className="mt-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
