import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";

// The ink film lives at public/videos/kuchimoto-inoue-ink.mp4 (a .webm
// beside it is used too): a brush lays one dry ink stroke on paper and a
// vermilion drop lands beside it like a seal, then the page dissolves back
// to the brush coming down (a seamless 8.9 s loop). Without the file, the
// card shows its still.
const INK = "/videos/kuchimoto-inoue-ink";
const has = (file: string) => existsSync(join(process.cwd(), "public", file));
const FILM = has(`${INK}.mp4`) ? { mp4: `${INK}.mp4`, webm: has(`${INK}.webm`) ? `${INK}.webm` : undefined } : null;
const STILL = `${INK}-poster.jpg`;

export function Philosophy() {
  return (
    <section className="defer-render relative isolate overflow-hidden pt-32 pb-28 sm:pt-44 sm:pb-40" aria-labelledby="philosophy-title">
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
                <VideoLoop src={FILM} poster={STILL} className="h-full w-full object-cover" />
              ) : (
                <Image
                  src={STILL}
                  alt="A brush lays a dry ink stroke on handmade paper"
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              <span className="mono absolute bottom-4 left-4 text-ink/70">Ink on paper</span>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-6" delay={0.1}>
            <p className="text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.45] tracking-[-0.01em]">
              Kuchimoto is an independent creative and engineering house. Between stillness and
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
