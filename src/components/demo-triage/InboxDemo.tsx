// /src/components/demo-triage/InboxDemo.tsx
// The simulated inbox on /demo-triage: filter the flows, open a message
// to read the raw email or alert, and see how the agent classes it.

"use client";

import { useState } from "react";
import type { Urgency } from "@/lib/demo/summarize";
import { UrgencyBadge } from "./UrgencyBadge";

export type DemoMessage = {
  id: string;
  tag: string;
  subject: string;
  time: string;
  from: string;
  to: string;
  body: string;
  urgency: Urgency;
  category: string;
  action: string;
  status: "decision" | "resolved";
};

export type InboxStrings = {
  box: string;
  hint: string;
  filtersLabel: string;
  filters: { all: string; decisions: string; resolved: string };
  counts: { all: number; decisions: number; resolved: number };
  more: { all: string; resolved: string };
  urgency: Record<Urgency, string>;
  labels: { from: string; to: string; received: string; raw: string; analysis: string; urgency: string; category: string; action: string };
};

type Filter = "all" | "decisions" | "resolved";

export function InboxDemo({ t, messages }: { t: InboxStrings; messages: DemoMessage[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);

  const shown = messages.filter(
    (message) =>
      filter === "all" || (filter === "decisions" ? message.status === "decision" : message.status === "resolved"),
  );
  const more = filter === "all" ? t.more.all : filter === "resolved" ? t.more.resolved : null;

  return (
    <div className="mt-8">
      <div role="group" aria-label={t.filtersLabel} className="flex flex-wrap gap-2">
        {(["all", "decisions", "resolved"] as const).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`inline-flex min-h-11 items-center gap-2 border px-4 text-sm transition-colors ${
              filter === key ? "border-ink bg-ink text-paper" : "border-line text-ink hover:bg-washi"
            }`}
          >
            {t.filters[key]}
            <span className={`tabular-nums ${filter === key ? "text-paper/80" : "text-ink-soft"}`}>[{t.counts[key]}]</span>
          </button>
        ))}
      </div>

      <div className="mt-4 border hairline">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b hairline bg-washi px-5 py-3 text-sm">
          <span className="font-medium">{t.box}</span>
          <span className="text-ink-soft">{t.hint}</span>
        </div>
        <ul className="divide-y divide-line">
          {shown.map((message) => {
            const expanded = open === message.id;
            const panel = `message-${message.id}`;
            return (
              <li key={message.id}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panel}
                  onClick={() => setOpen(expanded ? null : message.id)}
                  className="flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-washi sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="shrink-0 text-xs font-medium tracking-wide text-lab sm:w-40">{message.tag}</span>
                  <span className="flex-1">{message.subject}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <UrgencyBadge urgency={message.urgency} label={t.urgency[message.urgency]} />
                    <span className="text-xs text-ink-soft tabular-nums">{message.time}</span>
                    <span aria-hidden className={`text-ink-soft transition-transform ${expanded ? "rotate-180" : ""}`}>
                      ⌄
                    </span>
                  </span>
                </button>
                {expanded && (
                  <div id={panel} className="grid gap-6 border-t hairline px-5 py-6 md:grid-cols-[1fr_18rem]">
                    <div>
                      <p className="eyebrow text-ink-soft">{t.labels.raw}</p>
                      <div className="mt-3 border hairline bg-washi p-4 text-sm">
                        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-ink-soft">
                          <dt>{t.labels.from}</dt>
                          <dd>{message.from}</dd>
                          <dt>{t.labels.to}</dt>
                          <dd>{message.to}</dd>
                          <dt>{t.labels.received}</dt>
                          <dd className="tabular-nums">{message.time}</dd>
                        </dl>
                        <p className="mt-3 font-medium">{message.subject}</p>
                        <p className="mt-3 whitespace-pre-line leading-relaxed">{message.body}</p>
                      </div>
                    </div>
                    <div>
                      <p className="eyebrow text-lab">{t.labels.analysis}</p>
                      <dl className="mt-3 space-y-4 text-sm">
                        <div>
                          <dt className="text-ink-soft">{t.labels.urgency}</dt>
                          <dd className="mt-1">
                            <UrgencyBadge urgency={message.urgency} label={t.urgency[message.urgency]} />
                          </dd>
                        </div>
                        <div>
                          <dt className="text-ink-soft">{t.labels.category}</dt>
                          <dd className="mt-1 font-medium">{message.category}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-soft">{t.labels.action}</dt>
                          <dd className="mt-1">{message.action}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {more && <p className="border-t hairline px-5 py-3 text-sm text-ink-soft">{more}</p>}
      </div>
    </div>
  );
}
