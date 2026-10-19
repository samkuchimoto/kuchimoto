// /src/i18n/legal/privacy.tsx
// /confidentialite, in French (the reference), English and Japanese.
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
            <li>{f("Démo d'analyse d'e-mails (/demo-triage) : les e-mails ou la capture que vous y déposez sont lus et analysés dans votre navigateur, sans nous être envoyés ; la lecture d'une capture télécharge le programme de reconnaissance de texte depuis cdn.jsdelivr.net. Si l'analyse approfondie par IA vous est proposée et que vous la cochez, le contenu est transmis à notre prestataire d'IA pour produire la synthèse.")}</li>
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
              <li>{f("à notre prestataire d'IA (Anthropic ou OpenAI, États-Unis), uniquement si vous cochez l'analyse approfondie par IA de la démo /demo-triage ;")}</li>
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
            <li>{f("Démo /demo-triage : rien n'est conservé par KUCHIMOTO ; avec l'analyse par IA, le prestataire peut garder le contenu une durée limitée, selon ses propres conditions.")}</li>
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

  if (lang === "ja") {
    const sections: LegalSection[] = [
      {
        title: "個人情報の管理者",
        body: (
          <p>
            {COMPANY.legalName}、{COMPANY.address}。連絡先：{mail}
          </p>
        ),
      },
      {
        title: "収集する情報",
        body: (
          <ul className={list}>
            <li>お問い合わせフォーム：該当する事業、お名前、メールアドレス、電話番号（ご記入の場合）、メッセージ。</li>
            <li>ウェイティングリスト（カナダ、アメリカ）：お名前、メールアドレス、都市または地域、ご興味のあるサービス。</li>
            <li>Kuchimoto Labのプロジェクト：お名前、メールアドレス、会社名（ご記入の場合）、プロジェクトの種類、メッセージ。</li>
            <li>Happy Homes タイのご予約：サービス、住居、希望の日付と時間帯、サービスを行う住所、お名前、メールアドレス、電話番号、補足事項。</li>
            <li>お支払い：Stripeが処理します。カード情報はStripe上で入力され、当社に送られることはありません。当社が受け取るのは、お支払い完了の通知です。</li>
            <li>技術データ：ホスティング事業者が、サイトの運用と安全のために技術ログ（IPアドレス、表示されたページ）を記録します。</li>
            <li>
              メール分析のデモ（/demo-triage）：お客様が入力したメールやスクリーンショットは、お使いのブラウザの中で読み取り、分析され、当社に送られることはありません。スクリーンショットの読み取りでは、文字認識プログラムをcdn.jsdelivr.netからダウンロードします。AIによる詳細分析が提供され、お客様がそれを選択した場合は、要約を作成するため、内容が当社のAI事業者に送られます。
            </li>
          </ul>
        ),
      },
      {
        title: "利用目的と法的根拠",
        body: (
          <ul className={list}>
            <li>メッセージやプロジェクトのご相談への回答：お客様のご依頼による契約前の措置、または回答に関する当社の正当な利益。</li>
            <li>お住まいの国でのサービス開始のお知らせ：お客様の同意（いつでも撤回できます）。</li>
            <li>ご予約の履行と管理：契約の履行。</li>
            <li>会計記録の保持：法的義務。</li>
            <li>サイトの安全の確保：正当な利益。</li>
          </ul>
        ),
      },
      {
        title: "提供先",
        body: (
          <>
            <p>お客様の情報を販売したり、譲渡したりすることはありません。提供先は次に限られます。</p>
            <ul className={list}>
              <li>Vercel Inc.（アメリカ合衆国）：サイトのホスティング。</li>
              <li>Resend（アメリカ合衆国）：フォームの内容を当社のメールに届けるため。</li>
              <li>当社のAI事業者（AnthropicまたはOpenAI、アメリカ合衆国）：デモ /demo-triage でAIによる詳細分析を選択した場合に限ります。</li>
              <li>Stripe Payments Europe, Ltd.（アイルランド）：お支払いのため。</li>
              <li>サービスを担当する者：ご予約の場合（住所、日付、補足事項）。</li>
            </ul>
            <p>
              欧州連合の域外で情報が処理される場合、その移転は、GDPRが定める保護措置（十分性認定または標準契約条項）のもとで行われます。
            </p>
          </>
        ),
      },
      {
        title: "保存期間",
        body: (
          <ul className={list}>
            <li>メッセージとご依頼：最後のやり取りから3年間。</li>
            <li>ウェイティングリスト：サービス開始をお知らせするまで、または登録を解除されるまで。最長3年間。</li>
            <li>ご予約：取引関係が続く期間。会計書類は10年間保存します（フランス商法典L123-22条）。</li>
            <li>技術ログ：ホスティング事業者が定める限られた期間。</li>
            <li>デモ /demo-triage：KUCHIMOTOは何も保存しません。AIによる分析を選んだ場合、AI事業者が自社の規約に従い、限られた期間、内容を保持することがあります。</li>
          </ul>
        ),
      },
      {
        id: "cookies",
        title: "Cookie",
        body: (
          <>
            <p>
              本サイトは、動作に必要なCookieとストレージだけを使用します。広告やアクセス解析は使用していません。Cookieバナーでの選択は、再びお尋ねしないようにブラウザ（ローカルストレージ）に保存され、それ以外には使われません。
            </p>
            <p>
              今後、任意のツールを加える場合も、お客様の同意を得てから動作させます。各ページ下部の「Cookieの設定」から、いつでも選択を変更できます。Stripeの決済ページには、Stripe独自のポリシーが適用されます。
            </p>
          </>
        ),
      },
      {
        title: "お客様の権利",
        body: (
          <>
            <p>
              お客様は、ご自身の情報へのアクセス、訂正、削除、処理の制限、処理への異議、データポータビリティを求めること、また同意を撤回することができます。{mail}
              までご連絡ください。1か月以内に回答します。
            </p>
            <p>フランスのデータ保護機関であるCNIL（{cnil}）に、苦情を申し立てることもできます。</p>
          </>
        ),
      },
    ];
    return {
      title: "プライバシーポリシー",
      description: "kuchimoto.comで収集する個人情報：その内容、目的、保存期間、お客様の権利。",
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
          <li>
            Email triage demo (/demo-triage): the emails or the screenshot you add are read and analysed in your browser
            and are not sent to us; reading a screenshot downloads the text-recognition program from cdn.jsdelivr.net. If
            the in-depth AI analysis is offered and you tick it, the content is sent to our AI provider to produce the
            summary.
          </li>
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
            <li>our AI provider (Anthropic or OpenAI, United States), only if you tick the in-depth AI analysis on the /demo-triage demo;</li>
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
          <li>The /demo-triage demo: KUCHIMOTO keeps nothing; with the AI analysis, the provider may keep the content for a limited period under its own terms.</li>
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
