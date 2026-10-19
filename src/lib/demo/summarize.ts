// /src/lib/demo/summarize.ts
// The "Tester sur un message réel" box on /demo-triage: a three-line
// executive summary (Constat, Impact, Décision recommandée) built in the
// visitor's browser by simple rules. It stands in for the real agent,
// which uses an AI model; the page says so, and the text is sent nowhere.

export type Urgency = "high" | "medium" | "info";

export type Summary = { urgency: Urgency; finding: string; impact: string; decision: string };

const URGENCY_LABEL: Record<Urgency, string> = {
  high: "Urgence haute",
  medium: "Urgence moyenne",
  info: "Info",
};

// Lower-case fragments, matched anywhere in the text.
const HIGH = [
  "urgent", "urgence", "immédiat", "critique", "panne", "interruption", "interrompu", "bloqué", "bloquant",
  "hors service", "sécurité", "incident", "asap", "outage", "critical", "blocked",
];
const MEDIUM = [
  "retard", "écart", "arbitr", "valider", "validation", "décision", "décider", "planifier", "priorit",
  "délai", "relance", "conflit", "contradictoire", "dépassement", "delay", "decide", "approve", "priority",
];
const FACT = [...HIGH, "retard", "écart", "erreur", "échec", "problème", "anomalie", "dysfonctionnement", "delay", "error", "issue"];
const REQUEST = [
  "?", "merci de", "pouvez-vous", "pourriez-vous", "peux-tu", "pourrais-tu", "il faut", "à valider", "à arbitrer",
  "besoin", "demande", "souhait", "please", "could you", "can you", "need",
];
const DOMAINS: [string[], string][] = [
  [["voyageur", "usager", "client", "passager", "passenger", "customer"], "des voyageurs ou des clients"],
  [["système", "serveur", "flux", "application", "appli", "api", "données", "supervision", "system", "server", "data"], "un service ou un système"],
  [["budget", "coût", "contrat", "facture", "paiement", "pénalit", "cost", "invoice", "contract"], "le budget ou un contrat"],
  [["équipe", "planning", "sprint", "ressource", "team", "schedule"], "la charge des équipes ou le planning"],
];
const GREETING = /^(bonjour|bonsoir|hello|hi|salut|cher|chère|madame|monsieur|cordialement|bien à vous|bien cordialement|merci( d'avance| beaucoup)?[\s,.!]*$|regards|best|thanks|thank you)/i;
const DEADLINE =
  /\b(avant|d'ici|pour|before|by)\s+((?:\d{1,2}\s?h(?:\s?\d{2})?)|(?:\d{1,2}:\d{2})|midi|ce soir|demain|ce matin|la fin de (?:la )?journée|lundi|mardi|mercredi|jeudi|vendredi|end of day|tomorrow|tonight|noon)/i;

const has = (text: string, words: string[]) => words.some((word) => text.includes(word));

function shorten(sentence: string, max = 170): string {
  const clean = sentence.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max)).replace(/[,;:]$/, "")}…`;
}

const withStop = (sentence: string) => (/[.!?…]$/.test(sentence) ? sentence : `${sentence}.`);

export function summarize(raw: string): Summary | null {
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith(">") && !GREETING.test(line));
  let subject = "";
  const body: string[] = [];
  for (const line of lines) {
    const match = line.match(/^(objet|subject|sujet)\s*:\s*(.+)$/i);
    if (match && !subject) subject = match[2];
    else if (!/^(de|from|à|to|cc|date)\s*:/i.test(line)) body.push(line);
  }
  const sentences = body
    .flatMap((line) => line.match(/[^.!?]+[.!?]*/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 3);
  if (!sentences.length && !subject) return null;

  const all = `${subject} ${sentences.join(" ")}`.toLowerCase();
  const urgency: Urgency = has(all, HIGH) ? "high" : has(all, MEDIUM) ? "medium" : "info";

  const factual = sentences.find((sentence) => has(sentence.toLowerCase(), FACT));
  const finding = withStop(shorten(factual || subject || sentences[0]));

  const domains = DOMAINS.filter(([words]) => has(all, words)).map(([, label]) => label).slice(0, 2);
  const impact =
    domains.length > 0
      ? `${URGENCY_LABEL[urgency]} : touche ${domains.join(", et ")}.`
      : urgency === "info"
        ? "Info : aucun effet opérationnel détecté."
        : `${URGENCY_LABEL[urgency]} : impact à confirmer auprès de l'équipe concernée.`;

  const request = [...sentences].reverse().find((sentence) => has(sentence.toLowerCase(), REQUEST));
  const deadline = all.match(DEADLINE);
  const dueText = deadline ? `${deadline[1]} ${deadline[2]}` : "";
  let decision: string;
  if (request) {
    const verb = urgency === "high" ? "Décider aujourd'hui" : urgency === "medium" ? "Arbitrer cette semaine" : "Déléguer";
    // "Pouvez-vous valider…?" becomes "valider…": an action, not a question.
    const action = shorten(request, 140)
      .replace(/^(pouvez-vous|pourriez-vous|peux-tu|pourrais-tu|merci de|could you|can you|please)\s+/i, "")
      .replace(/[\s.!?…]+$/, "");
    const lowered = action.charAt(0).toLowerCase() + action.slice(1);
    const due = dueText && !lowered.toLowerCase().includes(dueText) ? ` (échéance : ${dueText})` : "";
    decision = `${verb} : ${lowered}${due}.`;
  } else {
    const due = dueText ? ` (échéance : ${dueText})` : "";
    decision =
      urgency === "high"
        ? `Prévenir l'équipe concernée et suivre la résolution aujourd'hui${due}.`
        : urgency === "medium"
          ? `Planifier un point avec l'équipe concernée${due}.`
          : "Aucune décision requise : à classer ou à déléguer.";
  }

  return { urgency, finding, impact, decision };
}
