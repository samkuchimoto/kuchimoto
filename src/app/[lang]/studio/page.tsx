import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT, ITTSUI_URL, STUDIO } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { euroRange, wholeEuros } from "@/lib/format";
import { mailto } from "@/lib/mailto";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { StrategicNotes } from "@/components/StrategicNotes";
import { ProofLinks } from "@/components/ProofLinks";

/** Kuchimoto Studio, the Lab's AI agents for creatives. Reached from the
 *  Lab page, not the main menu: the site keeps its three divisions. */

const PACKAGES = ["audit", "deployment", "monthly"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.meta.studio;
  const { src, width, height } = STUDIO.photo;
  return pageMetadata({
    lang,
    path: "/studio",
    title: t.title,
    description: t.description,
    image: { url: src, width, height, alt: dict.studio.photoAlt },
  });
}

export default async function Studio() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.studio;
  const audit = t.packages.items.audit;

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="lab">
        <p className="mt-4 max-w-2xl text-ink-soft">{t.lead}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="#contact">{t.audit}</ButtonLink>
          <ButtonLink href="#formules" variant="outline">
            {t.seePackages}
          </ButtonLink>
        </div>
        <ProofLinks t={dict.proof} />
      </PageHeader>

      <Container className="pt-12 sm:pt-16">
        <figure>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-washi sm:aspect-[16/9]">
            <Image
              src={STUDIO.photo.src}
              alt={t.photoAlt}
              fill
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <figcaption className="mt-3 text-xs text-ink-soft">
            {t.photoCaption}{" "}
            <a href={STUDIO.photoCreditUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {t.photoCredit}
            </a>
          </figcaption>
        </figure>
      </Container>

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="who">
          <h2 id="who" className="max-w-2xl text-2xl sm:text-3xl">
            {t.who.title}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {t.who.items.map((item) => (
              <li key={item} className="border hairline px-4 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="agents" className="mt-16 sm:mt-20">
          <h2 id="agents" className="text-2xl sm:text-3xl">
            {t.agentsTitle}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {t.agents.map(([audience, name, body]) => (
              <article key={name} className="border-t border-lab pt-5">
                <p className="text-sm text-ink-soft">{audience}</p>
                <h3 className="mt-2 text-xl">{name}</h3>
                <p className="mt-3 text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>

      <section id="formules" aria-labelledby="packages" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="packages" className="text-2xl sm:text-3xl">
            {t.packages.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.packages.intro}</p>
          <ol className="mt-10 grid gap-px border hairline bg-line md:grid-cols-3">
            {PACKAGES.map((key, i) => {
              const item = t.packages.items[key];
              const [min, max] = STUDIO.prices[key];
              return (
                <li key={key} className="flex flex-col bg-paper p-6 sm:p-8">
                  <span className="text-sm text-ink-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl">{item.name}</h3>
                  <p className="mt-6 font-display text-2xl">{euroRange(min, max, lang)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.unit}</p>
                  <p className="mt-6 border-t hairline pt-5 text-ink-soft">{item.body}</p>
                  {key === "audit" && (
                    <div className="mt-auto pt-8">
                      <ButtonLink href={mailto(audit.mail)} accent="lab">
                        {audit.cta}
                      </ButtonLink>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">{t.packages.note}</p>

          <div className="mt-12 flex flex-col gap-6 border border-lab p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-lab">{t.prototype.label}</p>
              <h3 className="mt-3 text-2xl">{t.prototype.title}</h3>
              <p className="mt-3 text-ink-soft">{t.prototype.body}</p>
              <p className="mt-5">
                <span className="font-display text-2xl">{wholeEuros(STUDIO.prototype, lang)}</span>{" "}
                <span className="text-sm text-ink-soft">{t.prototype.unit}</span>
              </p>
              <p className="mt-1 text-xs text-ink-soft">{t.prototype.note}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink href={mailto(t.prototype.mail)} accent="lab">
                {t.prototype.cta}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Our own app, built in-house: the same block and button as
          "Applications maison" on the Lab page. */}
      <section aria-labelledby="ittsui" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <dl className="max-w-3xl">
            <div className="border-t border-lab pt-5">
              <dt id="ittsui" className="font-display text-xl">
                {t.ittsui.title}
              </dt>
              <dd className="mt-2 text-ink-soft">{t.ittsui.body}</dd>
            </div>
          </dl>
          <div className="mt-10">
            <ButtonLink href={ITTSUI_URL} accent="lab" variant="outline" external externalLabel={dict.bambootails.external}>
              {t.ittsui.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <StrategicNotes t={dict.notes} />

      <section aria-labelledby="method" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="method" className="text-2xl sm:text-3xl">
            {t.method.title}
          </h2>
          <dl className="mt-10 grid gap-10 md:grid-cols-2">
            {t.method.items.map(([name, detail]) => (
              <div key={name} className="border-t border-lab pt-5">
                <dt className="font-display text-xl">{name}</dt>
                <dd className="mt-2 text-ink-soft">{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-ink-soft">
            {t.partOfLab}{" "}
            <Link href={localizedPath(lang, "/lab")} className="text-lab underline underline-offset-4">
              {t.toLab}
            </Link>
          </p>
        </Container>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="contact-title" className="text-3xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.contact.body}</p>
          <p className="mt-8 break-words font-display text-2xl sm:text-3xl">
            <a href={mailto({ subject: t.contact.subject })} className="underline decoration-line underline-offset-8 hover:decoration-ink">
              {CONTACT.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
