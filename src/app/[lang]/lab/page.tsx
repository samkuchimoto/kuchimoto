import type { Metadata } from "next";
import Link from "next/link";
import { ITTSUI_URL, LAB } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { fill, wholeEuros } from "@/lib/format";
import { demoPath, leadFormProps, payPath } from "@/lib/leads/props";
import { pageMetadata } from "@/lib/seo";
import { prototypeButtonsShown } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { PresetButton } from "@/components/PrototypeCta";
import { StrategicNotes } from "@/components/StrategicNotes";
import { Faq, Founder, ProofStrip } from "@/components/offers";

/**
 * Kuchimoto Lab, a Google Ads landing page (/en/lab). The lead form's first
 * step is in the hero; the anchors #start, #prototype, #demo, #notes,
 * #ittsui and #contact are the ads' sitelinks.
 */

const CARDS = ["agent", "mvp", "whitelabel"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.lab;
  return pageMetadata({ lang, path: "/lab", title: t.title, description: t.description, absoluteTitle: true });
}

export default async function Lab() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.lab;
  const price = wholeEuros(LAB.prototype, lang);
  const cardPrice = { agent: price, mvp: wholeEuros(LAB.mvpFrom, lang), whitelabel: "" };
  const form = leadFormProps(lang);
  const demo = demoPath(lang);
  // "Pay €490 and start" once Stripe is set up (lib/stripe.ts).
  const pay = prototypeButtonsShown() ? payPath(lang, "lab") : null;

  return (
    <>
      <section id="start" aria-labelledby="lab-title" className="border-b hairline">
        <Container className="grid gap-6 pt-5 pb-8 sm:gap-8 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow hidden text-lab sm:block">{t.label}</p>
            <h1 id="lab-title" className="text-[1.6rem] leading-[1.2] sm:mt-5 sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-normal text-ink-soft sm:mt-6 sm:text-lg sm:leading-relaxed">{fill(t.intro, { price })}</p>
          </div>
          <div>
            <LeadForm {...form} id="lead-hero" role="hero" source="lab" preset="agent" />
            <p className="mt-6 text-sm">
              <Link href={demo.href} hrefLang={demo.lang} className="font-medium text-lab underline underline-offset-4 hover:no-underline">
                {t.demoLink}
              </Link>
              {t.demoLang && <span className="text-ink-soft">{t.demoLang}</span>}
              <span aria-hidden className="text-lab">
                {" "}
                →
              </span>
            </p>
          </div>
        </Container>
      </section>

      <ProofStrip t={dict.proof} />

      <section id="prototype" aria-labelledby="prototype-title">
        <Container className="py-16 sm:py-20">
          <h2 id="prototype-title" className="text-2xl sm:text-3xl">
            {t.prototype.title}
          </h2>
          <ul className="mt-10 grid gap-px border hairline bg-line md:grid-cols-3">
            {CARDS.map((key) => {
              const card = t.prototype.cards[key];
              const values = { price: cardPrice[key] };
              return (
                <li key={key} className="flex flex-col bg-paper p-6 sm:p-8">
                  <h3 className="text-xl">{fill(card.title, values)}</h3>
                  <p className="mt-4 text-ink-soft">{fill(card.body, values)}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <PresetButton need={key}>{fill(card.cta, values)}</PresetButton>
                    {key === "agent" && pay && (
                      <ButtonLink href={pay} accent="lab" variant="outline">
                        {fill(dict.pay.button, { price })}
                      </ButtonLink>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">{t.prototype.also}</p>
        </Container>
      </section>

      <section aria-labelledby="how" className="border-t hairline bg-washi">
        <Container className="py-16 sm:py-20">
          <h2 id="how" className="text-2xl sm:text-3xl">
            {t.how.title}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {t.how.steps.map((step, i) => (
              <li key={step} className="border-t border-lab pt-5">
                <span className="font-display text-2xl text-lab tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="demo" aria-labelledby="demo-title" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-lab">{t.demo.label}</p>
          <h2 id="demo-title" className="mt-4 max-w-2xl text-2xl sm:text-3xl">
            {t.demo.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.demo.body}</p>
          <div className="mt-8">
            <ButtonLink href={demo.href} accent="lab">
              {t.demo.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <StrategicNotes t={dict.notes} intro={t.notesIntro} demoHref={demo.href} demoLang={demo.lang} />

      <section id="ittsui" aria-labelledby="ittsui-title" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl border-t border-lab pt-5">
            <h2 id="ittsui-title" className="text-2xl sm:text-3xl">
              {t.ittsui.title}
            </h2>
            <p className="mt-4 text-ink-soft">{t.ittsui.body}</p>
          </div>
          <div className="mt-8">
            <ButtonLink href={ITTSUI_URL} accent="lab" variant="outline" external externalLabel={dict.bambootails.external}>
              {t.ittsui.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Founder t={dict.founder} />
      <Faq t={dict.faq} price={price} />

      <section id="contact" aria-labelledby="contact-title" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 id="contact-title" className="text-2xl sm:text-3xl">
              {t.contactTitle}
            </h2>
            <div className="mt-8">
              <LeadForm {...form} id="lead-final" role="final" source="lab" preset="agent" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
