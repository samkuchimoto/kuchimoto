import type { Metadata } from "next";
import { COMPANY } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHeader } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.about;
  return pageMetadata({ lang, path: "/a-propos", title: t.title, description: t.description });
}

export default async function About() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.about;
  const rows = t.companyRows;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} />

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="path" className="max-w-3xl">
          <h2 id="path" className="text-2xl sm:text-3xl">
            {t.pathTitle}
          </h2>
          <ul className="mt-8 space-y-6">
            {t.path.map((line) => (
              <li key={line} className="border-t border-seal pt-5 text-lg">
                {line}
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <section aria-labelledby="company" className="border-t hairline bg-washi">
        <Container className="py-16 sm:py-20">
          <h2 id="company" className="text-2xl sm:text-3xl">
            {t.companyTitle}
          </h2>
          <dl className="mt-8 grid max-w-3xl gap-x-10 gap-y-5 text-sm sm:grid-cols-[auto_1fr]">
            {[
              [rows.name, COMPANY.name],
              [rows.form, rows.formValue],
              [rows.capital, COMPANY.capital],
              [rows.office, COMPANY.address],
              [rows.registration, COMPANY.registration[lang]],
            ].map(([term, detail]) => (
              <div key={term} className="contents">
                <dt className="text-ink-soft">{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
