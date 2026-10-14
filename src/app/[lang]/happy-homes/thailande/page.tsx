import type { Metadata } from "next";
import { CONTACT, THAILAND_PRICES } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { baht } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { paymentsEnabled } from "@/lib/stripe";
import { Container, PageHeader, PhotoPlaceholder } from "@/components/ui";
import { CountryTabs, NoHousingNotice } from "@/components/happy-homes";
import { BookingForm } from "@/components/forms/BookingForm";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.thailand;
  return pageMetadata({ lang, path: "/happy-homes/thailande", title: t.title, description: t.description });
}

export default async function Thailand() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.thailand;
  const p = t.prices;
  const price = (amount: number) => baht(amount, lang);
  const sizes = ["studio", "oneBed", "twoBed"] as const;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="hh">
        <p className="mt-6 text-sm font-medium text-hh">{t.status}</p>
      </PageHeader>
      <CountryTabs lang={lang} dict={dict} current="thailande" />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <section aria-labelledby="prices">
          <h2 id="prices" className="text-2xl sm:text-3xl">
            {p.title}
          </h2>
          <p className="mt-2 text-sm text-ink-soft">{p.note}</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink">
                  <td className="py-3 pr-4" />
                  {sizes.map((size) => (
                    <th key={size} scope="col" className="py-3 pr-4 font-medium">
                      {p.sizes[size]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hairline">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    {p.oneOff}
                  </th>
                  {sizes.map((size) => (
                    <td key={size} className="py-4 pr-4">
                      {price(THAILAND_PRICES.oneOff[size])}
                    </td>
                  ))}
                </tr>
                <tr className="border-b hairline">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    {p.weekly}
                  </th>
                  {sizes.map((size) => (
                    <td key={size} className="py-4 pr-4">
                      {price(THAILAND_PRICES.weeklyPerMonth[size])}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <dl className="mt-8 divide-y divide-line border-y hairline text-sm">
            {[
              [p.villa, p.villaValue(price(THAILAND_PRICES.villaFrom))],
              [`${p.deepClean} (${p.deepCleanNote})`, price(THAILAND_PRICES.deepClean)],
              [p.aircon, p.perUnit(price(THAILAND_PRICES.airconPerUnit))],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-wrap justify-between gap-2 py-4">
                <dt>{term}</dt>
                <dd className="text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <PhotoPlaceholder alt={t.photoAlt} label={dict.common.photo} />
      </Container>

      <section aria-labelledby="villa-care" className="border-y hairline bg-hh-wash">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow text-hh">{t.villaCare.title}</p>
            <h2 id="villa-care" className="mt-4 text-3xl">
              {t.villaCare.lead}
            </h2>
            <p className="mt-6 font-display text-2xl text-hh">
              {t.villaCare.price(price(THAILAND_PRICES.villaCarePerMonth))}
            </p>
          </div>
          <ul className="space-y-3 self-center">
            {t.villaCare.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-3 block h-px w-4 shrink-0 bg-hh" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <section id="reservation" aria-labelledby="booking" className="mx-auto max-w-2xl scroll-mt-24">
          <h2 id="booking" className="text-3xl">
            {dict.booking.title}
          </h2>
          <p className="mt-3 text-ink-soft">{dict.booking.intro}</p>
          <div className="mt-10">
            <BookingForm
              lang={lang}
              t={dict.booking}
              f={dict.forms}
              paymentsEnabled={paymentsEnabled()}
              termsHref={localizedPath(lang, "/cgv")}
              privacyHref={localizedPath(lang, "/confidentialite")}
              contactEmail={CONTACT.email}
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
