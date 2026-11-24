import "server-only";
import { randomBytes } from "node:crypto";
import { neon } from "@neondatabase/serverless";

// The kuchimoto-leads Neon database (DATABASE_URL, set by the Vercel
// integration). Every inquiry is written here before any email goes out,
// so a failed email never loses one. The tables are the ones the previous
// site created; the two attribution columns are added if missing.

const url = () => process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const storageConfigured = () => Boolean(url());

let leadsReady: Promise<unknown> | null = null;

function leadsDb() {
  const sql = neon(url()!);
  leadsReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        token text NOT NULL,
        status text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        email text NOT NULL,
        need text NOT NULL,
        business text NOT NULL,
        source text NOT NULL,
        page text NOT NULL DEFAULT '',
        lang text NOT NULL DEFAULT '',
        name text, company text, message text, budget text, timeline text,
        landing_page text, referrer text,
        utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
        gclid text,
        notified boolean NOT NULL DEFAULT false,
        autoreply text
      )`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS ref text`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS fbclid text`;
  })().catch((error) => {
    leadsReady = null;
    throw error;
  });
  return { sql, ready: leadsReady };
}

export type LeadRow = {
  email: string;
  name: string;
  company: string;
  need: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
  page: string;
  attribution: Record<string, string>;
};

const orNull = (value: string | undefined) => (value ? value.slice(0, 500) : null);

export async function saveLead(lead: LeadRow): Promise<string> {
  const { sql, ready } = leadsDb();
  await ready;
  const a = lead.attribution;
  const token = randomBytes(18).toString("base64url");
  const rows = await sql`
    INSERT INTO leads (token, status, email, need, business, source, page, lang, name, company, message, budget, timeline,
      landing_page, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, ref, fbclid)
    VALUES (${token}, 'complete', ${lead.email}, ${lead.need}, 'studio', ${lead.source}, ${lead.page}, 'en',
      ${orNull(lead.name)}, ${orNull(lead.company)}, ${lead.message.slice(0, 5000)}, ${orNull(lead.budget)}, ${orNull(lead.timeline)},
      ${orNull(a.landing_page)}, ${orNull(a.referrer)}, ${orNull(a.utm_source)}, ${orNull(a.utm_medium)},
      ${orNull(a.utm_campaign)}, ${orNull(a.utm_term)}, ${orNull(a.utm_content)}, ${orNull(a.gclid)},
      ${orNull(a.ref)}, ${orNull(a.fbclid)})
    RETURNING id`;
  return rows[0].id as string;
}

/** What happened to the emails, kept with the lead. Never throws. */
export async function recordEmails(id: string, notified: boolean, autoreply: string): Promise<void> {
  try {
    const { sql, ready } = leadsDb();
    await ready;
    await sql`UPDATE leads SET notified = ${notified}, autoreply = ${autoreply}, updated_at = now() WHERE id = ${id}`;
  } catch (error) {
    console.error("[inquire] could not record the email outcome", error);
  }
}

// ---------------------------------------------------------------- payments

export type PaymentFields = {
  sessionId: string;
  kind: string;
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  source: string;
  lang: string;
  leadEmail: string;
  leadId: string;
  customer: string;
  paymentIntent: string;
  invoice: string;
  livemode: boolean;
};

let paymentsReady: Promise<unknown> | null = null;

function paymentsDb() {
  const sql = neon(url()!);
  paymentsReady ??= sql`
    CREATE TABLE IF NOT EXISTS payments (
      session_id text PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      kind text NOT NULL,
      amount integer NOT NULL,
      currency text NOT NULL,
      email text, name text, phone text, address text,
      source text, lang text, lead_email text, lead_id text,
      customer text, payment_intent text, invoice text,
      livemode boolean NOT NULL,
      notified boolean NOT NULL DEFAULT false
    )`.catch((error) => {
    paymentsReady = null;
    throw error;
  });
  return { sql, ready: paymentsReady };
}

/** Saves a payment once (Stripe may resend an event). Returns whether its email went out already. */
export async function savePayment(p: PaymentFields): Promise<{ notified: boolean }> {
  const { sql, ready } = paymentsDb();
  await ready;
  await sql`
    INSERT INTO payments (session_id, kind, amount, currency, email, name, phone, address, source, lang,
      lead_email, lead_id, customer, payment_intent, invoice, livemode)
    VALUES (${p.sessionId}, ${p.kind}, ${p.amount}, ${p.currency}, ${orNull(p.email)}, ${orNull(p.name)}, ${orNull(p.phone)},
      ${orNull(p.address)}, ${orNull(p.source)}, ${orNull(p.lang)}, ${orNull(p.leadEmail)}, ${orNull(p.leadId)},
      ${orNull(p.customer)}, ${orNull(p.paymentIntent)}, ${orNull(p.invoice)}, ${p.livemode})
    ON CONFLICT (session_id) DO NOTHING`;
  const rows = await sql`SELECT notified FROM payments WHERE session_id = ${p.sessionId}`;
  return { notified: Boolean(rows[0]?.notified) };
}

export async function markPaymentNotified(sessionId: string): Promise<void> {
  try {
    const { sql, ready } = paymentsDb();
    await ready;
    await sql`UPDATE payments SET notified = true WHERE session_id = ${sessionId}`;
  } catch (error) {
    console.error("[payment] could not record the email", error);
  }
}
