import type { Metadata } from "next";
import Image from "next/image";
import { Engagement } from "@/components/home/Engagement";
import { PillLink } from "@/components/ui/PillLink";
import { Registration } from "@/components/ui/Registration";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { PRINCIPLES, PROCESS, SITE, TRACKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Kuchimoto Studio: custom websites, web applications and AI systems engineered from first principles. Fixed price on a written scope, from $5,000. You own 100% of the code.",
  alternates: { canonical: "/studio" },
  openGraph: { url: "/studio", title: "Studio · Kuchimoto", images: [{ url: "/og/kuchimoto-monolith.jpg", width: 1200, height: 630 }] },
};

export default function StudioPage() {
  return (
    <>
      <section className="container-k pt-32 sm:pt-44" aria-labelledby="studio-title">
        <p className="mono text-ink-2">Kuchimoto Studio · Client services</p>
        <h1 id="studio-title" className="display mt-6 text-[clamp(4rem,14vw,13rem)]">
          Studio
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.35] tracking-[-0.02em] lg:col-span-7">
            We design and engineer custom websites, web applications and AI systems from first principles, then hand
            you every line of the source.
          </p>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:items-end">
            <p className="mono text-ink-2 lg:text-right">{SITE.metadataLine}</p>
            <PillLink href="/contact#inquiry" tone="dark">
              Book a scope call
            </PillLink>
          </div>
        </div>
        <div className="relative mt-16">
          <Registration count={5} className="absolute -top-[18px] right-0 left-0" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-stage)] bg-sumi sm:aspect-[16/7]">
            <VideoLoop
              src={{ mp4: "/videos/joinery.mp4", webm: "/videos/joinery.webm" }}
              poster="/videos/joinery-poster.jpg"
              className="h-full w-full object-cover"
            />
            <span className="mono absolute bottom-5 left-5 text-washi/70">Two members, one joint, no glue</span>
          </div>
          <Registration count={5} className="absolute right-0 -bottom-[18px] left-0" />
        </div>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="principles-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="principles-title" className="display display-lg lg:col-span-8">
            Four principles, cut into every build.
          </h2>
          <p className="mono max-w-[40ch] text-ink-2 lg:col-span-4 lg:text-right">Shibui precision</p>
        </div>
        <ol className="mt-14 grid border-t border-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 0.06}
              className={`border-b border-hairline-strong py-10 sm:px-6 lg:border-b-0 ${i % 2 === 1 ? "sm:border-l" : "sm:pl-0"} ${
                i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"
              }`}
            >
              <span lang="ja" className="block text-5xl font-light text-ink">
                {p.kanji}
              </span>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{p.name}</h3>
              <p className="mono mt-1 text-ink-2">{p.gloss}</p>
              <p className="mt-5 leading-relaxed text-ink-2">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="includes-title">
        <h2 id="includes-title" className="display display-lg max-w-[18ch]">
          What each engagement includes.
        </h2>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TRACKS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06} className="flex flex-col rounded-[var(--radius-card)] bg-surface p-7 shadow-[0_0_0_1px_var(--color-hairline)] sm:p-9">
              <div className="flex items-baseline justify-between">
                <span className="mono text-ink-2">{t.index}</span>
                <span className="mono text-ink-2">{t.duration}</span>
              </div>
              <h3 className="mt-8 text-[1.75rem] leading-[1.05] font-medium tracking-[-0.03em]">{t.title}</h3>
              <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
                {t.includes.map((line) => (
                  <li key={line} className="flex gap-3 leading-relaxed text-ink-2">
                    <span className="mt-[10px] block h-[5px] w-[5px] shrink-0 rounded-full bg-ink" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-10 text-2xl font-medium tracking-[-0.02em]">{t.price}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="process-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="process-title" className="display display-lg">
              Process
            </h2>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[#eaded2] lg:aspect-[4/5]">
              <Image
                src="/images/studio/shoji-washi.jpg"
                alt="Shoji window shadows falling on handmade washi paper"
                fill
                quality={70}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="border-t border-hairline-strong lg:col-span-7 lg:col-start-6">
            {PROCESS.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 0.05} className="grid gap-4 border-b border-hairline-strong py-10 sm:grid-cols-7">
                <span className="text-[clamp(2.4rem,4vw,3.6rem)] leading-none font-light tracking-[-0.04em] text-ink-2 tabular-nums sm:col-span-2">
                  {step.index}
                </span>
                <div className="sm:col-span-5">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Engagement />
    </>
  );
}
