import type { Metadata } from "next";
import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { COUNTRIES, CountryTabs, NoHousingNotice } from "@/components/happy-homes";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.happyHomes;
  return pageMetadata({ lang, path: "/happy-homes", title: t.title, description: t.description });
}

export default async function HappyHomes() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.happyHomes;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="hh" />
      <CountryTabs lang={lang} dict={dict} />

      <Container className="py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl">{t.countriesTitle}</h2>
        <ul className="mt-10 grid gap-px border hairline bg-line md:grid-cols-3">
          {COUNTRIES.map((country) => {
            const c = t.countries[country];
            return (
              <li key={country} className="bg-paper">
                <Link
                  href={localizedPath(lang, `/happy-homes/${country}`)}
                  className="flex h-full flex-col p-8 transition-colors hover:bg-washi"
                >
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="eyebrow mt-3 text-hh">{c.status}</p>
                  <p className="mt-4 flex-1 text-ink-soft">{c.body}</p>
                  <p className="mt-6 text-sm font-medium text-hh">
                    {dict.common.learnMore} <span aria-hidden>→</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>

      <section className="border-y hairline bg-washi">
        <Container className="py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl">{t.more.title}</h2>
          <p className="mt-3 text-ink-soft">{t.more.intro}</p>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.more.items.map(([name, detail]) => (
              <div key={name} className="border-t border-hh pt-4">
                <dt className="font-display text-lg">{name}</dt>
                <dd className="mt-2 text-sm text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-2xl text-sm text-ink-soft">{t.more.contractors}</p>
          <div className="mt-8">
            <ButtonLink href={localizedPath(lang, "/contact")} accent="hh" variant="outline">
              {t.more.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="pt-12">
        <NoHousingNotice dict={dict} />
      </Container>
    </>
  );
}
