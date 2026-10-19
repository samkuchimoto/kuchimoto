// /src/components/forms/InquiryForm.tsx
// One form for three uses, all posted to /api/contact:
//   contact   the Contact page, with a selector for the business;
//   waitlist  Happy Homes Canada and United States;
//   project   Kuchimoto Lab project requests.

"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { wordSpace, type Locale } from "@/i18n/config";
import { DIVISIONS, PROJECT_TYPES, US_LOCATIONS, type DivisionKey, type FormKind } from "@/lib/forms/options";
import { Checkbox, Field, Honeypot, Status, inputClass } from "./Fields";

type Strings = Dictionary["forms"];

export function InquiryForm({
  kind,
  division,
  lang,
  t,
  privacyHref,
  contactEmail,
  services,
  accentClass = "bg-ink",
}: {
  kind: FormKind;
  /** Fixed for a waiting list or the Lab; chosen by the visitor on Contact. */
  division?: DivisionKey;
  lang: Locale;
  t: Strings;
  privacyHref: string;
  /** Offered when the form cannot send; null while not set. */
  contactEmail: string | null;
  /** Checkboxes for a waiting list: the services planned there. */
  services?: string[];
  accentClass?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);

  const errorFor = (name: string, message = t.errors.required) => (invalid.includes(name) ? message : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);
    setInvalid([]);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (result.ok) {
        setState("done");
        return;
      }
      setError(result.error ?? "server");
      setInvalid(result.fields ?? []);
    } catch {
      setError("network");
    }
    setState("idle");
  }

  if (state === "done") return <Status tone="success">{t.success[kind]}</Status>;

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot />
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="lang" value={lang} />
      {division && <input type="hidden" name="division" value={division} />}

      {!division && (
        <Field name="division" label={t.division} error={errorFor("division")}>
          {(control) => (
            <select {...control} required defaultValue="" className={inputClass}>
              <option value="" disabled>
                {t.divisionChoose}
              </option>
              {DIVISIONS.map((key) => (
                <option key={key} value={key}>
                  {t.divisions[key]}
                </option>
              ))}
            </select>
          )}
        </Field>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label={t.name} error={errorFor("name")}>
          {(control) => <input {...control} required autoComplete="name" className={inputClass} />}
        </Field>
        <Field name="email" label={t.email} error={errorFor("email", t.errors.email)}>
          {(control) => <input {...control} type="email" required autoComplete="email" className={inputClass} />}
        </Field>
      </div>

      {kind === "contact" && (
        <Field name="phone" label={t.phone} optional={t.optional}>
          {(control) => <input {...control} type="tel" autoComplete="tel" className={inputClass} />}
        </Field>
      )}

      {kind === "project" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="company" label={t.company} optional={t.optional}>
            {(control) => <input {...control} autoComplete="organization" className={inputClass} />}
          </Field>
          <Field name="projectType" label={t.projectType} error={errorFor("projectType")}>
            {(control) => (
              <select {...control} required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {t.divisionChoose}
                </option>
                {PROJECT_TYPES.map((key) => (
                  <option key={key} value={key}>
                    {t.projectTypes[key]}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      )}

      {kind === "waitlist" && division === "hh-usa" && (
        <fieldset>
          <legend className="text-sm font-medium">{t.location}</legend>
          <div className="mt-3 flex flex-wrap gap-6">
            {US_LOCATIONS.map((key) => (
              <label key={key} className="flex items-center gap-2.5 text-sm">
                <input type="radio" name="location" value={key} required className="size-5 accent-[var(--color-ink)]" />
                {t.locations[key]}
              </label>
            ))}
          </div>
          {errorFor("location") && <p className="mt-1.5 text-sm font-medium text-danger">{errorFor("location")}</p>}
        </fieldset>
      )}

      {kind === "waitlist" && division === "hh-canada" && (
        <Field name="city" label={t.city} error={errorFor("city")}>
          {(control) => <input {...control} required autoComplete="address-level2" className={inputClass} />}
        </Field>
      )}

      {services && services.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium">
            {t.services} <span className="font-normal text-ink-soft">({t.optional})</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2.5 text-sm">
                <input type="checkbox" name="services" value={service} className="size-5 accent-[var(--color-ink)]" />
                {service}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {kind !== "waitlist" && (
        <Field name="message" label={t.message} error={errorFor("message")}>
          {(control) => <textarea {...control} required rows={6} className={inputClass} />}
        </Field>
      )}

      <Checkbox name="consent" required error={errorFor("consent")}>
        {t.consent}
        {wordSpace(lang)}
        <Link href={privacyHref} className="underline underline-offset-4">
          {t.privacyLink}
        </Link>
        {t.consentEnd}
      </Checkbox>

      {error && (
        <Status tone="error">
          {t.errors[error] ?? t.errors.server}
          {contactEmail && ["not_configured", "server", "network"].includes(error) && (
            <>
              {" "}
              <a href={`mailto:${contactEmail}`} className="underline">
                {contactEmail}
              </a>
            </>
          )}
        </Status>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className={`min-h-12 px-7 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50 ${accentClass}`}
      >
        {state === "sending" ? t.sending : kind === "waitlist" ? t.join : t.send}
      </button>
    </form>
  );
}
