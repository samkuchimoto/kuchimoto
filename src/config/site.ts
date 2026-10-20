// /src/config/site.ts
// The facts the site states, in one place. Anything still unknown is null
// and shows on the site as a visible placeholder ([e-mail], [téléphone]),
// so it cannot go live unnoticed. Fill these in, push, and every page
// that uses them updates.

export const SITE_URL = "https://kuchimoto.com";

/**
 * Who publishes the site and provides its services, as the legal notice,
 * the terms of sale and the privacy policy state it. KUCHIMOTO will be a
 * US company, KUCHIMOTO LLC (Wyoming), not a French SAS; until its
 * registration details exist, that is Samuel Louissaint himself, as an
 * individual (2026-10-20). Put the LLC's details here once they arrive.
 */
export const COMPANY = {
  name: "KUCHIMOTO",
  /** The person (later, the company) legally behind the site. */
  legalName: "Samuel Louissaint",
  status: { fr: "Personne physique", en: "Individual", ja: "個人" },
  address: "13 rue André Chénier, porte 506, 92260 Fontenay-aux-Roses, France",
  /** Publisher and director of publication. */
  director: "Samuel Louissaint",
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

/** Happy Homes Thailand's own site, where bookings reach us by email. */
export const HAPPY_HOMES_THAILAND = { url: "https://happyhomesthailand.com", domain: "happyhomesthailand.com" };

/**
 * Kuchimoto Studio, the Lab's AI agents for creatives: price ranges in
 * euros excluding VAT, the exact price set after the audit. The photo is
 * Habib Beaini's, under the Unsplash License.
 */
export const STUDIO = {
  prices: {
    audit: [1500, 3000],
    deployment: [5000, 12000],
    monthly: [1000, 2500],
  },
  /** The 48-hour agent prototype, deducted from the deployment. */
  prototype: 490,
  photo: { src: "/images/studio/tokyo-artist.jpg", width: 1600, height: 1217 },
  photoCreditUrl: "https://unsplash.com/photos/nfzmJv_OAbA",
} as const;
