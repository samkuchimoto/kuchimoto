// The seven live systems engineered and operated by Kuchimoto LLC.
// Every fact below comes from the product's own source code (checked
// 24 Nov 2026): stacks, counts and feature names are what the repositories
// contain, nothing projected. Images and videos live at the paths given,
// so a new asset replaces the old one by keeping its file name.

export type ProjectFilter = "Engineering" | "Platforms" | "B2B" | "Commerce" | "Mobile";

export type Project = {
  slug: string;
  index: string;
  name: string;
  domain: string;
  url: string;
  category: string[];
  summary: string;
  /** One line for cards and the index. */
  short: string;
  filters: ProjectFilter[];
  image: { src: string; alt: string; tone: string };
  video?: { mp4: string; webm: string; poster: string };
  og: string;
  challenge: string;
  architecture: string[];
  stack: string[];
  facts: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "manakael",
    index: "01",
    name: "Manakael",
    domain: "manakael.com",
    url: "https://manakael.com",
    category: ["Aerospace", "SWaP-C Physics Engine", "Interactive Compute"],
    summary:
      "Live orbital Size, Weight, Power, and Cooling (SWaP-C) baseline engineering engine modeling orbital AI clusters, lunar/Mars bases, radiative heat rejection, and Starship launch manifests with editable physics assumptions and shareable Spec IDs.",
    short: "A live SWaP-C physics engine for orbital AI clusters and lunar and Mars bases, with shareable Spec IDs.",
    filters: ["Engineering"],
    image: {
      src: "/images/projects/manakael.jpg",
      alt: "A satellite radiator array in orbit above the curve of the Earth",
      tone: "#212329",
    },
    og: "/og/manakael.jpg",
    challenge:
      "Orbital data centers, stations and outposts live or die on power and heat, and claims about them are easy to publish and hard to check. Manakael answers one question in public, with the physics shown: does it survive?",
    architecture: [
      "Zero-framework build: vanilla JavaScript modules and hand-written CSS, compiled and pre-rendered by a custom, dependency-free bundler.",
      "Radiator sizing from the Stefan–Boltzmann law: every heat-rejection figure is derived from first principles, not looked up.",
      "Deterministic Spec IDs (MK-XXXX-XXXX) hashed with SHA-256 from the engine version and every input, so any configuration can be shared and reproduced exactly.",
      "Mission regimes for cislunar NRHO, the lunar south pole and the Martian surface, with Starship V3 (projected) launch manifests.",
      "A claim checker that reads a claim's text or URL and returns a verdict (physics violation, marginal or plausible), with 1200×630 share cards rendered on the server.",
    ],
    stack: ["Vanilla JS modules", "Custom bundler & pre-renderer", "Vercel Functions", "Satori + resvg", "Stripe API", "node:test"],
    facts: [
      { label: "Pre-rendered pages", value: "16" },
      { label: "API functions", value: "6" },
      { label: "Runtime dependencies", value: "3" },
      { label: "Verdicts", value: "Violation · Marginal · Plausible" },
    ],
  },
  {
    slug: "halo-happy-homes",
    index: "02",
    name: "Halo Happy Homes",
    domain: "halohappyhomes.com",
    url: "https://halohappyhomes.com",
    category: ["Global Platform", "Multi-Division Ops", "AI Intelligence"],
    summary:
      "International property and infrastructure services platform operating across 30+ cities in Asia, the US, Europe, and the Gulf, unifying five divisions: Care, Infrastructure, Intelligence, Halo, and Space.",
    short: "One platform, five divisions: property and infrastructure services across 30+ cities on four continents.",
    filters: ["Platforms"],
    image: {
      src: "/images/projects/halo-happy-homes.jpg",
      alt: "A modern Japanese pavilion at golden hour, reflected in a still pool",
      tone: "#926d51",
    },
    og: "/og/halo-happy-homes.jpg",
    challenge:
      "One relationship for every kind of place: care and turnovers, commercial HVAC and electrical, property intelligence, interior styling and backup power, delivered directly and through qualified independent partners in 32 cities across 16 countries.",
    architecture: [
      "One price function shared by the booking form, the server and the payment step, so a quote can never drift from what is charged.",
      "Stripe Connect partner payouts tied to each client charge, with Wise for international transfers.",
      "Two-stage partner verification before any partner is listed.",
      "Six languages (English, Thai, French, Spanish, Catalan, Russian) with generated Open Graph images, llms.txt and IndexNow pings.",
      "Four scheduled jobs on Vercel Cron, including regional runs for Asia-Oceania, Europe-Gulf and the Americas.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Neon Postgres", "Stripe Connect", "Resend", "Vercel Cron"],
    facts: [
      { label: "Cities", value: "32 in 16 countries" },
      { label: "Divisions", value: "5" },
      { label: "Languages", value: "6" },
      { label: "Pages / API routes", value: "31 / 15" },
    ],
  },
  {
    slug: "ittsui-works",
    index: "03",
    name: "Ittsui Works",
    domain: "ittsuiworks.com",
    url: "https://ittsuiworks.com",
    category: ["B2B Recruiting", "Critical Infrastructure", "US Operations"],
    summary:
      "Specialized direct-hire technical recruiting and licensed commercial subcontractor sourcing platform serving US commercial HVAC, electrical, data center, and marine infrastructure.",
    short: "Technical recruiting and licensed subcontractor sourcing for US critical infrastructure.",
    filters: ["B2B"],
    image: {
      src: "/images/projects/ittsui-works.jpg",
      alt: "A monumental concrete and steel plant hall lit from a skylight",
      tone: "#595e64",
    },
    og: "/og/ittsui-works.jpg",
    challenge:
      "The AI age is built by hand. Data centers, commercial HVAC and marine systems need technicians and licensed trade partners that generic job boards never surface.",
    architecture: [
      "Daily import of public openings from Greenhouse, Lever, Ashby and SmartRecruiters feeds across 44 employer sources, normalized into one index.",
      "JobPosting structured data on every opening for Google for Jobs, plus a jobs.xml feed and llms.txt.",
      "A two-stage human verification pipeline before any candidate or partner is introduced.",
      "Same-origin and rate-limit guards on every form endpoint.",
      "English and Japanese editions from a single content model.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Neon Postgres", "Resend", "Vercel Cron"],
    facts: [
      { label: "Employer feeds", value: "44" },
      { label: "Scheduled jobs", value: "2 daily" },
      { label: "Languages", value: "2" },
      { label: "Pages / API routes", value: "16 / 15" },
    ],
  },
  {
    slug: "seal-and-staff",
    index: "04",
    name: "Seal & Staff",
    domain: "sealstaff.com",
    url: "https://sealstaff.com",
    category: ["B2B Staffing", "Fintech & Healthcare Ops", "Written-Scope Retainers"],
    summary:
      "Dedicated remote specialist platform supplying vetted bookkeeping, tax, and dental insurance verification pods working inside US accounting and dental practice software during US business hours.",
    short: "Vetted bookkeeping, tax and dental insurance verification pods, on US hours, under written scope.",
    filters: ["B2B"],
    image: {
      src: "/images/projects/seal-and-staff.jpg",
      alt: "A black interlocking block and a vermilion seal on warm stone in afternoon light",
      tone: "#a08168",
    },
    og: "/og/seal-and-staff.jpg",
    challenge:
      "Do what your firm does best; your specialist does the rest. Accounting firms and dental practices need specialists who already work inside their software, on US hours, under a written scope.",
    architecture: [
      "Eight named pods, from Monthly Bookkeeping & Reconciliation to Daily Dental Insurance Verification and Multi-Location DSO Billing.",
      "A software directory (QuickBooks Online, Xero, Drake Tax, Lacerte, UltraTax CS, CCH Axcess Tax, Dentrix, Eaglesoft, Open Dental and more), each with its own hiring page.",
      "SS-YYYYMMDD-XXXX deal orders that carry a written scope through partner confirmation and client acceptance.",
      "Stripe Checkout and subscriptions, Mercury virtual-account invoicing and Wise payouts.",
      "Admin sign-in by one-time emailed link, with owner, operator and viewer roles and an audit log.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Neon Postgres", "Stripe", "Mercury API", "Resend", "Turnstile"],
    facts: [
      { label: "Named pods", value: "8" },
      { label: "Supported software", value: "14" },
      { label: "Scheduled jobs", value: "3" },
      { label: "Pages / API routes", value: "30 / 16" },
    ],
  },
  {
    slug: "goren-harvest",
    index: "05",
    name: "Goren Harvest",
    domain: "gorenharvest.com",
    url: "https://gorenharvest.com",
    category: ["Civic Commerce", "Interactive Calculator", "Global Network"],
    summary:
      "Neighborhood surplus food sharing platform connecting local grocers, bakeries, and farms with street-level communities, featuring an interactive Harvest Box Explorer, recipe ideas for every box, and a real-time Merchant Profit & Impact Calculator.",
    short: "Surplus food from local stores, reserved by neighbors, with one box in every ten given free.",
    filters: ["Platforms", "Commerce"],
    image: {
      src: "/images/projects/goren-harvest.jpg",
      alt: "A wooden crate of figs, tomatoes, lemons and bread on stone",
      tone: "#867059",
    },
    og: "/og/goren-harvest.jpg",
    challenge:
      "Good food is thrown away at closing time while neighbors a street away go without. Stores list their end-of-day surplus as boxes, neighbors reserve them, and one box in every ten is free: the corner of the field, shared.",
    architecture: [
      "A reservation split in code: the neighbor pays a 15% share online and the store collects the rest at the counter; every tenth box is free by rule.",
      "Location from edge IP headers plus OpenStreetMap geocoding, to show the nearest stores first.",
      "Printable A4 QR posters generated per store, so any counter can join the network.",
      "A single-page Vite build with its JavaScript and CSS inlined into one HTML file, installable as a phone app.",
      "A dotted world map generated at build time from TopoJSON with d3-geo.",
    ],
    stack: ["Vite 7", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Neon serverless", "Stripe API", "Resend"],
    facts: [
      { label: "Free boxes", value: "1 in 10" },
      { label: "Online share", value: "15%" },
      { label: "API functions", value: "6" },
      { label: "Install", value: "Web app manifest" },
    ],
  },
  {
    slug: "bambootails",
    index: "06",
    name: "BambooTails",
    domain: "bambootails.com",
    url: "https://bambootails.com",
    category: ["Luxury Commerce", "Original IP", "Installable PWA"],
    summary:
      "Haute couture pet accessories hand-loomed in Thai silk in numbered batches of fifty, paired with original illustrated character sagas and a zero-store installable Progressive Web App.",
    short: "Thai silk pet couture in numbered batches of fifty, with original sagas and an installable app.",
    filters: ["Commerce"],
    image: {
      src: "/images/projects/bambootails.jpg",
      alt: "Indigo ikat silk draped beside a small white ceramic fox on travertine",
      tone: "#7e6c5c",
    },
    og: "/og/bambootails.jpg",
    challenge:
      "Fifty cuts, then never again. A luxury house needs scarcity that is real, a world worth following, and a way to reach collectors without an app store in between.",
    architecture: [
      "Catalogue states (atelier, soon, concept) held in one type union, so a concept piece can never be given a price.",
      "Five sagas and their chapters modeled as data, each episode tracked as released, in production or planned.",
      "An installable Progressive Web App: web manifest, a service worker for the shell and an offline page, and a dedicated get-app flow.",
      "Vercel BotID on the order and newsletter endpoints, with orders captured first-party.",
      "English and French editions.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Service Worker", "Vercel BotID"],
    facts: [
      { label: "Batch size", value: "50, numbered" },
      { label: "Sagas", value: "5" },
      { label: "Languages", value: "2" },
      { label: "Pages", value: "15" },
    ],
  },
  {
    slug: "ittsui-app",
    index: "07",
    name: "Ittsui",
    domain: "ittsui.fr",
    url: "https://ittsui.fr",
    category: ["Mobile App", "Android & Web", "WebAuthn Passkeys"],
    summary:
      "Live social meetup coordination platform shipped as an Android app and a consumer web app, featuring WebAuthn passkey authentication, push notifications, and weekly scheduling proposals.",
    short: "One proposal, one decision: a meetup coordination app for Android and the web, with passkeys.",
    filters: ["Mobile"],
    image: {
      src: "/images/projects/ittsui-app.jpg",
      alt: "Two smartphones on a dark stone table beside a cup of tea, in dappled maple shade",
      tone: "#463528",
    },
    og: "/og/ittsui-app.jpg",
    challenge:
      "Systems were built to process the average. Ittsui was built to protect your people: one proposal, one decision, more time with the people who matter.",
    architecture: [
      "A Capacitor 8 Android app over the live web app, with App Links and native push through Firebase Cloud Messaging, falling back to email.",
      "WebAuthn passkeys as a sign-in option alongside Google, bound to the ittsui.fr domain.",
      "A weekly proposal engine with a three-tier venue fallback: a retrieval service, then Firestore rules, then a static catalogue.",
      "Firestore security rules that let only the server write proposals.",
      "Five languages: French, English, Japanese, Spanish and Hebrew.",
    ],
    stack: ["Next.js 14", "React 18", "TypeScript", "Firebase Auth & Firestore", "Capacitor 8", "SimpleWebAuthn", "Stripe", "Playwright"],
    facts: [
      { label: "Platforms", value: "Android · Web" },
      { label: "Languages", value: "5" },
      { label: "Pages / API routes", value: "52 / 44" },
      { label: "Sign-in", value: "Passkeys · Google" },
    ],
  },
];

export const FILTERS: ProjectFilter[] = ["Engineering", "Platforms", "B2B", "Commerce", "Mobile"];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export function nextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
