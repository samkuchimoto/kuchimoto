import "server-only";
import Stripe from "stripe";

// The Stripe client, or null while STRIPE_SECRET_KEY is not set. Keys come
// from environment variables only; never print or log them. The site no
// longer takes payments itself; the client stays for the webhook, which
// still receives this Stripe account's checkout events.

let client: Stripe | null | undefined;

export function stripe(): Stripe | null {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    client = key ? new Stripe(key) : null;
  }
  return client;
}
