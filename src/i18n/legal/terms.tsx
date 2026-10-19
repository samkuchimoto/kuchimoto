// /src/i18n/legal/terms.tsx
// /cgv: the terms of sale for Happy Homes bookings on kuchimoto.com, in
// French (the reference), English and Japanese. Standard French consumer-law
// clauses; every fact not yet decided is a visible placeholder.

import Link from "next/link";
import { COMPANY, CONTACT } from "@/config/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CompanyIdentity, type LegalSection } from "@/components/LegalPage";
import { Todo } from "@/components/ui";
import { frenchSpacing as f } from "@/lib/typography";
import { companyRows } from "./identity";

const link = "underline underline-offset-4";

export function termsContent(lang: Locale, dict: Dictionary) {
  const mail = CONTACT.email ? (
    <a href={`mailto:${CONTACT.email}`} className={link}>
      {CONTACT.email}
    </a>
  ) : (
    <Todo>{dict.common.placeholderEmail}</Todo>
  );
  const page = (path: string, label: string) => (
    <Link href={localizedPath(lang, path)} className={link}>
      {label}
    </Link>
  );
  const mediator = COMPANY.mediator;

  if (lang === "fr") {
    const sections: LegalSection[] = [
      {
        title: "Objet",
        body: (
          <p>
            {f(
              `Les présentes conditions générales de vente (CGV) s'appliquent aux prestations Happy Homes réservées sur le site kuchimoto.com entre ${COMPANY.legalName} (« le prestataire ») et toute personne physique agissant à des fins non professionnelles (« le client »). Toute réservation vaut acceptation des CGV en vigueur au jour de la réservation.`,
            )}
          </p>
        ),
      },
      { title: "Prestataire", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
      {
        title: "Prestations",
        body: (
          <>
            <p>
              {f("Les prestations proposées (ménage ponctuel, formule hebdomadaire, grand ménage d'entrée ou de sortie, nettoyage de climatiseurs, Villa Care) et leur contenu sont décrits sur la page")}{" "}
              {page("/happy-homes/thailande", "Happy Homes Thaïlande")}. Elles sont réalisées à Pattaya, en Thaïlande.
            </p>
            <p>{f("Le ménage d'une villa fait l'objet d'un devis établi d'après les photos fournies par le client ; il n'est pas payé en ligne.")}</p>
          </>
        ),
      },
      {
        title: "Prix",
        body: (
          <>
            <p>
              {f("Prix en bahts. TVA française non applicable : prestation liée à un bien immobilier situé en Thaïlande (article 259 A, 2° du CGI).")}
            </p>
            <p>{f("Le prix applicable est celui affiché au moment de la réservation.")}</p>
          </>
        ),
      },
      {
        title: "Réservation et paiement",
        body: (
          <>
            <p>
              {f("Le client réserve au moyen du formulaire en ligne. Pour une prestation à prix fixe, il paie par carte bancaire au moment de la réservation, par l'intermédiaire de Stripe, prestataire de paiement sécurisé ; les données de carte sont saisies chez Stripe et ne sont jamais transmises au prestataire. Le contrat est conclu à la réception du paiement, confirmée par e-mail.")}
            </p>
            <p>
              {f("Pour une formule mensuelle (formule hebdomadaire, Villa Care), le premier mois est payé à la réservation. Les mois suivants sont payés par carte, automatiquement, à la date anniversaire de la souscription. Résiliation à tout moment par e-mail, effective à la fin du mois déjà payé ; le mois entamé n'est pas remboursé.")}
            </p>
            <p>
              {f("Droit de rétractation de 14 jours à compter de la souscription (article L221-18 du Code de la consommation). Si le client demande que la prestation commence avant la fin de ce délai et se rétracte ensuite, il paie la part déjà réalisée (article L221-25).")}
            </p>
          </>
        ),
      },
      {
        title: "Exécution",
        body: (
          <p>
            {f("La date et le moment de la prestation sont confirmés au client par e-mail. Le client donne accès au logement à l'heure convenue et signale toute contrainte particulière (accès, animaux) lors de la réservation.")}
          </p>
        ),
      },
      {
        title: "Annulation",
        body: (
          <>
            <p>
              {f("Annulation gratuite jusqu'à 24 heures avant la prestation. Moins de 24 heures avant, 50 % du prix reste dû.")}
            </p>
            <p>
              {f("Le client annule en écrivant à")} {mail}.
            </p>
          </>
        ),
      },
      {
        title: "Droit de rétractation",
        body: (
          <>
            <p>
              {f("Conformément aux articles L221-18 et suivants du Code de la consommation, le client dispose de quatorze jours à compter de la conclusion du contrat pour se rétracter, sans avoir à motiver sa décision. Il informe le prestataire de sa décision par une déclaration dénuée d'ambiguïté, par exemple par e-mail à")}{" "}
              {mail}
              {f(", ou au moyen du formulaire type ci-dessous. Le prestataire rembourse les sommes versées au plus tard quatorze jours après en avoir été informé, par le même moyen de paiement.")}
            </p>
            <p>
              {f("Lorsque le client a expressément demandé que la prestation commence avant la fin du délai de rétractation, il perd son droit de rétractation une fois la prestation entièrement exécutée (article L221-28, 1°). S'il se rétracte après le début de la prestation, il paie un montant proportionnel à ce qui a été fourni jusqu'à sa décision (article L221-25).")}
            </p>
            <div className="border hairline bg-washi p-5 text-sm">
              <p className="font-medium">Formulaire type de rétractation</p>
              <p className="mt-2">{f(`À l'attention de ${COMPANY.legalName}, ${COMPANY.address}, e-mail :`)} {mail}</p>
              <p className="mt-2">
                {f("Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la prestation de services ci-dessous :")}
              </p>
              <p className="mt-2">
                {f("Réservée le :")}
                <br />
                {f("Nom du (des) consommateur(s) :")}
                <br />
                {f("Adresse du (des) consommateur(s) :")}
                <br />
                {f("Signature du (des) consommateur(s) (uniquement en cas de notification sur papier) :")}
                <br />
                {f("Date :")}
              </p>
              <p className="mt-2 text-xs">(*) Rayez la mention inutile.</p>
            </div>
          </>
        ),
      },
      {
        title: "Réclamations",
        body: (
          <p>
            {f("Toute réclamation est à adresser par écrit au prestataire, par e-mail à")} {mail}{" "}
            {f(`ou par courrier à ${COMPANY.address}.`)}
          </p>
        ),
      },
      {
        title: "Médiation de la consommation",
        body: mediator ? (
          <p>
            {f(`Après une réclamation écrite préalable restée sans solution, le client peut saisir gratuitement le médiateur de la consommation (article L612-1 du Code de la consommation) : ${mediator.name}, ${mediator.address},`)}{" "}
            <a href={mediator.url} className={link}>
              {mediator.url.replace("https://", "")}
            </a>
            .
          </p>
        ) : (
          <p>
            {f("Médiateur de la consommation : désignation en cours. Ses coordonnées seront publiées ici avant l'ouverture du paiement en ligne.")}
          </p>
        ),
      },
      {
        title: "Données personnelles",
        body: <p>{f("Les données transmises lors d'une réservation sont traitées conformément à notre")} {page("/confidentialite", "politique de confidentialité")}.</p>,
      },
      {
        title: "Droit applicable",
        body: (
          <p>
            {f("Les présentes CGV sont soumises au droit français. Le client consommateur conserve la protection des dispositions impératives de la loi de son pays de résidence. En cas de litige, une solution amiable est recherchée en priorité.")}
          </p>
        ),
      },
    ];
    return {
      title: "Conditions générales de vente Happy Homes",
      description: f("Conditions générales de vente des prestations Happy Homes réservées sur kuchimoto.com : réservation, paiement, annulation, rétractation."),
      sections,
    };
  }

  if (lang === "ja") {
    const sections: LegalSection[] = [
      {
        title: "目的",
        body: (
          <p>
            本利用規約は、kuchimoto.comで予約されたHappy Homesのサービスについて、{COMPANY.legalName}
            （以下「提供者」）と、事業以外の目的で行動する個人（以下「お客様」）との間に適用されます。ご予約をもって、予約日に有効な本規約に同意したものとみなします。
          </p>
        ),
      },
      { title: "提供者", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
      {
        title: "サービス",
        body: (
          <>
            <p>
              提供するサービス（単発の清掃、週1回プラン、入居時、退去時の大掃除、エアコンクリーニング、Villa Care）とその内容は、
              {page("/happy-homes/thailande", "Happy Homes タイ")}
              のページに記載しています。サービスはタイのパタヤで行います。
            </p>
            <p>ヴィラの清掃は、お客様からお送りいただいた写真をもとにお見積もりします。オンラインでのお支払いはありません。</p>
          </>
        ),
      },
      {
        title: "料金",
        body: (
          <>
            <p>
              料金はタイバーツで表示します。フランスの付加価値税（TVA）は適用されません。タイにある不動産に関するサービスのためです（フランス租税一般法典第259A条2°）。
            </p>
            <p>適用される料金は、ご予約の時点で表示されている料金です。</p>
          </>
        ),
      },
      {
        title: "予約とお支払い",
        body: (
          <>
            <p>
              お客様は、オンラインのフォームでご予約いただきます。定額のサービスは、ご予約の際に、安全な決済サービスであるStripeを通じて、クレジットカードでお支払いいただきます。カード情報はStripe上で入力され、提供者に送られることはありません。契約は、お支払いの受領をもって成立し、メールで確認をお送りします。
            </p>
            <p>
              月額プラン（週1回プラン、Villa Care）は、ご予約の際に初月分をお支払いいただきます。翌月以降は、お申し込み日と同じ日付に、カードで自動的にお支払いいただきます。解約はメールでいつでもでき、お支払い済みの月の末日に有効となります。始まった月の分は返金しません。
            </p>
            <p>
              お申し込みから14日間の撤回権があります（フランス消費法典L221-18条）。お客様がこの期間の終了前にサービスの開始を求め、その後に撤回した場合は、すでに提供された分をお支払いいただきます（L221-25条）。
            </p>
          </>
        ),
      },
      {
        title: "サービスの実施",
        body: (
          <p>
            サービスの日時は、メールでお客様に確認します。お客様は、約束の時間に住居に入れるようにし、特別な事情（入館の方法、ペットなど）がある場合は、ご予約の際にお知らせください。
          </p>
        ),
      },
      {
        title: "キャンセル",
        body: (
          <>
            <p>サービスの24時間前までは、無料でキャンセルできます。24時間前を過ぎた場合は、料金の50％をお支払いいただきます。</p>
            <p>キャンセルは、{mail}へのメールで承ります。</p>
          </>
        ),
      },
      {
        title: "撤回権",
        body: (
          <>
            <p>
              フランス消費法典L221-18条以下の規定により、お客様は、契約の締結から14日以内であれば、理由を示すことなく契約を撤回できます。撤回の意思は、たとえば{mail}
              へのメールや下記の書式など、明確な意思表示によって提供者にお知らせください。提供者は、お知らせを受けてから14日以内に、お支払いと同じ方法で返金します。
            </p>
            <p>
              お客様が撤回期間の終了前にサービスの開始をはっきりと求めた場合、サービスが完全に提供された時点で撤回権は失われます（L221-28条1°）。サービスの開始後に撤回した場合は、撤回の時点までに提供された分に応じた金額をお支払いいただきます（L221-25条）。
            </p>
            <div className="border hairline bg-washi p-5 text-sm">
              <p className="font-medium">撤回の書式（ひな形）</p>
              <p className="mt-2">
                宛先：{COMPANY.legalName}、{COMPANY.address}、メール：{mail}
              </p>
              <p className="mt-2">私（私たち）（*）は、以下のサービスの提供に関する私（私たち）（*）の契約を撤回することを、ここに通知します。</p>
              <p className="mt-2">
                予約日：
                <br />
                消費者の氏名：
                <br />
                消費者の住所：
                <br />
                消費者の署名（書面で通知する場合のみ）：
                <br />
                日付：
              </p>
              <p className="mt-2 text-xs">（*）不要なものを消してください。</p>
            </div>
          </>
        ),
      },
      {
        title: "苦情",
        body: (
          <p>
            苦情は、{mail}へのメール、または{COMPANY.address}への郵送で、書面にて提供者にお送りください。
          </p>
        ),
      },
      {
        title: "消費者調停",
        body: mediator ? (
          <p>
            書面での苦情で解決しなかった場合、お客様は無料で消費者調停人に申し立てることができます（フランス消費法典L612-1条）：
            {mediator.name}、{mediator.address}、
            <a href={mediator.url} className={link}>
              {mediator.url.replace("https://", "")}
            </a>
            。
          </p>
        ) : (
          <p>消費者調停人：選任の手続き中です。オンライン決済が始まる前に、ここに連絡先を掲載します。</p>
        ),
      },
      {
        title: "個人情報",
        body: <p>ご予約の際にお送りいただいた情報は、{page("/confidentialite", "プライバシーポリシー")}に従って取り扱います。</p>,
      },
      {
        title: "準拠法",
        body: (
          <p>
            本規約はフランス法に準拠します。消費者であるお客様は、お住まいの国の法律の強行規定による保護を引き続き受けられます。紛争が生じた場合は、まず話し合いによる解決を目指します。
          </p>
        ),
      },
    ];
    return {
      title: "Happy Homes 利用規約",
      description: "kuchimoto.comで予約するHappy Homesのサービスの利用規約：予約、お支払い、キャンセル、撤回。",
      sections,
    };
  }

  const sections: LegalSection[] = [
    {
      title: "Purpose",
      body: (
        <p>
          These general terms of sale apply to the Happy Homes services booked on kuchimoto.com between{" "}
          {COMPANY.legalName} (&ldquo;the provider&rdquo;) and any individual acting for purposes outside their trade or
          profession (&ldquo;the customer&rdquo;). Any booking means accepting the terms in force on the day of the booking.
        </p>
      ),
    },
    { title: "Provider", body: <CompanyIdentity rows={companyRows(lang, dict)} /> },
    {
      title: "Services",
      body: (
        <>
          <p>
            The services offered (one-off clean, weekly plan, move-in or move-out deep clean, air conditioner cleaning,
            Villa Care) and what they include are described on the {page("/happy-homes/thailande", "Happy Homes Thailand")}{" "}
            page. They are carried out in Pattaya, Thailand.
          </p>
          <p>A villa clean is quoted from the photos the customer provides; it is not paid online.</p>
        </>
      ),
    },
    {
      title: "Prices",
      body: (
        <>
          <p>
            Prices in baht. French VAT does not apply: the service relates to a property located in Thailand (article
            259 A, 2° of the French General Tax Code).
          </p>
          <p>The applicable price is the one shown when the booking is made.</p>
        </>
      ),
    },
    {
      title: "Booking and payment",
      body: (
        <>
          <p>
            The customer books using the online form. For a fixed-price service, they pay by bank card when booking,
            through Stripe, a secure payment provider; card details are entered with Stripe and never reach the
            provider. The contract is concluded when payment is received, confirmed by email.
          </p>
          <p>
            For a monthly package (weekly plan, Villa Care), the first month is paid when booking. The following months
            are paid by card, automatically, on the anniversary date of the subscription. The subscription can be
            cancelled at any time by email, taking effect at the end of the month already paid; a month that has begun
            is not refunded.
          </p>
          <p>
            Right of withdrawal of 14 days from the subscription (article L221-18 of the French Consumer Code). If the
            customer asks for the service to start before the end of that period and then withdraws, they pay for the
            part already carried out (article L221-25).
          </p>
        </>
      ),
    },
    {
      title: "Performance",
      body: (
        <p>
          The date and time of the service are confirmed to the customer by email. The customer gives access to the
          home at the agreed time and mentions any particular constraint (access, pets) when booking.
        </p>
      ),
    },
    {
      title: "Cancellation",
      body: (
        <>
          <p>
            Free cancellation up to 24 hours before the service. Less than 24 hours before, 50% of the price remains
            due.
          </p>
          <p>The customer cancels by writing to {mail}.</p>
        </>
      ),
    },
    {
      title: "Right of withdrawal",
      body: (
        <>
          <p>
            Under articles L221-18 and following of the French Consumer Code, the customer has fourteen days from the
            conclusion of the contract to withdraw, without giving any reason. They inform the provider of their
            decision by an unequivocal statement, for example by email to {mail}, or using the model form below. The
            provider refunds the sums paid no later than fourteen days after being informed, using the same means of
            payment.
          </p>
          <p>
            When the customer has expressly asked for the service to start before the end of the withdrawal period,
            they lose their right of withdrawal once the service has been fully performed (article L221-28, 1°). If
            they withdraw after the service has started, they pay an amount in proportion to what was provided until
            their decision (article L221-25).
          </p>
          <div className="border hairline bg-washi p-5 text-sm">
            <p className="font-medium">Model withdrawal form</p>
            <p className="mt-2">
              To {COMPANY.legalName}, {COMPANY.address}, email: {mail}
            </p>
            <p className="mt-2">
              I/We (*) hereby give notice that I/we (*) withdraw from my/our (*) contract for the provision of the
              following service:
            </p>
            <p className="mt-2">
              Booked on:
              <br />
              Name of consumer(s):
              <br />
              Address of consumer(s):
              <br />
              Signature of consumer(s) (only if this form is notified on paper):
              <br />
              Date:
            </p>
            <p className="mt-2 text-xs">(*) Delete as appropriate.</p>
          </div>
        </>
      ),
    },
    {
      title: "Complaints",
      body: (
        <p>
          Any complaint is to be sent to the provider in writing, by email to {mail} or by post to {COMPANY.address}.
        </p>
      ),
    },
    {
      title: "Consumer mediation",
      body: mediator ? (
        <p>
          After a prior written complaint that was not resolved, the customer may refer the matter free of charge to
          the consumer mediator (article L612-1 of the French Consumer Code): {mediator.name}, {mediator.address},{" "}
          <a href={mediator.url} className={link}>
            {mediator.url.replace("https://", "")}
          </a>
          .
        </p>
      ) : (
        <p>
          Consumer mediator: appointment in progress. Their details will be published here before online payment
          opens.
        </p>
      ),
    },
    {
      title: "Personal data",
      body: <p>Data given when booking is handled in line with our {page("/confidentialite", "privacy policy")}.</p>,
    },
    {
      title: "Applicable law",
      body: (
        <p>
          These terms are governed by French law. A consumer customer keeps the protection of the mandatory provisions
          of the law of their country of residence. In the event of a dispute, an amicable solution is sought first.
        </p>
      ),
    },
  ];
  return {
    title: "Happy Homes terms of sale",
    description: "Terms of sale for Happy Homes services booked on kuchimoto.com: booking, payment, cancellation, withdrawal.",
    sections,
  };
}
