import { Arrow } from "@/components/ui/Icons";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { TapLink } from "@/components/ui/TapLink";
import { CONSULTING } from "@/data/site";

/**
 * Practice I, high on the home page: what it diagnoses, that the answer may not be software, and the four steps.
 * The method and the monographs are on /consulting.
 */
export function Consulting() {
  return (
    <section className="container-k pt-28 sm:pt-40" aria-labelledby="consulting-home-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="mono text-ink-2">{CONSULTING.practice}</p>
          <h2 id="consulting-home-title" className="display display-lg mt-6">
            Strategic consulting.
          </h2>
          <p className="mt-8 max-w-[44ch] text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.4] tracking-[-0.015em]">{CONSULTING.lead}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:items-end" delay={0.06}>
          <p className="mono max-w-[38ch] text-ink-2 lg:text-right">{CONSULTING.outcome}</p>
          <PillLink href="/contact?track=consulting#inquiry" tone="dark">
            {CONSULTING.cta}
          </PillLink>
        </Reveal>
      </div>

      <ol className="mt-14 grid border-t border-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
        {CONSULTING.method.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.05} className={`border-b border-hairline-strong py-8 sm:px-5 ${i % 2 === 1 ? "sm:border-l" : "sm:pl-0"} ${i > 0 ? "lg:border-l lg:pl-5" : "lg:pl-0"}`}>
            <span className="mono block text-ink-2">{String(i + 1).padStart(2, "0")} /</span>
            <h3 className="mt-4 text-xl font-medium tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-2">{step.body}</p>
          </Reveal>
        ))}
      </ol>

      <TapLink href="/consulting" className="group mono-12 mt-8 inline-flex items-center gap-2 text-ink">
        Method and monographs
        <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
      </TapLink>
    </section>
  );
}
