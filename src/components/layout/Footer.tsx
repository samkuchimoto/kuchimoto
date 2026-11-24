import Link from "next/link";
import { Hanko } from "@/components/ui/Hanko";
import { SITE } from "@/data/site";
import { QuickScope, ScrollTop } from "./FooterClient";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-washi text-ink">
      <div className="container-k">
        <div className="grid gap-12 border-t border-hairline-strong pt-14 pb-16 md:grid-cols-12 md:gap-8 md:pt-20 md:pb-24">
          <address className="not-italic md:col-span-3">
            <p className="font-semibold tracking-[0.02em]">KUCHIMOTO LLC</p>
            <p className="mt-3 leading-relaxed text-ink-2">
              {SITE.address[0]}
              <br />
              {SITE.address[1]}
            </p>
            <p className="mono mt-5 max-w-[26ch] text-ink-2">{SITE.region}</p>
          </address>

          <div className="md:col-span-3">
            <ul className="space-y-1.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-lg transition-colors hover:text-ink-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mono mt-8 text-ink-2">Direct business inquiries</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 inline-block text-lg underline-offset-4 hover:underline">
              {SITE.email}
            </a>
          </div>

          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1] tracking-[-0.035em]">
              Have a platform
              <br />
              to build?
            </h2>
            <QuickScope />
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-hairline pt-6 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Hanko className="h-8 w-5" title="口元, the Kuchimoto seal" />
            <p className="mono text-ink-2">© 2026 KUCHIMOTO LLC. All rights reserved.</p>
          </div>
          <div className="mono flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-2">
            <Link href="/lab" className="hover:text-ink">
              R&amp;D: kuchimoto.com/lab
            </Link>
            <span>100% Custom Code</span>
            <Link href="/legal" className="hover:text-ink">
              Legal &amp; Privacy
            </Link>
            <ScrollTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
