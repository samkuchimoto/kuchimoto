// The scope inquiry (components/contact/InquiryForm.tsx). Order of work:
//   1. drop bots (honeypot, sent faster than a person could) and floods;
//   2. validate with Zod;
//   3. save the lead in Neon, before any email, so nothing is lost;
//   4. email it to CONTACT_TO_EMAIL, then send the visitor the reply.
// The request counts as received when it reached the database or the
// inbox; only when both fail does the visitor see an error (with the
// email address to write to instead).

import { InquirySchema, MIN_FILL_MS, type Inquiry } from "@/lib/inquiry";
import { recordEmails, saveLead, storageConfigured } from "@/lib/server/db";
import { rateLimited, sameOrigin } from "@/lib/server/guard";
import { EmailNotConfiguredError, escapeHtml, sendEmail, sendSubmission } from "@/lib/server/mail";
import { TRACK_OPTIONS } from "@/data/site";

const fail = (error: string, status: number, fields?: Record<string, string>) =>
  Response.json({ ok: false, error, fields }, { status });

const trackLabel = (id: string) => TRACK_OPTIONS.find((t) => t.id === id)?.label ?? id;

async function notify(inquiry: Inquiry, id: string | null, stored: string): Promise<boolean> {
  const a = inquiry.attribution;
  try {
    await sendSubmission({
      subject: `[Inquiry][${inquiry.budget}] ${trackLabel(inquiry.track)} · ${inquiry.company || inquiry.name}`,
      replyTo: inquiry.email,
      rows: [
        ["Name", inquiry.name],
        ["Email", inquiry.email],
        ["Company or website", inquiry.company],
        ["Track", trackLabel(inquiry.track)],
        ["Budget", inquiry.budget],
        ["Timeline", inquiry.timeline ?? ""],
        ["Scope", inquiry.scope],
        ["Form", inquiry.source],
        ["Page", inquiry.page],
        ["Shared by (ref)", a.ref ?? ""],
        ["utm_source", a.utm_source ?? ""],
        ["utm_medium", a.utm_medium ?? ""],
        ["utm_campaign", a.utm_campaign ?? ""],
        ["Referrer", a.referrer ?? ""],
        ["Landing page", a.landing_page ?? ""],
        ["Lead id", id ?? ""],
        ["Saved in the database", stored],
      ],
    });
    return true;
  } catch (error) {
    if (error instanceof EmailNotConfiguredError && process.env.NODE_ENV !== "production") {
      console.info("[inquire] email not configured; inquiry:\n", inquiry);
      return true;
    }
    console.error("[inquire] notification failed", error);
    return false;
  }
}

/** The reply to the visitor, from Samuel. Returns what happened, for the record. */
async function autoReply(inquiry: Inquiry): Promise<string> {
  const first = inquiry.name.split(/\s+/)[0] ?? "";
  const paragraphs = [
    `Hi ${first},`,
    `Thanks for your request about ${trackLabel(inquiry.track).toLowerCase()}. You'll get a fixed price and scope from me within 24 hours.`,
    "If you have a document, screenshot or example, reply to this email with it.",
  ];
  const signature = ["Samuel Louissaint", "Founder, Kuchimoto LLC", "kuchimoto.com | samuel@kuchimoto.com"];
  const html = `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#111113">${paragraphs
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("")}<p>${signature.map(escapeHtml).join("<br>")}</p></div>`;
  try {
    await sendEmail({
      from: process.env.LEAD_REPLY_FROM || "Samuel Louissaint <samuel@kuchimoto.com>",
      to: [inquiry.email],
      subject: "Your Kuchimoto request: next steps",
      text: [...paragraphs, signature.join("\n")].join("\n\n"),
      html,
      replyTo: "samuel@kuchimoto.com",
    });
    return "Sent";
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) return "NOT sent: RESEND_API_KEY is not set";
    console.error("[inquire] auto-reply failed", error);
    return `NOT sent: ${error instanceof Error ? error.message : "error"}`.slice(0, 240);
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("forbidden", 403);
  if (rateLimited(request, "inquire")) return fail("rate_limited", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    return fail("invalid", 422, fields);
  }
  const inquiry = parsed.data;

  // A bot: answer as usual, keep nothing.
  if (inquiry.website.trim() !== "" || inquiry.elapsed < MIN_FILL_MS) return Response.json({ ok: true });

  let id: string | null = null;
  let stored = "No: DATABASE_URL is not set";
  if (storageConfigured()) {
    try {
      id = await saveLead({
        email: inquiry.email,
        name: inquiry.name,
        company: inquiry.company,
        need: inquiry.track,
        budget: inquiry.budget,
        timeline: inquiry.timeline ?? "",
        message: inquiry.scope,
        source: inquiry.source,
        page: inquiry.page,
        attribution: inquiry.attribution,
      });
      stored = "Yes";
    } catch (error) {
      console.error("[inquire] could not save", error);
      stored = "FAILED: see the Vercel logs";
    }
  }

  const notified = await notify(inquiry, id, stored);
  if (!id && !notified) return fail("server", 502);

  const reply = await autoReply(inquiry);
  if (id) await recordEmails(id, notified, reply);

  return Response.json({ ok: true });
}
