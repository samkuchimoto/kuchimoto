import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { NON_NEGOTIABLES, TRACKS } from "@/data/site";

/** Built for founders who outgrew templates: three tracks, four rules. */
export function Engagement({ heading = true }: { heading?: boolean }) {
  return (
    <section className="container-k pt-28 pb-24 sm:pt-40" aria-labelledby={heading ? "engage-title" : undefined}>
      {heading && (
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 id="engage-title" className="display display-lg">
              Built for founders who outgrew templates.
            </h2>
          </Reveal>
          <p className="mono max-w-[40ch] text-ink-2 lg:col-span-4 lg:text-right">
            Fixed price on a written scope. Minimum engagement $5,000.
          </p>
        </div>
      )}

      <div className={`grid border-t border-hairline-strong md:grid-cols-3 ${heading ? "mt-14 sm:mt-20" : ""}`}>
        {TRACKS.map((track, i) => (
          <Reveal
            key={track.id}
            delay={i * 0.06}
            className={`flex flex-col border-b border-hairline-strong py-10 md:border-b-0 md:px-8 md:py-12 ${
              i > 0 ? "md:border-l" : "md:pl-0"
            } ${i === 2 ? "md:pr-0" : ""}`}
          >
            <span className="mono text-ink-2">{track.index} / Track</span>
            <h3 className="mt-6 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05] font-medium tracking-[-0.03em]">
              {track.title}
            </h3>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-ink-2">{track.body}</p>
            <div className="mt-auto pt-10">
              <p className="text-2xl font-medium tracking-[-0.02em]">{track.price}</p>
              <p className="mono mt-1 text-ink-2">{track.duration}</p>
              <Link
                href={`/contact?track=${track.id}#inquiry`}
                className="group mono-12 mt-6 inline-flex items-center gap-2 font-medium"
              >
                Scope this build
                <Arrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-[14px] bg-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
        {NON_NEGOTIABLES.map((rule, i) => (
          <li key={rule} className="flex items-baseline gap-3 bg-surface px-5 py-5">
            <span className="mono text-vermilion">{String(i + 1).padStart(2, "0")} /</span>
            <span className="mono-12 text-ink">{rule}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
