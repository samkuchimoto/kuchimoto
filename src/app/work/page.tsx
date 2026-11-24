import type { Metadata } from "next";
import { Engagement } from "@/components/home/Engagement";
import { Arrow } from "@/components/ui/Icons";
import { WorkIndex } from "@/components/work/WorkIndex";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Seven live production platforms engineered and operated by Kuchimoto LLC: physics engines, global service platforms, B2B recruiting and staffing, civic commerce, luxury commerce and a mobile app.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Work · Kuchimoto", images: [{ url: "/og/kuchimoto-kigumi.jpg", width: 1200, height: 630 }] },
};

export default function WorkPage() {
  return (
    <>
      <section className="container-k pt-32 sm:pt-44" aria-labelledby="work-page-title">
        <div className="flex items-start justify-between gap-6">
          <h1 id="work-page-title" className="text-[clamp(4.2rem,17vw,16rem)] leading-[0.8] font-normal tracking-[-0.06em]">
            WORK
          </h1>
          <div className="flex flex-col items-end gap-4 pt-[1vw]">
            <span className="text-[clamp(1.6rem,3.4vw,3.2rem)] leading-none font-light tabular-nums">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <Arrow dir="se" className="h-[clamp(28px,4vw,56px)] w-[clamp(28px,4vw,56px)]" strokeWidth={1.2} />
          </div>
        </div>
        <p className="mono mt-10 max-w-[56ch] text-ink-2">
          Seven live production platforms engineered and operated by Kuchimoto LLC. Every one runs on its own domain,
          on code we wrote.
        </p>
      </section>
      <section className="container-k pt-16 pb-10" aria-labelledby="all-projects">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <WorkIndex />
      </section>
      <Engagement />
    </>
  );
}
