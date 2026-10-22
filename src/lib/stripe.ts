// /src/lib/stripe.ts
// The Stripe client, or null while STRIPE_SECRET_KEY is not set. Keys come
// from environment variables only (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_
// PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET); never print or log them.
//   - The Lab's 48-hour prototype is paid on /pay/prototype (Embedded
//     Checkout) once both keys are set.
//   - Happy Homes Thailand bookings stay email requests unless
//     THAILAND_CARD_PAYMENTS is switched on in config/site.ts.

import "server-only";
import Stripe from "stripe";
import { THAILAND_CARD_PAYMENTS } from "@/config/site";

let client: Stripe | null | undefined;

export function stripe(): Stripe | null {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    client = key ? new Stripe(key) : null;
  }
  return client;
}

/** The prototype's pay page (test keys work there, for trying it out). */
export const prototypePaymentsEnabled = () =>
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/** The "Pay €490 and start" buttons: live keys only, so visitors never land on a test checkout. */
export const prototypeButtonsShown = () =>
  prototypePaymentsEnabled() && Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_"));

/** Card payment in the Thailand booking form. */
export const thailandPaymentsEnabled = () => THAILAND_CARD_PAYMENTS && Boolean(process.env.STRIPE_SECRET_KEY);
