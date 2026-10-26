// /src/lib/leads/emails.ts
// The two emails a lead triggers: the notification to Samuel (CONTACT_TO_EMAIL,
// samuel@kuchimoto.com), with every field, the UTM data and the gclid; and,
// once the request is complete, the auto-reply to the visitor in their
// language, from samuel@kuchimoto.com (LEAD_REPLY_FROM overrides it).
// Never the em dash, nor the French closing formula Samuel bans.

import "server-only";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { EmailNotConfiguredError, escapeHtml, sendEmail, sendSubmission } from "@/lib/forms/server";
import { BUDGET_LABEL, NEED_LABEL, TIMELINE_LABEL, TRACKING_FIELDS, type Budget, type Need, type Timeline } from "./options";
import type { LeadFields } from "./store";

const BRACKET: Record<string, string> = { lab: "Lab", studio: "Studio", demo: "Demo" };

/** [Lab], [Studio] or [Demo]: the demo first, then the business the lead is about. */
function bracket(lead: LeadFields): string {
  return BRACKET[lead.source === "demo" ? "demo" : lead.business] ?? "Lab";
}

export async function notify(
  lead: LeadFields,
  { complete, id, stored, autoreply }: { complete: boolean; id: string | null; stored: string; autoreply?: string },
): Promise<void> {
  const need = NEED_LABEL[lead.need as Need] ?? lead.need;
  const subject = complete
    ? `[Lead][${bracket(lead)}] ${need} · ${TIMELINE_LABEL[lead.timeline as Timeline] ?? "No timeline"} · ${lead.company || "No company"}`
    : `[Partial lead][${bracket(lead)}] ${need} · ${lead.email}`;
  await sendSubmission({
    subject,
    replyTo: lead.email,
    rows: [
      ["Status", complete ? "Complete (step 2 sent)" : "Partial (step 1 only: email, phone and need)"],
      ["Email", lead.email],
      ["Phone", lead.phone ?? ""],
      ["Need", need],
      ["Name", lead.name ?? ""],
      ["Company or website", lead.company ?? ""],
      ["What to build or automate", lead.message ?? ""],
      ["Budget", BUDGET_LABEL[lead.budget as Budget] ?? ""],
      ["Timeline", TIMELINE_LABEL[lead.timeline as Timeline] ?? ""],
      ["Business", lead.business],
      ["Source", lead.source],
      ["Page", lead.page],
      ["Language", lead.lang],
      ...TRACKING_FIELDS.map((field): [string, string] => [field, lead[field] || ""]),
      ["Lead id", id ?? ""],
      ["Saved in the database", stored],
      ["Auto-reply", autoreply ?? ""],
    ],
  });
}

type Reply = { subject: string; lines: (name: string, need: string, booking: string | null) => string[] };

const SIGNATURE = {
  fr: ["Samuel Louissaint", "Fondateur, Kuchimoto Lab", "kuchimoto.com | samuel@kuchimoto.com"],
  en: ["Samuel Louissaint", "Founder, Kuchimoto Lab", "kuchimoto.com | samuel@kuchimoto.com"],
  ja: ["Samuel Louissaint", "Kuchimoto Lab 創業者", "kuchimoto.com | samuel@kuchimoto.com"],
};

const REPLY: Record<Locale, Reply> = {
  en: {
    subject: "Your Kuchimoto request: next steps",
    lines: (name, need, booking) => [
      `Hi ${name},`,
      `Thanks for your request about ${need}. You'll get a fixed price and scope from me within 24 hours.`,
      ...(booking ? [`To go faster, book 15 minutes here: ${booking}`] : []),
      "If you have a document, screenshot or example, reply to this email with it.",
    ],
  },
  fr: {
    subject: "Votre demande Kuchimoto : les prochaines étapes",
    lines: (name, need, booking) => [
      `Bonjour ${name},`,
      `Merci pour votre demande concernant ${need}. Vous recevrez de ma part un prix fixe et un périmètre sous 24 heures.`,
      ...(booking ? [`Pour aller plus vite, réservez 15 minutes ici : ${booking}`] : []),
      "Si vous avez un document, une capture d'écran ou un exemple, répondez à cet e-mail en le joignant.",
    ],
  },
  ja: {
    subject: "Kuchimotoへのご依頼：今後の流れ",
    lines: (name, need, booking) => [
      `${name}様`,
      `「${need}」についてのご依頼ありがとうございます。24時間以内に、固定価格と作業範囲を私からお送りします。`,
      ...(booking ? [`お急ぎの場合は、こちらから15分の通話をご予約ください：${booking}`] : []),
      "資料、スクリーンショット、参考例などがあれば、このメールに返信して添付してください。",
    ],
  },
};

/** "AI agent or automation" becomes "AI agent…", "Web or mobile MVP" becomes "web or mobile MVP". */
const inSentence = (label: string) => (/^\p{Lu}\p{Ll}/u.test(label) ? label[0].toLowerCase() + label.slice(1) : label);

/** The auto-reply to the visitor. Returns what happened, for the notification and the database. */
export async function autoReply(lead: LeadFields): Promise<string> {
  const lang: Locale = isLocale(lead.lang) ? lead.lang : "en";
  const reply = REPLY[lang];
  const need = getDictionary(lang).lead.needs[lead.need as Need] ?? NEED_LABEL[lead.need as Need] ?? lead.need;
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL || null;
  const paragraphs = reply.lines(lead.name || "", lang === "ja" ? need : inSentence(need), booking);
  const signature = SIGNATURE[lang];
  const html = `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#1b1a19">${paragraphs
    .map((p) => `<p>${escapeHtml(p).replace(/(https?:\/\/\S+)/g, '<a href="$1">$1</a>')}</p>`)
    .join("")}<p>${signature.map(escapeHtml).join("<br>")}</p></div>`;
  try {
    await sendEmail({
      from: process.env.LEAD_REPLY_FROM || "Samuel Louissaint <samuel@kuchimoto.com>",
      to: [lead.email],
      subject: reply.subject,
      text: [...paragraphs, signature.join("\n")].join("\n\n"),
      html,
      replyTo: "samuel@kuchimoto.com",
    });
    return `Sent (${lang})`;
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) return "NOT sent: RESEND_API_KEY is not set";
    console.error("[lead] auto-reply failed", error);
    return `NOT sent: ${error instanceof Error ? error.message : "error"}`.slice(0, 240);
  }
}
