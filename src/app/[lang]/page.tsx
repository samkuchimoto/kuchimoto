import type { Metadata } from "next";
import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { ACCENT, ButtonLink, Container, type Division } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.home;
  return pageMetadata({ lang, path: "/", title: t.title, description: t.description, absoluteTitle: true });
}

export default async function Home() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.home;

  const divisions: { key: keyof typeof t.divisions; name: string; path: string; accent: Division }[] = [
    { key: "happyHomes", name: "Happy Homes", path: "/happy-homes", accent: "hh" },
    { key: "bambootails", name: "BambooTails", path: "/bambootails", accent: "bt" },
    { key: "lab", name: "Kuchimoto Lab", path: "/lab", accent: "lab" },
  ];

  return (
    <>
      <section className="border-b hairline">
        <Container className="py-20 sm:py-32">
          <p className="eyebrow text-seal">{t.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.15] sm:text-6xl">{t.title}</h1>
          <p className="mt-8 max-w-xl text-lg text-ink-soft">{t.intro}</p>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <ul className="grid gap-px border hairline bg-line md:grid-cols-3">
          {divisions.map(({ key, name, path, accent }) => {
            const card = t.divisions[key];
            return (
              <li key={key} className="bg-paper">
                <Link
                  href={localizedPath(lang, path)}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-washi sm:p-10"
                >
                  <span aria-hidden className={`block h-0.5 w-10 ${ACCENT[accent].bg}`} />
                  <p className={`eyebrow mt-8 ${ACCENT[accent].text}`}>{card.label}</p>
                  <h2 className="mt-3 text-3xl">{name}</h2>
                  <p className="mt-4 flex-1 text-ink-soft">{card.body}</p>
                  <p className={`mt-8 text-sm font-medium ${ACCENT[accent].text}`}>
                    {card.cta} <span aria-hidden>→</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>

      <section className="border-y hairline bg-washi">
        <Container className="py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl">{t.where.title}</h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[t.where.france, t.where.thailand, t.where.canada, t.where.usa].map(([place, detail]) => (
              <div key={place} className="border-t border-ink pt-4">
                <dt className="font-display text-xl">{place}</dt>
                <dd className="mt-2 text-sm text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-20 text-center">
        <h2 className="text-2xl sm:text-3xl">{t.contact.title}</h2>
        <p className="mt-3 text-ink-soft">{t.contact.body}</p>
        <div className="mt-8">
          <ButtonLink href={localizedPath(lang, "/contact")}>{t.contact.cta}</ButtonLink>
        </div>
      </Container>
    </>
  );
}
