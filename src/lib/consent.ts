// /src/lib/consent.ts
// The names the cookie banner (components/CookieBanner.tsx) and the Google
// tag (components/Analytics.tsx) share. In a plain module, not the banner's
// client file, so the server-rendered tag can read them too.

/** localStorage key holding "granted" or "denied". */
export const CONSENT_STORAGE_KEY = "kuchimoto-consent";
/** Fired on window when the visitor answers; detail is "granted" or "denied". */
export const CONSENT_EVENT = "kuchimoto-consent";
/** Fired by the footer link to show the banner again. */
export const OPEN_CONSENT_EVENT = "kuchimoto-consent-open";
