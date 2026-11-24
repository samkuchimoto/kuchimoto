// Where a visitor came from, kept for the session and sent with an
// inquiry. VAs share links like kuchimoto.com/?ref=anna in Facebook groups;
// the ref, the UTM tags and the referrer tell which share brought the lead.
// Stays in the visitor's browser (sessionStorage) until they send a form.

export const ATTRIBUTION_FIELDS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "referrer",
  "landing_page",
] as const;

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];
export type Attribution = Partial<Record<AttributionField, string>>;

const KEY = "kuchimoto:attribution";

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {};
    for (const field of ATTRIBUTION_FIELDS) {
      const value = params.get(field);
      if (value) data[field] = value.slice(0, 200);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      data.referrer = document.referrer.slice(0, 500);
    }
    data.landing_page = (window.location.pathname + window.location.search).slice(0, 500);
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage blocked: the inquiry goes without it.
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
