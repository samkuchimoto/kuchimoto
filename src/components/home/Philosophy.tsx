import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { InkStroke } from "./InkStroke";

export function Philosophy() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 sm:pt-44 sm:pb-40" aria-labelledby="philosophy-title">
      <InkStroke />

      <div className="container-k relative">
        <Reveal>
          {/* A washi halo under each glyph: the ink stroke passes behind the words. */}
          <h2 id="philosophy-title" className="display display-lg ink-halo">
            Zero No-Code.
            <br />
            Pure Engineering.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-[#d9d3c8] shadow-[0_30px_80px_-40px_rgb(17_17_19/0.45)]">
              <VideoLoop
                src={{ mp4: "/videos/ink-to-code.mp4", webm: "/videos/ink-to-code.webm" }}
                poster="/videos/ink-to-code-poster.jpg"
                className="h-full w-full object-cover"
              />
              <span className="mono absolute bottom-4 left-4 text-ink/70">Urushi drop · Washi · Circuit</span>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-6" delay={0.1}>
            <div className="-m-4 rounded-[var(--radius-card)] bg-washi p-4">
              <p className="text-[clamp(1.2rem,1.7vw,1.5rem)] leading-[1.45] tracking-[-0.01em]">
                Kuchimoto LLC builds production software, AI platforms, and avant-garde web architecture from the
                ground up. No templates. No Webflow. No fragile plugins. You own 100% of the source code, engineered
                to load in milliseconds and scale internationally.
              </p>
              <div className="mt-10">
                <PillLink href="/studio">Explore the studio</PillLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
