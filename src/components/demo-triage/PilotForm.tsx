// /src/components/demo-triage/PilotForm.tsx
// The pilot request at the end of /demo-triage: name, email or phone,
// message. Posted to /api/contact (kind "pilot"), which emails it to the
// company, like every other form on the site.

"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Field, Honeypot, Status, inputClass } from "@/components/forms/Fields";

export type PilotStrings = {
  name: string;
  contact: string;
  contactHint: string;
  contactError: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  privacy: string;
  privacyLink: string;
  success: string;
  errors: Record<string, string>;
};

export function PilotForm({ t, privacyHref, contactEmail }: { t: PilotStrings; privacyHref: string; contactEmail: string }) {
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

  if (state === "done") return <Status tone="success">{t.success}</Status>;

  return (
    <form onSubmit={onSubmit} noValidate className="relative max-w-2xl space-y-6">
      <Honeypot />
      <input type="hidden" name="kind" value="pilot" />
      <input type="hidden" name="lang" value="fr" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label={t.name} error={errorFor("name")}>
          {(control) => <input {...control} required autoComplete="name" className={inputClass} />}
        </Field>
        <Field name="contact" label={t.contact} hint={t.contactHint} error={errorFor("contact", t.contactError)}>
          {(control) => <input {...control} required autoComplete="email" className={inputClass} />}
        </Field>
      </div>
      <Field name="message" label={t.message} error={errorFor("message")}>
        {(control) => (
          <textarea {...control} required rows={5} placeholder={t.messagePlaceholder} className={inputClass} />
        )}
      </Field>

      <p className="text-sm text-ink-soft">
        {t.privacy}{" "}
        <Link href={privacyHref} className="underline underline-offset-4">
          {t.privacyLink}
        </Link>
        .
      </p>

      {error && (
        <Status tone="error">
          {t.errors[error] ?? t.errors.server}{" "}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
            {contactEmail}
          </a>
        </Status>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex min-h-12 items-center justify-center bg-lab px-6 py-3 text-sm font-medium tracking-wide text-paper hover:opacity-90 disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
