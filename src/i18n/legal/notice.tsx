// /src/i18n/legal/notice.tsx
// /mentions-legales, in French (the reference) and English. Loi n° 2004-575
// du 21 juin 2004 (LCEN), art. 6. Facts from config/site.ts.

import Link from "next/link";
import { BAMBOOTAILS, COMPANY } from "@/config/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CompanyIdentity, type LegalSection } from "@/components/LegalPage";
import { frenchSpacing as f } from "@/lib/typography";
import { companyRows } from "./identity";

const link = "underline underline-offset-4";

export function noticeContent(lang: Locale, dict: Dictionary) {
  const host = (
    <p>
      {COMPANY.host.name}, {COMPANY.host.address[lang]}.{" "}
      <a href={COMPANY.host.url} className={link}>
        {COMPANY.host.url.replace("https://", "")}
      </a>
    </p>
  );
  const privacy = (label: string) => (
    <Link href={localizedPath(lang, "/confidentialite")} className={link}>
      {label}
    </Link>
  );

  if (lang === "fr") {
    const sections: LegalSection[] = [
      { title: "Éditeur du site", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
      { title: "Directeur de la publication", body: <p>{COMPANY.president}, président.</p> },
      { title: "Hébergeur", body: host },
      {
        title: "Propriété intellectuelle",
        body: (
          <>
            <p>
              Les textes, illustrations et visuels de ce site appartiennent à {COMPANY.legalName} ou à leurs auteurs,
              sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite.
            </p>
            <p>
              BAMBOOTAILS est une marque de Samuel Louissaint (INPI n° {BAMBOOTAILS.inpi}), utilisée par{" "}
              {COMPANY.name}. Les personnages BambooTails sont des créations de Samuel Louissaint.
            </p>
          </>
        ),
      },
      {
        title: "Données personnelles",
        body: <p>Les données collectées sur ce site et vos droits sont décrits dans notre {privacy("politique de confidentialité")}.</p>,
      },
    ];
    return {
      title: "Mentions légales",
      description: f("Mentions légales de kuchimoto.com : éditeur, directeur de la publication et hébergeur."),
      intro: (
        <p>
          Informations prévues par l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique, pour le site kuchimoto.com.
        </p>
      ),
      sections,
    };
  }

  const sections: LegalSection[] = [
    { title: "Publisher", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
    { title: "Director of publication", body: <p>{COMPANY.president}, president.</p> },
    { title: "Host", body: host },
    {
      title: "Intellectual property",
      body: (
        <>
          <p>
            The texts, illustrations and visuals on this site belong to {COMPANY.legalName} or to their authors, unless
            stated otherwise. Any reproduction without prior written permission is prohibited.
          </p>
          <p>
            BAMBOOTAILS is a trademark of Samuel Louissaint (INPI no. {BAMBOOTAILS.inpi}), used by {COMPANY.name}. The
            BambooTails characters are the work of Samuel Louissaint.
          </p>
        </>
      ),
    },
    {
      title: "Personal data",
      body: <p>The data collected on this site and your rights are described in our {privacy("privacy policy")}.</p>,
    },
  ];
  return {
    title: "Legal notice",
    description: "Legal notice for kuchimoto.com: publisher, director of publication and host.",
    intro: (
      <p>
        Information required by article 6 of French law no. 2004-575 of 21 June 2004 on confidence in the digital
        economy (LCEN), for the site kuchimoto.com.
      </p>
    ),
    sections,
  };
}
