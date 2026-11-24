import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RoomTone } from "@/components/lab/RoomTone";
import { Arrow } from "@/components/ui/Icons";
import { PillLink } from "@/components/ui/PillLink";
import { Registration } from "@/components/ui/Registration";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { MistField } from "@/components/webgl/MistField";
import { KigumiStage } from "@/components/webgl/KigumiStage";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Kuchimoto Lab: physics engines, procedural WebGL, generative Web Audio and the autonomous operations running across Kuchimoto's live platforms.",
  alternates: { canonical: "/lab" },
  openGraph: { url: "/lab", title: "Lab · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

const OPERATIONS = [
  {
    system: "Ittsui Works",
    href: "/work/ittsui-works",
    body: "A daily import of 44 public employer feeds (Greenhouse, Lever, Ashby, SmartRecruiters), normalized into one job index with structured data.",
  },
  {
    system: "Manakael",
    href: "/work/manakael",
    body: "A claim checker that reads a claim's text or URL and returns a physics verdict: violation, marginal or plausible.",
  },
  {
    system: "Halo Happy Homes",
    href: "/work/halo-happy-homes",
    body: "Four scheduled jobs, with regional runs for Asia-Oceania, Europe-Gulf and the Americas.",
  },
  {
    system: "Seal & Staff",
    href: "/work/seal-and-staff",
    body: "Deal orders that carry a written scope through partner confirmation and client acceptance, matched to the first qualified partner to accept.",
  },
  {
    system: "Ittsui",
    href: "/work/ittsui-app",
    body: "A weekly proposal engine with a three-tier fallback: retrieval service, then Firestore rules, then a static catalogue.",
  },
];

export default function LabPage() {
  return (
    <div data-dark="" className="bg-sumi text-washi">
      <section className="relative isolate overflow-hidden" aria-labelledby="lab-title">
        <MistField />
        <div className="container-k relative pt-32 pb-24 sm:pt-44 sm:pb-36">
          <p className="mono text-washi/60">Kuchimoto Lab · Research &amp; development</p>
          <h1 id="lab-title" className="display mt-6 text-[clamp(4.5rem,17vw,16rem)] text-washi">
            Lab
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="text-[clamp(1.3rem,2vw,1.8rem)] leading-[1.35] tracking-[-0.02em] text-washi/90 lg:col-span-7">
              Where the studio&apos;s tools are cut: physics engines, procedural graphics, generative sound and the
              autonomous jobs that keep live platforms running.
            </p>
            <p className="mono text-washi/50 lg:col-span-4 lg:col-start-9 lg:text-right">
              Every experiment on this page runs live in your browser.
            </p>
          </div>
        </div>
      </section>

      <section className="container-k pb-24 sm:pb-36" aria-labelledby="exp-01">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="mono text-washi/50">Exp. 01 · In production</p>
            <h2 id="exp-01" className="display display-md mt-5">
              SWaP-C physics engine
            </h2>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-washi/70">
              Manakael sizes orbital AI clusters, lunar and Mars bases from size, weight, power and cooling. Radiators
              follow the Stefan–Boltzmann law; every configuration gets a reproducible Spec ID.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="https://manakael.com" tone="ghost" external>
                Open manakael.com ↗
              </PillLink>
              <PillLink href="/work/manakael" tone="ghost">
                Case study
              </PillLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-stage)] bg-[#212329]">
              <Image
                src="/images/projects/manakael.jpg"
                alt="A satellite radiator array in orbit above the curve of the Earth"
                fill
                quality={80}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-k pb-24 sm:pb-36" aria-labelledby="exp-02">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mono text-washi/50">Exp. 02 · Procedural WebGL</p>
            <h2 id="exp-02" className="display display-md mt-5">
              Kigumi physics study
            </h2>
          </div>
          <p className="max-w-[52ch] leading-relaxed text-washi/70">
            Joinery modules in urushi lacquer, basalt and titanium, sprung to a turning ellipsoid. No model file:
            five procedural shapes, instanced, a dozen draw calls for the whole sculpture. Drag it, strike it, or use the arrow keys.
          </p>
        </div>
        <div className="relative mt-12">
          <Registration count={5} tone="text-washi/40" className="absolute -top-[18px] right-0 left-0" />
          <KigumiStage className="h-[min(120vw,560px)] shadow-[0_0_0_1px_var(--color-hairline-dark)] sm:h-[clamp(440px,74vh,820px)]" label="Exp. 02 · Joinery physics" priority={false} />
          <Registration count={5} tone="text-washi/40" className="absolute right-0 -bottom-[18px] left-0" />
        </div>
      </section>

      <section className="container-k pb-24 sm:pb-36" aria-labelledby="exp-03">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="mono text-washi/50">Exp. 03 · Generative Web Audio</p>
            <h2 id="exp-03" className="display display-md mt-5">
              Generated room tone
            </h2>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-washi/70">
              The site&apos;s ambient sound downloads nothing: pink noise filtered into distant rain, and a fainter
              band of air above it, each drifting on its own slow oscillator. No melody, no loop to notice. Turn it
              on with the waveform pill at the top of the page, or here.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <RoomTone />
          </Reveal>
        </div>
      </section>

      <section className="container-k pb-24 sm:pb-36" aria-labelledby="exp-04">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="relative aspect-video overflow-hidden rounded-[var(--radius-stage)] bg-black lg:col-span-7">
            <VideoLoop
              src={{ mp4: "/videos/ink-mist.mp4", webm: "/videos/ink-mist.webm" }}
              poster="/videos/ink-mist-poster.jpg"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="mono text-washi/50">Exp. 04 · Motion direction</p>
            <h2 id="exp-04" className="display display-md mt-5">
              Ink in dark water
            </h2>
            <p className="mt-6 leading-relaxed text-washi/70">
              Art-directed motion studies for this site, and their real-time counterpart: the particle field behind
              this page&apos;s title, drifting on the GPU and leaning with your cursor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-k pb-28 sm:pb-40" aria-labelledby="exp-05">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mono text-washi/50">Exp. 05 · Autonomous operations</p>
            <h2 id="exp-05" className="display display-md mt-5">
              Jobs that run while we sleep.
            </h2>
          </div>
          <p className="mono text-washi/50 lg:col-span-4 lg:text-right">Running in production today</p>
        </div>
        <ul className="mt-12 border-t border-hairline-dark">
          {OPERATIONS.map((op) => (
            <li key={op.system} className="border-b border-hairline-dark">
              <Link href={op.href} className="group grid gap-3 py-7 sm:grid-cols-12 sm:gap-6">
                <span className="text-xl font-medium tracking-[-0.02em] sm:col-span-3">{op.system}</span>
                <span className="leading-relaxed text-washi/70 sm:col-span-8">{op.body}</span>
                <span className="hidden justify-end sm:col-span-1 sm:flex">
                  <Arrow className="h-5 w-5 text-washi/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-washi" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <PillLink href="/contact?track=ai#inquiry" tone="ghost">
            Scope an AI workflow
          </PillLink>
        </div>
      </section>
    </div>
  );
}
