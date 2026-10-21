// /src/lib/triage/engine.ts
// The triage engine of /demo-triage, with no AI: it reads what the visitor
// pastes (Gmail or Outlook inbox rows, whole emails with their headers, or
// the text read from a screenshot), splits it into emails, classes each
// one, finds its dates, recommends a next step and writes the executive
// brief. It runs in the browser, so the emails go nowhere; it is also what
// the page falls back on when an AI analysis is unavailable or fails.
// Self-contained on purpose (no imports), so it can be tested on its own.

export type Category = "priority" | "follow" | "noise" | "info";
export type Kind =
  | "client" | "contract" | "bank" | "alert" | "expiry" | "deadline"
  | "otp" | "security" | "terms" | "confirmation" | "update"
  | "newsletter" | "jobs" | "promo" | "social"
  | "other";

export const KINDS: Record<Category, Kind[]> = {
  priority: ["client", "contract", "bank", "alert", "expiry", "deadline"],
  follow: ["otp", "security", "terms", "confirmation", "update"],
  noise: ["newsletter", "jobs", "promo", "social"],
  info: ["other"],
};

export const KIND_LABEL: Record<Kind, string> = {
  client: "Réponses clients & échanges",
  contract: "Contrats & devis",
  bank: "Banque & paiements",
  alert: "Alertes",
  expiry: "Expirations & renouvellements",
  deadline: "Échéances & rendez-vous",
  otp: "Codes de sécurité",
  security: "Sécurité du compte",
  terms: "Conditions & confidentialité",
  confirmation: "Confirmations",
  update: "Mises à jour",
  newsletter: "Newsletters",
  jobs: "Offres d'emploi",
  promo: "Promotions",
  social: "Réseaux sociaux",
  other: "Autres informations",
};

/** The language the engine writes in: the page's, French or English. */
export type OutputLang = "fr" | "en";

const KIND_LABEL_EN: Record<Kind, string> = {
  client: "Client replies & conversations",
  contract: "Contracts & quotes",
  bank: "Banking & payments",
  alert: "Alerts",
  expiry: "Expiries & renewals",
  deadline: "Deadlines & meetings",
  otp: "Security codes",
  security: "Account security",
  terms: "Terms & privacy",
  confirmation: "Confirmations",
  update: "Updates",
  newsletter: "Newsletters",
  jobs: "Job offers",
  promo: "Promotions",
  social: "Social networks",
  other: "Other information",
};

export const KIND_LABELS: Record<OutputLang, Record<Kind, string>> = { fr: KIND_LABEL, en: KIND_LABEL_EN };

export type RawEmail = { sender: string; subject: string; snippet: string; received: string };

export type TriageEmail = RawEmail & {
  category: Category;
  kind: Kind;
  /** One line, in the output language. */
  summary: string;
  /** A date or limit found in the email, as written ("5 novembre", "Oct 24"). */
  deadline: string;
  /** The next step, for priorities. */
  action: string;
};

export type BriefGroup = { kind: Kind; label: string; items: TriageEmail[] };

export type Brief = {
  emails: TriageEmail[];
  counts: { total: number; actions: number; info: number; noise: number; minutesSaved: number };
  priorities: BriefGroup[];
  follow: BriefGroup[];
  noise: BriefGroup[];
};

// ---------------------------------------------------------------- text helpers

const NBSP = " ";
const fold = (s: string) =>
  s.replace(/[’‘`]/g, "'").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const squash = (s: string) => s.replace(/\s+/g, " ").trim();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function shorten(text: string, max: number): string {
  const clean = squash(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.\-]+$/, "")}…`;
}

// ---------------------------------------------------------------- dates

const MONTH_FR =
  "janv(?:ier|\\.)?|f[ée]vr(?:ier|\\.)?|f[ée]v\\.?|mars|avr(?:il|\\.)?|mai|juin|juil(?:let|\\.)?|ao[uû]t|sept(?:embre|\\.)?|oct(?:obre|\\.)?|nov(?:embre|\\.)?|d[ée]c(?:embre|\\.)?";
const MONTH_EN =
  "jan(?:uary|\\.)?|feb(?:ruary|\\.)?|mar(?:ch|\\.)?|apr(?:il|\\.)?|may|june?|july?|aug(?:ust|\\.)?|sep(?:t(?:ember)?)?\\.?|oct(?:ober|\\.)?|nov(?:ember|\\.)?|dec(?:ember|\\.)?";
const DAY_FR = "lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche";
const DAY_EN = "monday|tuesday|wednesday|thursday|friday|saturday|sunday";
const DAY_ABBR = "lun|mar|mer|jeu|ven|sam|dim|mon|tue|tues|wed|thu|thur|thurs|fri|sat|sun";
const TIME = "\\d{1,2}[:h]\\d{2}(?:\\s?[ap]\\.?m\\.?)?";

/** The date column of an inbox: "10:42", "17 oct.", "Oct 17", "17/10/2026", "Hier", "lun. 14/10". */
const DATE_CELL = new RegExp(
  `^(?:(?:${DAY_FR}|${DAY_EN}|${DAY_ABBR})\\.?,?\\s+)?(?:${[
    TIME,
    `\\d{1,2}(?:er)?\\s+(?:${MONTH_FR}|${MONTH_EN})(?:\\s+\\d{4})?(?:,?\\s+(?:à\\s+)?${TIME})?`,
    `(?:${MONTH_EN}|${MONTH_FR})\\s+\\d{1,2}(?:,?\\s+\\d{4})?(?:,?\\s+(?:at\\s+)?${TIME})?`,
    `\\d{1,2}[/.-]\\d{1,2}(?:[/.-]\\d{2,4})?(?:,?\\s+${TIME})?`,
    `(?:hier|avant-hier|yesterday)(?:,?\\s+(?:à\\s+)?${TIME})?`,
    `il y a \\d+\\s*(?:min(?:ute)?s?|h|heures?|j|jours?)`,
    `\\d+\\s*(?:min(?:ute)?s?|h|hours?|d|days?)\\s+ago`,
  ].join("|")})\\.?$|^(?:${DAY_FR}|${DAY_EN}|${DAY_ABBR})\\.?$`,
  "i",
);

const isDateCell = (cell: string) => cell.length <= 40 && DATE_CELL.test(cell.trim());

/** A date written inside an email: "5 novembre", "1er décembre", "Oct 24", "24/10", "vendredi", "demain". */
const DATE_PHRASE = `(?:\\d{1,2}(?:er)?\\s+(?:${MONTH_FR}|${MONTH_EN})(?:\\s+\\d{4})?|(?:${MONTH_EN})\\s+\\d{1,2}(?:st|nd|rd|th)?(?:,?\\s+\\d{4})?|\\d{1,2}\\/\\d{1,2}(?:\\/\\d{2,4})?|\\d{1,2}\\.\\d{1,2}\\.\\d{4}|(?:${DAY_FR}|${DAY_EN})(?:\\s+\\d{1,2}(?:er)?(?:\\s+(?:${MONTH_FR}|${MONTH_EN}))?)?|aujourd'hui|ce soir|demain|apr[èe]s-demain|today|tonight|tomorrow|fin (?:du mois|de (?:la )?semaine|de (?:la )?journ[ée]e)|end of (?:the )?(?:day|week|month)|dans \\d+ jours?|in \\d+ days?)`;
const END = "(?![\\p{L}\\d])";
/** A date announced as a limit: "avant le 5 novembre", "expire le 2 novembre", "due by Oct 24". */
const DEADLINE_DATE = new RegExp(
  `(?:avant (?:le )?|jusqu'(?:au|à) |d'ici (?:le )?|au plus tard (?:le )?|expire(?:ra)? (?:le )?|expires? (?:on )?|[ée]ch[ée]ance\\s*:?\\s*(?:le |du )?|date limite\\s*:?\\s*(?:le |du )?|due (?:on |by )?|by |before |until |deadline\\s*:?\\s*)(${DATE_PHRASE})${END}`,
  "iu",
);
/** Any date, announced more loosely ("le 1er décembre", "on Nov 5"). */
const ANY_DATE = new RegExp(`(?:^|[^\\p{L}\\d])(${DATE_PHRASE})${END}`, "iu");

/** How precise a date is: a calendar date beats a weekday, which beats "dans 15 jours". */
const precision = (date: string) =>
  /\d/.test(date) && !/^(dans|in) /i.test(date) ? 2 : /^(dans|in) |aujourd|today|demain|tomorrow|soir|tonight|fin |end of/i.test(date) ? 0 : 1;

function bestMatch(text: string, pattern: RegExp): string {
  let best = "";
  for (const match of text.matchAll(new RegExp(pattern.source, `${pattern.flags}g`))) {
    const date = squash(match[1]);
    if (!best || precision(date) > precision(best)) best = date;
  }
  return best;
}

function findDate(text: string): { date: string; limit: boolean } {
  const normalized = text.replace(/[’‘]/g, "'");
  const limit = bestMatch(normalized, DEADLINE_DATE);
  if (limit) return { date: limit, limit: true };
  return { date: bestMatch(normalized, ANY_DATE), limit: false };
}

const FR_MONTHS = ["janv", "fevr", "mars", "avr", "mai", "juin", "juil", "aout", "sept", "oct", "nov", "dec"];
const EN_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** When a deadline falls, to sort priorities (closest first). Unknown: last. */
function deadlineTime(date: string, now = new Date()): number {
  if (!date) return Infinity;
  const d = fold(date);
  const day = 86_400_000;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  if (/aujourd'hui|today|ce soir|tonight|fin de (la )?journee|end of (the )?day/.test(d)) return today;
  if (/apres-demain/.test(d)) return today + 2 * day;
  if (/demain|tomorrow/.test(d)) return today + day;
  const inDays = d.match(/(?:dans|in) (\d+) (?:jours?|days?)/);
  if (inDays) return today + Number(inDays[1]) * day;
  let month = -1;
  let dayOfMonth = NaN;
  let year = now.getFullYear();
  const numeric = d.match(/^(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?$/);
  if (numeric) {
    dayOfMonth = Number(numeric[1]);
    month = Number(numeric[2]) - 1;
    if (numeric[3]) year = Number(numeric[3].length === 2 ? `20${numeric[3]}` : numeric[3]);
  } else {
    const num = d.match(/(\d{1,2})(?:er|st|nd|rd|th)?/);
    if (num) dayOfMonth = Number(num[1]);
    const name = d.match(/[a-z]{3,}/g)?.find((word) => FR_MONTHS.some((m) => word.startsWith(m)) || EN_MONTHS.some((m) => word.startsWith(m)));
    if (name) month = Math.max(FR_MONTHS.findIndex((m) => name.startsWith(m)), EN_MONTHS.findIndex((m) => name.startsWith(m)));
    const y = d.match(/\b(20\d{2})\b/);
    if (y) year = Number(y[1]);
  }
  if (month < 0 || !(dayOfMonth >= 1 && dayOfMonth <= 31)) return Infinity - 1;
  let time = new Date(year, month, dayOfMonth).getTime();
  if (time < today - 60 * day) time = new Date(year + 1, month, dayOfMonth).getTime();
  return time;
}

/** "avant le 5 novembre", "avant vendredi", "d'ici demain", "aujourd'hui"; in English "by Nov 5". */
function due(date: string, lang: OutputLang): string {
  if (!date) return "";
  const d = fold(date);
  if (/^(aujourd'hui|today|ce soir|tonight)$/.test(d)) return ` ${date}`;
  if (/^(dans|in) /.test(d)) return ` ${date}`;
  if (lang === "en") return ` by ${date}`;
  if (/^fin /.test(d)) return ` d'ici la ${date}`;
  if (/^(demain|apres-demain|tomorrow|end of)/.test(d)) return ` d'ici ${date}`;
  if (new RegExp(`^(${DAY_FR}|${DAY_EN})$`).test(d)) return ` avant ${date}`;
  return ` avant le ${date}`;
}

// ---------------------------------------------------------------- reading the paste

// Menu and column text that comes along when a whole Gmail or Outlook
// page is copied (Ctrl+A): never an email.
const UI_WORDS = [
  "nouveau message", "nouveau courrier", "rédiger", "compose", "new mail", "new message",
  "boîte de réception", "boite de reception", "inbox", "messages suivis", "suivis", "starred", "en attente", "snoozed",
  "important", "messages envoyés", "envoyés", "sent", "sent items", "éléments envoyés", "brouillons", "drafts",
  "plus", "more", "moins", "less", "libellés", "labels", "catégories", "categories", "principale", "primary",
  "promotions", "réseaux sociaux", "social", "notifications", "mises à jour", "updates", "forums", "spam",
  "courrier indésirable", "junk email", "corbeille", "trash", "éléments supprimés", "deleted items",
  "tous les messages", "all mail", "archive", "archives", "chat", "meet", "espaces", "spaces", "gmail", "outlook",
  "mail", "courrier", "rechercher dans les messages", "rechercher", "search mail", "search", "paramètres",
  "settings", "aide", "help", "conditions", "confidentialité", "terms", "privacy", "program policies",
  "règlement du programme", "afficher les détails", "details", "détails", "gérer", "manage", "focused",
  "prioritaire", "autres", "other", "favoris", "favorites", "dossiers", "folders", "groupes", "groups",
  "sélectionner", "select", "trier", "sort", "filtrer", "filter", "actualiser", "refresh", "aujourd'hui", "today",
  "cette semaine", "this week", "semaine dernière", "la semaine dernière", "last week", "ce mois-ci", "this month",
  "le mois dernier", "last month", "plus tôt ce mois-ci", "earlier this month", "plus ancien", "older",
  "plus tôt", "earlier", "de", "objet", "reçu", "taille", "from", "subject", "received", "size", "importance",
  "pièce jointe", "attachment", "indicateur", "flag", "to", "à", "cc", "non lus", "unread", "marquer comme lu",
  "mark as read", "tout sélectionner", "select all", "boîte de réception prioritaire", "focused inbox",
  // Outlook's day headers ("Hier" above yesterday's emails); its date
  // column always carries a time ("Hier 17:40").
  "hier", "yesterday", "avant-hier",
];
const UI_CELL = new RegExp(`^(?:${UI_WORDS.map(escape).join("|")})(?:\\s*\\(?\\d[\\d\\s.,]*\\)?)?$`, "i");
const PAGINATION = /^\d+\s*[–-]\s*\d+\s+(?:sur|of)\s+[\d\s.,]+$/i;
const SIZE = /^[\d.,]+\s*(?:go|gb|mo|mb|ko|kb)\b/i;
const ACTIVITY = /^(?:dernière activité|derniere activite|last account activity|utilisation de l'espace|\d+\s*%\s*(?:utilisés|used))/i;

function cleanCell(raw: string): string {
  const cell = squash(raw.replace(/^[\s☐☑☒□■●•○◯☆★⭐✩✰|]+/u, ""));
  if (cell.length < 2) return "";
  if (UI_CELL.test(cell) || PAGINATION.test(cell) || SIZE.test(cell) || ACTIVITY.test(cell)) return "";
  // A footer like "Conditions · Confidentialité · Règlement du programme".
  if (cell.includes("·") && cell.split("·").every((part) => UI_CELL.test(part.trim()))) return "";
  if (/^\d{1,6}$/.test(cell)) return "";
  return cell;
}

function cleanSender(raw: string): string {
  let sender = squash(raw.replace(/<[^>]*>/g, " ").replace(/["“”]/g, ""));
  sender = sender.replace(/\s*\(\d+\)$/, "").replace(/\s+\d{1,3}$/, "");
  // A Gmail thread lists its people, "moi" (me) among them: keep the others.
  const people = sender.split(/\s*,\s*/).filter((name) => name && !/^(moi|me|myself)$/i.test(name));
  if (people.length) sender = people.join(", ");
  if (!sender) sender = raw.match(/[\w.+-]+@(?:[\w-]+\.)+\w+/)?.[0] ?? "";
  return shorten(sender, 60);
}

/** One email from the cells of an inbox row (sender, "subject - snippet", extras). */
function rowToEmail(cells: string[], received: string): RawEmail | null {
  if (!cells.length) return null;
  // A Gmail row keeps "Subject - snippet" in one cell; when the row brought
  // menu text along, the sender is the cell just before the subject.
  let at = cells.findIndex((cell, i) => i > 0 && / [-–] /.test(cell) && cell.length > 12);
  if (at < 0) {
    if (cells.length === 1) at = 0;
    else {
      at = 1;
      for (let i = 2; i < cells.length; i++) if (cells[i].length > cells[at].length) at = i;
    }
  }
  let sender = at > 0 ? cells[at - 1] : "";
  let main = cells[at];
  if (sender.length > 60) {
    main = `${sender} - ${main}`;
    sender = "";
  }
  const extra = cells.slice(at + 1).join(" · ");
  const split = main.match(/^(.+?) [-–] (.+)$/);
  const subject = split ? split[1] : main;
  const snippet = split ? split[2] : extra;
  return {
    sender: cleanSender(sender),
    subject: shorten(subject, 200),
    snippet: shorten(split && extra ? `${snippet} · ${extra}` : snippet, 400),
    received: squash(received),
  };
}

/** Inbox rows: cells separated by tabs or line breaks, each row ending on its date. */
function parseRows(text: string): RawEmail[] {
  const cells = text.split(/\n|\t/).map(cleanCell).filter(Boolean);
  if (!cells.some(isDateCell)) {
    // No date column: one line per email.
    return text
      .split("\n")
      .map((line) => line.split("\t").map(cleanCell).filter(Boolean))
      .map((row) => rowToEmail(row, ""))
      .filter((email): email is RawEmail => email !== null);
  }

  const groups: { cells: string[]; date: string }[] = [];
  let current: string[] = [];
  for (const cell of cells) {
    if (isDateCell(cell)) {
      if (current.length) groups.push({ cells: current, date: cell });
      current = [];
    } else current.push(cell);
  }
  const tail = current;

  // Outlook lists the preview after the date: when most rows start with a
  // long line followed by a short one, that long line is the previous
  // email's preview.
  const outlookLike =
    groups.length > 1 &&
    groups.slice(1).filter((g) => g.cells.length >= 3 && g.cells[0].length > 40 && g.cells[1].length <= 40).length >=
      (groups.length - 1) / 2;
  if (outlookLike) {
    for (let i = 1; i < groups.length; i++) {
      const g = groups[i];
      if (g.cells.length >= 3 && g.cells[0].length > 40) groups[i - 1].cells.push(g.cells.shift()!);
    }
  }

  // Outlook rows read in order: sender, subject, then the preview.
  const outlookRow = (cells: string[], date: string): RawEmail => ({
    sender: cleanSender(cells.length > 1 ? cells[cells.length >= 3 ? cells.length - 3 : 0] : ""),
    subject: shorten(cells.length > 1 ? cells[cells.length >= 3 ? cells.length - 2 : 1] : cells[0], 200),
    snippet: shorten(cells.length >= 3 ? cells[cells.length - 1] : "", 400),
    received: squash(date),
  });
  const emails = groups
    .map((g) => (outlookLike ? outlookRow(g.cells, g.date) : rowToEmail(g.cells, g.date)))
    .filter((email): email is RawEmail => email !== null);
  if (tail.length) {
    if (outlookLike && emails.length && tail.length === 1) {
      const last = emails[emails.length - 1];
      last.snippet = shorten(squash(`${last.snippet} ${tail[0]}`), 400);
    } else {
      const email = rowToEmail(tail, "");
      if (email && (email.subject.length > 3 || email.sender)) emails.push(email);
    }
  }
  return emails;
}

const HEADER = /^(de|from|exp[ée]diteur|objet|subject|sujet|date|envoy[ée]|sent|re[çc]u|received|[àa]|to|cc|cci|bcc|r[ée]pondre [àa]|reply-to)\s*:\s*(.*)$/i;

/** Whole emails, with "De :", "Objet :", "Date :" lines. */
function parseHeaders(text: string): RawEmail[] {
  const emails: RawEmail[] = [];
  let current: RawEmail | null = null;
  let body: string[] = [];
  const flush = () => {
    if (current && (current.sender || current.subject)) {
      emails.push({
        sender: cleanSender(current.sender),
        subject: shorten(current.subject, 200),
        snippet: shorten(body.join(" "), 400),
        received: squash(current.received),
      });
    }
    current = null;
    body = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^-{2,}.*(original|origine|forwarded|transf[ée]r[ée]).*$/i.test(line)) {
      flush();
      continue;
    }
    const header = line.match(HEADER);
    if (header) {
      const key = fold(header[1]);
      const value = header[2].trim();
      if (key === "de" || key === "from" || key.startsWith("expediteur")) {
        if (current?.sender) flush();
        current ??= { sender: "", subject: "", snippet: "", received: "" };
        current.sender = value;
      } else {
        current ??= { sender: "", subject: "", snippet: "", received: "" };
        if (key === "objet" || key === "subject" || key === "sujet") current.subject = value;
        else if (key === "date" || key.startsWith("envoy") || key === "sent" || key.startsWith("recu") || key === "received")
          current.received = value;
      }
      continue;
    }
    // "Le lun. 14 oct. à 10:12, X a écrit :" opens a quoted older message.
    if (/^(le|on)\s.+(a [ée]crit|wrote)\s*:?$/i.test(line)) {
      flush();
      continue;
    }
    if (line.startsWith(">")) continue;
    if (current) body.push(line);
  }
  flush();
  return emails;
}

/** Every email found in what the visitor pasted. Never throws. */
export function parseEmails(input: string): RawEmail[] {
  const text = (input ?? "").replace(/\r\n?/g, "\n").replace(/ /g, " ").trim();
  if (!text) return [];
  try {
    const lines = text.split("\n");
    const hasFrom = lines.some((line) => /^(de|from|exp[ée]diteur)\s*:/i.test(line.trim()));
    const hasSubject = lines.some((line) => /^(objet|subject|sujet)\s*:/i.test(line.trim()));
    if (hasFrom && hasSubject) {
      const emails = parseHeaders(text);
      if (emails.length) return emails;
    }
    const rows = parseRows(text);
    if (rows.length) return rows;
  } catch {
    // Fall through to the simplest reading.
  }
  return text
    .split("\n")
    .map((line) => squash(line))
    .filter((line) => line.length > 3 && /\p{L}{2,}/u.test(line))
    .map((line) => ({ sender: "", subject: shorten(line, 200), snippet: "", received: "" }));
}

// ---------------------------------------------------------------- classing

// Matched on lower-case text without accents.
const RX = {
  otp: /(code (de |d')?(verification|validation|connexion|securite|confirmation|acces|activation|authentification)|verification code|security code|login code|sign[- ]in code|one[- ]time|\botp\b|\b2fa\b|double authentification|deux facteurs|two[- ]factor|votre code|your code|code temporaire|code unique|usage unique)/,
  security: /(nouvelle connexion|connexion (depuis|sur|inhabituelle|detectee)|new sign[- ]?in|sign[- ]in (attempt|from|detected)|alerte de securite|security alert|mot de passe (a ete )?(modifie|change)|password (was |has been )?(changed|reset)|reinitialis|reset your password|activite inhabituelle|unusual (activity|sign)|nouvel appareil|appareil inconnu|new device)/,
  account: /(compte (a ete |est )?(suspendu|bloque|desactive|verrouille|restreint|ferme)|account (has been |is |was )?(suspended|locked|disabled|restricted|closed)|acces (suspendu|bloque)|service (suspendu|coupe)|suspension de)/,
  terms: /(conditions (generales|d'utilisation|de service|de vente)|terms (of service|of use|and conditions)|politique de confidentialite|privacy (policy|notice)|nos conditions|our terms|\bcgu\b|\bcgv\b|nouvelles conditions)/,
  contract: /(contrat|contract|\bsignature|a signer|signer (le|la|votre|ce)|please sign|sign the|docusign|yousign|\bdevis\b|\bquote\b|proposition commerciale|bon de commande|avenant|\bbail\b|lettre de mission|agreement|\bnda\b)/,
  bank: /(banque|\bbank|virement|transfer|prelevement|direct debit|releve|statement|carte bancaire|credit card|debit card|\biban\b|\brib\b|paiement|payment|facture|invoice|impaye|unpaid|decouvert|overdraft|\bsolde\b|remboursement|refund|\bpret\b|\bloan\b|echeancier|cotisation|\burssaf\b|impots|\bdgfip\b|tresor public|\bcic\b|credit agricole|\bbnp\b|societe generale|\blcl\b|caisse d'epargne|banque populaire|banque postale|boursorama|boursobank|\bqonto\b|revolut|\bn26\b|paypal|stripe)/,
  bankIssue: /(rejete|\brejet\b|refuse|declined|failed|echec|echoue|impaye|unpaid|decouvert|overdraft|insuffisant|insufficient|retard de paiement|late payment|mise en demeure|relance|a regler|a payer|reste a payer|en attente de paiement|payment (due|required)|past due|exigible|regularis)/,
  bankFailure: /(rejete|\brejet\b|refuse|declined|failed|echec|echoue|impaye|unpaid|decouvert|overdraft|insuffisant|insufficient|retard de paiement|late payment|mise en demeure|past due|regularis)/,
  request: /(merci de (nous |me )?(transmettre|fournir|envoyer|retourner|faire parvenir)|documents? a (fournir|transmettre|envoyer)|pieces? (justificatives?|a fournir)|please (send|provide|submit)|could you (send|provide))/,
  paid: /(paiement (recu|confirme|accepte|effectue|reussi)|payment (received|confirmed|successful|succeeded)|(virement|prelevement) (recu|effectue|execute)|a bien ete (recu|effectue|debite)|merci pour votre paiement|thank you for your payment|recu de paiement|\breceipt\b|votre recu)/,
  invoice: /(facture|invoice|prelevement|direct debit|echeancier|cotisation)/,
  reply: /(vous a repondu|a repondu a votre|replied to your)/,
  notOtp: /(code promo|promo code|coupon|reduction|remise|cadeau|parrainage|referral|discount)/,
  alert: /(alerte|\balert\b|incident|\bpanne\b|outage|\bdown\b|hors service|interruption|echec|echoue|\bfailed\b|failure|\berreur\b|\berror\b|critique|critical|indisponible|unavailable|anomalie)/,
  expiry: /(expire|expiration|expirera|arrive a (son )?echeance|renouvel|\brenew|abonnement|subscription|nom de domaine|\bdomain\b|certificat|certificate|attestation|periode d'essai|essai gratuit se termine|trial (ends|expires|is ending)|fin de votre (essai|abonnement)|carte (va )?expir)/,
  deadline: /(date limite|echeance|deadline|avant le|au plus tard|dernier delai|d'ici le|jusqu'au|due (date|by|on)|action requise|action required|a faire avant|\brappel\b|reminder|\burgent|dernier rappel|rendez-vous|\brdv\b|convocation|entretien|\bmeeting\b|reunion|invitation ?:|a valider|merci de (valider|confirmer|repondre|nous (envoyer|transmettre|retourner))|pouvez-vous|pourriez-vous|could you|please (confirm|reply|review|send))/,
  newsletter: /(newsletter|lettre d'information|infolettre|\bdigest\b|au sommaire|a la une|top (stories|articles)|weekly roundup|vos actualites|\bwebinar|webinaire|\bpodcast|se desabonner|se desinscrire|unsubscribe|desinscription|view (this email )?in (your )?browser|version en ligne|lettre de la semaine|edition du)/,
  jobs: /(offres? d'emploi|job alert|alerte emploi|nouvelles offres|new jobs|jobs? (for you|you may|matching)|\brecrute|is hiring|we're hiring|postulez|apply now|candidats? recommandes|linkedin jobs|\bindeed\b|glassdoor|welcome to the jungle|hellowork|\bmonster\b|\bapec\b|cadremploi|jobteaser)/,
  promo: /(\bpromo|promotion|offre (speciale|exclusive|limitee|du moment)|\bsoldes\b|\bsale\b|reduction|\bremise\b|-\s?\d{1,2}\s?%|\d{1,2}\s?% (de reduction|off|sur|offerts?)|code promo|\bcoupon|black friday|cyber monday|vente privee|bons? plans?|\bdeals?\b|\bgratuit|livraison offerte|free shipping|derniers? jours?|last chance|ne manquez pas|don't miss|decouvrez (nos|notre|la nouvelle)|nouvelle collection|new collection|nouveautes|recommande pour vous|recommended for you|vous pourriez aimer|you might like|\bofferts?\b|cadeau)/,
  social: /(a aime|a commente|vous a mentionne|nouvelles? notifications?|new notifications?|a partage|liked your|commented on|mentioned you|new followers?|nouveaux? abonnes?|a consulte votre profil|viewed your profile|apparaissez dans|appeared in \d+ searches|invitation a (se connecter|rejoindre)|wants to connect|souhaite (se connecter|rejoindre votre reseau)|work anniversary|\bfacebook\b|\binstagram\b|\btiktok\b|pinterest|\bquora\b|\breddit\b|\blinkedin\b|\byoutube\b|\bmeetup\b|\bstrava\b)/,
  confirmation: /(confirmation|confirme|a bien ete|bien recu|bien enregistre|\brecu\b|receipt|votre commande|your order|commande n|order #|\bexpedie|shipped|\blivree?\b|delivered|livraison|delivery|reservation|booking|inscription|registration|bienvenue|welcome|merci pour votre|thank you for your)/,
  update: /(compte[- ]rendu|\bcr\b|point (hebdo|d'avancement|projet|d'equipe)|mise a jour|\bupdate|rapport|\breport\b|recapitulatif|\brecap|\bstatus\b|\bstatut\b|avancement|\bsprint\b|deploiement|\bdeploy|\brelease|nouvelle version|changelog|ordre du jour)/,
  noreply: /(no-?reply|ne-?pas-?repondre|donotreply|notifications?@|news@|newsletter@|marketing@)/,
  replyPrefix: /^(re|rep|ref|aw|sv)\s*:/,
};

function cleanSubject(subject: string): string {
  return squash(
    subject
      .replace(/^(?:(?:re|rép|rep|ré|réf|ref|tr|fwd?|aw|sv|wg)\s*:\s*)+/i, "")
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, ""),
  );
}

const shortName = (sender: string, lang: OutputLang) =>
  sender.replace(/\s*[,;].*$/, "") || (lang === "en" ? "the sender" : "l'expéditeur");

function oneLine(email: RawEmail, lang: OutputLang): string {
  const subject = cleanSubject(email.subject) || (lang === "en" ? "(no subject)" : "(sans objet)");
  const sentence = squash(email.snippet).match(/^[^.!?]{3,160}[.!?]?/)?.[0]?.trim() ?? "";
  const add = subject.length < 60 && sentence && !fold(subject).includes(fold(sentence).slice(0, 18));
  const colon = lang === "en" ? ":" : `${NBSP}:`;
  return shorten(add ? `${subject}${colon} ${sentence}` : subject, 160);
}

function actionFor(kind: Kind, email: RawEmail, t: string, date: string, lang: OutputLang): string {
  const who = shortName(email.sender, lang);
  const by = due(date, lang);
  const en = lang === "en";
  switch (kind) {
    case "client":
      return en
        ? `Reply to ${who}${RX.contract.test(t) ? " and send the requested document" : ""}${by}.`
        : `Répondre à ${who}${RX.contract.test(t) ? " et envoyer le document demandé" : ""}${by}.`;
    case "contract":
      if (/(signature|a signer|signer|sign)/.test(t)) return en ? `Review and sign the document${by}.` : `Relire et signer le document${by}.`;
      if (/(devis|quote)/.test(t)) return en ? `Approve or negotiate the quote${by}.` : `Valider ou négocier le devis${by}.`;
      return en ? `Review the contract and reply${by}.` : `Relire le contrat et répondre${by}.`;
    case "bank": {
      const amount = `${email.subject} ${email.snippet}`.match(/(\d[\d\s.,]*\d\s?(?:€|eur\b|euros?)|\d\s?(?:€|eur\b|euros?)|\$\s?\d[\d.,]*)/i)?.[1];
      const sum = amount ? ` ${squash(amount)}` : "";
      if (RX.bankFailure.test(t))
        return en
          ? `Settle the payment${sum}${by}, from the official customer area (not the link in the email).`
          : `Régulariser le paiement${sum}${by}, depuis l'espace client officiel (pas via le lien de l'e-mail).`;
      if (RX.bankIssue.test(t))
        return en
          ? `Pay${sum || " the amount due"}${by}, from the official customer area.`
          : `Régler${sum || " le montant dû"}${by}, depuis l'espace client officiel.`;
      return en ? `Check the amount${sum} and the payment date${by}.` : `Vérifier le montant${sum} et la date du paiement${by}.`;
    }
    case "alert":
      if (RX.account.test(t))
        return en
          ? "Restore access from the service's official site, never through the link you received."
          : "Rétablir l'accès depuis le site officiel du service, jamais via le lien reçu.";
      if (/(deploiement|deploy|build)/.test(t)) return en ? "Fix the deployment and run it again." : "Corriger puis relancer le déploiement.";
      return en ? "Check the incident and tell the person concerned." : "Vérifier l'incident et prévenir la personne concernée.";
    case "expiry":
      if (/(nom de domaine|\bdomaine\b|\bdomain\b)/.test(t)) return en ? `Renew the domain name${by}.` : `Renouveler le nom de domaine${by}.`;
      if (/attestation/.test(t)) return en ? `Send the new certificate${by}.` : `Envoyer la nouvelle attestation${by}.`;
      if (/(carte|card)/.test(t)) return en ? `Update the card${by}.` : `Mettre à jour la carte${by}.`;
      if (/(abonnement|subscription|essai|trial)/.test(t))
        return en ? `Renew or cancel the subscription${by}.` : `Renouveler ou résilier l'abonnement${by}.`;
      return en ? `Renew${by || " before the deadline"}.` : `Renouveler${by || " avant l'échéance"}.`;
    case "deadline":
      if (/(rendez-vous|\brdv\b|convocation|entretien|meeting|reunion|invitation)/.test(t))
        return en ? `Confirm the meeting${date ? ` (${date})` : ""}.` : `Confirmer le rendez-vous${date ? ` (${date})` : ""}.`;
      if (RX.request.test(t)) return en ? `Send the requested documents to ${who}${by}.` : `Envoyer les documents demandés à ${who}${by}.`;
      return en ? `Handle it${by || " today"}.` : `Traiter${by || " aujourd'hui"}.`;
    default:
      return "";
  }
}

function followLine(kind: Kind, email: RawEmail, text: string, date: string, lang: OutputLang): string {
  const en = lang === "en";
  switch (kind) {
    case "otp": {
      const code = `${email.subject} ${email.snippet}`.match(/\b(\d{4,8})\b/)?.[1];
      const masked = code ? `${code.slice(0, 2)}${"•".repeat(code.length - 2)}` : "";
      return en
        ? `Verification code received${masked ? ` (${masked})` : ""}: never share it.`
        : `Code de vérification reçu${masked ? ` (${masked})` : ""}${NBSP}: à ne jamais partager.`;
    }
    case "security":
      return en
        ? "Sign-in or change reported on the account: if it wasn't you, change the password."
        : `Connexion ou changement signalé sur le compte${NBSP}: si ce n'était pas vous, changez le mot de passe.`;
    case "terms":
      return en
        ? `Update to the terms or privacy policy${date ? ` (effective: ${date})` : ""}.`
        : `Mise à jour des conditions ou de la confidentialité${date ? ` (en vigueur${NBSP}: ${date})` : ""}.`;
    default:
      return oneLine(email, lang);
  }
}

/** Which section an email belongs to, in order of precedence. */
function decide(email: RawEmail, t: string, limit: boolean): [Category, Kind] {
  const subject = fold(email.subject.trim());
  const automated = RX.noreply.test(fold(email.sender));
  const noiseKind: Kind | null = RX.jobs.test(t)
    ? "jobs"
    : RX.promo.test(t)
      ? "promo"
      : RX.newsletter.test(t)
        ? "newsletter"
        : RX.social.test(t)
          ? "social"
          : null;
  const marketing = noiseKind === "promo" || noiseKind === "newsletter";
  const isReply = !automated && (RX.replyPrefix.test(subject) || RX.reply.test(t));
  const contract = RX.contract.test(t) && !marketing;
  const bank = RX.bank.test(t);
  const bankIssue = bank && RX.bankIssue.test(t) && !marketing;
  // Signals strong enough to keep an email out of the noise even when it
  // also looks like a mailing ("Re:", a contract, a rejected payment).
  const strong = isReply || contract || bankIssue || RX.account.test(t) || (RX.expiry.test(t) && !noiseKind);

  if (RX.otp.test(t) && !RX.notOtp.test(t) && !contract) return ["follow", "otp"];
  if (RX.account.test(t)) return ["priority", "alert"];
  if (noiseKind && !strong) return ["noise", noiseKind];
  if (RX.security.test(t)) return ["follow", "security"];
  if (RX.terms.test(t)) return ["follow", "terms"];
  if (isReply) return ["priority", "client"];
  if (contract) return ["priority", "contract"];
  // "Merci de nous transmettre les relevés avant le 15 novembre": a request
  // for documents, not a payment, even when it names bank papers.
  if (RX.request.test(t) && !bankIssue && (limit || RX.deadline.test(t))) return ["priority", "deadline"];
  if (bank && RX.paid.test(t) && !bankIssue) return ["follow", "confirmation"];
  if (bank && (bankIssue || limit || RX.invoice.test(t))) return ["priority", "bank"];
  if (RX.alert.test(t)) return ["priority", "alert"];
  if (RX.expiry.test(t)) return ["priority", "expiry"];
  if (RX.deadline.test(t) || limit) return ["priority", "deadline"];
  if (RX.confirmation.test(t)) return ["follow", "confirmation"];
  if (RX.update.test(t) || bank) return ["follow", "update"];
  return ["info", "other"];
}

/** Classes one email, finds its date and writes its line and next step. */
export function classifyEmail(email: RawEmail, lang: OutputLang = "fr"): TriageEmail {
  const t = fold(`${email.sender} ${email.subject} ${email.snippet}`);
  const { date, limit } = findDate(`${email.subject} ${email.snippet}`);
  const [category, kind] = decide(email, t, limit);

  const summary = category === "follow" ? followLine(kind, email, t, date, lang) : oneLine(email, lang);
  return {
    ...email,
    sender: email.sender || (lang === "en" ? "Unknown sender" : "Expéditeur inconnu"),
    category,
    kind,
    summary,
    deadline: category === "priority" || kind === "terms" ? date : "",
    action: category === "priority" ? actionFor(kind, email, t, date, lang) : "",
  };
}

// ---------------------------------------------------------------- the brief

export function buildBrief(emails: TriageEmail[], now = new Date(), lang: OutputLang = "fr"): Brief {
  const of = (category: Category) => emails.filter((email) => email.category === category);
  const grouped = (items: TriageEmail[], kinds: Kind[]): BriefGroup[] =>
    kinds
      .map((kind) => ({ kind, label: KIND_LABELS[lang][kind], items: items.filter((email) => email.kind === kind) }))
      .filter((group) => group.items.length > 0);

  // Closest deadline first; an alert with no date is for today.
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const when = (email: TriageEmail) =>
    email.deadline ? deadlineTime(email.deadline, now) : email.kind === "alert" ? today : Infinity;
  const priority = of("priority").sort((a, b) => when(a) - when(b));
  const follow = [...of("follow"), ...of("info")];
  const noise = of("noise");
  return {
    emails,
    counts: {
      total: emails.length,
      actions: priority.length,
      info: follow.length,
      noise: noise.length,
      // Rough reading time spared: a minute per email you no longer open,
      // half a minute per information reduced to one line.
      minutesSaved: Math.round(noise.length + priority.length + follow.length * 0.5),
    },
    // The group holding the most urgent email comes first.
    priorities: grouped(priority, KINDS.priority).sort(
      (a, b) => Math.min(...a.items.map(when)) - Math.min(...b.items.map(when)),
    ),
    follow: grouped(follow, [...KINDS.follow, "other"]),
    noise: grouped(noise, KINDS.noise),
  };
}

/** The whole local pipeline: pasted text in, brief out. Never throws. */
export function triage(input: string, now = new Date(), lang: OutputLang = "fr"): Brief {
  return buildBrief(
    parseEmails(input)
      .slice(0, 300)
      .map((email) => classifyEmail(email, lang)),
    now,
    lang,
  );
}

const CATEGORIES = Object.keys(KINDS) as Category[];

/**
 * Emails returned by an AI analysis, checked field by field: a bad or
 * missing value is replaced by what the local engine decides.
 */
export function fromAi(items: unknown, lang: OutputLang = "fr"): TriageEmail[] {
  if (!Array.isArray(items)) return [];
  return items.slice(0, 300).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const value = (key: string, max: number) => {
      const v = (item as Record<string, unknown>)[key];
      return typeof v === "string" ? shorten(v, max) : "";
    };
    const raw: RawEmail = {
      sender: value("sender", 60),
      subject: value("subject", 200),
      snippet: value("snippet", 400),
      received: value("received", 40),
    };
    if (!raw.sender && !raw.subject && !raw.snippet) return [];
    const local = classifyEmail(raw, lang);
    const category = value("category", 20) as Category;
    const kind = value("kind", 20) as Kind;
    const valid = CATEGORIES.includes(category) && KINDS[category].includes(kind);
    return [
      {
        ...raw,
        sender: raw.sender || local.sender,
        category: valid ? category : local.category,
        kind: valid ? kind : local.kind,
        summary: value("summary", 200) || local.summary,
        deadline: value("deadline", 40) || (valid ? "" : local.deadline),
        action: value("action", 220) || (valid ? "" : local.action),
      },
    ];
  });
}
