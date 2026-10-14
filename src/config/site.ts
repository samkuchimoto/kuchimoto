// /src/config/site.ts
// The facts the site states, in one place. Anything still unknown is null
// and shows on the site as a visible placeholder ([e-mail], [téléphone]),
// so it cannot go live unnoticed. Fill these in, push, and every page
// that uses them updates.

export const SITE_URL = "https://kuchimoto.com";

/** The company, as it appears in the legal notice. */
export const COMPANY = {
  name: "KUCHIMOTO",
  legalName: "KUCHIMOTO SAS",
  /** As in the bank file. */
  form: {
    fr: "SAS à associé unique en cours d'immatriculation",
    en: "Single-shareholder SAS, registration in progress",
  },
  capital: "8 000 €",
  address: "13 rue André Chénier, 92260 Fontenay-aux-Roses, France",
  /** Shown as given until the registration number exists. */
  registration: {
    fr: "RCS Nanterre (immatriculation en cours)",
    en: "Nanterre Trade and Companies Register (registration in progress)",
  },
  president: "Samuel Louissaint",
  /** SIREN and VAT number: none until the company is registered. */
  numbersPending: {
    fr: "Attribués après l'immatriculation (en cours)",
    en: "Assigned after registration (in progress)",
  },
  /** Where the site is hosted (Vercel, the platform it is deployed on). */
  host: {
    name: "Vercel Inc.",
    address: {
      fr: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
      en: "440 N Barranca Avenue #4133, Covina, CA 91723, United States",
    },
    url: "https://vercel.com",
  },
  /** The consumer mediator for the terms of sale, once a contract is signed. */
  mediator: null as { name: string; address: string; url: string } | null,
};

/** Public contact details. The phone is written the French way on French
 *  pages and in international form on English ones. */
export const CONTACT = {
  email: "samuelclermont.contact@gmail.com",
  phone: { fr: "07 43 79 88 60", en: "+33 7 43 79 88 60" },
  phoneHref: "tel:+33743798860",
};

/** Opening dates, written out where they are shown. */
export const OPENINGS = {
  bangkok: { fr: "juillet 2028", en: "July 2028" },
  canada: { fr: "juillet 2028", en: "July 2028" },
  usa: { fr: "janvier 2029", en: "January 2029" },
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

export const ITTSUI_URL = "https://ittsui.fr";
