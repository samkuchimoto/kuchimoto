import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { Registration } from "@/components/ui/Registration";
import { InkField } from "@/components/webgl/InkField";

const LINKS = [
  { href: "/studio", label: "Explore /Studio" },
  { href: "/lab", label: "Enter /Lab" },
  { href: "/contact", label: "Start a $5K+ build" },
];

export function DarkBand() {
  return (
    <section data-dark="" className="relative isolate overflow-hidden bg-sumi text-washi" aria-label="Kuchimoto">
      <InkField />
      <div className="container-k relative flex min-h-[78vh] flex-col justify-end pt-40 pb-12 sm:min-h-[92vh] sm:pb-16">
        <p className="mono max-w-[44ch] text-washi/60">
          An international technology studio and operating group. Wyoming, USA.
        </p>
        <Registration tone="text-washi/50" className="mt-10" />
        <p
          className="mt-4 -ml-[0.04em] text-center leading-[0.8] font-semibold tracking-[-0.055em] text-washi [font-size:clamp(3.6rem,15.6vw,17rem)]"
          aria-hidden="true"
        >
          KUCHIMOTO
        </p>
        <Registration tone="text-washi/50" className="mt-6" />
        <nav aria-label="Explore" className="mt-12 grid gap-px overflow-hidden rounded-[14px] bg-hairline-dark sm:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group mono-12 flex items-center justify-between bg-sumi/80 px-6 py-5 backdrop-blur-sm transition-colors hover:bg-sumi-2"
            >
              {l.label}
              <Arrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
