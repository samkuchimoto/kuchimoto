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
      title: "KUCHIMOTO | Groupe & studio international",
      description:
        "KUCHIMOTO, groupe & studio international : Happy Homes (services à domicile en Thaïlande, au Canada et aux États-Unis), BambooTails (accessoires pour chiens) et Kuchimoto Lab (conseil informatique et IA).",
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
      title: "Agents IA, automatisation n8n et Make, MVP | Kuchimoto Lab",
      description:
        "Agents IA sur mesure, workflows n8n et Make, MVP web et mobile. Prototype fonctionnel en 48 heures pour 490 €, déduit si vous poursuivez.",
    },
    studio: {
      title: "Agents IA pour marques créatives, dirigés par un peintre | Kuchimoto Studio",
      description:
        "Agents IA pour marques créatives, dirigés par un peintre : fiches produits, variantes publicitaires et localisation, dans le style de votre marque. Prototype fonctionnel en 48 heures pour 490 €, déduit si vous poursuivez.",
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
    thankYou: {
      title: "Demande reçue",
      description: "Votre demande est bien reçue : vous recevrez un prix fixe sous 24 heures.",
    },
    pay: {
      title: "Payer le prototype IA en 48 heures",
      description: "Prototype IA en 48 heures, 490 € prix fixe, déduit du projet complet si vous poursuivez.",
    },
    paymentSuccess: {
      title: "Paiement reçu",
      description: "Votre paiement du prototype IA en 48 heures.",
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
      ittsui: "Ittsui",
      about: "À propos",
      contact: "Contact",
    },
  },

  footer: {
    tagline: "Groupe & studio international.",
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
    eyebrow: "Groupe & studio international",
    title: "KUCHIMOTO, groupe & studio international.",
    intro: "KUCHIMOTO LLC (Wyoming, États-Unis), en cours de création.",
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
      france: ["France", "Studio"],
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
        status: "Pattaya : opérationnel aujourd'hui · Autres villes prochainement",
        body: "Une plateforme de gestion de la maison opérée par KUCHIMOTO LLC (Wyoming, États-Unis), en cours de création. Fini les femmes de ménage, piscinistes et jardiniers à gérer séparément : un seul abonnement, des équipes partenaires locales vérifiées, et des photos de contrôle après chaque passage.",
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
    liveSite: "Accéder à Happy Homes Thailand (happyhomesthailand.com)",
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
    bookOnline: "Réserver sur happyhomesthailand.com",
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
    label: "Kuchimoto Lab",
    title: "Agents IA, automatisation et MVP. Prix fixe, livraison rapide.",
    intro:
      "Nous concevons des agents IA sur mesure, des workflows n8n et Make, et des MVP web et mobile. Commencez par un prototype fonctionnel en 48 heures pour {price}, déduit du projet complet si vous poursuivez.",
    demoLink: "Essayer la démo de triage en direct",
    demoLang: "",
    prototype: {
      title: "Engagez un développeur d'agents IA et d'automatisation",
      cards: {
        agent: {
          title: "Prototype IA en 48 heures : {price}, prix fixe",
          body: "Un agent IA ou une automatisation qui fonctionne, sur votre tâche la plus chronophage. Les {price} sont déduits du projet complet si vous poursuivez.",
          cta: "Commencer avec {price}",
        },
        mvp: {
          title: "Sprint MVP web ou mobile : à partir de {price}",
          body: "Un produit fonctionnel pour vos premiers utilisateurs en 7 jours.",
          cta: "Cadrer mon MVP",
        },
        whitelabel: {
          title: "Marque blanche pour les agences",
          body: "Nous développons sous votre marque. Vous gardez le client et la marge. Prix fixe par sprint.",
          cta: "Devenir partenaire",
        },
      },
      also: "Également disponibles : conseil IT et IA, sous-traitance informatique, testeurs Google Play encadrés.",
    },
    how: {
      title: "Comment ça marche",
      steps: [
        "Décrivez-nous la tâche. Cela prend 2 minutes.",
        "Prix fixe et périmètre sous 24 heures.",
        "Prototype fonctionnel 48 heures après votre accord, puis vous décidez.",
      ],
    },
    demo: {
      label: "Démo en direct",
      title: "Un agent de triage IA, sur vos propres e-mails",
      body: "Collez vos e-mails ou une capture de votre boîte de réception : l'agent les trie et en tire un brief exécutif de trois minutes. L'analyse se fait dans votre navigateur.",
      cta: "Essayer la démo de triage en direct",
    },
    notesIntro:
      "Proposition d'architecture présentée au responsable du numérique d'un grand organisme français de transport public (2026) : un agent de triage exécutif et un modèle de gares de Paris à Tokyo.",
    ittsui: {
      title: "Ittsui, notre application",
      body: "Conçue, développée et lancée en interne. Ittsui propose chaque semaine un rendez-vous avec vos proches, validé en un clic, sans compte ni application pour les invités. En accès anticipé.",
      cta: "Voir Ittsui",
    },
    contactTitle: "Décrivez-nous la tâche. Recevez un prix fixe sous 24 heures.",
  },

  studio: {
    label: "Kuchimoto Studio",
    title: "Des agents IA pour les marques créatives, dirigés par un peintre.",
    intro:
      "Fiches produits, variantes publicitaires et localisation, confiées à des agents qui gardent le style de votre marque. Commencez par un prototype fonctionnel en 48 heures pour {price}, déduit si vous poursuivez.",
    art: {
      title: "L'œil derrière les agents",
      body: "Dix ans de peinture et d'illustration. Chaque agent que nous livrons est jugé par le même œil.",
      caption: "Samuel Louissaint",
      alts: [
        "Samouraï en kimono rouge tenant un sabre, avec un texte manuscrit",
        "Portrait en rouge et rose sur un fond bleu profond",
        "Peinture abstraite en rouge, blanc et bleu",
        "Peinture abstraite verte aux lignes noires",
        "Cercle orange et silhouette blanche sur fond noir",
        "Visage en noir, blanc et rouge",
        "Abstraction dense de traits rouges, noirs et verts",
        "Abstraction verte avec une forme orange",
      ],
      open: "Agrandir",
      close: "Fermer",
      prev: "Œuvre précédente",
      next: "Œuvre suivante",
      dialog: "Œuvres de Samuel Louissaint",
    },
    agentsTitle: "Les agents",
    agents: [
      [
        "Pour les fondateurs",
        "Lancement et marque",
        "Part d'une idée de produit et coordonne le lancement : création des visuels, fiches produit pour la boutique en ligne et TikTok Shop, variantes publicitaires, suivi des étapes de conformité.",
      ],
      [
        "Pour les artistes et indépendants",
        "Clients et contrats",
        "Suit les étapes de chaque projet, rédige les propositions commerciales, gère les relances et déclenche la facturation de base.",
      ],
      [
        "Pour les marques à l'international",
        "Marchés internationaux",
        "Traduit, localise et adapte vos textes et vos parcours de vente pour chaque marché, avec le ton attendu à Paris, à Tokyo ou aux États-Unis.",
      ],
    ] as [string, string, string][],
    prototype: {
      label: "Pour commencer",
      title: "Un prototype d'agent en 48 heures",
      body: "Nous construisons en 48 heures un prototype fonctionnel sur votre tâche la plus chronophage : vous voyez l'agent travailler avant de vous engager.",
      unit: "HT, déduits du déploiement si vous continuez",
      note: "Les 48 heures commencent une fois le périmètre validé.",
      cta: "Commander le prototype",
    },
    packages: {
      title: "Trois étapes, trois formules.",
      intro: "On commence par comprendre où part votre temps, puis on construit, puis on fait vivre les agents.",
      items: {
        audit: {
          name: "Audit et plan d'agents",
          unit: "HT, une fois",
          body: "Analyse de vos blocages créatifs et opérationnels, et plan d'une architecture d'agents sur mesure.",
          cta: "Demander un appel de 15 minutes",
        },
        deployment: {
          name: "Déploiement sur mesure",
          unit: "HT, au projet",
          body: "Conception et intégration d'agents adaptés à vos outils : reprise de contenus, localisation multilingue, accueil des clients.",
        },
        monthly: {
          name: "Suivi mensuel des agents",
          unit: "HT, par mois",
          body: "Surveillance, ajustement des instructions, maintenance des API et montée en charge des agents.",
        },
      },
      note: "Le prix exact dépend du périmètre, fixé ensemble après l'audit.",
    },
    pilot: [
      "Programme pilote",
      "Les premiers clients bénéficient d'un déploiement pilote à tarif réduit. Écrivez-nous pour en parler.",
    ] as [string, string],
    toLab: { text: "Besoin d'une automatisation ou d'une application ?", link: "Voir Kuchimoto Lab" },
  },

  /** Under the Lab and Studio titles: the two things to see first. */
  proof: {
    label: "Preuves",
    items: [
      "Ittsui : notre application en ligne, développée en interne",
      "Démo de triage IA en direct, sur vos propres e-mails",
      "Proposition présentée à un responsable du numérique du transport public français",
      "Réponse sous 24 heures",
    ],
  },

  /** On /lab and /studio: proposals and studies, not client work. */
  notes: {
    title: "Architectures proposées & Notes stratégiques",
    tags: ["Transport public francilien · SI voyageurs", "Gares · Modèle Tokyo"],
    caseTitle: "Mobilité urbaine & écosystèmes de gares (Paris ↔ Tokyo)",
    contextLabel: "Contexte",
    context:
      "Étude d'architecture autour des systèmes d'information voyageurs d'un réseau multi-opérateurs ouvert à la concurrence, et des gares de demain en Île-de-France.",
    problemLabel: "Problématique",
    problem:
      "Des directions digitales saturées par la coordination multi-opérateurs, et des commerces de gares moins exploités numériquement qu'au Japon (ekinaka, Tokyo).",
    proposalLabel: "Architecture proposée par Kuchimoto",
    demoLink: "Voir la démo de cet agent",
    proposals: [
      [
        "Agent IA de triage exécutif & gouvernance SI",
        "Filtrage, synthèse quotidienne et routage automatisé des alertes opérateurs/SI pour libérer les chefs de département de la surcharge email.",
      ],
      [
        "Pont Paris–Tokyo pour les gares de demain",
        "Transposition des parcours numériques des gares de Tokyo (services locaux, flux temps réel, fidélisation locale) aux gares franciliennes.",
      ],
    ] as [string, string][],
  },

  lead: {
    email: "E-mail professionnel",
    needLabel: "De quoi avez-vous besoin ?",
    needs: {
      agent: "Agent IA ou automatisation",
      mvp: "MVP web ou mobile",
      creative: "IA créative pour ma marque",
      whitelabel: "Marque blanche pour mon agence",
      other: "Autre chose",
    },
    submit: "Obtenir mon prix fixe",
    notice: "Réponse sous 24 heures. Pas de newsletter. Vos coordonnées servent uniquement à vous répondre.",
    privacyLink: "Politique de confidentialité",
    step2: "Étape 2 sur 2",
    name: "Nom",
    company: "Entreprise ou site web",
    optional: "facultatif",
    message: "Que devons-nous construire ou automatiser ?",
    messagePlaceholder: "Exemple : nous passons 6 heures par semaine à rédiger des fiches produits en 3 langues.",
    budgetLabel: "Budget",
    budgets: { prototype: "D'abord le prototype à {price}", unsure: "Je ne sais pas encore" },
    timelineLabel: "Délai",
    timelines: { week: "Cette semaine", month: "Ce mois-ci", exploring: "Je me renseigne" },
    send: "Envoyer ma demande",
    sending: "Envoi…",
    errors: {
      email: "Indiquez une adresse e-mail valide.",
      need: "Choisissez ce dont vous avez besoin.",
      name: "Indiquez votre nom.",
      invalid: "Vérifiez les champs signalés.",
      rate_limited: "Trop d'envois en peu de temps. Réessayez dans quelques minutes.",
      server: "L'envoi n'a pas abouti. Réessayez, ou écrivez à {email}.",
      network: "Pas de connexion. Vérifiez votre réseau et réessayez.",
    },
  },
  cta: {
    header: "Prototype en 48 heures",
    bar: "Prototype en 48 heures · {price}",
  },
  thankYou: {
    title: "Bien reçu. Vous recevrez un prix fixe sous 24 heures.",
    book: "Gagnez du temps : réservez 15 minutes maintenant",
    next: "La suite",
    steps: [
      "Vous recevez un prix fixe et un périmètre par e-mail sous 24 heures.",
      "Après votre accord, votre prototype est prêt en 48 heures.",
      "Vous décidez de poursuivre ou non. Les {price} sont déduits si vous poursuivez.",
    ],
  },
  homeStrip: {
    text: "Besoin d'IA ou d'une application ? Un prototype fonctionnel en 48 heures pour {price}.",
    cta: "Voir Kuchimoto Lab",
  },
  founder: {
    title: "Qui le construit",
    body: "Samuel Louissaint, fondateur. Développeur (RNCP web et mobile, 2021), avec un parcours en ingénierie partenaires et en vente technique sur les programmes Google Cloud IA/ML, X et GoDaddy, et peintre depuis dix ans. Je développe moi-même et fais appel à des spécialistes de confiance de mon réseau, en France, en Israël et en Asie, quand un projet demande plus de bras.",
    photoAlt: "Samuel Louissaint",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      ["Les {price} sont-ils vraiment déduits ?", "Oui, du projet complet si vous poursuivez."],
      ["À qui appartient le code ?", "À vous, une fois payé."],
      ["Signez-vous des accords de confidentialité (NDA) ?", "Oui."],
      [
        "Quels outils utilisez-vous ?",
        "n8n, Make, les API d'OpenAI et d'Anthropic, Python, JavaScript et TypeScript, et des frameworks web et mobile.",
      ],
      [
        "Où êtes-vous basés ?",
        "À Paris, en travaillant à distance avec des clients en Europe et en Asie. Facturation depuis la France.",
      ],
      ["En combien de temps répondez-vous ?", "Sous 24 heures."],
    ] as [string, string][],
  },
  pay: {
    button: "Payer {price} et démarrer",
    label: "Paiement",
    title: "Prototype IA en 48 heures",
    summary: "Un prototype fonctionnel sur votre tâche en 48 heures. Déduit du projet complet si vous poursuivez.",
    price: "{price}, prix fixe",
    secure: "Paiement traité par Stripe.",
    loading: "Chargement du paiement…",
    error: "Le paiement n'a pas pu se charger. Réessayez dans un instant.",
    closed: "Le paiement en ligne n'est pas encore ouvert. Décrivez-nous la tâche : nous répondons sous 24 heures.",
    closedLink: "Décrire ma tâche",
    success: "Paiement reçu. Je vous écris sous 24 heures pour démarrer votre prototype.",
    pending: "Ce paiement n'est pas finalisé.",
    retry: "Revenir au paiement",
  },
  about: {
    label: "À propos",
    title: "Samuel Louissaint, fondateur",
    intro: "Français et Canadien, fondateur de KUCHIMOTO.",
    photoAlt: "Photo : portrait de Samuel Louissaint",
    pathTitle: "Parcours",
    path: [
      "Vente technique et ingénierie partenaires : Google Cloud (via Concentrix, 2025), X (via Teleperformance, 2024), GoDaddy (Barcelone).",
      "Expérience de terrain chez Gib-San Pools (Toronto) : construction et rénovation de piscines.",
      "Artiste visuel, auteur des personnages BambooTails.",
    ],
    companyTitle: "Éditeur du site",
    companyRows: {
      name: "Nom",
      status: "Statut",
      company: "Société",
      address: "Adresse",
    },
  },

  contact: {
    label: "Contact",
    title: "Nous écrire",
    intro: "Choisissez le métier concerné : votre message arrive directement à la bonne personne.",
    direct: "Ou directement",
    studio: "Kuchimoto Studio",
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
    /** What follows the link: a full stop here, a whole clause in Japanese. */
    consentEnd: ".",
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
    alsoOn: "Vous pouvez aussi réserver sur le site de Happy Homes Thaïlande :",
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
    termsEnd: ".",
    privacyNote: "Vos données sont traitées comme décrit dans notre",
    privacyNoteEnd: ".",
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
    body: "Avec votre accord, nous utilisons Google Analytics et Google Ads pour mesurer les visites et les résultats de nos annonces. Refuser ne change rien au site, et vous pouvez changer d'avis à tout moment.",
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
