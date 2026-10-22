// /src/app/api/booking/route.ts
// Happy Homes Thailand bookings. A fixed-price service opens Stripe
// Checkout for card payment (the amount recomputed here, never taken from
// the browser); the paid booking is emailed by the Stripe webhook
// (api/stripe/webhook). A villa (quoted from photos), or any booking
// while Stripe is not configured, is emailed as a request instead.

import { localizedPath, isLocale } from "@/i18n/config";
import { BOOKING_SERVICES, HOME_SIZES, TIMES, SIZED_SERVICES } from "@/lib/forms/options";
import { deliver, fail, rateLimited, reader, sameOrigin } from "@/lib/forms/server";
import { MAX_AIRCON_UNITS, bookingTotal } from "@/lib/pricing";
import { stripe, thailandPaymentsEnabled } from "@/lib/stripe";

const SERVICE_NAMES: Record<string, string> = {
  oneOff: "Ménage ponctuel",
  weekly: "Formule hebdomadaire (premier mois)",
  deepClean: "Grand ménage d'entrée ou de sortie",
  aircon: "Nettoyage de climatiseurs",
  villaCare: "Villa Care (premier mois)",
  villaQuote: "Ménage de villa (devis)",
};

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const day = new Date(`${value}T00:00:00Z`).getTime();
  const tomorrow = new Date();
  tomorrow.setUTCHours(0, 0, 0, 0);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const inAYear = tomorrow.getTime() + 366 * 86_400_000;
  return day >= tomorrow.getTime() && day <= inAYear;
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid", 403);
  if (rateLimited(request, "booking")) return fail("rate_limited", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("invalid", 400);
  }
  const read = reader(form);
  if (read.bot()) return Response.json({ ok: true, mode: "request" });

  const service = read.oneOf("service", BOOKING_SERVICES);
  const size = read.oneOf("size", HOME_SIZES) ?? "studio";
  const units = Number(read.text("units", 3)) || 1;
  const date = read.text("date", 10);
  const time = read.oneOf("time", TIMES);
  const address = read.text("address", 300);
  const name = read.text("name", 120);
  const email = read.email();
  const phone = read.text("phone", 40);
  const notes = read.text("notes", 480);
  const langValue = read.text("lang", 2);
  const lang = isLocale(langValue) ? langValue : "fr";

  const invalid: string[] = [];
  if (!service) invalid.push("service");
  if (service && SIZED_SERVICES.includes(service) && !read.oneOf("size", HOME_SIZES)) invalid.push("size");
  if (service === "aircon" && (units < 1 || units > MAX_AIRCON_UNITS)) invalid.push("units");
  if (!validDate(date)) invalid.push("date");
  if (!time) invalid.push("time");
  if (!address) invalid.push("address");
  if (!name) invalid.push("name");
  if (!email) invalid.push("email");
  if (phone.replace(/\D/g, "").length < 8) invalid.push("phone");
  if (!read.checked("terms")) invalid.push("terms");

  const total = service ? bookingTotal(service, size, units) : null;
  // Off while THAILAND_CARD_PAYMENTS is false, even with Stripe keys set.
  const client = thailandPaymentsEnabled() ? stripe() : null;
  const payNow = total !== null && client !== null;
  // Paying for a service that may start within 14 days needs the explicit
  // request to start early (Code de la consommation, L221-25).
  if (payNow && !read.checked("waiver")) invalid.push("waiver");
  if (invalid.length) return fail("invalid", 400, invalid);

  const rows: [string, string][] = [
    ["Service", SERVICE_NAMES[service!]],
    ["Logement", service && SIZED_SERVICES.includes(service) ? size : ""],
    ["Climatiseurs", service === "aircon" ? String(units) : ""],
    ["Date", date],
    ["Moment", time!],
    ["Adresse", address],
    ["Nom", name],
    ["E-mail", email!],
    ["Téléphone", phone],
    ["Précisions", notes],
    ["Total", total !== null ? `${total} THB` : "Devis"],
    ["Langue", lang],
  ];

  if (!payNow) {
    return deliver("booking", { subject: `Demande de réservation · ${SERVICE_NAMES[service!]}`, rows, replyTo: email! });
  }

  try {
    const origin = request.headers.get("origin")!;
    const base = `${origin}${localizedPath(lang, "/happy-homes/thailande")}`;
    const session = await client!.checkout.sessions.create({
      mode: "payment",
      locale: lang,
      customer_email: email!,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "thb",
            // Baht has two decimals (satang) in Stripe.
            unit_amount: total! * 100,
            product_data: { name: `Happy Homes Thaïlande · ${SERVICE_NAMES[service!]}` },
          },
        },
      ],
      // Everything needed to carry out the booking, read back by the webhook.
      metadata: Object.fromEntries(rows.filter(([, v]) => v).map(([k, v]) => [k, v.slice(0, 480)])),
      success_url: `${base}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}?paiement=annule#reservation`,
    });
    return Response.json({ ok: true, mode: "payment", url: session.url });
  } catch (error) {
    console.error("[booking] Stripe checkout failed", error);
    return fail("payment", 502);
  }
}
