// /src/i18n/dictionaries/en.ts
// The English version of fr.ts, same shape. Never use the em dash.

import type { Dictionary } from "./fr";

const en: Dictionary = {
  meta: {
    siteName: "KUCHIMOTO",
    home: {
      title: "KUCHIMOTO | One French company, three businesses",
      description:
        "KUCHIMOTO, a French company: Happy Homes (home services in Thailand, Canada and the United States), BambooTails (dog accessories) and Kuchimoto Lab (IT and AI consulting).",
    },
    happyHomes: {
      title: "Happy Homes, home services",
      description:
        "Villa and condo housekeeping, pool and garden upkeep: in Pattaya today, in Bangkok and Canada from July 2028, in Denver and Florida from January 2029.",
    },
    thailand: {
      title: "Happy Homes Thailand, housekeeping and Villa Care in Pattaya",
      description:
        "Fixed-price villa and condo housekeeping in Pattaya, and Villa Care, the monthly package for owners who are away. Book online. Bangkok from July 2028.",
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
      title: "Kuchimoto Lab, IT and AI consulting",
      description:
        "IT and AI consulting, IT subcontracting, managed testers for Google Play and in-house apps, including Ittsui.",
    },
    studio: {
      title: "Kuchimoto Studio, AI agents for creatives",
      description:
        "Kuchimoto Studio, a Kuchimoto Lab offer: autonomous AI agents for creative agencies, brands and entrepreneurs. Product launches, client follow-up, localisation across markets.",
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
      about: "About",
      contact: "Contact",
    },
  },

  footer: {
    tagline: "One French company, three businesses.",
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
    eyebrow: "A French company",
    title: "KUCHIMOTO, one French company, three businesses.",
    intro: "Head office in France. Operations in Thailand, Canada and the United States.",
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
      france: ["France", "Head office"],
      thailand: ["Thailand", "Pattaya today. Bangkok: upcoming, from July 2028"],
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
        status: "Pattaya today. Bangkok: upcoming, July 2028",
        body: "Villa and condo housekeeping, and Villa Care, the monthly package for owners who are away. Book and pay online.",
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
    status: "Pattaya: open. Bangkok: upcoming, from July 2028.",
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
    label: "Technology",
    title: "Kuchimoto Lab",
    intro: "Consulting, development and testing for companies building digital products.",
    photoAlt: "Photo: a developer's workstation",
    servicesTitle: "What we do",
    services: [
      [
        "IT and AI consulting",
        "Choosing an architecture, a cloud provider or an AI model, and putting it in place.",
      ],
      ["IT subcontracting", "Extra technical hands on your projects, for one assignment or for the long run."],
      [
        "Managed testers for Google Play",
        "Google Play asks new personal developer accounts to have their app tested by a group of testers before publishing it. We provide those testers and follow the test.",
      ],
      ["In-house apps", "We also build our own apps, including Ittsui."],
    ],
    ittsui: "Discover Ittsui",
    sprints: {
      title: "Fixed-price sprints",
      intro:
        "A clear deliverable and a price known up front. Write to us: we agree the scope with you, then you get the quote. We reply within 24 hours.",
      items: {
        ai: {
          label: "AI and automation",
          name: "AI or debugging sprint, 48 hours",
          unit: "Per sprint, excl. VAT",
          body: "An AI agent, an automation or a custom script, or a fix for an urgent technical blocker.",
          cta: "Book this sprint",
          mail: {
            subject: "AI or debugging sprint, 48 hours",
            body: "Hello,\n\nI would like to book a 48-hour AI or debugging sprint.\n\nThe need:\nThe tools or code involved:\nDeadline:\n",
          },
        },
        mvp: {
          label: "Development",
          name: "Web or mobile MVP sprint, 7 days",
          unit: "Fixed price, excl. VAT",
          body: "A working prototype, web or mobile, ready for your first users to test.",
          cta: "Start my MVP",
          mail: {
            subject: "Web or mobile MVP sprint, 7 days",
            body: "Hello,\n\nI would like to start an MVP sprint.\n\nThe product in one sentence:\nWeb or mobile:\nPreferred start date:\n",
          },
        },
      },
      note: "Prices excluding VAT, for businesses. Lead times start once the scope is agreed.",
    },
    studio: {
      label: "AI agents for creatives",
      title: "Kuchimoto Studio",
      body: "AI agents that carry out the work around creative work, for agencies, brands and entrepreneurs.",
      cta: "Discover Kuchimoto Studio",
    },
    formTitle: "Tell us about your project",
  },

  studio: {
    label: "A Kuchimoto Lab offer",
    title: "Kuchimoto Studio",
    intro: "AI agents that carry out the work around creative work.",
    lead: "We don't just build chatbots: we deploy autonomous AI agents that handle multi-step creative operations, cross-border localisation and multichannel campaign execution.",
    audit: "Request an audit",
    seePackages: "See the packages",
    photoAlt: "An artist drawing at a worktable in Tokyo, seen from behind.",
    photoCaption: "An artist at work, Tokyo.",
    photoCredit: "Photo: Habib Beaini, Unsplash",
    who: {
      title: "For people who create, and spend too much time on everything else.",
      items: [
        "Creative agencies",
        "Fashion and lifestyle e-commerce brands",
        "Marketing agencies",
        "Independent entrepreneurs and artists",
      ],
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
    packages: {
      title: "Three steps, three packages.",
      intro: "First we find where your time goes, then we build, then we keep the agents running.",
      items: {
        audit: {
          name: "Workflow audit & agent blueprint",
          unit: "One-time, excl. VAT",
          body: "Analysis of your creative and operational bottlenecks, and the design of a custom multi-agent architecture.",
          cta: "Request a 15-minute call",
          mail: {
            subject: "15-minute call: Kuchimoto Studio audit",
            body: "Hello,\n\nI would like a 15-minute call about an audit.\n\nMy business:\nWhat takes up most of my time:\nWhen I am free this week:\n",
          },
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
    prototype: {
      label: "To start",
      title: "An agent prototype in 48 hours",
      body: "In 48 hours we build a working prototype on your most time-consuming task, so you see the agent at work before you commit.",
      unit: "Excl. VAT, deducted from the deployment if you go ahead",
      note: "The 48 hours start once the scope is agreed.",
      cta: "Order the prototype",
      mail: {
        subject: "Agent prototype in 48 hours",
        body: "Hello,\n\nI would like an agent prototype in 48 hours.\n\nMy business:\nThe task for the agent:\nThe tools I use:\n",
      },
    },
    method: {
      title: "Used in our own businesses before yours.",
      items: [
        [
          "Our own brands first",
          "Every agent is first put to work in KUCHIMOTO's own businesses, the BambooTails brand and the Happy Homes services, before it is offered to a client.",
        ],
        [
          "Pilot programme",
          "Our first clients get a pilot deployment at a reduced rate. Write to us to talk it over.",
        ],
      ],
    },
    partOfLab: "Kuchimoto Studio is an offer from Kuchimoto Lab, our IT and AI consulting business.",
    toLab: "Discover Kuchimoto Lab",
    contact: {
      title: "Let's talk about your business.",
      body: "Tell us what you do and what takes up most of your time. We will get back to you to set up the audit.",
      subject: "Kuchimoto Studio",
    },
  },

  about: {
    label: "About",
    title: "Samuel Louissaint, founder",
    intro: "French and Canadian, president of KUCHIMOTO.",
    photoAlt: "Photo: portrait of Samuel Louissaint",
    pathTitle: "Background",
    path: [
      "Technical sales and partner engineering: Google Cloud (via Concentrix, 2025), X (via Teleperformance, 2024), GoDaddy (Barcelona).",
      "Field experience at Gib-San Pools (Toronto): pool construction and renovation.",
      "Visual artist, author of the BambooTails characters.",
    ],
    companyTitle: "The company",
    companyRows: {
      name: "Name",
      form: "Legal form",
      formValue: "Single-shareholder SAS, registration in progress",
      capital: "Share capital",
      office: "Head office",
      registration: "Registration",
    },
  },

  contact: {
    label: "Contact",
    title: "Write to us",
    intro: "Choose the business your message is about: it goes straight to the right person.",
    direct: "Or directly",
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
    privacyNote: "Your data is handled as described in our",
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
    body: "This site only uses cookies it needs to work. If we ever add audience measurement, it will only run with your consent, which you can withdraw at any time.",
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
