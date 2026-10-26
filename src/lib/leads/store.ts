// /src/lib/leads/store.ts
// Where leads are kept: the "leads" table of the kuchimoto-leads Neon
// database (connected in Vercel, which sets DATABASE_URL). Every lead is
// written here before any email goes out, so a failed email never loses
// one. The table creates itself on first use.

import "server-only";
import { randomBytes } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import type { TrackingField } from "./options";

export type LeadFields = {
  email: string;
  need: string;
  business: string;
  source: string;
  page: string;
  lang: string;
  name?: string;
  company?: string;
  message?: string;
  budget?: string;
  timeline?: string;
} & Record<TrackingField, string>;

const url = () => process.env.DATABASE_URL || process.env.POSTGRES_URL;

export function storageConfigured(): boolean {
  return Boolean(url());
}

let ready: Promise<unknown> | null = null;

function db() {
  const sql = neon(url()!);
  ready ??= sql`
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
    )`.catch((error) => {
    ready = null;
    throw error;
  });
  return { sql, ready };
}

const orNull = (value: string | undefined) => (value ? value : null);

/** Step 1: email and need only. Returns the id and the token step 2 must present. */
export async function savePartial(lead: LeadFields): Promise<{ id: string; token: string }> {
  const { sql, ready } = db();
  await ready;
  const token = randomBytes(18).toString("base64url");
  const rows = await sql`
    INSERT INTO leads (token, status, email, need, business, source, page, lang,
      landing_page, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid)
    VALUES (${token}, 'partial', ${lead.email}, ${lead.need}, ${lead.business}, ${lead.source}, ${lead.page}, ${lead.lang},
      ${orNull(lead.landing_page)}, ${orNull(lead.referrer)}, ${orNull(lead.utm_source)}, ${orNull(lead.utm_medium)},
      ${orNull(lead.utm_campaign)}, ${orNull(lead.utm_term)}, ${orNull(lead.utm_content)}, ${orNull(lead.gclid)})
    RETURNING id`;
  return { id: rows[0].id as string, token };
}

/**
 * Step 2: completes the partial lead when its id and token match, or
 * stores a complete lead when they don't (step 1 was not saved, or the
 * visitor came back later). Returns the lead's id.
 */
export async function saveComplete(lead: LeadFields, partial: { id: string; token: string } | null): Promise<string> {
  const { sql, ready } = db();
  await ready;
  if (partial && /^[0-9a-f-]{36}$/i.test(partial.id)) {
    const rows = await sql`
      UPDATE leads SET status = 'complete', updated_at = now(),
        email = ${lead.email}, need = ${lead.need}, business = ${lead.business},
        name = ${orNull(lead.name)}, company = ${orNull(lead.company)}, message = ${orNull(lead.message)},
        budget = ${orNull(lead.budget)}, timeline = ${orNull(lead.timeline)}
      WHERE id = ${partial.id} AND token = ${partial.token} AND status = 'partial'
      RETURNING id`;
    if (rows.length) return rows[0].id as string;
  }
  const token = randomBytes(18).toString("base64url");
  const rows = await sql`
    INSERT INTO leads (token, status, email, need, business, source, page, lang, name, company, message, budget, timeline,
      landing_page, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid)
    VALUES (${token}, 'complete', ${lead.email}, ${lead.need}, ${lead.business}, ${lead.source}, ${lead.page}, ${lead.lang},
      ${orNull(lead.name)}, ${orNull(lead.company)}, ${orNull(lead.message)}, ${orNull(lead.budget)}, ${orNull(lead.timeline)},
      ${orNull(lead.landing_page)}, ${orNull(lead.referrer)}, ${orNull(lead.utm_source)}, ${orNull(lead.utm_medium)},
      ${orNull(lead.utm_campaign)}, ${orNull(lead.utm_term)}, ${orNull(lead.utm_content)}, ${orNull(lead.gclid)})
    RETURNING id`;
  return rows[0].id as string;
}

/** What happened to the emails, kept with the lead. Never throws. */
export async function recordEmails(id: string, notified: boolean, autoreply: string | null): Promise<void> {
  try {
    const { sql, ready } = db();
    await ready;
    await sql`UPDATE leads SET notified = ${notified}, autoreply = ${autoreply}, updated_at = now() WHERE id = ${id}`;
  } catch (error) {
    console.error("[lead] could not record the email outcome", error);
  }
}

// ---------------------------------------------------------------- payments

/** A paid Checkout Session (the 48-hour prototype), from the Stripe webhook. */
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

/**
 * Saves a payment once: Stripe may send the same event again, so the
 * session id is the key. Returns whether its email has gone out already.
 */
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
