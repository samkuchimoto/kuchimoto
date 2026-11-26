import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { MONOGRAPHS } from "@/data/site";

export const metadata: Metadata = {
  title: "Monographs",
  description: "Independent investigations by Kuchimoto: research on hard problems, from public sources.",
  alternates: { canonical: "/monographs" },
  openGraph: { url: "/monographs", title: "Monographs · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

/** The index of monographs, set like the commissions index: hairline rows, wide margins. Linked from /consulting and the footer only. */
export default function MonographsPage() {
  return (
    <section className="container-k pt-32 pb-24 sm:pt-44 sm:pb-36" aria-labelledby="monographs-title">
      <p className="mono text-ink-2">Kuchimoto · Independent Investigations</p>
      <h1 id="monographs-title" className="display mt-6 text-[clamp(3.4rem,10vw,9.5rem)]">
        Monographs.
      </h1>
      <p className="mt-10 max-w-[52ch] text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.4] tracking-[-0.015em]">
        Independent research on hard problems, from public sources. No client is named or implied.
      </p>
      <ol className="mt-16 border-t border-hairline-strong">
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
  );
}
