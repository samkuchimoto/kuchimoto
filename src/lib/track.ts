// /src/lib/track.ts
// The events the site sends through gtag (components/Analytics.tsx).
// Every id comes from an environment variable; while one is missing, its
// event is simply not sent. Browser only.
//   lead_step1     GA4 only, when step 1 of the lead form is sent
//   generate_lead  GA4, plus the Google Ads lead conversion, once per lead,
//                  when the thank-you page loads (never on a button click)
//   book_call      GA4, plus the Google Ads call conversion, when Cal.com
//                  reports a booking
//   purchase       GA4 only, once per Stripe session, on /payment-success

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;
const CALL_LABEL = process.env.NEXT_PUBLIC_GADS_CALL_LABEL;

type Gtag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  const send = (window as unknown as { gtag?: Gtag }).gtag;
  if (send) send(...args);
}

export function trackLeadStep1(params: { need: string; source: string }) {
  if (GA4) gtag("event", "lead_step1", { send_to: GA4, ...params });
}

export function trackLead(params: { id: string; need: string; source: string }) {
  if (GA4) gtag("event", "generate_lead", { send_to: GA4, need: params.need, source: params.source });
  // Value 1 EUR as in the "Kuchimoto Lead" conversion action's snippet;
  // transaction_id lets Google Ads drop a duplicate of the same lead.
  if (ADS && LEAD_LABEL) {
    gtag("event", "conversion", { send_to: `${ADS}/${LEAD_LABEL}`, value: 1.0, currency: "EUR", transaction_id: params.id });
  }
}

export function trackCall() {
  if (GA4) gtag("event", "book_call", { send_to: GA4 });
  if (ADS && CALL_LABEL) gtag("event", "conversion", { send_to: `${ADS}/${CALL_LABEL}` });
}

/** The 48-hour prototype paid: transaction_id is the Stripe session id, so GA4 counts it once. */
export function trackPurchase(params: { id: string; value: number }) {
  if (!GA4) return;
  gtag("event", "purchase", {
    send_to: GA4,
    transaction_id: params.id,
    value: params.value,
    currency: "EUR",
    items: [{ item_id: "prototype-48h", item_name: "48-hour AI prototype", price: params.value, quantity: 1 }],
  });
}
