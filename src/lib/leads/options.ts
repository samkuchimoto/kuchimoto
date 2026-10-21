// /src/lib/leads/options.ts
// The choices the lead form offers (Lab, Studio, the triage demo and the
// Contact page), shared by the browser and /api/lead so both agree on what
// is valid. Visitor-facing labels are in the dictionaries; the English
// ones below are for the notification Samuel receives.

export const NEEDS = ["agent", "mvp", "creative", "whitelabel", "other"] as const;
export type Need = (typeof NEEDS)[number];

export const BUDGETS = ["prototype", "mid", "high", "unsure"] as const;
export type Budget = (typeof BUDGETS)[number];

export const TIMELINES = ["week", "month", "exploring"] as const;
export type Timeline = (typeof TIMELINES)[number];

/** The page a lead came from; the Contact page says which business. */
export const LEAD_SOURCES = ["lab", "studio", "demo", "contact"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_BUSINESSES = ["lab", "studio"] as const;
export type LeadBusiness = (typeof LEAD_BUSINESSES)[number];

/** Read from the landing URL into sessionStorage (lib/leads/attribution.ts),
 *  sent with the form as hidden fields. */
export const TRACKING_FIELDS = [
  "landing_page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;
export type TrackingField = (typeof TRACKING_FIELDS)[number];

/** Faster than this between showing the form and sending it: a bot. */
export const MIN_FILL_MS = 3000;

export const NEED_LABEL: Record<Need, string> = {
  agent: "AI agent or automation",
  mvp: "Web or mobile MVP",
  creative: "Creative AI for my brand",
  whitelabel: "White-label for my agency",
  other: "Something else",
};

export const BUDGET_LABEL: Record<Budget, string> = {
  prototype: "€490 prototype first",
  mid: "€1,500 to €5,000",
  high: "€5,000 to €12,000",
  unsure: "Not sure yet",
};

export const TIMELINE_LABEL: Record<Timeline, string> = {
  week: "This week",
  month: "This month",
  exploring: "Just exploring",
};

/** sessionStorage keys shared by the form, the thank-you page and the
 *  attribution capture. */
export const STORAGE = {
  attribution: "kuchimoto-attribution",
  /** The lead just sent, for the thank-you page: conversion and booking prefill. */
  pending: "kuchimoto-lead",
  /** Set once generate_lead has fired for a lead id. */
  fired: "kuchimoto-lead-fired",
} as const;
