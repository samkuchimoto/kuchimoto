// /src/components/demo-triage/UrgencyBadge.tsx
// How the agent classes a message: high (company red), medium (amber),
// info (grey). Text and border, so the meaning never rests on colour.

import type { Urgency } from "@/lib/demo/summarize";

const STYLE: Record<Urgency, string> = {
  high: "border-seal text-seal",
  medium: "border-todo bg-todo-wash text-todo",
  info: "border-line text-ink-soft",
};

export function UrgencyBadge({ urgency, label }: { urgency: Urgency; label: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center border px-2 py-0.5 text-xs font-medium ${STYLE[urgency]}`}>
      {label}
    </span>
  );
}
