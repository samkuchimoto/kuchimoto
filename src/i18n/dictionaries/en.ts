// /src/i18n/dictionaries/en.ts
// The English version of fr.ts, same shape. Never use the em dash.

import type { Dictionary } from "./fr";

const en: Dictionary = {
  meta: {
    siteName: "KUCHIMOTO",
    home: {
      title: "KUCHIMOTO | International group & studio",
      description:
        "KUCHIMOTO, an international group & studio: Happy Homes (home services in Thailand, Canada and the United States), BambooTails (dog accessories) and Kuchimoto Lab (IT and AI consulting).",
    },
    happyHomes: {
      title: "Happy Homes, home services",
      description:
        "Villa and condo housekeeping, pool and garden upkeep: in Pattaya today, in Canada from July 2028, in Denver and Florida from January 2029.",
    },
    thailand: {
      title: "Happy Homes Thailand, housekeeping and Villa Care in Pattaya",
      description:
        "Fixed-price villa and condo housekeeping in Pattaya, and Villa Care, the monthly package for owners who are away. Book online.",
    },
    canada: {
      title: "Happy Homes Canada, from July 2028",
      description:
        "Housekeeping, office cleaning, pool maintenance, landscaping and snow removal in Canada from July 2028. Join the waiting list.",
    },
    usa: {
      title: "Happy Homes United States, Denver and Florida",
      description:
        "Housekeeping and pool and garden packages in Denver and Florida from January 2029. Join the waiting list.",
    },
    bambootails: {
      title: "BambooTails, dog accessories",
      description:
        "BambooTails, dog accessories born from a universe of original characters: bandanas and collars made in France.",
    },
    lab: {
      title: "AI Agents, n8n & Make Automation, MVPs | Kuchimoto Lab",
      description:
        "Custom AI agents, n8n and Make workflows, web and mobile MVPs. Working prototype in 48 hours for €490, deducted if you continue.",
    },
    studio: {
      title: "AI Agents for Creative Brands, Led by a Painter | Kuchimoto Studio",
      description:
        "AI agents for creative brands, led by a painter: product listings, ad variants and localisation that keep your brand's look. Working prototype in 48 hours for €490, deducted if you continue.",
    },
    about: {
      title: "About",
      description:
        "KUCHIMOTO was founded by Samuel Louissaint, French and Canadian: technical sales and partner engineering in tech, field work in pools, and drawing.",
    },
    contact: {
      title: "Contact",
      description: "Write to KUCHIMOTO: Happy Homes, BambooTails or Kuchimoto Lab.",
    },
    bookingThanks: {
      title: "Booking received",
      description: "Your Happy Homes Thailand booking is confirmed.",
    },
    thankYou: {
      title: "Request received",
      description: "Your request is received: you'll get a fixed price within 24 hours.",
    },
    pay: {
      title: "Pay for the 48-hour AI prototype",
      description: "48-hour AI prototype, €490 fixed price, deducted from the full build if you continue.",
    },
    paymentSuccess: {
      title: "Payment received",
      description: "Your payment for the 48-hour AI prototype.",
    },
  },

  nav: {
    label: "Main navigation",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close the menu",
    language: "Language",
    links: {
      home: "Home",
      happyHomes: "Happy Homes",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
      ittsui: "Ittsui",
      about: "About",
      contact: "Contact",
    },
  },

  footer: {
    tagline: "International group & studio.",
    divisions: "Businesses",
    company: "Company",
    legal: "Legal",
    legalLinks: {
      notice: "Legal notice",
      terms: "Happy Homes terms of sale",
      privacy: "Privacy",
      cookies: "Manage cookies",
    },
    trademark: "BAMBOOTAILS is a trademark of Samuel Louissaint (INPI no. 5308274), used by KUCHIMOTO.",
    rights: (year: number) => `© ${year} KUCHIMOTO`,
  },

  common: {
    placeholderEmail: "[e-mail]",
    placeholderPhone: "[phone]",
    photo: "Photo to come",
    from: (date: string) => `From ${date}`,
    open: "Open",
    noHousing: "Happy Homes does not search for housing or manage rentals.",
    visual: "Visual for illustration only",
    learnMore: "Learn more",
    email: "Email",
    phone: "Phone",
  },

  home: {
    eyebrow: "International group & studio",
    title: "KUCHIMOTO, an international group & studio.",
    intro: "KUCHIMOTO LLC (Wyoming, United States), formation in progress.",
    divisions: {
      happyHomes: {
        label: "Home services",
        body: "Villa and condo housekeeping, pool and garden upkeep. In Pattaya today, then in Bangkok, Canada and the United States.",
        cta: "Discover Happy Homes",
      },
      bambootails: {
        label: "Dog accessories",
        body: "A universe of original characters, and bandanas and collars made in France.",
        cta: "Discover BambooTails",
      },
      lab: {
        label: "Technology",
        body: "IT and AI consulting, subcontracting, testers for Google Play and in-house apps, including Ittsui.",
        cta: "Discover Kuchimoto Lab",
      },
    },
    where: {
      title: "Where we work",
      france: ["France", "Studio"],
      thailand: ["Thailand", "Pattaya: live today · More cities soon"],
      canada: ["Canada", "Upcoming, from July 2028"],
      usa: ["United States", "Upcoming: Denver and Florida, from January 2029"],
    },
    contact: {
      title: "A project, a question?",
      body: "One form for all three businesses.",
      cta: "Write to us",
    },
  },

  happyHomes: {
    label: "Home services",
    title: "Happy Homes",
    intro: "Housekeeping, pools and gardens, taken care of, country by country.",
    countriesTitle: "Our countries",
    countries: {
      thailande: {
        name: "Thailand",
        status: "Pattaya: live today · More cities soon",
        body: "A home-management and dispatch platform operated by KUCHIMOTO LLC (Wyoming, United States), formation in progress. No more managing separate maids, pool technicians and gardeners: one subscription, vetted local partner teams, and photo verification after every visit.",
      },
      canada: {
        name: "Canada",
        status: "Upcoming, from July 2028",
        body: "Housekeeping, office cleaning, pool maintenance, landscaping and snow removal.",
      },
      "etats-unis": {
        name: "United States",
        status: "Upcoming: Denver and Florida, January 2029",
        body: "Housekeeping, and pool and garden packages.",
      },
    },
    tabsLabel: "Countries",
    liveSite: "Go to Happy Homes Thailand (happyhomesthailand.com)",
    more: {
      title: "Other services",
      intro: "Depending on the country: write to us to talk it over.",
      items: [
        ["Office cleaning", "Clean premises, as often as suits you."],
        ["Garden and landscaping", "Regular upkeep, or a garden redesigned."],
        ["Interior decoration advice", "Advice on furnishing and decorating your home."],
        ["Renovation", "Renovation work for your house or apartment."],
        ["Pool construction and renovation", "A new pool, or yours made new again."],
      ],
      contractors: "Renovation and pool work is carried out by qualified, insured contractors.",
      cta: "Write to us",
    },
  },

  thailand: {
    label: "Happy Homes Thailand",
    title: "Housekeeping and Villa Care in Pattaya",
    status: "Pattaya: live today. More cities soon.",
    intro: "Fixed prices, known before you book. Villas are quoted from photos.",
    bookOnline: "Book on happyhomesthailand.com",
    photoAlt: "Photo: a villa with a pool in Pattaya",
    prices: {
      title: "Our prices",
      note: "Prices in Thai baht.",
      sizes: { studio: "Studio", oneBed: "1 bedroom", twoBed: "2 bedrooms" },
      oneOff: "One-off clean",
      weekly: "Weekly plan, per month",
      villa: "Villas",
      villaValue: (price: string) => `From ${price}, quoted from photos`,
      deepClean: "Move-in or move-out deep clean",
      deepCleanNote: "condos up to 2 bedrooms",
      aircon: "Air conditioner cleaning",
      perUnit: (price: string) => `${price} per unit`,
    },
    villaCare: {
      title: "Villa Care",
      lead: "Your villa looked after while you are away.",
      price: (price: string) => `${price} per month`,
      items: [
        "Pool care",
        "Garden care",
        "An inspection visit of the house",
        "Airing the house",
        "A clean before you arrive",
      ],
    },
  },

  canada: {
    label: "Happy Homes Canada",
    title: "Canada: upcoming, from July 2028",
    intro: "Join the waiting list: we will let you know as soon as we open in your city.",
    photoAlt: "Photo: a Canadian house in winter",
    servicesTitle: "Planned services",
    services: ["Housekeeping", "Office cleaning", "Pool maintenance", "Landscaping", "Snow removal"],
  },

  usa: {
    label: "Happy Homes United States",
    title: "United States: upcoming, Denver and Florida from January 2029",
    intro: "Join the waiting list: we will let you know as soon as we open.",
    photoAlt: "Photo: a house with a garden and a pool",
    servicesTitle: "Planned services",
    services: ["Housekeeping", "Pool packages", "Garden packages"],
  },

  bambootails: {
    label: "Dog accessories",
    title: "BambooTails",
    intro: "A dog accessories brand born from a universe of original characters, drawn by Samuel Louissaint.",
    universe: {
      title: "The universe",
      body: "Fourteen characters, from Chiang Mai to Paris, brought together by a love of work done well. They live in a series of short episodes, and on the brand's bandanas and collars.",
      characters: [
        ["tao", "Tao", "The heir"],
        ["lumi", "Lumi", "The architect"],
        ["miko", "Miko", "The edge"],
        ["sora", "Sora", "The dyer"],
        ["kuma", "Kuma", "The hearth"],
        ["mochi", "Mochi", "The little joy"],
      ],
      alt: (name: string) => `${name}, a character from the BambooTails universe`,
    },
    products: {
      title: "The essentials",
      madeIn: "Made in France",
      bandana: {
        name: "Character Bandana",
        body: "Reversible printed cotton bandana with the BambooTails characters. Two sizes.",
        alt: "The Character Bandana laid flat: cream cotton printed with the BambooTails characters, terracotta reverse",
      },
      collar: {
        name: "Character Collar",
        body: "Printed fabric over durable webbing, metal buckle and D-ring. Three sizes.",
        alt: "The Character Collar: printed character fabric over webbing, with a metal buckle and D-ring",
      },
    },
    shop: "Visit the shop",
    tiktok: "TikTok Shop",
    external: "(new tab)",
  },

  lab: {
    label: "Kuchimoto Lab",
    title: "AI agents, automation and MVPs. Fixed price, delivered fast.",
    intro:
      "We build custom AI agents, n8n and Make workflows, and web and mobile MVPs. Start with a working prototype in 48 hours for {price}, deducted from the full build if you continue.",
    demoLink: "Try the live triage demo",
    demoLang: "",
    prototype: {
      title: "Hire an AI agent and automation developer",
      cards: {
        agent: {
          title: "48-hour AI prototype: {price} fixed",
          body: "A working AI agent or automation on your most time-consuming task. The {price} is deducted from the full build if you continue.",
          cta: "Start with {price}",
        },
        mvp: {
          title: "Web or mobile MVP sprint: from {price}",
          body: "A working product for your first users in 7 days.",
          cta: "Scope my MVP",
        },
        whitelabel: {
          title: "White-label for agencies",
          body: "We build under your brand. You keep the client and the margin. Fixed price per sprint.",
          cta: "Partner with us",
        },
      },
      also: "Also available: IT and AI consulting, IT subcontracting, managed Google Play testers.",
    },
    how: {
      title: "How it works",
      steps: [
        "Tell us the task. It takes 2 minutes.",
        "Fixed price and scope within 24 hours.",
        "Working prototype 48 hours after you approve, then you decide.",
      ],
    },
    demo: {
      label: "Live demo",
      title: "An AI triage agent, on your own emails",
      body: "Paste your emails or a screenshot of your inbox: the agent sorts them and writes a three-minute executive brief. The analysis runs in your browser.",
      cta: "Try the live triage demo",
    },
    notesIntro:
      "Architecture proposal presented to the head of digital of a major French public-transport organization (2026): an executive triage agent and a Paris to Tokyo station model.",
    ittsui: {
      title: "Ittsui, our own app",
      body: "Designed, built and launched in-house. Ittsui suggests one meetup a week with the people who matter, confirmed in one click, with no account or app needed for guests. In early access.",
      cta: "See Ittsui",
    },
    contactTitle: "Tell us the task. Get a fixed price in 24 hours.",
  },

  studio: {
    label: "Kuchimoto Studio",
    title: "AI agents for creative brands, led by a painter.",
    intro:
      "Product listings, ad variants and localisation handled by agents that keep your brand's look. Start with a working prototype in 48 hours for {price}, deducted if you continue.",
    art: {
      title: "The eye behind the agents",
      body: "Ten years of painting and illustration. Every agent we ship is judged by the same eye.",
      caption: "Samuel Louissaint",
      alts: [
        "Samurai in a red kimono holding a sword, with handwritten text",
        "Portrait in red and pink on a deep blue ground",
        "Abstract painting in red, white and blue",
        "Green abstract painting with black lines",
        "Orange circle and a white figure on black",
        "Face in black, white and red",
        "Dense abstract of red, black and green strokes",
        "Green abstract with an orange form",
      ],
      open: "Enlarge",
      close: "Close",
      prev: "Previous artwork",
      next: "Next artwork",
      dialog: "Artworks by Samuel Louissaint",
    },
    agentsTitle: "The agents",
    agents: [
      [
        "For founders",
        "Launch & Brand",
        "Takes a product idea and coordinates the launch: asset creation, product descriptions for the online shop and TikTok Shop, ad variations, compliance steps tracked.",
      ],
      [
        "For artists and freelancers",
        "Client & Contract",
        "Tracks each project's milestones, drafts client proposals, handles follow-ups and triggers basic invoicing.",
      ],
      [
        "For brands selling abroad",
        "Cross-Border Market",
        "Translates, localises and adapts your copy and sales funnels for each market, in the tone expected in Paris, Tokyo or the United States.",
      ],
    ],
    prototype: {
      label: "To start",
      title: "An agent prototype in 48 hours",
      body: "In 48 hours we build a working prototype on your most time-consuming task, so you see the agent at work before you commit.",
      unit: "Excl. VAT, deducted from the deployment if you go ahead",
      note: "The 48 hours start once the scope is agreed.",
      cta: "Order the prototype",
    },
    packages: {
      title: "Three steps, three packages.",
      intro: "First we find where your time goes, then we build, then we keep the agents running.",
      items: {
        audit: {
          name: "Workflow audit & agent blueprint",
          unit: "One-time, excl. VAT",
          body: "Analysis of your creative and operational bottlenecks, and the design of a custom multi-agent architecture.",
          cta: "Request a 15-minute call",
        },
        deployment: {
          name: "Custom agent deployment",
          unit: "Per project, excl. VAT",
          body: "Building and integrating agents into your tools: content repurposing, multilingual localisation, client onboarding.",
        },
        monthly: {
          name: "Monthly agent operations",
          unit: "Per month, excl. VAT",
          body: "Monitoring, prompt fine-tuning, API upkeep and scaling agent capacity.",
        },
      },
      note: "The exact price depends on the scope, agreed together after the audit.",
    },
    pilot: [
      "Pilot programme",
      "Our first clients get a pilot deployment at a reduced rate. Write to us to talk it over.",
    ],
    toLab: { text: "Need automation or an app built?", link: "See Kuchimoto Lab" },
  },

  proof: {
    label: "Proof",
    items: [
      "Ittsui: our live app, built in-house",
      "Live AI triage demo on your own emails",
      "Proposal presented to a head of digital in French public transport",
      "Reply within 24 hours",
    ],
  },

  notes: {
    title: "Proposed architectures & strategic notes",
    tags: ["Public transport in Île-de-France · Passenger information systems", "Stations · Tokyo model"],
    caseTitle: "Urban mobility & station ecosystems (Paris ↔ Tokyo)",
    contextLabel: "Context",
    context:
      "Architecture study on the passenger information systems of a multi-operator network opening to competition, and on the stations of tomorrow in Île-de-France.",
    problemLabel: "The problem",
    problem:
      "Digital departments overloaded by multi-operator coordination, and station retail that makes less use of digital tools than in Japan (ekinaka, Tokyo).",
    proposalLabel: "Architecture proposed by Kuchimoto",
    demoLink: "See this agent's live demo",
    proposals: [
      [
        "Executive triage & IT governance AI agent",
        "Filtering, a daily summary and automated routing of operator and IT alerts, to free department heads from email overload.",
      ],
      [
        "A Paris–Tokyo bridge for the stations of tomorrow",
        "Bringing the digital journeys of Tokyo stations (local services, real-time information, local loyalty) to stations in Île-de-France.",
      ],
    ],
  },

  lead: {
    email: "Work email",
    needLabel: "What do you need?",
    needs: {
      agent: "AI agent or automation",
      mvp: "Web or mobile MVP",
      creative: "Creative AI for my brand",
      whitelabel: "White-label for my agency",
      other: "Something else",
    },
    submit: "Get my fixed price",
    notice: "Reply within 24 hours. No newsletter. We use your details only to answer you.",
    privacyLink: "Privacy policy",
    step2: "Step 2 of 2",
    name: "Name",
    company: "Company or website",
    optional: "optional",
    message: "What should we build or automate?",
    messagePlaceholder: "Example: we spend 6 hours a week writing product listings in 3 languages.",
    budgetLabel: "Budget",
    budgets: { prototype: "{price} prototype first", unsure: "Not sure yet" },
    timelineLabel: "Timeline",
    timelines: { week: "This week", month: "This month", exploring: "Just exploring" },
    send: "Send my request",
    sending: "Sending…",
    errors: {
      email: "Enter a valid email address.",
      need: "Choose what you need.",
      name: "Enter your name.",
      invalid: "Please check the fields marked.",
      rate_limited: "Too many requests in a short time. Try again in a few minutes.",
      server: "That did not send. Try again, or write to {email}.",
      network: "No connection. Check your network and try again.",
    },
  },
  cta: {
    header: "Get a 48h prototype",
    bar: "Get a 48h prototype · {price}",
  },
  thankYou: {
    title: "Received. You'll get a fixed price within 24 hours.",
    book: "Skip the wait: book 15 minutes now",
    next: "What happens next",
    steps: [
      "You receive a fixed price and scope by email within 24 hours.",
      "Once you approve, your prototype is ready in 48 hours.",
      "You decide whether to continue. The {price} is deducted if you do.",
    ],
  },
  homeStrip: {
    text: "Need AI or an app built? A working prototype in 48 hours for {price}.",
    cta: "See Kuchimoto Lab",
  },
  founder: {
    title: "Who builds it",
    body: "Samuel Louissaint, founder. Developer (RNCP web and mobile, 2021) with a background in partner engineering and technical sales on Google Cloud AI/ML, X and GoDaddy programs, and a painter for ten years. I build myself and bring in trusted specialists from my network in France, Israel and Asia when a project needs more hands.",
    photoAlt: "Samuel Louissaint",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      ["Is the {price} really deducted?", "Yes, from the full build if you continue."],
      ["Who owns the code?", "You do, once paid."],
      ["Do you sign NDAs?", "Yes."],
      [
        "Which tools do you use?",
        "n8n, Make, OpenAI and Anthropic APIs, Python, JavaScript and TypeScript, web and mobile frameworks.",
      ],
      ["Where are you based?", "Paris, working remotely with clients across Europe and Asia. Invoiced from France."],
      ["How fast do you reply?", "Within 24 hours."],
    ],
  },
  pay: {
    button: "Pay {price} and start",
    label: "Payment",
    title: "48-hour AI prototype",
    summary: "Working prototype on your task in 48 hours. Deducted from the full build if you continue.",
    price: "{price}, fixed price",
    secure: "Payment handled by Stripe.",
    loading: "Loading the payment…",
    error: "The payment form couldn't load. Try again in a moment.",
    closed: "Online payment isn't open yet. Tell us the task: we reply within 24 hours.",
    closedLink: "Describe my task",
    success: "Payment received. I'll email you within 24 hours to start your prototype.",
    pending: "This payment isn't complete.",
    retry: "Back to the payment",
  },
  about: {
    label: "About",
    title: "Samuel Louissaint, founder",
    intro: "French and Canadian, founder of KUCHIMOTO.",
    photoAlt: "Photo: portrait of Samuel Louissaint",
    pathTitle: "Background",
    path: [
      "Technical sales and partner engineering: Google Cloud (via Concentrix, 2025), X (via Teleperformance, 2024), GoDaddy (Barcelona).",
      "Field experience at Gib-San Pools (Toronto): pool construction and renovation.",
      "Visual artist, author of the BambooTails characters.",
    ],
    companyTitle: "Publisher",
    companyRows: {
      name: "Name",
      status: "Status",
      company: "Company",
      address: "Address",
    },
  },

  contact: {
    label: "Contact",
    title: "Write to us",
    intro: "Choose the business your message is about: it goes straight to the right person.",
    direct: "Or directly",
    studio: "Kuchimoto Studio",
  },

  forms: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    message: "Message",
    company: "Company",
    city: "City",
    division: "Business",
    divisionChoose: "Choose",
    divisions: {
      "hh-thailand": "Happy Homes Thailand",
      "hh-canada": "Happy Homes Canada",
      "hh-usa": "Happy Homes United States",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
    },
    projectType: "Type of project",
    projectTypes: {
      consulting: "IT and AI consulting",
      subcontracting: "IT subcontracting",
      testers: "Testers for Google Play",
      app: "App",
      other: "Other",
    },
    services: "Services you are interested in",
    location: "Location",
    locations: { denver: "Denver", florida: "Florida" },
    consent: "I agree that my data is used to handle my request, as described in the",
    privacyLink: "privacy policy",
    consentEnd: ".",
    send: "Send",
    join: "Join the waiting list",
    sending: "Sending…",
    success: {
      contact: "Thank you, your message is sent. We will reply soon.",
      waitlist: "Thank you, you are on the waiting list. We will write when we open.",
      project: "Thank you, we have your project. We will reply soon.",
    },
    errors: {
      invalid: "Please check the fields marked.",
      required: "This field is required.",
      email: "This email address does not look right.",
      rate_limited: "Too many messages in a short time. Try again in a few minutes.",
      not_configured: "Sending online is not open yet. Please write to us directly.",
      server: "That did not send. Try again, or write to us directly.",
      network: "No connection. Check your network and try again.",
      payment: "Payment could not start. Try again, or write to us.",
    },
  },

  booking: {
    title: "Book",
    intro: "Choose the service and the date. For a fixed-price service, you pay by card when you book.",
    introRequest: "Choose the service and the date. We confirm your request by email.",
    alsoOn: "You can also book on the Happy Homes Thailand website:",
    service: "Service",
    services: {
      oneOff: "One-off clean",
      weekly: "Weekly plan (first month)",
      deepClean: "Move-in or move-out deep clean",
      aircon: "Air conditioner cleaning",
      villaCare: "Villa Care (first month)",
      villaQuote: "Villa clean (quoted from photos)",
    },
    size: "Home",
    sizes: { studio: "Studio", oneBed: "1 bedroom", twoBed: "2 bedrooms" },
    units: "Number of air conditioners",
    date: "Preferred date",
    dateHint: "From tomorrow.",
    time: "Time of day",
    times: { morning: "Morning", afternoon: "Afternoon" },
    address: "Address in Pattaya",
    notes: "Details",
    notesHint: "Access, pets, anything to take care of.",
    total: "Total",
    quoteNote: "For a villa, we send you a quote based on your photos: nothing is paid now.",
    monthlyNote: "For a monthly package, you pay the first month here.",
    terms: "I accept the",
    termsLink: "terms of sale",
    termsEnd: ".",
    privacyNote: "Your data is handled as described in our",
    privacyNoteEnd: ".",
    waiver:
      "I ask for the service to start before the end of the 14-day withdrawal period, and I acknowledge that I lose my right of withdrawal once the service has been fully performed.",
    pay: "Pay {total} by card",
    request: "Send the request",
    paymentSoon:
      "Online card payment opens soon. Send your request: we confirm it and send you the payment link.",
    secure: "Secure payment by Stripe. Your card details never reach us.",
    requestDone: "Thank you, your request is sent. We will confirm the date soon.",
  },

  thanks: {
    title: "Thank you, your booking is confirmed.",
    body: "Your payment went through. We will write to confirm the date and time of the service.",
    back: "Back to Happy Homes Thailand",
  },

  cookies: {
    title: "Cookies",
    body: "With your consent, we use Google Analytics and Google Ads to measure visits and the results of our ads. Refusing changes nothing on the site, and you can change your mind at any time.",
    accept: "Accept",
    refuse: "Refuse",
    more: "Learn more",
  },

  notFound: {
    title: "This page does not exist.",
    body: "It may have moved.",
    home: "Back to the home page",
  },

  legal: {
    label: "Legal information",
    updated: (date: string) => `Last updated: ${date}`,
    article: (n: number, title: string) => `Article ${n}. ${title}`,
    toComplete: (what: string) => `[TO COMPLETE: ${what}]`,
    translationNote: "This English text is a translation provided for convenience. The French version is the reference.",
    translationLink: "Read it in French",
  },
};

export default en;
