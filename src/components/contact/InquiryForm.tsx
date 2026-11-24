"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { Arrow } from "@/components/ui/Icons";
import Link from "next/link";
import { BUDGETS, SITE, TIMELINES, TRACK_OPTIONS } from "@/data/site";
import { readAttribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<string, string>>;

const field =
  "w-full rounded-[12px] bg-surface px-4 py-3.5 text-base text-ink shadow-[0_0_0_1px_var(--color-hairline-strong)] outline-none transition-shadow placeholder:text-ink-2/60 focus:shadow-[0_0_0_1.5px_var(--color-ink)]";

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
        {required && <span className="text-vermilion"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <label
              key={o.id}
              onPointerEnter={audio.tap}
              className={`cursor-pointer rounded-full px-4 py-2.5 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vermilion ${
                on ? "bg-ink text-washi" : "bg-surface text-ink shadow-[0_0_0_1px_var(--color-hairline-strong)] hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={on}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-vermilion">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function InquiryForm({ email: initialEmail = "", track: initialTrack = "" }: { email?: string; track?: string }) {
  const audio = useAudio();
  const shownAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [track, setTrack] = useState(TRACK_OPTIONS.some((t) => t.id === initialTrack) ? initialTrack : "");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      track: track || "unsure",
      budget,
      timeline: timeline || undefined,
      scope: String(form.get("scope") ?? ""),
      website: String(form.get("website") ?? ""),
      source: "contact",
      page: window.location.pathname,
      elapsed: Date.now() - shownAt.current,
      attribution: readAttribution(),
    };

    const local: Errors = {};
    if (!payload.name.trim()) local.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) local.email = "Please enter a valid email address.";
    if (!budget) local.budget = "Please choose a budget range.";
    if (payload.scope.trim().length < 20) local.scope = "A few sentences on what you want built, please (20 characters or more).";
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
        audio.chime(4);
        return;
      }
      if (result.fields) setErrors(result.fields);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {status === "sent" ? (
        <div role="status" className="rise-in rounded-[var(--radius-card)] bg-sumi p-8 text-washi sm:p-12">
          <span className="block h-2.5 w-2.5 rounded-full bg-vermilion" aria-hidden="true" />
          <h2 className="display display-md mt-8">Received.</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-washi/80">
            Your scope request is with Samuel. You&apos;ll get a written scope and a fixed price within 24 hours, from{" "}
            {SITE.email}. A confirmation is on its way to your inbox now.
          </p>
          <p className="mono mt-10 text-washi/50">Reply to that email with any document, screenshot or example.</p>
        </div>
      ) : (
        <form noValidate onSubmit={submit} className="space-y-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="f-name" className="mono mb-3 block text-ink-2">
                Name <span className="text-vermilion">*</span>
              </label>
              <input
                id="f-name"
                name="name"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={field}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-vermilion">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="f-email" className="mono mb-3 block text-ink-2">
                Work email <span className="text-vermilion">*</span>
              </label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={initialEmail}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={field}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-vermilion">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="f-company" className="mono mb-3 block text-ink-2">
              Company or website
            </label>
            <input id="f-company" name="company" autoComplete="organization" className={field} placeholder="acme.com" />
          </div>

          <Chips name="track" legend="What are we building?" options={TRACK_OPTIONS} value={track} onChange={setTrack} />

          <div id="f-budget" tabIndex={-1} className="outline-none">
            <Chips
              name="budget"
              legend="Budget"
              required
              options={BUDGETS.map((b) => ({ id: b, label: b }))}
              value={budget}
              onChange={setBudget}
              error={errors.budget}
            />
          </div>

          <Chips
            name="timeline"
            legend="Timeline"
            options={TIMELINES.map((t) => ({ id: t, label: t }))}
            value={timeline}
            onChange={setTimeline}
          />

          <div>
            <label htmlFor="f-scope" className="mono mb-3 block text-ink-2">
              Scope: what should it do, and for whom? <span className="text-vermilion">*</span>
            </label>
            <textarea
              id="f-scope"
              name="scope"
              rows={6}
              required
              aria-invalid={Boolean(errors.scope)}
              aria-describedby={errors.scope ? "scope-error" : undefined}
              className={`${field} resize-y leading-relaxed`}
              placeholder="The platform, the people who use it, the result it has to produce, links to anything you have today."
            />
            {errors.scope && (
              <p id="scope-error" className="mt-2 text-sm text-vermilion">
                {errors.scope}
              </p>
            )}
          </div>

          {/* Honeypot: hidden from people and screen readers, filled by bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="f-website">Leave this empty</label>
            <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-5 border-t border-hairline-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="mono max-w-[44ch] text-ink-2">
              Minimum engagement $5,000. Your details are used only to answer this request (
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
              {status === "sending" ? "Sending…" : "Request a scope"}
              <Arrow className="h-4 w-4" />
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="rounded-[12px] bg-vermilion/10 px-4 py-3 text-[15px] text-ink">
              {Object.keys(errors).length
                ? "Please check the highlighted fields."
                : "Your request could not be sent just now. Please write to "}
              {!Object.keys(errors).length && (
                <a href={`mailto:${SITE.email}`} className="font-medium underline underline-offset-2">
                  {SITE.email}
                </a>
              )}
            </p>
          )}
        </form>
      )}
    </>
  );
}
