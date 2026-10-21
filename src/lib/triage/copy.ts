// /src/lib/triage/copy.ts
// The words of the triage demo (/demo-triage, /en/demo-triage): the page,
// the tool and the brief, in French and English. Imported by the client
// components themselves, since some entries are functions. French gets its
// punctuation spacing from withFrenchSpacing, as the dictionaries do.

import { withFrenchSpacing } from "@/lib/typography";
import { SAMPLE_INBOX, SAMPLE_INBOX_EN } from "./sample";

export type DemoLang = "fr" | "en";

const fr = withFrenchSpacing({
  page: {
    label: "Démonstration",
    title: "Démo Kuchimoto : Agent IA de Triage Exécutif & Gouvernance SI",
    intro:
      "Collez vos e-mails ou une capture de votre boîte de réception : l'agent les trie et en tire un brief exécutif de trois minutes.",
    description:
      "Démonstration de l'agent de triage exécutif de Kuchimoto : collez vos e-mails ou une capture de boîte mail, obtenez un brief avec priorités, dates limites et actions.",
    sandbox: {
      label: "Environnement isolé (Sandbox)",
      body: "Synthèse automatisée des flux sans connexion intrusive à vos serveurs métiers.",
      note: "Par défaut, la lecture et l'analyse se font dans votre navigateur : vos e-mails et vos captures ne sont envoyés nulle part, et rien n'est conservé. Seul ce que vous saisissez dans le formulaire nous est envoyé.",
    },
    tool: {
      title: "Testez l'agent sur vos vrais emails maintenant",
      intro: "Trois façons de commencer : vos e-mails copiés, une capture de votre boîte de réception, ou un exemple.",
    },
    afterBrief: {
      title: "Vous le voulez sur votre vraie boîte mail ?",
      body: "Un pilote sur votre propre flux en 48 heures : {price}, déduits si vous poursuivez.",
    },
    pilot: {
      title: "Un pilote sur votre périmètre",
      intro: "Dites-nous quels flux vous submergent. Nous revenons vers vous sous 24 heures pour cadrer un pilote.",
    },
  },
  tool: {
    tabs: { text: "Coller mes e-mails (texte brut)", image: "Capture d'écran de boîte mail", sample: "Charger un exemple réel" },
    tablist: "Source des e-mails",
    localMode: "Analyse locale, dans votre navigateur : rien n'a été envoyé.",
    aiMode: (provider: string) => `Analyse IA (${provider}).`,
    aiFailed: " L'analyse IA n'a pas abouti : voici le résultat du moteur local.",
    imageTypes: "Formats acceptés : PNG, JPG ou WebP.",
    imageTooLarge: "Image trop lourde (15 Mo au maximum).",
    stillReading: "La capture est encore en cours de lecture.",
    nothingRead: "Aucun texte lu sur la capture. Essayez une capture plus nette, ou collez le texte.",
    nothingPasted: "Collez d'abord des e-mails, ajoutez une capture, ou chargez l'exemple.",
    noEmail: "Aucun e-mail reconnu. Collez des lignes de votre boîte de réception, ou un e-mail complet avec De et Objet.",
    textLabel: "Collez vos e-mails",
    textHint:
      "Dans Gmail ou Outlook, sélectionnez 10 à 100 lignes de la boîte de réception (ou Ctrl+A), copiez avec Ctrl+C et collez ici. Les fils complets (De, Objet, Date) fonctionnent aussi.",
    textPlaceholder: "Expéditeur\tObjet - extrait du message\t10:42\n…",
    previewAlt: "Votre capture de boîte de réception",
    drop: "Glissez une capture ici, collez-la (Ctrl+V) ou cliquez pour la choisir",
    dropHint: "Capture de Gmail ou d'Outlook, en PNG, JPG ou WebP.",
    ocrLoading: "Chargement de la lecture de texte (une fois par visite)…",
    ocrReading: (percent: number) => `Lecture de la capture… ${percent} %`,
    ocrError: "La capture n'a pas pu être lue. Essayez une autre image, ou collez le texte.",
    ocrText: (lines: number) => `Texte lu sur la capture (${lines} lignes) : vérifier ou corriger`,
    ocrTextLabel: "Texte lu sur la capture",
    sampleBody:
      "Quinze e-mails bruts, tels que Gmail les donne quand on copie des lignes de la boîte de réception (expéditeurs fictifs). Ils sont placés dans la zone de texte et analysés aussitôt.",
    sampleButton: "Charger les 15 e-mails d'exemple",
    aiConsent: (provider: string) =>
      `Analyse approfondie par IA (${provider}). Le contenu est alors envoyé à ce prestataire pour l'analyse ; KUCHIMOTO ne le conserve pas.`,
    analyzing: "Analyse en cours…",
    analyze: "Analyser et résumer mes emails →",
    aiNote: "Le contenu sera envoyé pour l'analyse par IA.",
    localNote: "Tout se passe dans votre navigateur : vos e-mails et captures ne sont envoyés nulle part.",
  },
  brief: {
    title: "Votre brief exécutif",
    counters: { total: "E-mails analysés", actions: "Actions requises", info: "Informations", noise: "Bruit & promos filtrés" },
    minutes: (minutes: number) => `Environ ${minutes} min de lecture évitées (estimation).`,
    priorities: "🔴 Priorités & Dates limites",
    noPriorities: "Aucune priorité ni date limite repérée.",
    follow: "🟡 Suivi & Sécurité",
    noFollow: "Rien à suivre.",
    noise: "⚪ Bruit, Newsletters & Promos écartés",
    noiseNote: "Écartés automatiquement : inutile de les ouvrir.",
    noNoise: "Aucun bruit repéré.",
    deadline: "Date limite :",
    action: "Action :",
    /** Between a sender and its one-line summary. */
    colon: " :",
    showLess: "Réduire",
    showAll: (count: number) => `Afficher les ${count}`,
  },
  sample: SAMPLE_INBOX,
});

export type DemoCopy = typeof fr;

const en: DemoCopy = {
  page: {
    label: "Demo",
    title: "Kuchimoto demo: Executive Triage AI Agent & IT Governance",
    intro:
      "Paste your emails or a screenshot of your inbox: the agent sorts them and writes a three-minute executive brief.",
    description:
      "A demo of Kuchimoto's executive triage agent: paste your emails or an inbox screenshot and get a brief with priorities, deadlines and next steps.",
    sandbox: {
      label: "Isolated environment (sandbox)",
      body: "Automated summaries of your email flows, with no intrusive connection to your business systems.",
      note: "By default, reading and analysis happen in your browser: your emails and screenshots are sent nowhere, and nothing is kept. Only what you type into the form is sent to us.",
    },
    tool: {
      title: "Try the agent on your real emails now",
      intro: "Three ways to start: your copied emails, a screenshot of your inbox, or a sample.",
    },
    afterBrief: {
      title: "Want this on your real inbox?",
      body: "A pilot on your own workflow in 48 hours: {price}, deducted if you continue.",
    },
    pilot: {
      title: "A pilot on your own workflow",
      intro: "Tell us which email flows overwhelm you. We reply within 24 hours to scope a pilot.",
    },
  },
  tool: {
    tabs: { text: "Paste my emails (plain text)", image: "Inbox screenshot", sample: "Load a real sample" },
    tablist: "Where the emails come from",
    localMode: "Local analysis, in your browser: nothing was sent.",
    aiMode: (provider: string) => `AI analysis (${provider}).`,
    aiFailed: " The AI analysis did not complete: here is the local engine's result.",
    imageTypes: "Accepted formats: PNG, JPG or WebP.",
    imageTooLarge: "Image too large (15 MB at most).",
    stillReading: "The screenshot is still being read.",
    nothingRead: "No text was read from the screenshot. Try a sharper one, or paste the text.",
    nothingPasted: "Paste some emails first, add a screenshot, or load the sample.",
    noEmail: "No email recognised. Paste rows from your inbox, or a whole email with From and Subject.",
    textLabel: "Paste your emails",
    textHint:
      "In Gmail or Outlook, select 10 to 100 inbox rows (or Ctrl+A), copy with Ctrl+C and paste here. Whole threads (From, Subject, Date) work too.",
    textPlaceholder: "Sender\tSubject - message excerpt\t10:42\n…",
    previewAlt: "Your inbox screenshot",
    drop: "Drop a screenshot here, paste it (Ctrl+V) or click to choose it",
    dropHint: "A Gmail or Outlook screenshot, in PNG, JPG or WebP.",
    ocrLoading: "Loading text recognition (once per visit)…",
    ocrReading: (percent: number) => `Reading the screenshot… ${percent}%`,
    ocrError: "The screenshot could not be read. Try another image, or paste the text.",
    ocrText: (lines: number) => `Text read from the screenshot (${lines} lines): check or correct it`,
    ocrTextLabel: "Text read from the screenshot",
    sampleBody:
      "Fifteen raw emails, as Gmail gives them when you copy inbox rows (fictional senders). They are placed in the text box and analysed straight away.",
    sampleButton: "Load the 15 sample emails",
    aiConsent: (provider: string) =>
      `In-depth AI analysis (${provider}). The content is then sent to this provider for the analysis; KUCHIMOTO does not keep it.`,
    analyzing: "Analysing…",
    analyze: "Analyse and summarise my emails →",
    aiNote: "The content will be sent for the AI analysis.",
    localNote: "Everything happens in your browser: your emails and screenshots are sent nowhere.",
  },
  brief: {
    title: "Your executive brief",
    counters: { total: "Emails analysed", actions: "Actions required", info: "Information", noise: "Noise & promos filtered" },
    minutes: (minutes: number) => `About ${minutes} min of reading saved (estimate).`,
    priorities: "🔴 Priorities & Deadlines",
    noPriorities: "No priority or deadline found.",
    follow: "🟡 Follow-up & Security",
    noFollow: "Nothing to follow up.",
    noise: "⚪ Noise, Newsletters & Promos set aside",
    noiseNote: "Set aside automatically: no need to open them.",
    noNoise: "No noise found.",
    deadline: "Deadline:",
    action: "Action:",
    colon: ":",
    showLess: "Show less",
    showAll: (count: number) => `Show all ${count}`,
  },
  sample: SAMPLE_INBOX_EN,
};

export function demoCopy(lang: DemoLang): DemoCopy {
  return lang === "en" ? en : fr;
}
