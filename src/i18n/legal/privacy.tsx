// /src/i18n/legal/privacy.tsx
// /confidentialite, in French (the reference) and English.
//
// What the code actually does: the forms (/api/contact, /api/booking)
// email each submission to the company through Resend; card payments go
// through Stripe Checkout; the site is hosted by Vercel. No cookie needing
// consent: the cookie choice itself is kept in the browser's local
// storage (components/CookieBanner.tsx).

import { COMPANY, CONTACT } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LegalSection } from "@/components/LegalPage";
import { Todo } from "@/components/ui";
import { frenchSpacing as f } from "@/lib/typography";

const link = "underline underline-offset-4";

export function privacyContent(lang: Locale, dict: Dictionary) {
  const mail = CONTACT.email ? (
    <a href={`mailto:${CONTACT.email}`} className={link}>
      {CONTACT.email}
    </a>
  ) : (
    <Todo>{dict.common.placeholderEmail}</Todo>
  );
  const cnil = (
    <a href="https://www.cnil.fr" className={link}>
      cnil.fr
    </a>
  );
  const list = "list-disc space-y-1.5 pl-5";

  if (lang === "fr") {
    const sections: LegalSection[] = [
      {
        title: "Responsable du traitement",
        body: (
          <p>
            {f(`${COMPANY.legalName}, ${COMPANY.address}. Contact :`)} {mail}.
          </p>
        ),
      },
      {
        title: "Données collectées",
        body: (
          <ul className={list}>
            <li>{f("Formulaire de contact : métier concerné, nom, adresse e-mail, téléphone si vous l'indiquez, message.")}</li>
            <li>{f("Listes d'attente (Canada, États-Unis) : nom, adresse e-mail, ville ou lieu, services qui vous intéressent.")}</li>
            <li>{f("Projets Kuchimoto Lab : nom, adresse e-mail, entreprise si vous l'indiquez, type de projet, message.")}</li>
            <li>{f("Réservations Happy Homes Thaïlande : service, logement, date et moment souhaités, adresse de la prestation, nom, adresse e-mail, téléphone, précisions.")}</li>
            <li>{f("Paiement : il est traité par Stripe. Vos données de carte sont saisies chez Stripe et ne nous sont jamais transmises ; nous recevons la confirmation du paiement.")}</li>
            <li>{f("Données techniques : notre hébergeur enregistre des journaux techniques (adresse IP, pages demandées) pour faire fonctionner et sécuriser le site.")}</li>
          </ul>
        ),
      },
      {
        title: "Finalités et bases légales",
        body: (
          <ul className={list}>
            <li>{f("Répondre à vos messages et demandes de projet : mesures précontractuelles prises à votre demande, ou notre intérêt légitime à vous répondre.")}</li>
            <li>{f("Vous prévenir de l'ouverture dans votre pays : votre consentement, que vous pouvez retirer à tout moment.")}</li>
            <li>{f("Exécuter et suivre une réservation : exécution du contrat.")}</li>
            <li>{f("Tenir notre comptabilité : obligation légale.")}</li>
            <li>{f("Assurer la sécurité du site : intérêt légitime.")}</li>
          </ul>
        ),
      },
      {
        title: "Destinataires",
        body: (
          <>
            <p>{f("Vos données ne sont ni vendues ni cédées. Elles sont transmises uniquement :")}</p>
            <ul className={list}>
              <li>{f("à Vercel Inc. (États-Unis), qui héberge le site ;")}</li>
              <li>{f("à Resend (États-Unis), qui achemine les formulaires jusqu'à notre messagerie ;")}</li>
              <li>{f("à Stripe Payments Europe, Ltd. (Irlande), pour le paiement ;")}</li>
              <li>{f("à l'intervenant qui réalise la prestation, pour une réservation (adresse, date, précisions).")}</li>
            </ul>
            <p>
              {f("Lorsque des données sont traitées hors de l'Union européenne, ce transfert est encadré par les garanties prévues par le RGPD (décision d'adéquation ou clauses contractuelles types).")}
            </p>
          </>
        ),
      },
      {
        title: "Durées de conservation",
        body: (
          <ul className={list}>
            <li>{f("Messages et demandes : trois ans après notre dernier échange.")}</li>
            <li>{f("Listes d'attente : jusqu'à l'ouverture et votre information, ou jusqu'à votre désinscription, et au plus trois ans.")}</li>
            <li>{f("Réservations : le temps de la relation commerciale ; les pièces comptables sont conservées dix ans (article L123-22 du Code de commerce).")}</li>
            <li>{f("Journaux techniques : la durée limitée fixée par l'hébergeur.")}</li>
          </ul>
        ),
      },
      {
        id: "cookies",
        title: "Cookies",
        body: (
          <>
            <p>
              {f("Ce site n'utilise que des cookies et stockages nécessaires à son fonctionnement. Il n'utilise ni publicité ni mesure d'audience. Votre choix dans le bandeau cookies est enregistré dans votre navigateur (stockage local), pour ne pas vous le redemander ; il ne sert à rien d'autre.")}
            </p>
            <p>
              {f("Si nous ajoutons un jour un outil facultatif, il ne fonctionnera qu'après votre accord. Vous pouvez changer d'avis à tout moment avec le lien « Gérer les cookies » en bas de chaque page. Les pages de paiement de Stripe appliquent leur propre politique.")}
            </p>
          </>
        ),
      },
      {
        title: "Vos droits",
        body: (
          <>
            <p>
              {f("Vous pouvez accéder à vos données, les rectifier, les effacer, en limiter le traitement, vous y opposer, en demander la portabilité et retirer votre consentement, en écrivant à")}{" "}
              {mail}. {f("Nous répondons dans un délai d'un mois.")}
            </p>
            <p>Vous pouvez aussi adresser une réclamation à la CNIL ({cnil}).</p>
          </>
        ),
      },
    ];
    return {
      title: "Politique de confidentialité",
      description: f("Données personnelles collectées sur kuchimoto.com : lesquelles, pourquoi, combien de temps, et vos droits."),
      sections,
    };
  }

  const sections: LegalSection[] = [
    {
      title: "Data controller",
      body: (
        <p>
          {COMPANY.legalName}, {COMPANY.address}. Contact: {mail}.
        </p>
      ),
    },
    {
      title: "Data collected",
      body: (
        <ul className={list}>
          <li>Contact form: the business concerned, name, email address, phone if you give it, message.</li>
          <li>Waiting lists (Canada, United States): name, email address, city or location, services you are interested in.</li>
          <li>Kuchimoto Lab projects: name, email address, company if you give it, type of project, message.</li>
          <li>Happy Homes Thailand bookings: service, home, preferred date and time, address of the service, name, email address, phone, details.</li>
          <li>Payment: handled by Stripe. Your card details are entered with Stripe and never reach us; we receive the payment confirmation.</li>
          <li>Technical data: our host records technical logs (IP address, pages requested) to run and secure the site.</li>
        </ul>
      ),
    },
    {
      title: "Purposes and legal bases",
      body: (
        <ul className={list}>
          <li>Replying to your messages and project requests: steps taken at your request before a contract, or our legitimate interest in replying.</li>
          <li>Telling you when we open in your country: your consent, which you can withdraw at any time.</li>
          <li>Carrying out and following up a booking: performance of the contract.</li>
          <li>Keeping our accounts: legal obligation.</li>
          <li>Keeping the site secure: legitimate interest.</li>
        </ul>
      ),
    },
    {
      title: "Recipients",
      body: (
        <>
          <p>Your data is never sold or transferred. It is shared only with:</p>
          <ul className={list}>
            <li>Vercel Inc. (United States), which hosts the site;</li>
            <li>Resend (United States), which carries the forms to our inbox;</li>
            <li>Stripe Payments Europe, Ltd. (Ireland), for payment;</li>
            <li>whoever carries out the service, for a booking (address, date, details).</li>
          </ul>
          <p>
            Where data is processed outside the European Union, the transfer is covered by the safeguards provided for
            by the GDPR (an adequacy decision or standard contractual clauses).
          </p>
        </>
      ),
    },
    {
      title: "How long we keep it",
      body: (
        <ul className={list}>
          <li>Messages and requests: three years after our last exchange.</li>
          <li>Waiting lists: until we open and tell you, or until you unsubscribe, and at most three years.</li>
          <li>Bookings: for the length of the business relationship; accounting records are kept for ten years (article L123-22 of the French Commercial Code).</li>
          <li>Technical logs: the limited period set by the host.</li>
        </ul>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      body: (
        <>
          <p>
            This site only uses cookies and storage it needs to work. It uses no advertising and no audience
            measurement. Your choice in the cookie banner is saved in your browser (local storage) so we don&apos;t ask
            again; it is used for nothing else.
          </p>
          <p>
            If we ever add an optional tool, it will only run after you agree. You can change your mind at any time
            with the &ldquo;Manage cookies&rdquo; link at the bottom of every page. Stripe&apos;s payment pages apply their
            own policy.
          </p>
        </>
      ),
    },
    {
      title: "Your rights",
      body: (
        <>
          <p>
            You can access, correct or erase your data, restrict or object to its processing, ask for it to be ported
            and withdraw your consent, by writing to {mail}. We reply within one month.
          </p>
          <p>You can also lodge a complaint with the CNIL, the French data protection authority ({cnil}).</p>
        </>
      ),
    },
  ];
  return {
    title: "Privacy policy",
    description: "Personal data collected on kuchimoto.com: what, why, for how long, and your rights.",
    sections,
  };
}
