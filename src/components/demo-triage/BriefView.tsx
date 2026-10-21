// /src/components/demo-triage/BriefView.tsx
// The executive brief built from the visitor's emails: the counters, then
// priorities with their dates and next steps, follow-ups in one line each,
// and the noise that was set aside.

"use client";

import { useState, type ReactNode } from "react";
import type { Brief, BriefGroup, TriageEmail } from "@/lib/triage/engine";
import type { DemoCopy } from "@/lib/triage/copy";

type Words = DemoCopy["brief"];

function Counter({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-paper p-5">
      <p className="font-display text-3xl tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}

function Priority({ email, t }: { email: TriageEmail; t: Words }) {
  return (
    <li className="border hairline bg-paper p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-medium">{email.sender}</p>
        {email.received && <p className="text-xs text-ink-soft tabular-nums">{email.received}</p>}
      </div>
      <p className="mt-1 text-ink-soft">{email.summary}</p>
      {email.deadline && (
        <p className="mt-3 inline-flex border border-seal px-2 py-0.5 text-sm text-seal">
          {t.deadline} {email.deadline}
        </p>
      )}
      {email.action && (
        <p className="mt-3 text-sm">
          <span className="font-medium">{t.action}</span> {email.action}
        </p>
      )}
    </li>
  );
}

function Groups({ groups, render }: { groups: BriefGroup[]; render: (email: TriageEmail) => ReactNode }) {
  return (
    <div className="mt-6 space-y-8">
      {groups.map((group) => (
        <div key={group.kind}>
          <p className="eyebrow text-lab">
            {group.label} <span className="text-ink-soft">({group.items.length})</span>
          </p>
          <ul className="mt-3 space-y-3">{group.items.map(render)}</ul>
        </div>
      ))}
    </div>
  );
}

function NoiseGroup({ group, t }: { group: BriefGroup; t: Words }) {
  const [open, setOpen] = useState(false);
  const shown = open ? group.items : group.items.slice(0, 5);
  return (
    // min-w-0: a grid cell would otherwise grow to its longest line.
    <div className="min-w-0">
      <p className="eyebrow text-ink-soft">
        {group.label} ({group.items.length})
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
        {shown.map((email, i) => (
          <li key={`${email.sender}-${i}`} className="flex gap-2">
            <span className="shrink-0 font-medium text-ink">{email.sender}</span>
            <span className="min-w-0 truncate">{email.summary}</span>
          </li>
        ))}
      </ul>
      {group.items.length > 5 && (
        <button type="button" onClick={() => setOpen(!open)} className="mt-2 text-sm underline underline-offset-4">
          {open ? t.showLess : t.showAll(group.items.length)}
        </button>
      )}
    </div>
  );
}

export function BriefView({ brief, mode, t }: { brief: Brief; mode: string; t: Words }) {
  const { counts } = brief;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl">{t.title}</h3>
        <p className="text-sm text-ink-soft">{mode}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-px border hairline bg-line md:grid-cols-4">
        <Counter value={counts.total} label={t.counters.total} />
        <Counter value={counts.actions} label={t.counters.actions} />
        <Counter value={counts.info} label={t.counters.info} />
        <Counter value={counts.noise} label={t.counters.noise} />
      </div>
      <p className="mt-3 text-sm text-ink-soft">{t.minutes(counts.minutesSaved)}</p>

      <section className="mt-12" aria-labelledby="brief-priorities">
        <h4 id="brief-priorities" className="text-xl">
          {t.priorities} <span className="text-ink-soft">({counts.actions})</span>
        </h4>
        {brief.priorities.length ? (
          <Groups groups={brief.priorities} render={(email) => <Priority key={`${email.sender}-${email.subject}`} email={email} t={t} />} />
        ) : (
          <p className="mt-4 text-ink-soft">{t.noPriorities}</p>
        )}
      </section>

      <section className="mt-12 border-t hairline pt-10" aria-labelledby="brief-follow">
        <h4 id="brief-follow" className="text-xl">
          {t.follow} <span className="text-ink-soft">({counts.info})</span>
        </h4>
        {brief.follow.length ? (
          <Groups
            groups={brief.follow}
            render={(email) => (
              <li key={`${email.sender}-${email.subject}`} className="text-sm">
                <span className="font-medium">{email.sender}</span>
                {t.colon} <span className="text-ink-soft">{email.summary}</span>
              </li>
            )}
          />
        ) : (
          <p className="mt-4 text-ink-soft">{t.noFollow}</p>
        )}
      </section>

      <section className="mt-12 border-t hairline pt-10" aria-labelledby="brief-noise">
        <h4 id="brief-noise" className="text-xl">
          {t.noise} <span className="text-ink-soft">({counts.noise})</span>
        </h4>
        {brief.noise.length ? (
          <>
            <p className="mt-2 text-sm text-ink-soft">{t.noiseNote}</p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {brief.noise.map((group) => (
                <NoiseGroup key={group.kind} group={group} t={t} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-ink-soft">{t.noNoise}</p>
        )}
      </section>
    </div>
  );
}
