import "server-only";

// Email through Resend's HTTP API (no SDK). Configured by RESEND_API_KEY,
// CONTACT_TO_EMAIL (where submissions arrive, comma-separated) and
// CONTACT_FROM_EMAIL (a sender on a domain verified in Resend).

export class EmailNotConfiguredError extends Error {}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(message: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailNotConfiguredError();
  const { replyTo, ...rest } = message;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, ...(replyTo && { reply_to: replyTo }) }),
  });
  if (!response.ok) {
    // Resend's reason ("domain is not verified"), never the key.
    const reason = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status} ${reason.slice(0, 200)}`);
  }
}

/** A submission to the company inbox, as a table of fields. */
export async function sendSubmission({
  subject,
  rows,
  replyTo,
}: {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
}): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) throw new EmailNotConfiguredError();
  const filled = rows.filter(([, value]) => value.trim() !== "");
  const text = [subject, "", ...filled.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5c5b57;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
  await sendEmail({
    from: process.env.CONTACT_FROM_EMAIL || "KUCHIMOTO <onboarding@resend.dev>",
    to: to.split(",").map((a) => a.trim()),
    subject,
    text,
    html,
    replyTo,
  });
}
