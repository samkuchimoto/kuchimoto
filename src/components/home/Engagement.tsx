import { Arrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TapLink } from "@/components/ui/TapLink";
import { COMMISSION_NOTE, ENGINEERING, TRACKS } from "@/data/site";

/**
 * Commissions & Systems: the three ways to commission the studio, set as
 * an architectural index (hairline rows, wide margins) rather than a
 * pricing table. No prices: each commission is scoped by written proposal (the note underneath).
 */
export function Engagement() {
  return (
    <section className="defer-render container-k pt-28 pb-24 sm:pt-44 sm:pb-32" aria-labelledby="commissions-title">
      <Reveal>
        <p className="mono text-ink-2">{ENGINEERING.practice}</p>
        <h2 id="commissions-title" className="display display-lg mt-6">
          Commissions &amp; Systems.
        </h2>
      </Reveal>

      <ol className="mt-14 border-t border-hairline-strong sm:mt-24">
        {TRACKS.map((track, i) => (
          <Reveal as="li" key={track.id} delay={i * 0.06} className="border-b border-hairline-strong">
            <TapLink
              href={`/contact?track=${track.id}#inquiry`}
              className="group grid gap-x-6 gap-y-4 py-10 sm:py-14 md:grid-cols-12 md:items-baseline lg:py-16"
            >
              <span className="mono text-ink-2 md:col-span-1">{track.index} /</span>
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.04] font-medium tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-6 lg:col-span-5">
                {track.title}
              </h3>
              <p className="max-w-[40ch] leading-relaxed text-ink-2 md:col-span-3 lg:col-span-4">{track.body}</p>
              <span className="mono-12 inline-flex items-center gap-2 text-ink md:col-span-2 md:justify-self-end">
                Inquire
                <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
              </span>
            </TapLink>
          </Reveal>
        ))}
      </ol>

      <p className="mono mt-10 max-w-[64ch] text-ink-2 sm:mt-12">{COMMISSION_NOTE}</p>
    </section>
  );
}
