// /src/app/api/checkout/route.ts
// Opens a Stripe Checkout Session for the 48-hour AI prototype, embedded in
// /pay/prototype (components/PrototypeCheckout.tsx), and returns its client
// secret. The price is set here, never taken from the browser. Paid, Stripe
// sends the visitor to /payment-success and calls api/stripe/webhook.

import { COMPANY, LAB } from "@/config/site";
import { isLocale, localizedPath } from "@/i18n/config";
import { fail, rateLimited, sameOrigin } from "@/lib/forms/server";
import { prototypePaymentsEnabled, stripe } from "@/lib/stripe";

/** Where the visitor clicked "Pay €490 and start". */
const SOURCES = ["lab", "studio", "thank-you"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid", 403);
  if (rateLimited(request, "checkout", 10)) return fail("rate_limited", 429);
  const client = stripe();
  if (!client || !prototypePaymentsEnabled()) return fail("not_configured", 503);

  let body: { lang?: unknown; from?: unknown; leadEmail?: unknown; leadId?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400);
  }
  const lang = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "en";
  const source = (SOURCES as readonly unknown[]).includes(body.from) ? (body.from as string) : "direct";
  const leadEmail = typeof body.leadEmail === "string" && EMAIL.test(body.leadEmail) ? body.leadEmail.slice(0, 254) : "";
  const leadId = typeof body.leadId === "string" && /^[0-9a-f-]{36}$/i.test(body.leadId) ? body.leadId : "";
  // sameOrigin() checked that the Origin header is this site.
  const origin = request.headers.get("origin")!;

  try {
    const session = await client.checkout.sessions.create({
      // "embedded" in older Stripe API versions: the form embedded in our page.
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: LAB.prototype * 100,
            product_data: {
              name: "48-hour AI prototype",
              description: "Working prototype on your task in 48 hours. Deducted from the full build if you continue.",
            },
          },
        },
      ],
      customer_creation: "always",
      // Who issues the invoice, then the VAT exemption (franchise en base de TVA).
      invoice_creation: {
        enabled: true,
        invoice_data: { footer: `${COMPANY.invoiceIssuer} · SIRET ${COMPANY.siret} · TVA non applicable, art. 293 B du CGI` },
      },
      billing_address_collection: "required",
      locale: "auto",
      return_url: `${origin}${localizedPath(lang, "/payment-success")}?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        kind: "prototype",
        source,
        lang,
        ...(leadEmail && { lead_email: leadEmail }),
        ...(leadId && { lead_id: leadId }),
      },
    });
    if (!session.client_secret) throw new Error("no client secret");
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    // Stripe's message only, never the request or a key.
    console.error("[checkout] session failed:", error instanceof Error ? error.message : "unknown");
    return fail("server", 502);
  }
}
