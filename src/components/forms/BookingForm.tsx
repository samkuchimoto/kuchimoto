// /src/components/forms/BookingForm.tsx
// Happy Homes Thailand booking. The total updates as the visitor chooses;
// a fixed-price service goes to Stripe Checkout for card payment, a villa
// is a quote request. While Stripe is not configured every booking is
// sent as a request, and the form says card payment opens soon.

"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { wordSpace, type Locale } from "@/i18n/config";
import { baht } from "@/lib/format";
import { BOOKING_SERVICES, HOME_SIZES, SIZED_SERVICES, TIMES, type BookingService, type HomeSize } from "@/lib/forms/options";
import { MAX_AIRCON_UNITS, bookingTotal } from "@/lib/pricing";
import { Checkbox, Field, Honeypot, Status, inputClass } from "./Fields";

export function BookingForm({
  lang,
  t,
  f,
  paymentsEnabled,
  termsHref,
  privacyHref,
  contactEmail,
}: {
  lang: Locale;
  t: Dictionary["booking"];
  f: Dictionary["forms"];
  paymentsEnabled: boolean;
  termsHref: string;
  privacyHref: string;
  contactEmail: string | null;
}) {
  const [service, setService] = useState<BookingService>("oneOff");
  const [size, setSize] = useState<HomeSize>("studio");
  const [units, setUnits] = useState(1);
  const [minDate, setMinDate] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);

  // Tomorrow, in the visitor's time zone: computed in the browser only.
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const total = bookingTotal(service, size, units);
  const payNow = paymentsEnabled && total !== null;
  const errorFor = (name: string, message = f.errors.required) => (invalid.includes(name) ? message : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);
    setInvalid([]);
    try {
      const response = await fetch("/api/booking", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        url?: string;
        error?: string;
        fields?: string[];
      };
      if (result.ok && result.url) {
        window.location.assign(result.url);
        return;
      }
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

  if (state === "done") return <Status tone="success">{t.requestDone}</Status>;

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot />
      <input type="hidden" name="lang" value={lang} />

      <Field name="service" label={t.service} error={errorFor("service")}>
        {(control) => (
          <select
            {...control}
            value={service}
            onChange={(e) => setService(e.target.value as BookingService)}
            className={inputClass}
          >
            {BOOKING_SERVICES.map((key) => (
              <option key={key} value={key}>
                {t.services[key]}
              </option>
            ))}
          </select>
        )}
      </Field>

      {SIZED_SERVICES.includes(service) && (
        <Field name="size" label={t.size} error={errorFor("size")}>
          {(control) => (
            <select {...control} value={size} onChange={(e) => setSize(e.target.value as HomeSize)} className={inputClass}>
              {HOME_SIZES.map((key) => (
                <option key={key} value={key}>
                  {t.sizes[key]}
                </option>
              ))}
            </select>
          )}
        </Field>
      )}

      {service === "aircon" && (
        <Field name="units" label={t.units} error={errorFor("units")}>
          {(control) => (
            <input
              {...control}
              type="number"
              min={1}
              max={MAX_AIRCON_UNITS}
              value={units}
              onChange={(e) => setUnits(Math.min(MAX_AIRCON_UNITS, Math.max(1, Number(e.target.value) || 1)))}
              className={`${inputClass} max-w-32`}
            />
          )}
        </Field>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="date" label={t.date} hint={t.dateHint} error={errorFor("date")}>
          {(control) => <input {...control} type="date" required min={minDate || undefined} className={inputClass} />}
        </Field>
        <fieldset>
          <legend className="text-sm font-medium">{t.time}</legend>
          <div className="mt-3 flex flex-wrap gap-6">
            {TIMES.map((key) => (
              <label key={key} className="flex min-h-11 items-center gap-2.5 text-sm">
                <input type="radio" name="time" value={key} required className="size-5 accent-[var(--color-ink)]" />
                {t.times[key]}
              </label>
            ))}
          </div>
          {errorFor("time") && <p className="mt-1.5 text-sm font-medium text-danger">{errorFor("time")}</p>}
        </fieldset>
      </div>

      <Field name="address" label={t.address} error={errorFor("address")}>
        {(control) => <textarea {...control} required rows={2} autoComplete="street-address" className={inputClass} />}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label={f.name} error={errorFor("name")}>
          {(control) => <input {...control} required autoComplete="name" className={inputClass} />}
        </Field>
        <Field name="email" label={f.email} error={errorFor("email", f.errors.email)}>
          {(control) => <input {...control} type="email" required autoComplete="email" className={inputClass} />}
        </Field>
      </div>
      <Field name="phone" label={f.phone} error={errorFor("phone")}>
        {(control) => <input {...control} type="tel" required autoComplete="tel" className={`${inputClass} sm:max-w-sm`} />}
      </Field>
      <Field name="notes" label={t.notes} hint={t.notesHint} optional={f.optional}>
        {(control) => <textarea {...control} rows={3} className={inputClass} />}
      </Field>

      <div className="border-y hairline py-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-soft">{t.total}</span>
          <span className="font-display text-2xl" aria-live="polite">
            {total !== null ? baht(total, lang) : "–"}
          </span>
        </div>
        {total === null && <p className="mt-2 text-sm text-ink-soft">{t.quoteNote}</p>}
        {(service === "weekly" || service === "villaCare") && <p className="mt-2 text-sm text-ink-soft">{t.monthlyNote}</p>}
        {!paymentsEnabled && total !== null && <p className="mt-2 text-sm text-ink-soft">{t.paymentSoon}</p>}
      </div>

      <Checkbox name="terms" required error={errorFor("terms")}>
        {t.terms}
        {wordSpace(lang)}
        <Link href={termsHref} className="underline underline-offset-4">
          {t.termsLink}
        </Link>
        {t.termsEnd}
      </Checkbox>
      <p className="pl-8 text-sm text-ink-soft">
        {t.privacyNote}
        {wordSpace(lang)}
        <Link href={privacyHref} className="underline underline-offset-4">
          {f.privacyLink}
        </Link>
        {t.privacyNoteEnd}
      </p>
      {payNow && (
        <Checkbox name="waiver" required error={errorFor("waiver")}>
          {t.waiver}
        </Checkbox>
      )}

      {error && (
        <Status tone="error">
          {f.errors[error] ?? f.errors.server}
          {contactEmail && ["not_configured", "server", "network", "payment"].includes(error) && (
            <>
              {" "}
              <a href={`mailto:${contactEmail}`} className="underline">
                {contactEmail}
              </a>
            </>
          )}
        </Status>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="min-h-12 bg-hh px-7 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {state === "sending" ? f.sending : payNow ? t.pay.replace("{total}", baht(total, lang)) : t.request}
        </button>
        {payNow && <p className="text-xs text-ink-soft">{t.secure}</p>}
      </div>
    </form>
  );
}
