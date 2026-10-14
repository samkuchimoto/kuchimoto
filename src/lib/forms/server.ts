// /src/lib/forms/server.ts
// What every form endpoint shares: read the form, drop bots, limit the
// rate, check the sender is this site, and email the submission to the
// company (Resend, configured by environment variables). Unconfigured,
// the endpoint says so (503) and the form offers the email address
// instead of pretending the message was sent.

import "server-only";

export const HONEYPOT = "website";

export type FormError = "invalid" | "rate_limited" | "not_configured" | "server" | "payment";

export const fail = (error: FormError, status: number, fields?: string[]) =>
  Response.json({ ok: false, error, fields }, { status });

// ---- rate limit (per server instance; slows a flood, does not stop one alone)
const hits = new Map<string, number[]>();

export function rateLimited(request: Request, name: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "?";
  const key = `${name}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

/** A browser posting from this site sends an Origin for this host; a script elsewhere does not. */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return Boolean(origin) && new URL(origin!).host === host;
  } catch {
    return false;
  }
}

// ---- reading fields
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Free text that may land in a spreadsheet: a leading = + - @ would run as a formula. */
function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "")
    .trim()
    .replace(/^[=+@-]+/, "")
    .trim()
    .slice(0, max);
}

export function reader(form: FormData) {
  return {
    text: (name: string, max = 200) => clean(form.get(name), max),
    oneOf<T extends string>(name: string, options: readonly T[]): T | null {
      const value = clean(form.get(name), 60);
      return (options as readonly string[]).includes(value) ? (value as T) : null;
    },
    many<T extends string>(name: string, options: readonly T[]): T[] {
      return form
        .getAll(name)
        .map((v) => String(v))
        .filter((v): v is T => (options as readonly string[]).includes(v));
    },
    /** Every checked value of a checkbox group, cleaned, comma-separated. */
    list: (name: string, max: number) =>
      form
        .getAll(name)
        .map((v) => clean(v, 80))
        .filter(Boolean)
        .join(", ")
        .slice(0, max),
    email: (name = "email") => {
      const value = String(form.get(name) ?? "").trim().slice(0, 254);
      return EMAIL.test(value) && !/^[=+@-]/.test(value) ? value : null;
    },
    checked: (name: string) => form.get(name) === "yes",
    bot: () => String(form.get(HONEYPOT) ?? "").trim() !== "",
  };
}

// ---- email
export class EmailNotConfiguredError extends Error {}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendSubmission({
  subject,
  rows,
  replyTo,
}: {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) throw new EmailNotConfiguredError();

  const filled = rows.filter(([, value]) => value.trim() !== "");
  const text = [subject, "", ...filled.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#57534e;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "KUCHIMOTO <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      subject,
      text,
      html,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}

/** Sends, and turns the outcome into the response the forms expect. */
export async function deliver(name: string, message: Parameters<typeof sendSubmission>[0]): Promise<Response> {
  try {
    await sendSubmission(message);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      if (process.env.NODE_ENV !== "production") {
        console.info(`[${name}] email not configured; submission:\n`, message.rows);
        return Response.json({ ok: true });
      }
      console.error(`[${name}] RESEND_API_KEY or CONTACT_TO_EMAIL missing`);
      return fail("not_configured", 503);
    }
    console.error(`[${name}] failed`, error);
    return fail("server", 502);
  }
}
