import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";

// The ink film lives at public/videos/kuchimoto-inoue-ink.mp4 (a .webm
// beside it is used too): a drop of sumi falls and settles into washi. It
// plays once each time the card comes into view, then rests on the ink in
// the paper. Without the file, the card shows its still.
const INK = "/videos/kuchimoto-inoue-ink";
const has = (file: string) => existsSync(join(process.cwd(), "public", file));
const FILM = has(`${INK}.mp4`) ? { mp4: `${INK}.mp4`, webm: has(`${INK}.webm`) ? `${INK}.webm` : undefined } : null;
const STILL = `${INK}-poster.jpg`;

export function Philosophy() {
  return (
    <section className="defer-render relative isolate overflow-hidden pt-32 pb-28 sm:pt-44 sm:pb-40" aria-labelledby="philosophy-title">
      {/* One dry-brush stroke in stone ink at 8%, behind everything: texture, never a barrier to reading. */}
      <div
        data-reveal=""
        aria-hidden="true"
        className="ink-wipe pointer-events-none absolute top-[34%] left-[-38%] -z-10 aspect-[5/2] w-[210%] overflow-hidden sm:top-[30%] sm:left-[-12%] sm:w-[124%] lg:top-[24%] lg:left-[-4%] lg:w-[108%]"
      >
        <Image src="/images/ink/sumi-dry-brush.svg" alt="" fill unoptimized className="object-contain opacity-[0.08]" />
        {/* Washi drawn back like a brush moving right: a transform, so the wipe runs on the compositor. */}
        <span className="ink-wipe-cover" />
      </div>

      <div className="container-k">
        <Reveal>
          <h2 id="philosophy-title" className="display display-lg">
            We don’t follow trends.
            <br />
            <span className="text-ink-2">We build what wasn’t there.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-[#d9d3c8] shadow-[0_30px_80px_-40px_rgb(17_17_19/0.45)]">
              {FILM ? (
                <VideoLoop src={FILM} poster={STILL} once className="h-full w-full object-cover" />
              ) : (
                <Image
                  src={STILL}
                  alt="A single drop of sumi ink held above handmade washi paper"
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              <span className="mono absolute bottom-4 left-4 text-ink/70">Sumi · Washi · Ma</span>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-6" delay={0.1}>
            <p className="text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.45] tracking-[-0.01em]">
              Kuchimoto is an independent creative and engineering house. Between Japanese stillness and
              uncompromised technical architecture, we design and build bespoke digital worlds, platforms, and software
              from first principles: 100% custom code, built to outlast cycles.
            </p>
            <div className="mt-10">
              <PillLink href="/studio">Explore the studio</PillLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
