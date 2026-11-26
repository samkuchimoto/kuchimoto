import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { CONSULTING, MONOGRAPHS } from "@/data/site";

export const metadata: Metadata = {
  title: "Strategic consulting",
  description:
    "Strategic consulting and independent research: diagnosis of hard operational and technical problems, international benchmarking, constraint analysis and prioritised roadmaps. Depth in ecology, agriculture, science and complex operations.",
  alternates: { canonical: "/consulting" },
  openGraph: { url: "/consulting", title: "Strategic consulting · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

/**
 * Practice I, Strategic Consulting & Research (approved 27 November 2026). Samuel's method in four steps, what the
 * studio can show for it, the monographs (independent research from public sources, no client named or implied), and
 * how an engagement starts. No prices, durations or response times: each is defined in its own proposal.
 */
export default function ConsultingPage() {
  return (
    <>
      <section className="container-k pt-32 sm:pt-44" aria-labelledby="consulting-title">
        <p className="mono text-ink-2">{CONSULTING.practice}</p>
        <h1 id="consulting-title" className="display mt-6 text-[clamp(3.4rem,10vw,9.5rem)]">
          Strategic consulting.
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.35] tracking-[-0.02em]">{CONSULTING.lead}</p>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{CONSULTING.outcome}</p>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:items-end">
            <p className="mono text-ink-2 lg:text-right">{CONSULTING.engagements}</p>
            <PillLink href="/contact?track=consulting#inquiry" tone="dark">
              {CONSULTING.cta}
            </PillLink>
          </div>
        </div>
        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Areas of depth">
          {CONSULTING.fields.map((field) => (
            <li key={field} className="rounded-full px-4 py-2.5 text-[15px] shadow-[0_0_0_1px_var(--color-hairline-strong)]">
              {field}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="method-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="method-title" className="display display-lg lg:col-span-8">
            How a consultation works.
          </h2>
          <p className="mono max-w-[40ch] text-ink-2 lg:col-span-4 lg:text-right">Four steps, one written plan</p>
        </div>
        <ol className="mt-14 grid border-t border-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
          {CONSULTING.method.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.06}
              className={`border-b border-hairline-strong py-10 sm:px-6 lg:border-b-0 ${i % 2 === 1 ? "sm:border-l" : "sm:pl-0"} ${
                i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"
              }`}
            >
              <span className="mono block text-ink-2">{String(i + 1).padStart(2, "0")} /</span>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-5 leading-relaxed text-ink-2">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="adds-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="adds-title" className="display display-lg lg:col-span-5">
            What we bring.
          </h2>
          <ul className="border-t border-hairline-strong lg:col-span-6 lg:col-start-7">
            {CONSULTING.adds.map((item) => (
              <li key={item} className="border-b border-hairline-strong py-5 text-lg leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="monographs-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="monographs-title" className="display display-lg lg:col-span-8">
            <Link href="/monographs" className="underline-offset-8 hover:underline">
              Monographs.
            </Link>
          </h2>
          <p className="mono max-w-[40ch] text-ink-2 lg:col-span-4 lg:text-right">Independent Investigations</p>
        </div>
        <ol className="mt-14 border-t border-hairline-strong">
          {MONOGRAPHS.map((m) => (
            <li key={m.slug} className="border-b border-hairline-strong">
              <Link href={`/monographs/${m.slug}`} className="group grid gap-x-6 gap-y-3 py-10 md:grid-cols-12 md:items-baseline">
                <span className="mono text-ink-2 md:col-span-2">
                  {m.number} / {m.field}
                </span>
                <span className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-5">
                  {m.title}
                </span>
                <span className="leading-relaxed text-ink-2 md:col-span-3">{m.subtitle}</span>
                <span className="mono-12 inline-flex items-center gap-2 md:col-span-2 md:justify-self-end">
                  Read
                  <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-k pt-28 pb-24 sm:pt-40 sm:pb-36" aria-labelledby="begin-title">
        <div className="grid gap-8 border-t border-hairline-strong pt-12 lg:grid-cols-12">
          <h2 id="begin-title" className="display display-md lg:col-span-6">
            Begin with the problem.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed">{CONSULTING.engagements}</p>
            <div className="mt-8">
              <PillLink href="/contact?track=consulting#inquiry" tone="dark">
                {CONSULTING.cta}
              </PillLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
