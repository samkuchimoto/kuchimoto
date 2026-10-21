// /src/app/api/lead/route.ts
// The lead form (components/forms/LeadForm.tsx) on Lab, Studio, the triage
// demo and Contact. Step 1 (email and need) is saved as a "partial" lead
// and notified as "[Partial lead]"; step 2 completes it, notifies it as
// "[Lead]" and sends the visitor the auto-reply. The lead is always saved
// before any email, so a failed email never loses it; the request counts
// as received when it reached the database or the inbox.

import { locales } from "@/i18n/config";
import { EmailNotConfiguredError, fail, rateLimited, reader, sameOrigin } from "@/lib/forms/server";
import {
  BUDGETS,
  LEAD_BUSINESSES,
  LEAD_SOURCES,
  MIN_FILL_MS,
  NEEDS,
  TIMELINES,
  TRACKING_FIELDS,
  type TrackingField,
} from "@/lib/leads/options";
import { recordEmails, saveComplete, savePartial, storageConfigured, type LeadFields } from "@/lib/leads/store";
import { autoReply, notify } from "@/lib/leads/emails";

/** Sends the notification; in development without Resend, logs it instead. */
async function notified(send: () => Promise<void>, lead: LeadFields): Promise<boolean> {
  try {
    await send();
    return true;
  } catch (error) {
    if (error instanceof EmailNotConfiguredError && process.env.NODE_ENV !== "production") {
      console.info("[lead] email not configured; lead:\n", lead);
      return true;
    }
    console.error("[lead] notification failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid", 403);
  if (rateLimited(request, "lead", 12)) return fail("rate_limited", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("invalid", 400);
  }
  const read = reader(form);
  // A bot filled the hidden field, or sent the form faster than a person
  // could: answer as usual, keep nothing. A person who was that quick on
  // step 1 still gets through on step 2, which repeats every field.
  if (read.bot() || !(Number(read.text("elapsed", 12)) >= MIN_FILL_MS)) return Response.json({ ok: true, id: null });

  const step = read.text("step", 1) === "2" ? 2 : 1;
  const source = read.oneOf("source", LEAD_SOURCES) ?? "lab";
  const tracking = Object.fromEntries(
    TRACKING_FIELDS.map((field) => [field, read.text(field, field === "landing_page" || field === "referrer" ? 500 : 200)]),
  ) as Record<TrackingField, string>;
  const lead: LeadFields = {
    email: read.email() ?? "",
    need: read.oneOf("need", NEEDS) ?? "",
    business: read.oneOf("business", LEAD_BUSINESSES) ?? (source === "studio" ? "studio" : "lab"),
    source,
    page: read.text("page", 200),
    lang: read.oneOf("lang", locales) ?? "en",
    ...tracking,
    ...(step === 2 && {
      name: read.text("name", 120),
      company: read.text("company", 200),
      message: read.text("message", 4000),
      budget: read.oneOf("budget", BUDGETS) ?? "",
      timeline: read.oneOf("timeline", TIMELINES) ?? "",
    }),
  };

  const invalid: string[] = [];
  if (!lead.email) invalid.push("email");
  if (!lead.need) invalid.push("need");
  if (step === 2 && !lead.name) invalid.push("name");
  if (invalid.length) return fail("invalid", 400, invalid);

  if (step === 1) {
    let saved: { id: string; token: string } | null = null;
    let stored = "No: DATABASE_URL is not set";
    if (storageConfigured()) {
      try {
        saved = await savePartial(lead);
        stored = "Yes";
      } catch (error) {
        console.error("[lead] could not save the partial lead", error);
        stored = "FAILED: see the Vercel logs";
      }
    }
    const sent = await notified(() => notify(lead, { complete: false, id: saved?.id ?? null, stored }), lead);
    if (saved) await recordEmails(saved.id, sent, null);
    if (!saved && !sent) return fail("server", 502);
    return Response.json({ ok: true, id: saved?.id ?? null, token: saved?.token ?? null });
  }

  const partialId = read.text("id", 40);
  const partialToken = read.text("token", 40);
  let id: string | null = null;
  let stored = "No: DATABASE_URL is not set";
  if (storageConfigured()) {
    try {
      id = await saveComplete(lead, partialId && partialToken ? { id: partialId, token: partialToken } : null);
      stored = "Yes";
    } catch (error) {
      console.error("[lead] could not save the lead", error);
      stored = "FAILED: see the Vercel logs";
    }
  }
  const reply = await autoReply(lead);
  const sent = await notified(() => notify(lead, { complete: true, id, stored, autoreply: reply }), lead);
  if (id) await recordEmails(id, sent, reply);
  if (!id && !sent) return fail("server", 502);
  return Response.json({ ok: true, id });
}
