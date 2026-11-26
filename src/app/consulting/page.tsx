import type { Metadata } from "next";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { CONSULTING } from "@/data/site";

export const metadata: Metadata = {
  title: "Strategic consulting",
  description:
    "Technology strategy for ecology, science and niche markets: agritech, soil and water, biochar and carbon removal, food systems, energy, and software for Japanese small businesses that export. Africa first, Japan and other niche markets next. First enquiry free.",
  alternates: { canonical: "/consulting" },
  openGraph: { url: "/consulting", title: "Strategic consulting · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

/**
 * Strategic consulting (26 November 2026). Samuel's own method, written as he works it: benchmark the two world
 * leaders, diagnose the two hardest problems, name the blockers factor by factor, then a plan the studio can build.
 * The field study is anonymous on purpose: a company is named here only once it has agreed in writing.
 */
export default function ConsultingPage() {
  return (
    <>
      <section className="container-k pt-32 sm:pt-44" aria-labelledby="consulting-title">
        <p className="mono text-ink-2">Kuchimoto · Ecology, technology, science</p>
        <h1 id="consulting-title" className="display mt-6 text-[clamp(3.4rem,10vw,9.5rem)]">
          Strategic consulting.
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.35] tracking-[-0.02em]">{CONSULTING.lead}</p>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">{CONSULTING.who}</p>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:items-end">
            <p className="mono text-ink-2 lg:text-right">{CONSULTING.fee}</p>
            <PillLink href="/contact?track=consulting#inquiry" tone="dark">
              Request a consultation
            </PillLink>
          </div>
        </div>
        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Fields">
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

      <section className="container-k pt-28 sm:pt-40" aria-labelledby="study-title">
        <div className="rounded-[var(--radius-card)] bg-sumi p-8 text-washi sm:p-14" data-dark="">
          <p className="mono text-washi/60">Independent research · in progress</p>
          <h2 id="study-title" className="display display-md mt-6 max-w-[22ch]">
            Biochar, soil water and carbon credits in West Africa.
          </h2>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-washi/80">
            West African biochar producers turn farm and processing residues into biochar. For farmers, the problem is
            not always how much rain falls; sometimes it is how much of that water the soil can hold. The questions we
            are investigating:
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              ["Which fields gain most", "Biochar's effect on water retention depends on soil texture. It should be matched to the soil and the problem, not spread on every field."],
              ["Growth without undoing the benefit", "Feedstock that stays genuine waste, methane and emissions under control, and the heat of pyrolysis put to use instead of wasted."],
              ["Credits that hold up", "Standards such as Puro.earth, Verra VM0044 and Isometric require audited feedstock, lab tests and a traceable, non-burning end use."],
              ["What the leaders do", "What West African producers could learn from international industry leaders."],
            ].map(([title, body]) => (
              <li key={title} className="border-t border-washi/20 pt-5">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-relaxed text-washi/75">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mono mt-12 max-w-[62ch] text-washi/60">
            The same question runs through Goren Harvest, our own venture: turning what would be wasted into value.{" "}
            <a href="https://gorenharvest.com" target="_blank" rel="noopener noreferrer" className="text-washi underline underline-offset-4">
              gorenharvest.com
            </a>
          </p>
        </div>
      </section>

      <section className="container-k pt-28 pb-24 sm:pt-40 sm:pb-36" aria-labelledby="fee-title">
        <div className="grid gap-8 border-t border-hairline-strong pt-12 lg:grid-cols-12">
          <h2 id="fee-title" className="display display-md lg:col-span-6">
            First enquiry free.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed">{CONSULTING.fee}</p>
            <div className="mt-8">
              <PillLink href="/contact?track=consulting#inquiry" tone="dark">
                Request a consultation
              </PillLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
