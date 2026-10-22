// /src/app/api/stripe/webhook/route.ts
// Stripe calls this when a Checkout payment succeeds. The signature is
// checked with STRIPE_WEBHOOK_SECRET, so only Stripe can trigger it. Point
// the webhook at https://www.kuchimoto.com/api/stripe/webhook (the www
// address: Stripe does not follow the apex's redirect) for the events
// checkout.session.completed and checkout.session.async_payment_succeeded.
//   - The 48-hour prototype (metadata kind "prototype"): saved in the
//     payments table, then emailed as "[Paid €490] {name} · {email}".
//   - A Happy Homes Thailand booking (while THAILAND_CARD_PAYMENTS is on):
//     emailed with its booking details, as before.
// A failed save or email answers 500, so Stripe tries again later.

import type Stripe from "stripe";
import { deliver, sendSubmission } from "@/lib/forms/server";
import { markPaymentNotified, savePayment, storageConfigured } from "@/lib/leads/store";
import { stripe } from "@/lib/stripe";

function address(details: Stripe.Checkout.Session.CustomerDetails | null): string {
  const a = details?.address;
  if (!a) return "";
  return [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.state, a.country].filter(Boolean).join(", ");
}

const id = (value: string | { id: string } | null | undefined) => (typeof value === "string" ? value : (value?.id ?? ""));

async function prototypePaid(session: Stripe.Checkout.Session): Promise<Response> {
  // An asynchronous method (a bank debit) completes the session before the
  // money arrives: wait for checkout.session.async_payment_succeeded.
  if (session.payment_status !== "paid") return new Response("ok");

  const details = session.customer_details;
  const name = details?.name ?? "";
  const email = details?.email ?? "";
  const amount = session.amount_total ?? 0;
  const currency = (session.currency ?? "eur").toUpperCase();
  const meta = session.metadata ?? {};
  const payment = {
    sessionId: session.id,
    kind: "prototype",
    amount,
    currency,
    email,
    name,
    phone: details?.phone ?? "",
    address: address(details),
    source: meta.source ?? "",
    lang: meta.lang ?? "",
    leadEmail: meta.lead_email ?? "",
    leadId: meta.lead_id ?? "",
    customer: id(session.customer),
    paymentIntent: id(session.payment_intent),
    invoice: id(session.invoice),
    livemode: session.livemode,
  };

  let alreadyEmailed = false;
  let stored = "No: DATABASE_URL is not set";
  if (storageConfigured()) {
    try {
      alreadyEmailed = (await savePayment(payment)).notified;
      stored = "Yes";
    } catch (error) {
      console.error("[payment] could not save", error);
      stored = "FAILED: see the Vercel logs";
    }
  }
  if (alreadyEmailed) return new Response("ok");

  const price = currency === "EUR" ? `€${(amount / 100).toLocaleString("en-GB")}` : `${amount / 100} ${currency}`;
  try {
    await sendSubmission({
      subject: `[Paid ${price}] ${name || "No name"} · ${email || "no email"}`,
      replyTo: email || undefined,
      rows: [
        ["Paid", `${price}${session.livemode ? "" : " (Stripe TEST mode, no real money)"}`],
        ["Name", name],
        ["Email", email],
        ["Phone", payment.phone],
        ["Billing address", payment.address],
        ["Source page", payment.source],
        ["Language", payment.lang],
        ["Lead email (from the form)", payment.leadEmail],
        ["Lead id", payment.leadId],
        ["Stripe session", session.id],
        ["Payment", payment.paymentIntent],
        ["Invoice", payment.invoice],
        ["Customer", payment.customer],
        ["Saved in the database", stored],
      ],
    });
  } catch (error) {
    console.error("[payment] email failed", error);
    // Saved or not, Stripe sends the event again and the email is retried.
    return new Response("email failed", { status: 500 });
  }
  if (stored === "Yes") await markPaymentNotified(session.id);
  if (stored.startsWith("FAILED")) return new Response("saved nowhere but the email", { status: 500 });
  return new Response("ok");
}

async function bookingPaid(session: Stripe.Checkout.Session): Promise<Response> {
  if (session.payment_status !== "paid") return new Response("ok");
  const rows = Object.entries(session.metadata ?? {}) as [string, string][];
  const amount = session.amount_total != null ? `${session.amount_total / 100} ${session.currency?.toUpperCase()}` : "";
  const response = await deliver("stripe-webhook", {
    subject: `Réservation payée · ${session.metadata?.Service ?? "Happy Homes Thaïlande"}`,
    replyTo: session.customer_details?.email ?? undefined,
    rows: [...rows, ["Payé", amount], ["Session Stripe", session.id]],
  });
  // A failed email makes Stripe retry later, so the booking is not lost.
  if (!response.ok) return new Response("email failed", { status: 500 });
  return new Response("ok");
}

export async function POST(request: Request) {
  const client = stripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!client || !secret) return new Response("not configured", { status: 503 });

  let event: Stripe.Event;
  try {
    const signature = request.headers.get("stripe-signature") ?? "";
    event = client.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response("invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.metadata?.kind === "prototype") return prototypePaid(session);
    // Happy Homes Thailand bookings are the only baht payments. Anything else
    // on this Stripe account (Ittsui's subscriptions) has its own webhook.
    if (session.currency === "thb") return bookingPaid(session);
    return new Response("ok");
  }
  return new Response("ok");
}
