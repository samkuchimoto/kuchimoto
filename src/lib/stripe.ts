// /src/lib/stripe.ts
// The Stripe client, or null while the company's Stripe keys are not set
// (STRIPE_SECRET_KEY, and STRIPE_WEBHOOK_SECRET for the payment
// confirmation emails). Without them the Thailand booking form still
// works: it sends the request by email and says card payment opens soon.

import "server-only";
import Stripe from "stripe";

let client: Stripe | null | undefined;

export function stripe(): Stripe | null {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    client = key ? new Stripe(key) : null;
  }
  return client;
}

export const paymentsEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);
