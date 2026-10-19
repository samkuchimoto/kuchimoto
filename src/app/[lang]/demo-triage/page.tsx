import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STUDIO } from "@/config/site";
import { getLang } from "@/i18n/server";
import { wholeEuros } from "@/lib/format";
import { mailto } from "@/lib/mailto";
import { pageMetadata } from "@/lib/seo";
import { NBSP, withFrenchSpacing } from "@/lib/typography";
import { Container, PageHeader } from "@/components/ui";
import { TriageDemo, type TriageBrief } from "@/components/TriageDemo";

/**
 * /demo-triage: a standalone demo of the executive triage agent, in
 * French only, linked from nowhere on the site and kept out of search
 * engines. Entirely generic: no real organisation, no internal acronym,
 * and every message and figure on it is fictional (the page says so).
 */

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
    box: "Boîte de réception, direction digitale",
    unread: "247 non lus",
    messages: [
      ["Opérateur B", "Écart de données temps réel sur trois lignes de bus : quelle source fait foi ?", "07:42"],
      ["Alerte SI", "Supervision : interruption du flux d'information voyageurs, secteur Est", "07:58"],
      ["Équipements voyageurs", "Douze écrans d'information hors service en gare : maintenance à planifier", "08:05"],
      ["Product Owner", "Sprint 14 : deux demandes contradictoires à arbitrer avant la revue", "08:11"],
    ] as [string, string, string][],
  },
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
          "L'opérateur B et la supervision divergent sur trois lignes. Recommandation : retenir la supervision comme référence jusqu'à 10 h, le temps de la vérification.",
        ],
        [
          "Information voyageurs, secteur Est",
          "Flux interrompu depuis 07:58. Recommandation : afficher le message de mode dégradé dans les gares concernées et prévenir les équipes terrain.",
        ],
        [
          "Arbitrage du sprint 14",
          "Deux demandes s'opposent : refonte des alertes ou export des données. Recommandation : les alertes d'abord, elles allègent la charge des équipes dès cette semaine.",
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
  } satisfies TriageBrief,
  mail: {
    subject: "Prototype d'agent de triage en 48 heures",
    body: "Bonjour,\n\nJ'ai vu la démo de l'agent de triage exécutif et je souhaite tester un prototype en 48 heures.\n\nMon organisation :\nLes flux à trier en priorité :\n",
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
          <div className="mt-8 border hairline">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b hairline bg-washi px-5 py-3 text-sm">
              <span className="font-medium">{DEMO.inbox.box}</span>
              <span className="text-ink-soft tabular-nums">{DEMO.inbox.unread}</span>
            </div>
            <ul className="divide-y divide-line">
              {DEMO.inbox.messages.map(([tag, subject, time]) => (
                <li key={subject} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="shrink-0 text-xs font-medium tracking-wide text-lab sm:w-40">{tag}</span>
                  <span className="flex-1">{subject}</span>
                  <span className="shrink-0 text-xs text-ink-soft tabular-nums">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>

      <section aria-labelledby="brief" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="brief" className="text-2xl sm:text-3xl">
            {DEMO.brief.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{DEMO.brief.intro}</p>
          <TriageDemo
            t={DEMO.report}
            ctaHref={mailto(DEMO.mail)}
            ctaLabel={`Tester ce prototype en 48${NBSP}h (${wholeEuros(STUDIO.prototype, lang)}${NBSP}HT)`}
          />
        </Container>
      </section>
    </>
  );
}
