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
  title: "Kuchimoto · Custom software engineered with Japanese precision",
  headline: "Custom software & digital architecture, engineered with Japanese precision.",
  description:
    "Kuchimoto LLC builds custom websites, web applications and AI systems from first principles. No templates, no no-code. 100% source code ownership. Custom builds from $5,000.",
  metadataLine: "WYOMING, USA · GLOBAL OPERATIONS · CUSTOM BUILDS FROM $5,000",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work", count: "07" },
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
    title: "Flagship Avant-Garde Website",
    body: "Custom Next.js + WebGL/Motion brand & conversion architecture.",
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
    title: "Custom Web Application / SaaS MVP",
    body: "Full-stack platforms, dashboards, Stripe billing, auth, and custom APIs.",
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
    title: "AI Workflows & Technical Infrastructure",
    body: "Custom AI agents, interactive calculators/engines, and automated operations.",
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

export const NON_NEGOTIABLES = [
  "100% Source Code Ownership",
  "Zero No-Code or Plugin Bloat",
  "Sub-Second Edge Performance",
  "Direct Principal Engineering",
] as const;

export const BUDGETS = ["$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000+"] as const;
export const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Exploring for now"] as const;
export const TRACK_OPTIONS = [
  { id: "flagship", label: "Flagship website" },
  { id: "application", label: "Web application / SaaS" },
  { id: "ai", label: "AI & infrastructure" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const PRINCIPLES = [
  {
    kanji: "間",
    name: "Ma",
    gloss: "Intentional negative space",
    body: "Space is a material. Calm pacing between bold moments lets the one thing that matters on a screen be seen.",
  },
  {
    kanji: "木組",
    name: "Kigumi",
    gloss: "Precision joinery",
    body: "No glue, no nails, no bloat. Every module is cut to fit the next, so the whole system holds without plugins.",
  },
  {
    kanji: "渋い",
    name: "Shibui",
    gloss: "Quiet authority",
    body: "Restraint over noise. Tactile materials and exact type say more than gradients and stock effects.",
  },
  {
    kanji: "本物",
    name: "Honmono",
    gloss: "Real proof",
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
