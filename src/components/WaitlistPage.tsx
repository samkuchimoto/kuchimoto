// /src/components/WaitlistPage.tsx
// The Canada and United States pages: the opening date, the services
// planned there, a photo still to supply, and the waiting-list form.

import { CONTACT } from "@/config/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { DivisionKey } from "@/lib/forms/options";
import { Container, PageHeader, PhotoPlaceholder } from "@/components/ui";
import { CountryTabs, NoHousingNotice, type Country } from "@/components/happy-homes";
import { InquiryForm } from "@/components/forms/InquiryForm";

export function WaitlistPage({
  lang,
  dict,
  country,
  division,
  copy,
}: {
  lang: Locale;
  dict: Dictionary;
  country: Country;
  division: DivisionKey;
  copy: Dictionary["canada"];
}) {
  return (
    <>
      <PageHeader eyebrow={copy.label} title={copy.title} intro={copy.intro} accent="hh" />
      <CountryTabs lang={lang} dict={dict} current={country} />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl sm:text-3xl">{copy.servicesTitle}</h2>
          <ul className="mt-8 divide-y divide-line border-y hairline">
            {copy.services.map((service) => (
              <li key={service} className="py-4">
                {service}
              </li>
            ))}
          </ul>
          <PhotoPlaceholder alt={copy.photoAlt} label={dict.common.photo} className="mt-10" />
        </div>

        <section aria-labelledby="waitlist" className="lg:pt-1">
          <h2 id="waitlist" className="text-2xl sm:text-3xl">
            {dict.forms.join}
          </h2>
          <div className="mt-8">
            <InquiryForm
              kind="waitlist"
              division={division}
              lang={lang}
              t={dict.forms}
              privacyHref={localizedPath(lang, "/confidentialite")}
              contactEmail={CONTACT.email}
              services={copy.services}
              accentClass="bg-hh"
            />
          </div>
        </section>
      </Container>

      <Container>
        <NoHousingNotice dict={dict} />
      </Container>
    </>
  );
}
