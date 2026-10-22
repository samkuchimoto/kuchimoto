// /src/components/PrototypeCheckout.tsx
// The browser side of payments: the Stripe Embedded Checkout form on
// /pay/prototype, opened by /api/checkout with where the visitor came from
// (?from=) and the email of the lead they just sent, if any; and the GA4
// purchase event on /payment-success, fired once per Stripe session.

"use client";

import { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import type { Locale } from "@/i18n/config";
import { STORAGE } from "@/lib/leads/options";
import { trackPurchase } from "@/lib/track";
import { Status } from "@/components/forms/Fields";

const KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// Loaded once per page, and only in the browser.
const stripePromise = KEY ? loadStripe(KEY) : null;

export function PrototypeCheckout({ lang, errorText, loadingText }: { lang: Locale; errorText: string; loadingText: string }) {
  const [failed, setFailed] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    let lead: { email?: string; id?: string } | null = null;
    try {
      lead = JSON.parse(sessionStorage.getItem(STORAGE.pending) ?? "null");
    } catch {
      // Private browsing: no lead to attach.
    }
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang,
        from: new URLSearchParams(window.location.search).get("from"),
        leadEmail: lead?.email,
        leadId: lead?.id,
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { clientSecret?: string };
    if (!data.clientSecret) {
      setFailed(true);
      throw new Error("checkout unavailable");
    }
    return data.clientSecret;
  }, [lang]);

  if (!stripePromise || failed) return <Status tone="error">{errorText}</Status>;
  return (
    <div className="min-h-[32rem]">
      <p className="sr-only" aria-live="polite">
        {loadingText}
      </p>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

/** GA4 purchase for a paid session, once per session id in this browser. Renders nothing. */
export function PurchaseConversion({ sessionId, value }: { sessionId: string; value: number }) {
  useEffect(() => {
    const key = "kuchimoto-purchases";
    try {
      const fired = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      if (fired.includes(sessionId)) return;
      localStorage.setItem(key, JSON.stringify([...fired, sessionId].slice(-20)));
    } catch {
      return;
    }
    trackPurchase({ id: sessionId, value });
  }, [sessionId, value]);
  return null;
}
