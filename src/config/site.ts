// /src/config/site.ts
// The facts the site states, in one place. Anything still unknown is null
// and shows on the site as a visible placeholder ([e-mail], [téléphone]),
// so it cannot go live unnoticed. Fill these in, push, and every page
// that uses them updates.

import type { Locale } from "@/i18n/config";

export const SITE_URL = "https://kuchimoto.com";

/**
 * The company and its people. The legal notice, the terms of sale and the
 * privacy policy name `publisher` (since 4 November 2026). `legalName`,
 * `status` and `address` are shown on the About and Contact pages only.
 */
export const COMPANY = {
  name: "KUCHIMOTO",
  /** The person shown on the About and Contact pages. */
  legalName: "Samuel Louissaint",
  status: { fr: "Personne physique", en: "Individual", ja: "個人" },
  address: "13 rue André Chénier, porte 506, 92260 Fontenay-aux-Roses, France",
  /** Publisher and director of publication. */
  director: "Samuel Louissaint",
  /**
   * The entreprise individuelle Samuel's invoices are issued by (registered
   * at the RNE since 3 June 2020, APE 6201Z). Printed on the Stripe invoices
   * only: he chose to keep it off the site's pages.
   */
  invoiceIssuer: "Samuel Louissaint EI",
  siret: "883 934 358 00010",
  /**
   * The company, filed in Wyoming on 2 November 2026.
   */
  llc: {
    fr: "Kuchimoto LLC, société à responsabilité limitée du Wyoming (États-Unis)",
    en: "Kuchimoto LLC, a Wyoming limited liability company",
    ja: "Kuchimoto LLC（米国ワイオミング州の有限責任会社）",
  },
  /**
   * The publisher, provider and data controller on the legal pages, from the
   * Articles of Organization. No phone number or home address here.
   */
  publisher: {
    name: "Kuchimoto LLC",
    identity: {
      fr: "Kuchimoto LLC, société à responsabilité limitée du Wyoming (États-Unis), n° d'enregistrement 2026-002122100",
      en: "Kuchimoto LLC, a Wyoming limited liability company, filing no. 2026-002122100",
      ja: "Kuchimoto LLC（米国ワイオミング州の有限責任会社、登録番号 2026-002122100）",
    },
    office: {
      fr: "30 N Gould St, Ste R, Sheridan, WY 82801, États-Unis",
      en: "30 N Gould St, Ste R, Sheridan, WY 82801, USA",
      ja: "30 N Gould St, Ste R, Sheridan, WY 82801, アメリカ合衆国",
    },
    director: {
      fr: "Samuel Louissaint, associé unique et gérant",
      en: "Samuel Louissaint, sole member and manager",
      ja: "Samuel Louissaint（唯一のメンバー兼マネージャー）",
    },
  },
  /** Where the site is hosted (Vercel, the platform it is deployed on). */
  host: {
    name: "Vercel Inc.",
    address: {
      fr: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
      en: "440 N Barranca Avenue #4133, Covina, CA 91723, United States",
      ja: "440 N Barranca Avenue #4133, Covina, CA 91723, アメリカ合衆国",
    },
    url: "https://vercel.com",
  },
  /** The consumer mediator for the terms of sale, once a contract is signed. */
  mediator: null as { name: string; address: string; url: string } | null,
};

/** Public contact details. The phone is written the French way on French
 *  pages and in international form on the others. */
export const CONTACT = {
  email: "samuel@kuchimoto.com",
  phone: { fr: "07 43 79 88 60", en: "+33 7 43 79 88 60", ja: "+33 7 43 79 88 60" },
  phoneHref: "tel:+33743798860",
};

/** Opening dates, written out where they are shown. */
export const OPENINGS = {
  bangkok: { fr: "juillet 2028", en: "July 2028", ja: "2028年7月" },
  canada: { fr: "juillet 2028", en: "July 2028", ja: "2028年7月" },
  usa: { fr: "janvier 2029", en: "January 2029", ja: "2029年1月" },
};

/**
 * Happy Homes Thailand prices, in Thai baht, the same as on
 * happyhomesthailand.com. The booking form charges these amounts; the
 * server recomputes every total from here, never from the browser.
 */
export const THAILAND_PRICES = {
  oneOff: { studio: 1000, oneBed: 1300, twoBed: 1800 },
  weeklyPerMonth: { studio: 3200, oneBed: 4200, twoBed: 5800 },
  /** Villas are quoted from photos: no online payment, a quote request. */
  villaFrom: 3000,
  /** Move-in or move-out deep clean, condos up to two bedrooms. */
  deepClean: 2800,
  airconPerUnit: 600,
  villaCarePerMonth: 5000,
} as const;

export const BAMBOOTAILS = {
  url: "https://bambootails.com",
  tiktok: "https://www.tiktok.com/@bambootails",
  inpi: "5308274",
  prices: { bandana: 34.9, collar: 39.9 },
};

export const ITTSUI_URL = "https://www.ittsui.fr/";

/** Ittsui in the visitor's language: French at the root, then /en and /ja. */
export const ittsuiUrl = (lang: Locale) => (lang === "fr" ? ITTSUI_URL : `${ITTSUI_URL}${lang}`);

/** Happy Homes Thailand's own site, where bookings reach us by email. */
export const HAPPY_HOMES_THAILAND = { url: "https://happyhomesthailand.com", domain: "happyhomesthailand.com" };

/**
 * Kuchimoto Studio, the Lab's AI agents for creatives: price ranges in
 * euros excluding VAT, the exact price set after the audit. Its 48-hour
 * prototype is LAB.prototype.
 */
export const STUDIO = {
  prices: {
    audit: [1500, 3000],
    deployment: [5000, 12000],
    monthly: [1000, 2500],
  },
} as const;

/**
 * Kuchimoto Lab's fixed offers, in euros excluding VAT (Samuel's lead-
 * generation brief, 2026-10-21): the 48-hour prototype, deducted from the
 * full build if the client continues, the 7-day MVP sprint's starting
 * price, and the budget ranges the lead form offers.
 */
export const LAB = {
  prototype: 490,
  mvpFrom: 1500,
  budgets: { mid: [1500, 5000], high: [5000, 12000] },
} as const;

/**
 * Card payment for Happy Homes Thailand bookings on this site (api/booking).
 * Off: Stripe's keys exist now for the Lab's 48-hour prototype, and these
 * bookings stay email requests (happyhomesthailand.com takes them, at its
 * own prices). Turning it on would charge THAILAND_PRICES above.
 */
export const THAILAND_CARD_PAYMENTS = false;
