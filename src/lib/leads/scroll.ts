// /src/lib/leads/scroll.ts
// Takes the visitor to a lead form: the hero form while it is still on
// screen (or below), the final form once they have scrolled past it. Used
// by the header button, the phone bar and the offer cards, which can also
// preselect a need. Browser only.

import type { Need } from "./options";

/** Dispatched on a lead form's element, detail: the need to select. */
export const PRESET_EVENT = "kuchimoto-lead-preset";

/** Height of the sticky header, which covers the top of the page. */
const HEADER = 72;

export function goToLeadForm(need?: Need): boolean {
  const hero = document.querySelector<HTMLElement>('[data-lead-form="hero"]');
  const final = document.querySelector<HTMLElement>('[data-lead-form="final"]');
  const target = hero && hero.getBoundingClientRect().bottom > HEADER ? hero : (final ?? hero);
  if (!target) return false;
  if (need) target.dispatchEvent(new CustomEvent<Need>(PRESET_EVENT, { detail: need }));
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
  target.querySelector<HTMLInputElement>('input[type="email"], input[name="name"]')?.focus({ preventScroll: true });
  return true;
}
