// /src/lib/leads/attribution.ts
// Where a visitor came from, read once per visit from the landing URL and
// kept in sessionStorage until they send the lead form: the landing page,
// the referring site, the UTM tags and the gclid of a Google Ads click.
// The gclid is kept only once ads consent is granted; the landing page is
// stored without it. Browser only.

import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { STORAGE, TRACKING_FIELDS, type TrackingField } from "./options";

export type Attribution = Partial<Record<TrackingField, string>>;

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
/** Google's click ids, never written into the stored landing page. */
const CLICK_IDS = ["gclid", "gbraid", "wbraid"];

export function readAttribution(): Attribution {
  try {
    const value = JSON.parse(sessionStorage.getItem(STORAGE.attribution) ?? "{}") as Attribution;
    return Object.fromEntries(TRACKING_FIELDS.filter((field) => value[field]).map((field) => [field, value[field]!]));
  } catch {
    return {};
  }
}

function adsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

/** Run on every page view; keeps the first landing page and the latest campaign tags of the visit. */
export function captureAttribution(): void {
  try {
    const url = new URL(window.location.href);
    const next: Attribution = readAttribution();
    if (!next.landing_page) {
      const landing = new URL(url);
      CLICK_IDS.forEach((key) => landing.searchParams.delete(key));
      next.landing_page = `${landing.pathname}${landing.search}`.slice(0, 500);
      const referrer = document.referrer ? new URL(document.referrer) : null;
      if (referrer && referrer.host !== url.host) next.referrer = document.referrer.slice(0, 500);
    }
    // A new campaign click in the same visit replaces the tags of the last one.
    if (UTM.some((key) => url.searchParams.get(key))) {
      UTM.forEach((key) => {
        const value = url.searchParams.get(key);
        if (value) next[key] = value.slice(0, 200);
        else delete next[key];
      });
    }
    const gclid = url.searchParams.get("gclid");
    if (gclid && adsConsent()) next.gclid = gclid.slice(0, 200);
    sessionStorage.setItem(STORAGE.attribution, JSON.stringify(next));
  } catch {
    // Storage blocked (private browsing): the lead is sent without attribution.
  }
}
