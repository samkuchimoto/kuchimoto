import type { Metadata } from "next";
import { CONTACT, ITTSUI_URL } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { InquiryForm } from "@/components/forms/InquiryForm";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.lab;
  return pageMetadata({ lang, path: "/lab", title: t.title, description: t.description });
}

export default async function Lab() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.lab;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="lab" />

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="services" className="max-w-3xl">
          <h2 id="services" className="text-2xl sm:text-3xl">
            {t.servicesTitle}
          </h2>
          <dl className="mt-10 space-y-8">
            {t.services.map(([name, detail]) => (
              <div key={name} className="border-t border-lab pt-5">
                <dt className="font-display text-xl">{name}</dt>
                <dd className="mt-2 text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <ButtonLink href={ITTSUI_URL} accent="lab" variant="outline" external externalLabel={dict.bambootails.external}>
              {t.ittsui}
            </ButtonLink>
          </div>
        </section>
      </Container>

      <section aria-labelledby="studio" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-lab">{t.studio.label}</p>
          <h2 id="studio" className="mt-4 text-2xl sm:text-3xl">
            {t.studio.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.studio.body}</p>
          <div className="mt-8">
            <ButtonLink href={localizedPath(lang, "/studio")} accent="lab">
              {t.studio.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="project" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 id="project" className="text-3xl">
              {t.formTitle}
            </h2>
            <div className="mt-10">
              <InquiryForm
                kind="project"
                division="lab"
                lang={lang}
                t={dict.forms}
                privacyHref={localizedPath(lang, "/confidentialite")}
                contactEmail={CONTACT.email}
                accentClass="bg-lab"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
