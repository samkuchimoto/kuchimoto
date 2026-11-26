import type { Metadata } from "next";
import { PillLink } from "@/components/ui/PillLink";
import { MONOGRAPHS } from "@/data/site";

const M = MONOGRAPHS[0];

export const metadata: Metadata = {
  title: `${M.title} · Monograph ${M.number}`,
  description: `Monograph ${M.number} / ${M.field}: ${M.title}. ${M.subtitle} Independent research from public sources.`,
  alternates: { canonical: `/monographs/${M.slug}` },
  openGraph: { url: `/monographs/${M.slug}`, title: `${M.title} · Kuchimoto`, images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

/** What the monograph investigates. Each statement rests on a public source listed below; nothing from any company. */
const QUESTIONS: [string, string][] = [
  [
    "Which soils gain most",
    "Biochar's effect on soil water depends on soil texture: a peer-reviewed meta-analysis found it most effective in coarse-textured soils. It should be matched to the soil and the problem, not spread on every field.",
  ],
  [
    "Growth without undoing the benefit",
    "Feedstock that stays genuine waste, methane and emissions under control, and the heat of pyrolysis put to use instead of wasted.",
  ],
  [
    "Credits that hold up",
    "Carbon-removal standards such as Verra VM0044, Isometric's biochar protocol and Puro.earth's methodology require documented feedstock, laboratory testing of the biochar and a traceable, non-burning end use.",
  ],
  ["What the leaders do", "What West African producers could learn from international industry leaders."],
];

const SOURCES: { label: string; href: string }[] = [
  {
    label: "Edeh, Mašek & Buss (2020). A meta-analysis on biochar's effects on soil water properties: new insights and future research challenges. Science of the Total Environment 714, 136857.",
    href: "https://core.ac.uk/download/376907313.pdf",
  },
  { label: "Verra. VM0044 Methodology for Biochar Utilization in Soil and Non-Soil Applications.", href: "https://verra.org/methodologies/vm0044/" },
  { label: "Isometric. Biochar Protocol.", href: "https://registry.isometric.com/protocol/biochar" },
  { label: "Puro.earth. Biochar methodology for CO₂ removal.", href: "https://puro.earth" },
];

/**
 * Monograph 01 (approved 27 November 2026): the scope and questions of an investigation in progress, set as an editorial
 * page in the studio's grid. Public sources only; no company named or implied as a client, no private communications.
 */
export default function IndustrialBiocharPage() {
  return (
    <article className="container-k pt-32 pb-24 sm:pt-44 sm:pb-36" aria-labelledby="monograph-title">
      <p className="mono text-ink-2">
        Monograph {M.number} / {M.field} · Independent Investigations
      </p>
      <h1 id="monograph-title" className="display mt-6 max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)]">
        {M.title}
      </h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <p className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.35] tracking-[-0.02em] lg:col-span-7">{M.subtitle}</p>
        <p className="mono text-ink-2 lg:col-span-4 lg:col-start-9 lg:text-right">{M.status}</p>
      </div>

      <section className="mt-20 grid gap-10 border-t border-hairline-strong pt-12 lg:grid-cols-12" aria-labelledby="scope-title">
        <h2 id="scope-title" className="mono text-ink-2 lg:col-span-3">
          Scope
        </h2>
        <div className="space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-5">
          <p>
            Biochar is promoted for three things at once: soil water, soil carbon and carbon-removal credits. For farmers, the
            problem is not always how much rain falls; sometimes it is how much of that water the soil can hold.
          </p>
          <p>
            This monograph examines, from public sources, where biochar adds agronomic value, what keeps its feedstock honest
            as production scales, and what independent verification requires.
          </p>
        </div>
      </section>

      <section className="mt-20 grid gap-10 border-t border-hairline-strong pt-12 lg:grid-cols-12" aria-labelledby="questions-title">
        <h2 id="questions-title" className="mono text-ink-2 lg:col-span-3">
          Questions under investigation
        </h2>
        <ol className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
          {QUESTIONS.map(([title, body], i) => (
            <li key={title}>
              <span className="mono block text-ink-2">{String(i + 1).padStart(2, "0")} /</span>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
              <p className="mt-4 leading-relaxed text-ink-2">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-10 border-t border-hairline-strong pt-12 lg:grid-cols-12" aria-labelledby="method-title">
        <h2 id="method-title" className="mono text-ink-2 lg:col-span-3">
          Method and sources
        </h2>
        <div className="lg:col-span-7 lg:col-start-5">
          <p className="text-lg leading-relaxed">
            Public sources only: peer-reviewed literature and the published carbon-removal methodologies. No client data, no
            private communications, and no company named or implied as a client.
          </p>
          <ol className="mt-8 border-t border-hairline-strong">
            {SOURCES.map((s) => (
              <li key={s.href} className="border-b border-hairline-strong py-4 leading-relaxed text-ink-2">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mt-20 border-t border-hairline-strong pt-12">
        <PillLink href="/contact?track=consulting#inquiry" tone="dark">
          Discuss a problem
        </PillLink>
      </div>
    </article>
  );
}
