// /src/components/forms/LeadForm.tsx
// The lead form of the Lab, Studio, the triage demo and Contact, in two
// steps posted to /api/lead.
//   Step 1, in the hero: work email and "What do you need?" (chips). Sent,
//   it is saved as a partial lead and notified, then step 2 opens in place.
//   Step 2: name, company or website, what to build, budget, timeline.
//   Sent, the visitor goes to the thank-you page (a full page load, so the
//   tags see it), which fires the conversion.
// A notice under the button replaces a consent checkbox: answering a
// request needs clear information, not a checkbox. Bots are stopped by the
// "Website" honeypot, a 3-second minimum and the server's rate limit.

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { fill } from "@/lib/format";
import { readAttribution } from "@/lib/leads/attribution";
import {
  BUDGETS,
  NEEDS,
  STORAGE,
  TIMELINES,
  type Budget,
  type LeadBusiness,
  type LeadSource,
  type Need,
  type Timeline,
} from "@/lib/leads/options";
import { PRESET_EVENT } from "@/lib/leads/scroll";
import { trackLeadStep1 } from "@/lib/track";
import { Honeypot, Status, inputClass } from "./Fields";
import { Chips } from "./Chips";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 7 to 15 digits, with +, spaces, dots, dashes or brackets around them.
const PHONE = (value: string) => /^\+?[0-9\s().-]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, ""));

export type LeadFormProps = {
  lang: Locale;
  t: Dictionary["lead"];
  /** Chip labels for the budgets, prices written for the language. */
  budgetLabels: Record<Budget, string>;
  privacyHref: string;
  thanksHref: string;
  contactEmail: string;
  /** Unique on the page, e.g. "lead-hero". */
  id: string;
  /** The header button and the offer cards go to "hero", or to "final" once the hero is passed. */
  role: "hero" | "final";
  source: LeadSource;
  business?: LeadBusiness;
  preset?: Need;
  /** Button colour: the division's accent. */
  accentClass?: string;
};

type Errors = Partial<Record<"email" | "phone" | "need" | "name", string>>;

export function LeadForm({
  lang,
  t,
  budgetLabels,
  privacyHref,
  thanksHref,
  contactEmail,
  id,
  role,
  source,
  business = source === "studio" ? "studio" : "lab",
  preset,
  accentClass = "bg-lab",
}: LeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [need, setNeed] = useState<Need | "">(preset ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState<Budget | "">("");
  const [timeline, setTimeline] = useState<Timeline | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [partial, setPartial] = useState<{ id: string; token: string } | null>(null);
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const shownAt = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  // When the form appeared (for the 3-second check) and where the visitor came from.
  useEffect(() => {
    shownAt.current = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTracking({ ...readAttribution(), page: window.location.pathname });
  }, []);

  // "Start with €490" and the other offer buttons preselect a need.
  useEffect(() => {
    const element = root.current;
    const onPreset = (event: Event) => setNeed((event as CustomEvent<Need>).detail);
    element?.addEventListener(PRESET_EVENT, onPreset);
    return () => element?.removeEventListener(PRESET_EVENT, onPreset);
  }, []);

  useEffect(() => {
    if (step === 2) nameInput.current?.focus();
  }, [step]);

  const needOptions = NEEDS.map((key) => [key, t.needs[key]] as const);
  const budgetOptions = BUDGETS.map((key) => [key, budgetLabels[key]] as const);
  const timelineOptions = TIMELINES.map((key) => [key, t.timelines[key]] as const);

  async function post(data: FormData): Promise<{ ok?: boolean; id?: string | null; token?: string | null; error?: string; fields?: string[] } | null> {
    data.set("elapsed", String(Date.now() - shownAt.current));
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      return (await response.json().catch(() => ({ error: "server" }))) as { ok?: boolean; error?: string };
    } catch {
      return null;
    }
  }

  function showFailure(result: { error?: string; fields?: string[] } | null) {
    if (!result) return setFailure(t.errors.network);
    if (result.error === "invalid") {
      const fields = result.fields ?? [];
      setErrors({
        ...(fields.includes("email") && { email: t.errors.email }),
        ...(fields.includes("phone") && { phone: t.errors.phone }),
        ...(fields.includes("need") && { need: t.errors.need }),
        ...(fields.includes("name") && { name: t.errors.name }),
      });
      return setFailure(t.errors.invalid);
    }
    if (result.error === "rate_limited") return setFailure(t.errors.rate_limited);
    setFailure(fill(t.errors.server, { email: contactEmail }));
  }

  async function sendStep1(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);
    const found: Errors = {
      ...(!EMAIL.test(email.trim()) && { email: t.errors.email }),
      ...(!PHONE(phone.trim()) && { phone: t.errors.phone }),
      ...(!need && { need: t.errors.need }),
    };
    setErrors(found);
    if (found.email) return event.currentTarget.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
    if (found.phone) return event.currentTarget.querySelector<HTMLInputElement>('input[name="phone"]')?.focus();
    if (found.need) return event.currentTarget.querySelector<HTMLInputElement>('input[name="need"]')?.focus();

    setSending(true);
    const data = new FormData(event.currentTarget);
    data.set("step", "1");
    const result = await post(data);
    setSending(false);
    if (!result?.ok) return showFailure(result);
    setPartial(result.id && result.token ? { id: result.id, token: result.token } : null);
    trackLeadStep1({ need: need as Need, source });
    setStep(2);
  }

  async function sendStep2(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      setErrors({ name: t.errors.name });
      return nameInput.current?.focus();
    }
    setErrors({});
    setSending(true);
    data.set("step", "2");
    const result = await post(data);
    if (!result?.ok) {
      setSending(false);
      return showFailure(result);
    }
    try {
      sessionStorage.setItem(
        STORAGE.pending,
        JSON.stringify({ id: result.id ?? crypto.randomUUID(), need, source, name, email: email.trim() }),
      );
    } catch {
      // Private browsing: the thank-you page shows, without the booking prefill.
    }
    window.location.assign(thanksHref);
  }

  /** The fields both steps send: the second repeats the first, so it stands alone. */
  const shared = (
    <>
      <Honeypot />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="business" value={business} />
      {Object.entries(tracking).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
    </>
  );

  const button = `inline-flex min-h-12 w-full items-center justify-center px-6 py-3 text-base font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto ${accentClass}`;

  return (
    <div ref={root} id={id} data-lead-form={role} className="scroll-mt-24">
      {step === 1 ? (
        <form onSubmit={sendStep1} noValidate className="relative space-y-4 sm:space-y-5">
          {shared}
          <div>
            <label htmlFor={`${id}-email`} className="block text-sm font-medium">
              {t.email}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
              className={`mt-1.5 ${inputClass}`}
            />
            {errors.email && (
              <p id={`${id}-email-error`} className="mt-1.5 text-sm font-medium text-danger">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className="block text-sm font-medium">
              {t.phone}
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+33 6 12 34 56 78"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              className={`mt-1.5 ${inputClass}`}
            />
            {errors.phone && (
              <p id={`${id}-phone-error`} className="mt-1.5 text-sm font-medium text-danger">
                {errors.phone}
              </p>
            )}
          </div>
          <Chips id={`${id}-need`} name="need" legend={t.needLabel} options={needOptions} value={need} onChange={setNeed} error={errors.need} />
          {failure && <Status tone="error">{failure}</Status>}
          <div>
            <button type="submit" disabled={sending} className={button}>
              {sending ? t.sending : t.submit}
            </button>
            <p className="mt-3 text-sm text-ink-soft">
              {t.notice}{" "}
              <Link href={privacyHref} className="underline underline-offset-4 hover:text-ink">
                {t.privacyLink}
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={sendStep2} noValidate className="relative space-y-5">
          {shared}
          <input type="hidden" name="email" value={email.trim()} />
          <input type="hidden" name="phone" value={phone.trim()} />
          <input type="hidden" name="need" value={need} />
          {partial && (
            <>
              <input type="hidden" name="id" value={partial.id} />
              <input type="hidden" name="token" value={partial.token} />
            </>
          )}
          <p className="eyebrow text-ink-soft" aria-live="polite">
            {t.step2}
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className="block text-sm font-medium">
                {t.name}
              </label>
              <input
                ref={nameInput}
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${id}-name-error` : undefined}
                className={`mt-2 ${inputClass}`}
              />
              {errors.name && (
                <p id={`${id}-name-error`} className="mt-1.5 text-sm font-medium text-danger">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={`${id}-company`} className="block text-sm font-medium">
                {t.company} <span className="font-normal text-ink-soft">({t.optional})</span>
              </label>
              <input id={`${id}-company`} name="company" autoComplete="organization" className={`mt-2 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-message`} className="block text-sm font-medium">
              {t.message} <span className="font-normal text-ink-soft">({t.optional})</span>
            </label>
            <textarea id={`${id}-message`} name="message" rows={4} placeholder={t.messagePlaceholder} className={`mt-2 ${inputClass}`} />
          </div>
          <Chips id={`${id}-budget`} name="budget" legend={t.budgetLabel} options={budgetOptions} value={budget} onChange={setBudget} optional={t.optional} />
          <Chips id={`${id}-timeline`} name="timeline" legend={t.timelineLabel} options={timelineOptions} value={timeline} onChange={setTimeline} optional={t.optional} />
          {failure && <Status tone="error">{failure}</Status>}
          <button type="submit" disabled={sending} className={button}>
            {sending ? t.sending : t.send}
          </button>
        </form>
      )}
    </div>
  );
}
