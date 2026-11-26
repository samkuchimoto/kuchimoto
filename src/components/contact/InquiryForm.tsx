"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { Arrow } from "@/components/ui/Icons";
import Link from "next/link";
import { BLOCKERS, BUDGETS, MARKETS, SECTORS, SITE, TIMELINES, TRACK_OPTIONS } from "@/data/site";
import { readAttribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<string, string>>;

const field =
  "w-full rounded-[12px] bg-surface px-4 py-3.5 text-base text-ink shadow-[0_0_0_1px_var(--color-hairline-strong)] outline-none transition-shadow placeholder:text-ink-2/60 focus:shadow-[0_0_0_1.5px_var(--color-ink)]";

/** Every field says whether it is required or optional (Baymard: marking only one kind leaves people guessing). */
function Mark({ required }: { required?: boolean }) {
  return required ? <span className="text-vermilion"> · required</span> : <span className="text-ink-2/60"> · optional</span>;
}

function pillClass(on: boolean) {
  return `cursor-pointer rounded-full px-4 py-2.5 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vermilion ${
    on ? "bg-ink text-washi" : "bg-surface text-ink shadow-[0_0_0_1px_var(--color-hairline-strong)] hover:bg-white"
  }`;
}

/** One choice from a list (radio buttons dressed as pills). */
function Chips<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  legend: string;
  options: readonly { id: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
  error?: string;
  required?: boolean;
}) {
  const audio = useAudio();
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mono mb-3 text-ink-2">
        {legend}
        <Mark required={required} />
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} onPointerEnter={audio.tap} className={pillClass(value === o.id)}>
            <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-vermilion">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Any number of choices from a list (checkboxes dressed as pills). */
function Picks({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly { id: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const audio = useAudio();
  return (
    <fieldset>
      <legend className="mono mb-3 text-ink-2">
        {legend}
        <Mark />
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.id);
          return (
            <label key={o.id} onPointerEnter={audio.tap} className={pillClass(on)}>
              <input
                type="checkbox"
                name={name}
                value={o.id}
                checked={on}
                onChange={() => onChange(on ? value.filter((v) => v !== o.id) : [...value, o.id])}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-8 border-t border-hairline-strong pt-8 first:border-t-0 first:pt-0" aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="flex items-baseline gap-4 text-[clamp(1.4rem,2.2vw,1.75rem)] font-medium tracking-[-0.03em]">
        <span className="mono text-ink-2">{n} /</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Text({
  id,
  name,
  label,
  required,
  error,
  ...input
}: { id: string; name: string; label: string; required?: boolean; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mono mb-3 block text-ink-2">
        {label}
        <Mark required={required} />
      </label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={field}
        {...input}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-vermilion">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The inquiry (26 November 2026, Samuel: "fill out the form straight away, then register the email at the end; simple,
 * and get all the details, to reduce human coordination to the maximum"). Four steps in the order a client thinks:
 * what they need, the brief, budget and timing, then who they are, with the email last (Baymard: 18% of shoppers leave
 * a checkout that asks for an account first). Everything a written scope or a consultation needs is asked once, so the
 * answer can go out without a discovery call. Only five answers are required.
 */
export function InquiryForm({ email: initialEmail = "", track: initialTrack = "" }: { email?: string; track?: string }) {
  const audio = useAudio();
  const shownAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [track, setTrack] = useState(TRACK_OPTIONS.some((t) => t.id === initialTrack) ? initialTrack : "");
  const [sectors, setSectors] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [blockers, setBlockers] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const consulting = track === "consulting";

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (key: string) => String(form.get(key) ?? "");
    const payload = {
      name: text("name"),
      email: text("email"),
      company: text("company"),
      track: track || "unsure",
      budget,
      timeline: timeline || undefined,
      scope: text("scope"),
      sectors,
      markets,
      blockers,
      current: text("current"),
      whatsapp: text("whatsapp"),
      note: text("note"),
      website: text("website"),
      source: "contact",
      page: window.location.pathname,
      elapsed: Date.now() - shownAt.current,
      attribution: readAttribution(),
    };

    // Checked in the order they appear, so the cursor goes to the first one on the page.
    const local: Errors = {};
    if (payload.scope.trim().length < 20) local.scope = "A few sentences on what you want built or solved, please (20 characters or more).";
    if (!budget) local.budget = "Please choose a budget range.";
    if (!payload.name.trim()) local.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) local.email = "Please enter a valid email address.";
    if (payload.whatsapp && !/^[+\d\s().-]*$/.test(payload.whatsapp)) local.whatsapp = "Digits, spaces and + only, please.";
    setErrors(local);
    if (Object.keys(local).length) {
      const first = Object.keys(local)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; fields?: Errors };
      if (response.ok && result.ok) {
        setStatus("sent");
        return;
      }
      if (result.fields) setErrors(result.fields);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div role="status" className="rise-in rounded-[var(--radius-card)] bg-sumi p-8 text-washi sm:p-12">
        <span className="block h-2.5 w-2.5 rounded-full bg-vermilion" aria-hidden="true" />
        <h2 className="display display-md mt-8">Received.</h2>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-washi/80">
          Your request is with Samuel. You&apos;ll get a written answer {consulting ? "on the consultation" : "with a scope and a fixed price"} within 24
          hours, from {SITE.email}. A confirmation is on its way to your inbox now.
        </p>
        <p className="mono mt-10 text-washi/50">Reply to that email with any document, screenshot or example.</p>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={submit}
      // A message goes away as soon as its field is corrected, not at the next send.
      onChange={(e) => {
        const name = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement ? e.target.name : "";
        if (!name || !errors[name]) return;
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }}
      className="space-y-12"
    >
      <Step n="01" title="What do you need?">
        <Chips name="track" legend="Kind of work" options={TRACK_OPTIONS} value={track} onChange={setTrack} />
        <Picks name="sectors" legend="Field" options={SECTORS} value={sectors} onChange={setSectors} />
        <Picks name="markets" legend="Markets" options={MARKETS} value={markets} onChange={setMarkets} />
      </Step>

      <Step n="02" title="The brief">
        <div>
          <label htmlFor="f-scope" className="mono mb-3 block text-ink-2">
            {consulting ? "What are you trying to solve, and for whom?" : "What should it do, and for whom?"}
            <Mark required />
          </label>
          <textarea
            id="f-scope"
            name="scope"
            rows={6}
            required
            aria-invalid={Boolean(errors.scope)}
            aria-describedby={errors.scope ? "scope-error" : undefined}
            className={`${field} resize-y leading-relaxed`}
            placeholder={
              consulting
                ? "Your mission, your market, what you have tried, and the decision you need to make."
                : "The platform, the people who use it, the result it has to produce, links to anything you have today."
            }
          />
          {errors.scope && (
            <p id="scope-error" className="mt-2 text-sm text-vermilion">
              {errors.scope}
            </p>
          )}
        </div>
        <Text id="f-current" name="current" label="Your website or app today" type="url" inputMode="url" autoComplete="url" placeholder="https://" />
        <Picks name="blockers" legend="Where is the hardest part?" options={BLOCKERS} value={blockers} onChange={setBlockers} />
      </Step>

      <Step n="03" title="Budget and timing">
        <div id="f-budget" tabIndex={-1} className="outline-none">
          <Chips name="budget" legend="Budget" required options={BUDGETS.map((b) => ({ id: b, label: b }))} value={budget} onChange={setBudget} error={errors.budget} />
        </div>
        <Chips name="timeline" legend="Timeline" options={TIMELINES.map((t) => ({ id: t, label: t }))} value={timeline} onChange={setTimeline} />
      </Step>

      <Step n="04" title="About you">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text id="f-name" name="name" label="Name" required autoComplete="name" error={errors.name} />
          <Text id="f-email" name="email" label="Work email" required type="email" inputMode="email" autoComplete="email" defaultValue={initialEmail} error={errors.email} />
          <Text id="f-company" name="company" label="Company" autoComplete="organization" placeholder="acme.com" />
          <Text id="f-whatsapp" name="whatsapp" label="WhatsApp, for a faster answer" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234 801 234 5678" error={errors.whatsapp} />
        </div>
        <div>
          <label htmlFor="f-note" className="mono mb-3 block text-ink-2">
            Anything else: a note or a message
            <Mark />
          </label>
          <textarea id="f-note" name="note" rows={3} className={`${field} resize-y leading-relaxed`} />
        </div>
      </Step>

      {/* Honeypot: hidden from people and screen readers, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 border-t border-hairline-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="mono max-w-[44ch] text-ink-2">
          First enquiry free. Consultations from $2,000, builds from $5,000. Your details are used only to answer this request (
          <Link href="/legal" className="underline underline-offset-2">
            privacy
          </Link>
          ).
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          onPointerEnter={audio.tap}
          className="group mono-12 inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-8 font-medium text-washi transition-colors hover:bg-black disabled:opacity-60"
        >
          <span className="block h-[6px] w-[6px] rounded-full bg-vermilion transition-transform duration-300 group-hover:scale-150" />
          {status === "sending" ? "Sending…" : consulting ? "Request a consultation" : "Request a scope"}
          <Arrow className="h-4 w-4" />
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-[12px] bg-vermilion/10 px-4 py-3 text-[15px] text-ink">
          {Object.keys(errors).length ? "Please check the highlighted fields." : "Your request could not be sent just now. Please write to "}
          {!Object.keys(errors).length && (
            <a href={`mailto:${SITE.email}`} className="font-medium underline underline-offset-2">
              {SITE.email}
            </a>
          )}
        </p>
      )}
    </form>
  );
}
