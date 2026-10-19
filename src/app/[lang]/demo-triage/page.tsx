import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { withFrenchSpacing } from "@/lib/typography";
import { Container, PageHeader } from "@/components/ui";
import { InboxDemo, type DemoMessage, type InboxStrings } from "@/components/demo-triage/InboxDemo";
import { BriefDemo, type BriefStrings } from "@/components/demo-triage/BriefDemo";
import { MessageSummary, type SummaryStrings } from "@/components/demo-triage/MessageSummary";
import { PilotForm, type PilotStrings } from "@/components/demo-triage/PilotForm";

/**
 * /demo-triage: a standalone demo of the executive triage agent, in
 * French only, linked from nowhere on the site and kept out of search
 * engines. Entirely generic: no real organisation, no internal acronym,
 * no price, and every message and figure on it is fictional (the page
 * says so). The pilot request goes through /api/contact like every form.
 */

const URGENCY = { high: "Urgence haute", medium: "Urgence moyenne", info: "Info" };

const DEMO = withFrenchSpacing({
  label: "Démonstration",
  title: "Démo Kuchimoto : Agent IA de Triage Exécutif & Gouvernance SI",
  intro: "Comment un agent transforme une boîte de réception saturée en un brief de trois minutes, chaque matin.",
  description:
    "Démonstration de l'agent IA de triage exécutif de Kuchimoto : synthèse automatisée des flux d'une direction digitale en un brief de trois minutes.",
  sandbox: {
    label: "Environnement isolé (Sandbox)",
    body: "Synthèse automatisée des flux sans connexion intrusive à vos serveurs métiers.",
    note: "Démonstration : tous les messages et chiffres de cette page sont fictifs.",
  },
  inbox: {
    title: "Une direction digitale saturée",
    intro:
      "Des centaines de flux quotidiens : coordination multi-opérateurs, alertes SI, suivi équipements voyageurs, retours Product Owners.",
  },
  inboxUi: {
    box: "Boîte de réception, direction digitale",
    hint: "Cliquez sur un message pour le lire et voir comment l'agent le classe.",
    filtersLabel: "Filtrer les flux",
    filters: { all: "Tous les flux", decisions: "Arbitrages requis", resolved: "Résolus automatiquement" },
    counts: { all: 247, decisions: 3, resolved: 244 },
    more: {
      all: "Et 243 autres flux, triés par l'agent. Seuls 3 demandent une décision de votre part.",
      resolved: "Et 243 autres flux résolus automatiquement : accusés de réception, doublons, notifications de routine.",
    },
    urgency: URGENCY,
    labels: {
      from: "De",
      to: "À",
      received: "Reçu à",
      raw: "Message reçu",
      analysis: "Analyse de l'agent",
      urgency: "Urgence",
      category: "Catégorie",
      action: "Action de l'agent",
    },
  } satisfies InboxStrings,
  messages: [
    {
      id: "operateur",
      tag: "Opérateur B",
      subject: "Écart de données temps réel sur trois lignes de bus : quelle source fait foi ?",
      time: "07:42",
      from: "Centre d'exploitation, opérateur B",
      to: "Direction digitale",
      body: "Bonjour,\n\nDepuis 6 h 30, nos données de passage en temps réel divergent de celles de la supervision sur les lignes 12, 14 et 21 : jusqu'à six minutes d'écart sur certains arrêts.\n\nLes annonces aux voyageurs ne sont plus cohérentes entre les applications et les écrans. Merci de nous indiquer avant 9 h quelle source fait foi, pour que nous alignions les annonces.\n\nCentre d'exploitation, opérateur B",
      urgency: "high",
      category: "Coordination multi-opérateurs",
      action: "Ajouté au brief : arbitrage n° 1, avec une recommandation.",
      status: "decision",
    },
    {
      id: "alerte",
      tag: "Alerte SI",
      subject: "Supervision : interruption du flux d'information voyageurs, secteur Est",
      time: "07:58",
      from: "Supervision SI (alerte automatique)",
      to: "Astreinte SI, direction digitale",
      body: "ALERTE NIVEAU 2\n\nService : flux d'information voyageurs, secteur Est\nÉtat : interrompu depuis 07:58\nPérimètre : 9 gares, 41 écrans et l'application mobile\nCause probable : perte de connexion avec la passerelle de diffusion\n\nAction attendue : décision de passage en mode dégradé.",
      urgency: "high",
      category: "Alertes SI",
      action: "Ajouté au brief : arbitrage n° 2. L'astreinte est déjà prévenue.",
      status: "decision",
    },
    {
      id: "equipements",
      tag: "Équipements voyageurs",
      subject: "Douze écrans d'information hors service en gare : maintenance à planifier",
      time: "08:05",
      from: "Outil de suivi des équipements",
      to: "Direction digitale (copie)",
      body: "Rapport quotidien des équipements voyageurs\n\n12 écrans d'information hors service dans 3 gares, signalés entre 22 h et 6 h.\nAucun ne concerne un quai principal.\nContrat de maintenance : intervention sous 48 heures.\n\nAucune action requise de la direction.",
      urgency: "info",
      category: "Suivi équipements voyageurs",
      action: "Résolu automatiquement : ticket de maintenance créé et prestataire prévenu. Rien à décider.",
      status: "resolved",
    },
    {
      id: "po",
      tag: "Product Owner",
      subject: "Sprint 14 : deux demandes contradictoires à arbitrer avant la revue",
      time: "08:11",
      from: "Product Owner, équipe Applications",
      to: "Direction digitale",
      body: "Bonjour,\n\nPour le sprint 14, l'équipe ne peut pas tenir deux demandes ensemble : la refonte des alertes voyageurs, demandée par l'exploitation, et l'export des données pour le reporting, demandé par la direction financière.\n\nPouvez-vous arbitrer avant la revue de jeudi ? Sans décision, l'équipe démarre par la refonte des alertes.\n\nMerci,\nProduct Owner, équipe Applications",
      urgency: "medium",
      category: "Retours Product Owners",
      action: "Ajouté au brief : arbitrage n° 3, avec une recommandation.",
      status: "decision",
    },
  ] satisfies DemoMessage[],
  brief: {
    title: "Le brief exécutif, en un clic",
    intro: "L'agent lit, trie et résume. Il ne garde que ce qui demande une décision de votre part.",
  },
  report: {
    button: "Générer le brief exécutif de 3 minutes",
    generating: "Analyse de 247 messages…",
    title: "Brief exécutif du matin",
    meta: "Lecture : 3 minutes · généré à 08:15",
    decisions: {
      title: "3 arbitrages prioritaires du matin",
      items: [
        [
          "Source de référence temps réel",
          "L'opérateur B et la supervision divergent sur trois lignes, jusqu'à six minutes d'écart. Recommandation : retenir la supervision comme référence. Réponse attendue avant 9 h.",
        ],
        [
          "Information voyageurs, secteur Est",
          "Flux interrompu depuis 07:58 sur 9 gares et l'application. Recommandation : passer en mode dégradé maintenant et prévenir les équipes terrain.",
        ],
        [
          "Arbitrage du sprint 14",
          "Refonte des alertes ou export des données. Recommandation : les alertes d'abord, elles allègent la charge des équipes dès cette semaine. Réponse avant la revue de jeudi.",
        ],
      ],
    },
    agile: {
      title: "Synthèse Collectif Agile & Product Owners",
      items: [
        "Quatre équipes, deux blocages remontés, une dépendance critique entre l'équipe Données et l'équipe Applications.",
        "Les retours des Product Owners convergent : les alertes en double sont la première source de temps perdu.",
        "Aucune autre décision n'est attendue de votre part aujourd'hui.",
      ],
    },
    station: {
      title: "Indicateur Services en Gare : modèle Tokyo (ekinaka)",
      kpiLabel: "Commerces de gare proposant un service numérique",
      kpiValue: "12 sur 40",
      kpiShare: 30,
      items: [
        "Repère ekinaka : à Tokyo, la gare est aussi un lieu de commerces et de services du quotidien.",
        "Prochaine étape proposée : un pilote de commande à l'avance dans une gare test.",
      ],
    },
    footnote: "Démonstration : messages et chiffres fictifs.",
  } satisfies BriefStrings,
  test: {
    title: "Tester sur un message réel",
    intro: "Collez un e-mail ou une alerte de votre quotidien : la démo en tire une synthèse en trois lignes.",
  },
  summary: {
    label: "Collez un e-mail ou une alerte",
    placeholder: "Objet : …\n\nCollez ici le texte d'un e-mail ou d'une alerte.",
    submit: "Synthétiser ce message",
    example: "Essayer avec un exemple",
    exampleText:
      "Objet : Retard de livraison des nouveaux écrans, gare Nord\n\nBonjour,\n\nLe fournisseur nous informe que les 20 écrans prévus pour la gare Nord seront livrés avec trois semaines de retard. L'ouverture de l'espace voyageurs prévue le 15 risque d'être décalée.\n\nPouvez-vous valider avant vendredi si nous gardons la date en installant les anciens écrans à titre provisoire ?\n\nCordialement,\nResponsable projet",
    empty: "Collez d'abord un message, ou essayez avec l'exemple.",
    title: "Synthèse exécutive",
    finding: "Constat",
    impact: "Impact",
    decision: "Décision recommandée",
    urgency: URGENCY,
    note: "Pour la démonstration, la synthèse est produite dans votre navigateur par des règles simples : le texte n'est envoyé nulle part. Le prototype réel s'appuie sur un modèle d'IA, dans un environnement isolé.",
  } satisfies SummaryStrings,
  pilot: {
    title: "Un pilote sur votre périmètre",
    intro: "Dites-nous quels flux vous submergent. Nous revenons vers vous sous 24 heures pour cadrer un pilote.",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  if (lang !== "fr") return {};
  return {
    ...pageMetadata({ lang, path: "/demo-triage", title: DEMO.title, description: DEMO.description, noindex: true }),
    // French only: no translations to point to.
    alternates: { canonical: "/demo-triage" },
  };
}

export default async function DemoTriage() {
  const lang = await getLang();
  if (lang !== "fr") notFound();
  const forms = getDictionary(lang).forms;

  const pilot: PilotStrings = withFrenchSpacing({
    name: "Nom",
    contact: "E-mail ou téléphone",
    contactHint: "Pour vous répondre.",
    contactError: "Indiquez un e-mail ou un numéro de téléphone valide.",
    message: "Message",
    messagePlaceholder: "Votre périmètre : les flux à trier, le nombre de personnes concernées, vos outils.",
    submit: "Demander un pilote sur votre périmètre",
    sending: forms.sending,
    privacy: "Vos coordonnées servent uniquement à vous répondre. Voir notre",
    privacyLink: forms.privacyLink,
    success: "Merci, votre demande est envoyée. Nous vous répondons sous 24 heures.",
    errors: forms.errors,
  });

  return (
    <>
      <PageHeader eyebrow={DEMO.label} title={DEMO.title} intro={DEMO.intro} accent="lab" />

      <Container className="pt-12 sm:pt-16">
        <section aria-labelledby="sandbox" className="border border-lab bg-lab-wash p-6 sm:p-8">
          <p id="sandbox" className="eyebrow text-lab">
            {DEMO.sandbox.label}
          </p>
          <p className="mt-3 font-display text-xl sm:text-2xl">{DEMO.sandbox.body}</p>
          <p className="mt-3 text-sm text-ink-soft">{DEMO.sandbox.note}</p>
        </section>
      </Container>

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="inbox">
          <h2 id="inbox" className="text-2xl sm:text-3xl">
            {DEMO.inbox.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{DEMO.inbox.intro}</p>
          <InboxDemo t={DEMO.inboxUi} messages={DEMO.messages} />
        </section>
      </Container>

      <section aria-labelledby="brief" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="brief" className="text-2xl sm:text-3xl">
            {DEMO.brief.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{DEMO.brief.intro}</p>
          <BriefDemo t={DEMO.report} />
        </Container>
      </section>

      <section aria-labelledby="test" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="test" className="text-2xl sm:text-3xl">
            {DEMO.test.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{DEMO.test.intro}</p>
          <MessageSummary t={DEMO.summary} />
        </Container>
      </section>

      <section aria-labelledby="pilot" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <h2 id="pilot" className="text-2xl sm:text-3xl">
            {DEMO.pilot.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{DEMO.pilot.intro}</p>
          <div className="mt-10">
            <PilotForm t={pilot} privacyHref={localizedPath(lang, "/confidentialite")} contactEmail={CONTACT.email} />
          </div>
        </Container>
      </section>
    </>
  );
}
