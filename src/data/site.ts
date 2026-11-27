// Company facts and the commercial offer, in one place. Every page reads
// from here, so a price or an address changes once.

export const SITE = {
  name: "Kuchimoto",
  legalName: "Kuchimoto LLC",
  url: "https://www.kuchimoto.com",
  email: "samuel@kuchimoto.com",
  address: ["30 N Gould St, Ste R", "Sheridan, WY 82801, USA"],
  addressLine: "30 N Gould St, Ste R, Sheridan, WY 82801, USA",
  region: "Research, strategy, design & custom systems",
  title: "Kuchimoto · Strategy, design and custom software",
  headline: "Independent strategic research, custom software and digital architecture.",
  description:
    "Kuchimoto LLC is an independent firm for strategic research, design and custom software. It investigates hard problems in ecology, agriculture, science and complex operations, and engineers systems when they are justified. 100% source code ownership.",
  metadataLine: "KUCHIMOTO LLC · WYOMING / GLOBAL · RESEARCH, STRATEGY, DESIGN & CUSTOM SYSTEMS",
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
  includes: string[];
}[] = [
  {
    id: "flagship",
    index: "01",
    title: "Flagship Digital Worlds & Websites",
    body: "Bespoke design, visual direction, WebGL craft and custom architecture.",
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
    includes: [
      "Agents and automations around your real operations",
      "Interactive calculators and engineering engines",
      "Scheduled jobs, feed imports, inbox and outreach pipelines",
      "A fixed price for a written scope before work starts",
    ],
  },
];

/** The one quiet line under the commissions index. */
export const COMMISSION_NOTE = "Each commission scoped by written proposal · Engineered when justified · 100% source code ownership";

/** Budget ranges of earlier inquiries. The form no longer asks (27 November 2026: less friction); kept so old leads validate. */
export const BUDGETS = ["$2,000 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000+"] as const;
export const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Exploring for now"] as const;
export const TRACK_OPTIONS = [
  { id: "consulting", label: "Consulting & research" },
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
  { id: "operations", label: "Complex operations" },
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
 * The two practices (27 November 2026, approved by Samuel): Strategic Consulting & Research, and Software Engineering &
 * Digital Design. Independent, complementary: a diagnosis may end in a decision not to build software. No public prices,
 * durations or response times: each engagement is defined by its own written proposal. Only claims that can be shown.
 */
export const CONSULTING = {
  practice: "Practice I · Strategic Consulting & Research",
  title: "Strategic consulting",
  lead: "Independent diagnosis of hard operational and technical problems: international benchmarking, constraint analysis and a prioritised roadmap. Depth in ecology, agriculture, science and complex operations.",
  outcome:
    "The recommendation may be an operational change, a field trial, a partnership, or a decision not to build software. When software is needed, our engineering and design studio can build it.",
  fields: ["Ecology & agriculture", "Soil & water", "Carbon removal", "Food systems", "Science", "Complex operations"],
  method: [
    {
      title: "Benchmark",
      body: "How the leading organisations in your field solve the same problem, what is worth adopting, and why.",
    },
    {
      title: "Diagnosis",
      body: "Your hardest problems, in your market and globally: what already works, what does not, and why.",
    },
    {
      title: "Constraints",
      body: "What stands between the mission and the result: technology, regulation, politics, culture, finance and funding.",
    },
    {
      title: "Roadmap",
      body: "A prioritised written plan with practical recommendations and engineering support where needed.",
    },
  ],
  adds: [
    "Independent judgment: software is recommended only when it is the answer",
    "Hands-on ecological farming experience in Japan, South Korea, France, Spain and Colombia",
    "Seven live production systems designed, built and operated by the studio",
    "Design and engineering in-house, when the plan needs to be built",
  ],
  engagements:
    "A first conversation, then a written proposal: a fixed-scope diagnostic, an advisory engagement, or a scoped engineering and design commission.",
  cta: "Discuss a problem",
} as const;

export const ENGINEERING = {
  practice: "Practice II · Software Engineering & Digital Design",
} as const;

/**
 * Monographs: independent investigations from public sources, published under the studio's name. A company is never named
 * or implied as a client; no private communications. Monograph 01 only (27 November 2026: no placeholders).
 */
export const MONOGRAPHS = [
  {
    slug: "industrial-biochar",
    number: "01",
    field: "Ecology",
    title: "Industrial Biochar at Scale",
    subtitle: "Agronomic value, feedstock integrity, and independent verification.",
    status: "In progress · begun November 2026",
  },
] as const;

export const PRINCIPLES = [
  {
    name: "Negative space",
    body: "Space is a material. Calm pacing between bold moments lets the one thing that matters on a screen be seen.",
  },
  {
    name: "Joinery",
    body: "No glue, no nails, no bloat. Every module is cut to fit the next, so the whole system holds on its own.",
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
    title: "First conversation",
    body: "What the system must do, who uses it and what it has to earn.",
  },
  {
    index: "02",
    title: "Written proposal",
    body: "A written scope and a fixed price for it, with the commitments defined for this engagement. No hourly meter.",
  },
  {
    index: "03",
    title: "Build in releases",
    body: "You follow the work on a private preview address, release by release.",
  },
  {
    index: "04",
    title: "Launch and handover",
    body: "Production launch, then the repository, the accounts and the keys. You own 100% of the code.",
  },
] as const;
