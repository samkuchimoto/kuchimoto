// Company facts and the commercial offer, in one place. Every page reads
// from here, so a price or an address changes once.

export const SITE = {
  name: "Kuchimoto",
  legalName: "Kuchimoto LLC",
  url: "https://www.kuchimoto.com",
  email: "samuel@kuchimoto.com",
  address: ["30 N Gould St, Ste R", "Sheridan, WY 82801, USA"],
  addressLine: "30 N Gould St, Ste R, Sheridan, WY 82801, USA",
  region: "International Studio · Serving US & Global Clients",
  title: "Kuchimoto · Custom software engineered with precision",
  headline: "Custom software & digital architecture, engineered with precision.",
  description:
    "Kuchimoto LLC builds custom websites, web applications and AI systems from first principles. No templates, no no-code. 100% source code ownership. Custom builds from $5,000.",
  metadataLine: "KUCHIMOTO LLC · WYOMING / GLOBAL · ART, ARCHITECTURE & CUSTOM SYSTEMS",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work", count: "07" },
  { href: "/consulting", label: "Consulting" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export type TrackId = "flagship" | "application" | "ai";

export const TRACKS: {
  id: TrackId;
  index: string;
  title: string;
  body: string;
  price: string;
  duration: string;
  includes: string[];
}[] = [
  {
    id: "flagship",
    index: "01",
    title: "Flagship Digital Worlds & Websites",
    body: "Bespoke design, WebGL craft, sub-second custom architecture.",
    price: "From $5,000",
    duration: "3–4 weeks",
    includes: [
      "Art direction, typography and a motion system of your own",
      "Custom Next.js build, with WebGL where it earns its place",
      "Lead intake wired to your inbox and your database",
      "A performance budget agreed in writing before the build",
    ],
  },
  {
    id: "application",
    index: "02",
    title: "Production Platforms & Applications",
    body: "Full-stack web/mobile systems, real-time engines, end-to-end engineering.",
    price: "From $10,000",
    duration: "4–8 weeks",
    includes: [
      "Product scope and data model, written before the first line of code",
      "Sign-in, roles, admin and audit trail",
      "Stripe billing, subscriptions and webhooks",
      "Custom APIs and integrations with the tools you already run",
    ],
  },
  {
    id: "ai",
    index: "03",
    title: "AI & Custom Technical Infrastructure",
    body: "Autonomous workflows, computational tools, sovereign architecture.",
    price: "Custom Scope",
    duration: "Scoped in writing",
    includes: [
      "Agents and automations around your real operations",
      "Interactive calculators and engineering engines",
      "Scheduled jobs, feed imports, inbox and outreach pipelines",
      "A fixed price for a written scope before work starts",
    ],
  },
];

/** The one quiet line under the commissions index. */
export const COMMISSION_NOTE =
  "Engagements by written scope · Commissions from $5,000 · 100% source code ownership · Zero no-code dependencies";

export const BUDGETS = ["$2,000 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000+"] as const;
export const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Exploring for now"] as const;
export const TRACK_OPTIONS = [
  { id: "consulting", label: "Strategic consultation" },
  { id: "flagship", label: "Digital world / website" },
  { id: "application", label: "Platform / application" },
  { id: "ai", label: "AI & infrastructure" },
  { id: "unsure", label: "Not sure yet" },
] as const;

/* The inquiry form's detail questions (26 November 2026): what a written scope or a consultation needs, asked once, so no
   discovery call is needed before the answer. All optional; several can be chosen. */
export const SECTORS = [
  { id: "agritech", label: "Agritech & soil" },
  { id: "climate", label: "Climate & carbon removal" },
  { id: "water", label: "Water" },
  { id: "food", label: "Food systems" },
  { id: "energy", label: "Energy" },
  { id: "industry", label: "Industry & materials" },
  { id: "science", label: "Science & health" },
  { id: "other", label: "Something else" },
] as const;
export const MARKETS = [
  { id: "africa", label: "Africa" },
  { id: "japan", label: "Japan" },
  { id: "asia", label: "Rest of Asia" },
  { id: "europe", label: "Europe" },
  { id: "americas", label: "The Americas" },
  { id: "global", label: "Global" },
] as const;
/** Samuel's consultation method asks where a mission is blocked, factor by factor. */
export const BLOCKERS = [
  { id: "technology", label: "Technology" },
  { id: "legal", label: "Legal & regulation" },
  { id: "political", label: "Political" },
  { id: "cultural", label: "Cultural" },
  { id: "financial", label: "Financial" },
  { id: "funding", label: "Funding strategy" },
] as const;

/**
 * Strategic consulting (Samuel, 26 November 2026): technology strategy for ecology, technology and science, in Africa
 * first, and in Japan and other niche markets. Priced on the requirement, not the hours.
 */
export const CONSULTING = {
  title: "Strategic consulting",
  lead: "Technology strategy for ecology, science and niche markets. Africa first; Japan and other emerging markets next.",
  who: "For African technology companies, and for US, European and Asian firms entering African markets.",
  fields: [
    "Agritech, soil and water",
    "Biochar and carbon removal",
    "Food systems and surplus",
    "Energy and niche industrial technology",
  ],
  method: [
    {
      title: "Benchmark",
      body: "The two leading companies in your field worldwide: what they do that you don't yet, and whether you should follow them, and why.",
    },
    {
      title: "Diagnosis",
      body: "Your two hardest problems, in your market and worldwide: what you already do right, what can improve, and why in both cases.",
    },
    {
      title: "Blockers",
      body: "What you are trying to solve and what stops the mission: technology, legal, political, cultural, financial and funding strategy.",
    },
    {
      title: "Plan",
      body: "A written strategy you can act on. Where it needs software, the studio can build it.",
    },
  ],
  adds: [
    "Local market knowledge, and next-generation entrepreneurial input with roots and a cultural connection to the market",
    "A strategic network across Africa, Europe and Asia",
    "Hands-on ecological farming experience in Japan, France, Colombia, Spain and South Korea",
    "An engineering studio behind the advice: what the strategy needs can be built",
  ],
  fee: "First enquiry free. Consultations from $2,000, priced on the requirement, not on hours.",
  founding: "Now open: three founding consultations in Africa at no fee, in exchange for a referral.",
} as const;

export const PRINCIPLES = [
  {
    name: "Negative space",
    body: "Space is a material. Calm pacing between bold moments lets the one thing that matters on a screen be seen.",
  },
  {
    name: "Joinery",
    body: "No glue, no nails, no bloat. Every module is cut to fit the next, so the whole system holds without plugins.",
  },
  {
    name: "Restraint",
    body: "Restraint over noise. Tactile materials and exact type say more than gradients and stock effects.",
  },
  {
    name: "Real proof",
    body: "Every project we show is a live production system on its own domain, documented by its real architecture.",
  },
] as const;

export const PROCESS = [
  {
    index: "01",
    title: "Scope call",
    body: "Thirty minutes on what the system must do, who uses it and what it has to earn.",
  },
  {
    index: "02",
    title: "Written scope, fixed price",
    body: "Within 24 hours: a written scope and a fixed price. No hourly meter.",
  },
  {
    index: "03",
    title: "Build in weekly releases",
    body: "You follow the work on a private preview address, release by release.",
  },
  {
    index: "04",
    title: "Launch and handover",
    body: "Production launch, then the repository, the accounts and the keys. You own 100% of the code.",
  },
] as const;
