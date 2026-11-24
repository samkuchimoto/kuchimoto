import { Arrow } from "@/components/ui/Icons";
import { Registration } from "@/components/ui/Registration";
import { TapLink } from "@/components/ui/TapLink";
import { MistField } from "@/components/webgl/MistField";

const LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Commission a work" },
];

/** The dark band: coastal mist over sumi water, the name, one open question, three ways on. */
export function DarkBand() {
  return (
    <section data-dark="" className="relative isolate overflow-hidden bg-sumi text-washi" aria-label="Kuchimoto">
      <MistField />
      <div className="container-k relative flex min-h-[80vh] flex-col justify-end pt-40 pb-12 sm:min-h-[94vh] sm:pb-16">
        <p className="mono flex items-center justify-center gap-3 text-washi/70">
          What comes next
          <TapLink
            href="/lab"
            aria-label="What comes next? Enter the Kuchimoto Lab"
            className="group inline-grid h-7 w-7 -rotate-6 place-items-center rounded-[4px] bg-vermilion text-[17px] leading-none font-semibold tracking-normal text-washi normal-case transition-transform duration-500 ease-[var(--ease-out-expo)] hover:rotate-0 hover:scale-110"
          >
            ?
          </TapLink>
        </p>
        <Registration tone="text-washi/50" className="mt-10" />
        <p
          className="mt-4 -ml-[0.04em] text-center leading-[0.8] font-semibold tracking-[-0.055em] text-washi [font-size:clamp(3.6rem,15.6vw,17rem)]"
          aria-hidden="true"
        >
          KUCHIMOTO
        </p>
        <Registration tone="text-washi/50" className="mt-6" />
        <nav aria-label="Explore" className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {LINKS.map((l) => (
            <TapLink
              key={l.href}
              href={l.href}
              className="group mono-12 flex h-14 items-center justify-between gap-6 rounded-full border border-washi/35 px-7 text-washi transition-[background-color,color,border-color,transform] duration-300 hover:border-washi hover:bg-washi hover:text-sumi active:scale-[0.98] sm:justify-center"
            >
              {l.label}
              <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
            </TapLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
