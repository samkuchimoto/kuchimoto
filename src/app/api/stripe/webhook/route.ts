// /src/app/api/stripe/webhook/route.ts
// Stripe calls this when a Checkout payment succeeds; it emails the paid
// booking (read from the session's metadata) to the company. The
// signature is checked with STRIPE_WEBHOOK_SECRET, so only Stripe can
// trigger it. Point the webhook at https://kuchimoto.com/api/stripe/webhook
// for the event checkout.session.completed.

import type Stripe from "stripe";
import { deliver } from "@/lib/forms/server";
import { stripe } from "@/lib/stripe";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      const rows = Object.entries(session.metadata ?? {}) as [string, string][];
      const amount = session.amount_total != null ? `${session.amount_total / 100} ${session.currency?.toUpperCase()}` : "";
      const response = await deliver("stripe-webhook", {
        subject: `Réservation payée · ${session.metadata?.Service ?? "Happy Homes Thaïlande"}`,
        replyTo: session.customer_details?.email ?? undefined,
        rows: [...rows, ["Payé", amount], ["Session Stripe", session.id]],
      });
      // A failed email makes Stripe retry later, so the booking is not lost.
      if (!response.ok) return new Response("email failed", { status: 500 });
    }
  }
  return new Response("ok");
}
