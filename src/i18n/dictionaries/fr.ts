// /src/i18n/dictionaries/fr.ts
// Every word the site shows, in French, the site's main language. en.ts
// has the same shape (TypeScript checks it). Write with ordinary spaces:
// the non-breaking spaces of French punctuation are added automatically
// (lib/typography.ts). Never use the em dash: scripts/check-copy.mjs
// fails the build on one.

const fr = {
  meta: {
    siteName: "KUCHIMOTO",
    home: {
      title: "KUCHIMOTO | Une société française, trois métiers",
      description:
        "KUCHIMOTO, société française : Happy Homes (services à domicile en Thaïlande, au Canada et aux États-Unis), BambooTails (accessoires pour chiens) et Kuchimoto Lab (conseil informatique et IA).",
    },
    happyHomes: {
      title: "Happy Homes, services à domicile",
      description:
        "Ménage de villas et de condos, entretien de piscines et de jardins : à Pattaya aujourd'hui, à Bangkok et au Canada à partir de juillet 2028, à Denver et en Floride à partir de janvier 2029.",
    },
    thailand: {
      title: "Happy Homes Thaïlande, ménage et Villa Care à Pattaya",
      description:
        "Ménage de villas et de condos à Pattaya, à prix fixes, et Villa Care, la formule mensuelle pour les propriétaires absents. Réservation en ligne. Bangkok à partir de juillet 2028.",
    },
    canada: {
      title: "Happy Homes Canada, à partir de juillet 2028",
      description:
        "Ménage, nettoyage de bureaux, entretien de piscines, aménagement paysager et déneigement au Canada à partir de juillet 2028. Inscrivez-vous sur la liste d'attente.",
    },
    usa: {
      title: "Happy Homes États-Unis, Denver et Floride",
      description:
        "Ménage et formules piscine et jardin à Denver et en Floride à partir de janvier 2029. Inscrivez-vous sur la liste d'attente.",
    },
    bambootails: {
      title: "BambooTails, accessoires pour chiens",
      description:
        "BambooTails, des accessoires pour chiens nés d'un univers de personnages originaux : bandanas et colliers fabriqués en France.",
    },
    lab: {
      title: "Kuchimoto Lab, conseil informatique et IA",
      description:
        "Conseil informatique et IA, sous-traitance informatique, testeurs encadrés pour Google Play et applications maison, dont Ittsui.",
    },
    about: {
      title: "À propos",
      description:
        "KUCHIMOTO a été fondée par Samuel Louissaint, français et canadien : vente technique et ingénierie partenaires dans la tech, terrain dans la piscine, et dessin.",
    },
    contact: {
      title: "Contact",
      description: "Écrivez à KUCHIMOTO : Happy Homes, BambooTails ou Kuchimoto Lab.",
    },
    bookingThanks: {
      title: "Réservation reçue",
      description: "Votre réservation Happy Homes Thaïlande est enregistrée.",
    },
  },

  nav: {
    label: "Navigation principale",
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer le menu",
    language: "Langue",
    links: {
      home: "Accueil",
      happyHomes: "Happy Homes",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
      about: "À propos",
      contact: "Contact",
    },
  },

  footer: {
    tagline: "Une société française, trois métiers.",
    divisions: "Métiers",
    company: "Société",
    legal: "Informations légales",
    legalLinks: {
      notice: "Mentions légales",
      terms: "CGV Happy Homes",
      privacy: "Confidentialité",
      cookies: "Gérer les cookies",
    },
    trademark: "BAMBOOTAILS est une marque de Samuel Louissaint (INPI n° 5308274), utilisée par KUCHIMOTO.",
    rights: (year: number) => `© ${year} KUCHIMOTO`,
  },

  common: {
    placeholderEmail: "[e-mail]",
    placeholderPhone: "[téléphone]",
    photo: "Photo à venir",
    from: (date: string) => `À partir de ${date}`,
    open: "Ouvert",
    noHousing: "Happy Homes ne fait ni recherche de logement ni gestion locative.",
    visual: "Visuel non contractuel",
    learnMore: "En savoir plus",
    email: "E-mail",
    phone: "Téléphone",
  },

  home: {
    eyebrow: "Société française",
    title: "KUCHIMOTO, une société française, trois métiers.",
    intro: "Siège en France. Activités en Thaïlande, au Canada et aux États-Unis.",
    divisions: {
      happyHomes: {
        label: "Services à domicile",
        body: "Ménage de villas et de condos, entretien de piscines et de jardins. À Pattaya aujourd'hui, puis à Bangkok, au Canada et aux États-Unis.",
        cta: "Découvrir Happy Homes",
      },
      bambootails: {
        label: "Accessoires pour chiens",
        body: "Un univers de personnages originaux, des bandanas et des colliers fabriqués en France.",
        cta: "Découvrir BambooTails",
      },
      lab: {
        label: "Technologie",
        body: "Conseil informatique et IA, sous-traitance, testeurs pour Google Play et applications maison, dont Ittsui.",
        cta: "Découvrir Kuchimoto Lab",
      },
    },
    where: {
      title: "Où nous travaillons",
      france: ["France", "Siège social"],
      thailand: ["Thaïlande", "Pattaya aujourd'hui. Bangkok : à venir, à partir de juillet 2028"],
      canada: ["Canada", "À venir, à partir de juillet 2028"],
      usa: ["États-Unis", "À venir : Denver et Floride, à partir de janvier 2029"],
    },
    contact: {
      title: "Un projet, une question ?",
      body: "Un seul formulaire pour les trois métiers.",
      cta: "Nous écrire",
    },
  },

  happyHomes: {
    label: "Services à domicile",
    title: "Happy Homes",
    intro: "Le ménage, la piscine et le jardin, pris en charge, pays par pays.",
    countriesTitle: "Nos pays",
    countries: {
      thailande: {
        name: "Thaïlande",
        status: "Pattaya aujourd'hui. Bangkok : à venir, juillet 2028",
        body: "Ménage de villas et de condos, et Villa Care, la formule mensuelle pour les propriétaires absents. Réservation et paiement en ligne.",
      },
      canada: {
        name: "Canada",
        status: "À venir, à partir de juillet 2028",
        body: "Ménage, nettoyage de bureaux, entretien de piscines, aménagement paysager et déneigement.",
      },
      "etats-unis": {
        name: "États-Unis",
        status: "À venir : Denver et Floride, janvier 2029",
        body: "Ménage, et formules piscine et jardin.",
      },
    } as Record<string, { name: string; status: string; body: string }>,
    tabsLabel: "Pays",
    more: {
      title: "Autres services",
      intro: "Selon le pays, écrivez-nous pour en parler.",
      items: [
        ["Nettoyage de bureaux", "Des locaux propres, à la fréquence qui vous convient."],
        ["Jardin et aménagement paysager", "L'entretien courant, ou un jardin repensé."],
        ["Conseil en décoration intérieure", "Des conseils pour aménager et décorer votre intérieur."],
        ["Rénovation", "Des travaux de rénovation pour votre maison ou votre appartement."],
        ["Construction et rénovation de piscines", "Une nouvelle piscine, ou la vôtre remise à neuf."],
      ],
      contractors:
        "Les travaux de rénovation et de piscine sont réalisés par des entreprises qualifiées et assurées.",
      cta: "Nous écrire",
    },
  },

  thailand: {
    label: "Happy Homes Thaïlande",
    title: "Ménage et Villa Care à Pattaya",
    status: "Pattaya : ouvert. Bangkok : à venir, à partir de juillet 2028.",
    intro: "Des prix fixes, connus avant de réserver. Les villas sont chiffrées d'après des photos.",
    photoAlt: "Photo : une villa avec piscine à Pattaya",
    prices: {
      title: "Nos prix",
      note: "Prix en bahts thaïlandais.",
      sizes: { studio: "Studio", oneBed: "1 chambre", twoBed: "2 chambres" },
      oneOff: "Ménage ponctuel",
      weekly: "Formule hebdomadaire, par mois",
      villa: "Villas",
      villaValue: (price: string) => `À partir de ${price}, sur devis d'après photos`,
      deepClean: "Grand ménage d'entrée ou de sortie",
      deepCleanNote: "condos jusqu'à 2 chambres",
      aircon: "Nettoyage de climatiseur",
      perUnit: (price: string) => `${price} par appareil`,
    },
    villaCare: {
      title: "Villa Care",
      lead: "Votre villa entretenue pendant votre absence.",
      price: (price: string) => `${price} par mois`,
      items: [
        "Entretien de la piscine",
        "Entretien du jardin",
        "Une visite d'inspection de la maison",
        "Aération de la maison",
        "Un ménage avant votre arrivée",
      ],
    },
  },

  canada: {
    label: "Happy Homes Canada",
    title: "Canada : à venir, à partir de juillet 2028",
    intro: "Inscrivez-vous sur la liste d'attente : vous serez prévenu dès l'ouverture dans votre ville.",
    photoAlt: "Photo : une maison canadienne en hiver",
    servicesTitle: "Services prévus",
    services: [
      "Ménage",
      "Nettoyage de bureaux",
      "Entretien de piscines",
      "Aménagement paysager",
      "Déneigement",
    ],
  },

  usa: {
    label: "Happy Homes États-Unis",
    title: "États-Unis : à venir, Denver et Floride à partir de janvier 2029",
    intro: "Inscrivez-vous sur la liste d'attente : vous serez prévenu dès l'ouverture.",
    photoAlt: "Photo : une maison avec jardin et piscine",
    servicesTitle: "Services prévus",
    services: ["Ménage", "Formules piscine", "Formules jardin"],
  },

  bambootails: {
    label: "Accessoires pour chiens",
    title: "BambooTails",
    intro:
      "Une marque d'accessoires pour chiens née d'un univers de personnages originaux, dessinés par Samuel Louissaint.",
    universe: {
      title: "L'univers",
      body: "Quatorze personnages, de Chiang Mai à Paris, réunis par l'amour du travail bien fait. Ils vivent dans une série de courts épisodes, et sur les bandanas et les colliers de la marque.",
      characters: [
        ["tao", "Tao", "L'héritier"],
        ["lumi", "Lumi", "L'architecte"],
        ["miko", "Miko", "Le tranchant"],
        ["sora", "Sora", "Le teinturier"],
        ["kuma", "Kuma", "Le foyer"],
        ["mochi", "Mochi", "La petite joie"],
      ] as [string, string, string][],
      alt: (name: string) => `${name}, personnage de l'univers BambooTails`,
    },
    products: {
      title: "Les essentiels",
      madeIn: "Fabriqué en France",
      bandana: {
        name: "Bandana Personnages",
        body: "Bandana réversible en coton imprimé aux personnages BambooTails. Deux tailles.",
        alt: "Le Bandana Personnages à plat : coton crème imprimé des personnages BambooTails, revers terracotta",
      },
      collar: {
        name: "Collier Personnages",
        body: "Tissu imprimé sur une sangle résistante, boucle et anneau en D en métal. Trois tailles.",
        alt: "Le Collier Personnages : tissu imprimé aux personnages sur une sangle, boucle et anneau en D en métal",
      },
    },
    shop: "Voir la boutique",
    tiktok: "TikTok Shop",
    external: "(nouvel onglet)",
  },

  lab: {
    label: "Technologie",
    title: "Kuchimoto Lab",
    intro: "Conseil, développement et tests pour les entreprises qui construisent des produits numériques.",
    photoAlt: "Photo : un poste de travail de développeur",
    servicesTitle: "Ce que nous faisons",
    services: [
      [
        "Conseil informatique et IA",
        "Choisir une architecture, un fournisseur cloud ou un modèle d'IA, et le mettre en place.",
      ],
      [
        "Sous-traitance informatique",
        "Un renfort technique sur vos projets, pour une mission ou dans la durée.",
      ],
      [
        "Testeurs encadrés pour Google Play",
        "Google Play demande aux nouveaux comptes de développeur personnels de faire tester leur application par un groupe de testeurs avant de la publier. Nous fournissons ces testeurs et suivons le test.",
      ],
      [
        "Applications maison",
        "Nous développons aussi nos propres applications, dont Ittsui.",
      ],
    ] as [string, string][],
    ittsui: "Découvrir Ittsui",
    formTitle: "Parlez-nous de votre projet",
  },

  about: {
    label: "À propos",
    title: "Samuel Louissaint, fondateur",
    intro: "Français et Canadien, président de KUCHIMOTO.",
    photoAlt: "Photo : portrait de Samuel Louissaint",
    pathTitle: "Parcours",
    path: [
      "Vente technique et ingénierie partenaires : Google Cloud (via Concentrix, 2025), X (via Teleperformance, 2024), GoDaddy (Barcelone).",
      "Expérience de terrain chez Gib-San Pools (Toronto) : construction et rénovation de piscines.",
      "Artiste visuel, auteur des personnages BambooTails.",
    ],
    companyTitle: "La société",
    companyRows: {
      name: "Dénomination",
      form: "Forme",
      formValue: "SAS à associé unique en cours d'immatriculation",
      capital: "Capital",
      office: "Siège",
      registration: "Immatriculation",
    },
  },

  contact: {
    label: "Contact",
    title: "Nous écrire",
    intro: "Choisissez le métier concerné : votre message arrive directement à la bonne personne.",
    direct: "Ou directement",
  },

  forms: {
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    optional: "facultatif",
    message: "Message",
    company: "Entreprise",
    city: "Ville",
    division: "Métier concerné",
    divisionChoose: "Choisissez",
    divisions: {
      "hh-thailand": "Happy Homes Thaïlande",
      "hh-canada": "Happy Homes Canada",
      "hh-usa": "Happy Homes États-Unis",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
    } as Record<string, string>,
    projectType: "Type de projet",
    projectTypes: {
      consulting: "Conseil informatique et IA",
      subcontracting: "Sous-traitance informatique",
      testers: "Testeurs pour Google Play",
      app: "Application",
      other: "Autre",
    } as Record<string, string>,
    services: "Services qui vous intéressent",
    location: "Lieu",
    locations: { denver: "Denver", florida: "Floride" } as Record<string, string>,
    consent: "J'accepte que mes données soient utilisées pour traiter ma demande, comme décrit dans la",
    privacyLink: "politique de confidentialité",
    send: "Envoyer",
    join: "Rejoindre la liste d'attente",
    sending: "Envoi…",
    success: {
      contact: "Merci, votre message est envoyé. Nous vous répondons rapidement.",
      waitlist: "Merci, vous êtes sur la liste d'attente. Nous vous écrirons à l'ouverture.",
      project: "Merci, votre projet est bien reçu. Nous vous répondons rapidement.",
    },
    errors: {
      invalid: "Vérifiez les champs signalés.",
      required: "Ce champ est obligatoire.",
      email: "Cette adresse e-mail ne semble pas valide.",
      rate_limited: "Trop d'envois en peu de temps. Réessayez dans quelques minutes.",
      not_configured: "L'envoi en ligne n'est pas encore ouvert. Écrivez-nous directement.",
      server: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement.",
      network: "Pas de connexion. Vérifiez votre réseau et réessayez.",
      payment: "Le paiement n'a pas pu démarrer. Réessayez, ou écrivez-nous.",
    } as Record<string, string>,
  },

  booking: {
    title: "Réserver",
    intro: "Choisissez le service et la date. Pour une prestation à prix fixe, vous payez par carte à la réservation.",
    /** While card payment is not open: bookings are requests. */
    introRequest: "Choisissez le service et la date. Nous confirmons votre demande par e-mail.",
    service: "Service",
    services: {
      oneOff: "Ménage ponctuel",
      weekly: "Formule hebdomadaire (premier mois)",
      deepClean: "Grand ménage d'entrée ou de sortie",
      aircon: "Nettoyage de climatiseurs",
      villaCare: "Villa Care (premier mois)",
      villaQuote: "Ménage de villa (devis d'après photos)",
    } as Record<string, string>,
    size: "Logement",
    sizes: { studio: "Studio", oneBed: "1 chambre", twoBed: "2 chambres" } as Record<string, string>,
    units: "Nombre de climatiseurs",
    date: "Date souhaitée",
    dateHint: "À partir de demain.",
    time: "Moment de la journée",
    times: { morning: "Matin", afternoon: "Après-midi" } as Record<string, string>,
    address: "Adresse à Pattaya",
    notes: "Précisions",
    notesHint: "Accès, animaux, points à soigner.",
    total: "Total",
    quoteNote: "Pour une villa, nous vous envoyons un devis d'après vos photos : rien n'est payé maintenant.",
    monthlyNote: "Pour une formule mensuelle, vous payez ici le premier mois.",
    terms: "J'accepte les",
    termsLink: "conditions générales de vente",
    privacyNote: "Vos données sont traitées comme décrit dans notre",
    waiver:
      "Je demande que la prestation commence avant la fin du délai de rétractation de 14 jours, et je reconnais perdre mon droit de rétractation une fois la prestation entièrement exécutée.",
    /** {total} is replaced by the amount. */
    pay: "Payer {total} par carte",
    request: "Envoyer la demande",
    paymentSoon:
      "Le paiement par carte en ligne ouvrira prochainement. Envoyez votre demande : nous la confirmons et vous envoyons le lien de paiement.",
    secure: "Paiement sécurisé par Stripe. Vos données de carte ne nous sont jamais transmises.",
    requestDone: "Merci, votre demande est envoyée. Nous vous confirmons la date rapidement.",
  },

  thanks: {
    title: "Merci, votre réservation est enregistrée.",
    body: "Votre paiement est accepté. Nous vous écrivons pour confirmer la date et l'heure de la prestation.",
    back: "Retour à Happy Homes Thaïlande",
  },

  cookies: {
    title: "Cookies",
    body: "Ce site n'utilise que des cookies nécessaires à son fonctionnement. Si nous ajoutons un jour une mesure d'audience, elle ne fonctionnera qu'avec votre accord, que vous pouvez retirer à tout moment.",
    accept: "Accepter",
    refuse: "Refuser",
    more: "En savoir plus",
  },

  notFound: {
    title: "Cette page n'existe pas.",
    body: "Elle a peut-être changé d'adresse.",
    home: "Retour à l'accueil",
  },

  legal: {
    label: "Informations légales",
    updated: (date: string) => `Dernière mise à jour : ${date}`,
    article: (n: number, title: string) => `Article ${n}. ${title}`,
    toComplete: (what: string) => `[À COMPLÉTER : ${what}]`,
    translationNote: "",
    translationLink: "",
  },
};

export type Dictionary = typeof fr;
export default fr;
