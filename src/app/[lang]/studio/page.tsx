import type { Metadata } from "next";
import Link from "next/link";
import { LAB, STUDIO } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { euroRange, fill, wholeEuros } from "@/lib/format";
import { leadFormProps, payPath } from "@/lib/leads/props";
import { pageMetadata } from "@/lib/seo";
import { prototypePaymentsEnabled } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";
import { LeadForm } from "@/components/forms/LeadForm";
import { PresetButton } from "@/components/PrototypeCta";
import { ArtGallery, type Artwork } from "@/components/ArtGallery";
import { HeroVideo } from "@/components/HeroVideo";
import { Faq, Founder, publicFileExists } from "@/components/offers";

/**
 * Kuchimoto Studio, the Lab's AI agents for creative brands, and a Google
 * Ads landing page (/en/studio): the lead form's first step in the hero,
 * Samuel's paintings (#art), the prototype and the three packages
 * (#prototype), the final form (#contact).
 */

const PACKAGES = ["audit", "deployment", "monthly"] as const;

/** public/images/art/art-01.jpg to art-08.jpg: the ones already added. */
function artworks(alts: string[]): Artwork[] {
  return alts
    .map((alt, i) => ({ src: `/images/art/art-${String(i + 1).padStart(2, "0")}.jpg`, alt }))
    .filter((art) => publicFileExists(art.src));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.studio;
  return pageMetadata({ lang, path: "/studio", title: t.title, description: t.description, absoluteTitle: true });
}

export default async function Studio() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.studio;
  const price = wholeEuros(LAB.prototype, lang);
  const form = leadFormProps(lang);
  const art = artworks(t.art.alts);
  // "Pay €490 and start" once Stripe is set up (lib/stripe.ts).
  const pay = prototypePaymentsEnabled() ? payPath(lang, "studio") : null;

  return (
    <>
      <section id="start" aria-labelledby="studio-title" className="relative isolate overflow-hidden border-b hairline">
        {/* Samuel's samurai painting, animated (public/video). */}
        <HeroVideo src="/video/studio-hero.mp4" poster="/video/studio-hero-poster.jpg" posterSmall="/video/studio-hero-poster-768.jpg" />
        <Container className="grid gap-6 pt-5 pb-8 sm:gap-8 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow hidden text-lab sm:block">{t.label}</p>
            <h1 id="studio-title" className="text-[1.6rem] leading-[1.2] sm:mt-5 sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-normal text-ink-soft sm:mt-6 sm:text-lg sm:leading-relaxed">{fill(t.intro, { price })}</p>
          </div>
          {/* On a solid card from lg up, where the wash lets the painting through. */}
          <div className="lg:border lg:hairline lg:bg-paper lg:p-8 lg:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.35)]">
            <LeadForm {...form} id="lead-hero" role="hero" source="studio" preset="creative" />
          </div>
        </Container>
      </section>

      <section id="art" aria-labelledby="art-title">
        <Container className="py-16 sm:py-20">
          <h2 id="art-title" className="text-2xl sm:text-3xl">
            {t.art.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.art.body}</p>
          {art.length > 0 && (
            <ArtGallery
              images={art}
              caption={t.art.caption}
              labels={{ open: t.art.open, close: t.art.close, prev: t.art.prev, next: t.art.next, dialog: t.art.dialog }}
            />
          )}
        </Container>
      </section>

      <section aria-labelledby="agents" className="border-t hairline">
        <Container className="py-16 sm:py-20">
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
        </Container>
      </section>

      <section id="prototype" aria-labelledby="prototype-title" className="border-t hairline">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 border border-lab p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-lab">{t.prototype.label}</p>
              <h2 id="prototype-title" className="mt-3 text-2xl sm:text-3xl">
                {t.prototype.title}
              </h2>
              <p className="mt-3 text-ink-soft">{t.prototype.body}</p>
              <p className="mt-5">
                <span className="font-display text-2xl">{price}</span>{" "}
                <span className="text-sm text-ink-soft">{t.prototype.unit}</span>
              </p>
              <p className="mt-1 text-xs text-ink-soft">{t.prototype.note}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <PresetButton need="creative">{t.prototype.cta}</PresetButton>
              {pay && (
                <ButtonLink href={pay} accent="lab" variant="outline">
                  {fill(dict.pay.button, { price })}
                </ButtonLink>
              )}
            </div>
          </div>

          <h3 className="mt-16 text-2xl sm:text-3xl">{t.packages.title}</h3>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.packages.intro}</p>
          <ol className="mt-10 grid gap-px border hairline bg-line md:grid-cols-3">
            {PACKAGES.map((key, i) => {
              const item = t.packages.items[key];
              const [min, max] = STUDIO.prices[key];
              return (
                <li key={key} className="flex flex-col bg-paper p-6 sm:p-8">
                  <span className="text-sm text-ink-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-3 font-display text-xl">{item.name}</h4>
                  <p className="mt-6 font-display text-2xl">{euroRange(min, max, lang)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.unit}</p>
                  <p className="mt-6 border-t hairline pt-5 text-ink-soft">{item.body}</p>
                  {"cta" in item && (
                    <div className="mt-auto pt-8">
                      <PresetButton need="creative" variant="outline">
                        {item.cta}
                      </PresetButton>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">{t.packages.note}</p>
          <p className="mt-8 max-w-2xl">
            <span className="font-medium">{t.pilot[0]}.</span> <span className="text-ink-soft">{t.pilot[1]}</span>
          </p>
        </Container>
      </section>

      <Founder t={dict.founder} />
      <Faq t={dict.faq} price={price} />

      <section id="contact" aria-labelledby="contact-title" className="border-t hairline bg-lab-wash">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 id="contact-title" className="text-2xl sm:text-3xl">
              {dict.lab.contactTitle}
            </h2>
            <div className="mt-8">
              <LeadForm {...form} id="lead-final" role="final" source="studio" preset="creative" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <p className="text-ink-soft">
          {t.toLab.text}{" "}
          <Link href={localizedPath(lang, "/lab")} className="font-medium text-lab underline underline-offset-4 hover:no-underline">
            {t.toLab.link}
          </Link>
        </p>
      </Container>
    </>
  );
}
