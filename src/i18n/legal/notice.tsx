// /src/i18n/legal/notice.tsx
// /mentions-legales, in French (the reference), English and Japanese. Loi
// n° 2004-575 du 21 juin 2004 (LCEN), art. 6. Facts from config/site.ts.

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
      { title: "Directeur de la publication", body: <p>{COMPANY.director}.</p> },
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

  if (lang === "ja") {
    const sections: LegalSection[] = [
      { title: "サイト運営者", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
      { title: "発行責任者", body: <p>{COMPANY.director}</p> },
      { title: "ホスティング事業者", body: host },
      {
        title: "知的財産",
        body: (
          <>
            <p>
              本サイトの文章、イラスト、画像は、特に記載がない限り、{COMPANY.legalName}
              または各制作者に帰属します。事前の書面による許可なく複製することを禁じます。
            </p>
            <p>
              BAMBOOTAILSはSamuel Louissaintの商標（INPI番号{BAMBOOTAILS.inpi}）で、{COMPANY.name}
              が使用しています。BambooTailsのキャラクターは、Samuel Louissaintの創作物です。
            </p>
          </>
        ),
      },
      {
        title: "個人情報",
        body: <p>本サイトで収集する情報とお客様の権利については、{privacy("プライバシーポリシー")}をご覧ください。</p>,
      },
    ];
    return {
      title: "法的表示",
      description: "kuchimoto.comの法的表示：サイト運営者、発行責任者、ホスティング事業者。",
      intro: (
        <p>
          デジタル経済における信頼のための2004年6月21日付フランス法第2004-575号（LCEN）第6条に基づく、kuchimoto.comに関する情報です。
        </p>
      ),
      sections,
    };
  }

  const sections: LegalSection[] = [
    { title: "Publisher", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
    { title: "Director of publication", body: <p>{COMPANY.director}.</p> },
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
