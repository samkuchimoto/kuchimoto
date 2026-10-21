import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LAB } from "@/config/site";
import { getLang } from "@/i18n/server";
import { fill, wholeEuros } from "@/lib/format";
import { leadFormProps } from "@/lib/leads/props";
import { pageMetadata } from "@/lib/seo";
import { demoCopy } from "@/lib/triage/copy";
import { Container, PageHeader } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { TriageTool } from "@/components/demo-triage/TriageTool";

/**
 * /demo-triage and /en/demo-triage (a Google Ads landing page): a working
 * demo of the executive triage agent, kept out of search engines and the
 * menu. Visitors paste their own emails or a screenshot of their inbox;
 * the engine (lib/triage) reads and triages them in the browser, and only
 * what they type into the lead form is sent. Once the brief is built, the
 * lead form appears under it; the same form closes the page.
 * No Japanese version: Japanese pages link to the English one.
 */

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  if (lang === "ja") return {};
  const t = demoCopy(lang).page;
  return {
    ...pageMetadata({ lang, path: "/demo-triage", title: t.title, description: t.description, noindex: true }),
    // French and English only.
    alternates: {
      canonical: lang === "fr" ? "/demo-triage" : "/en/demo-triage",
      languages: { fr: "/demo-triage", en: "/en/demo-triage", "x-default": "/demo-triage" },
    },
  };
}

export default async function DemoTriage() {
  const lang = await getLang();
  if (lang === "ja") notFound();
  const t = demoCopy(lang).page;
  const form = leadFormProps(lang);
  const price = wholeEuros(LAB.prototype, lang);

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="lab" />

      <Container className="pt-12 sm:pt-16">
        <section aria-labelledby="sandbox" className="border border-lab bg-lab-wash p-6 sm:p-8">
          <p id="sandbox" className="eyebrow text-lab">
            {t.sandbox.label}
          </p>
          <p className="mt-3 font-display text-xl sm:text-2xl">{t.sandbox.body}</p>
          <p className="mt-3 text-sm text-ink-soft">{t.sandbox.note}</p>
        </section>
      </Container>

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="tool">
          <h2 id="tool" className="text-2xl sm:text-3xl">
            {t.tool.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.tool.intro}</p>
          <TriageTool
            lang={lang}
            afterBrief={
              <section aria-labelledby="after-brief" className="mt-14 border border-lab bg-lab-wash p-6 sm:p-8">
                <h2 id="after-brief" className="text-2xl sm:text-3xl">
                  {t.afterBrief.title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink-soft">{fill(t.afterBrief.body, { price })}</p>
                <div className="mt-8 max-w-2xl">
                  <LeadForm {...form} id="lead-brief" role="hero" source="demo" preset="agent" />
                </div>
              </section>
            }
          />
        </section>
      </Container>

      <section id="contact" aria-labelledby="pilot" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <h2 id="pilot" className="text-2xl sm:text-3xl">
            {t.pilot.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.pilot.intro}</p>
          <div className="mt-10 max-w-2xl">
            <LeadForm {...form} id="lead-final" role="final" source="demo" preset="agent" />
          </div>
        </Container>
      </section>
    </>
  );
}
