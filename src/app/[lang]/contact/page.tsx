import type { Metadata } from "next";
import { CONTACT, COMPANY } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { leadFormProps } from "@/lib/leads/props";
import { Container, PageHeader, Todo } from "@/components/ui";
import { ContactForms } from "@/components/forms/ContactForms";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.contact;
  return pageMetadata({ lang, path: "/contact", title: t.title, description: t.description });
}

export default async function Contact() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.contact;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} />

      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        {/* ?business=lab, studio, happy-homes or bambootails preselects the business. */}
        <ContactForms
          lang={lang}
          forms={dict.forms}
          studioLabel={t.studio}
          privacyHref={localizedPath(lang, "/confidentialite")}
          contactEmail={CONTACT.email}
          lead={leadFormProps(lang)}
        />

        <aside aria-labelledby="direct" className="lg:border-l lg:hairline lg:pl-10">
          <h2 id="direct" className="eyebrow text-ink-soft">
            {t.direct}
          </h2>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm text-ink-soft">{dict.common.email}</dt>
              <dd className="mt-1 text-lg">
                {CONTACT.email ? (
                  <a href={`mailto:${CONTACT.email}`} className="underline-offset-4 hover:underline">
                    {CONTACT.email}
                  </a>
                ) : (
                  <Todo>{dict.common.placeholderEmail}</Todo>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">{dict.common.phone}</dt>
              <dd className="mt-1 text-lg">
                <a href={CONTACT.phoneHref} className="underline-offset-4 hover:underline">
                  {CONTACT.phone[lang]}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">{COMPANY.legalName}</dt>
              <dd className="mt-1">{COMPANY.address}</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
