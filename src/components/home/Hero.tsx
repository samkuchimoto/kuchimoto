import { KigumiStage } from "@/components/webgl/KigumiStage";
import { Registration } from "@/components/ui/Registration";
import { SITE } from "@/data/site";

export function Hero() {
  return (
    <section className="container-k pt-28 sm:pt-36 lg:pt-40" aria-labelledby="hero-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 id="hero-title" className="display display-xl lg:col-span-8">
          Crafted in Code.
          <br />
          <span className="text-ink-2">Built to Endure.</span>
        </h1>
        <div className="lg:col-span-4 lg:pb-3">
          <p className="max-w-[34ch] text-lg leading-snug sm:text-xl">{SITE.headline}</p>
          <p className="mono mt-5 max-w-[42ch] text-ink-2">{SITE.metadataLine}</p>
        </div>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <Registration count={2} className="absolute -top-[18px] right-0 left-0" />
        <KigumiStage className="h-[min(118vw,560px)] sm:h-[clamp(440px,70vh,860px)]" />
        <Registration count={2} className="absolute right-0 -bottom-[18px] left-0" />
      </div>
    </section>
  );
}
