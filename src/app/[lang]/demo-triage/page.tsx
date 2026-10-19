import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTACT } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { withFrenchSpacing } from "@/lib/typography";
import { Container, PageHeader } from "@/components/ui";
import { TriageTool } from "@/components/demo-triage/TriageTool";
import { PilotForm, type PilotStrings } from "@/components/demo-triage/PilotForm";

/**
 * /demo-triage: a working demo of the executive triage agent, in French
 * only, linked from the Lab and Studio pages (ProofLinks, StrategicNotes)
 * but not from the menu, and kept out of search engines.
 * Visitors paste their own emails or a screenshot of their inbox; the
 * engine (lib/triage) reads and triages them in the browser. No price;
 * the pilot request goes through /api/contact like every form.
 */

const PAGE = withFrenchSpacing({
  label: "Démonstration",
  title: "Démo Kuchimoto : Agent IA de Triage Exécutif & Gouvernance SI",
  intro:
    "Collez vos e-mails ou une capture de votre boîte de réception : l'agent les trie et en tire un brief exécutif de trois minutes.",
  description:
    "Démonstration de l'agent de triage exécutif de Kuchimoto : collez vos e-mails ou une capture de boîte mail, obtenez un brief avec priorités, dates limites et actions.",
  sandbox: {
    label: "Environnement isolé (Sandbox)",
    body: "Synthèse automatisée des flux sans connexion intrusive à vos serveurs métiers.",
    note: "Par défaut, la lecture et l'analyse se font dans votre navigateur : vos e-mails et vos captures ne sont envoyés nulle part, et rien n'est conservé.",
  },
  tool: {
    title: "Testez l'agent sur vos vrais emails maintenant",
    intro: "Trois façons de commencer : vos e-mails copiés, une capture de votre boîte de réception, ou un exemple.",
  },
  pilot: {
    title: "Un pilote sur votre périmètre",
    intro: "Dites-nous quels flux vous submergent. Nous revenons vers vous sous 24 heures pour cadrer un pilote.",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  if (lang !== "fr") return {};
  return {
    ...pageMetadata({ lang, path: "/demo-triage", title: PAGE.title, description: PAGE.description, noindex: true }),
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
      <PageHeader eyebrow={PAGE.label} title={PAGE.title} intro={PAGE.intro} accent="lab" />

      <Container className="pt-12 sm:pt-16">
        <section aria-labelledby="sandbox" className="border border-lab bg-lab-wash p-6 sm:p-8">
          <p id="sandbox" className="eyebrow text-lab">
            {PAGE.sandbox.label}
          </p>
          <p className="mt-3 font-display text-xl sm:text-2xl">{PAGE.sandbox.body}</p>
          <p className="mt-3 text-sm text-ink-soft">{PAGE.sandbox.note}</p>
        </section>
      </Container>

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="tool">
          <h2 id="tool" className="text-2xl sm:text-3xl">
            {PAGE.tool.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{PAGE.tool.intro}</p>
          <TriageTool />
        </section>
      </Container>

      <section aria-labelledby="pilot" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <h2 id="pilot" className="text-2xl sm:text-3xl">
            {PAGE.pilot.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{PAGE.pilot.intro}</p>
          <div className="mt-10">
            <PilotForm t={pilot} privacyHref={localizedPath(lang, "/confidentialite")} contactEmail={CONTACT.email} />
          </div>
        </Container>
      </section>
    </>
  );
}
