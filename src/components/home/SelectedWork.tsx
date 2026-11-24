import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PROJECTS } from "@/data/projects";

export function SelectedWork() {
  const [flagship, ...rest] = PROJECTS;
  return (
    <section className="defer-render container-k pt-24 pb-10 sm:pt-36" aria-labelledby="work-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="work-title" className="display display-lg lg:col-span-8">
          Selected Work
        </h2>
        <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end lg:text-right">
          <p className="mono max-w-[38ch] text-ink-2">
            Seven live production platforms engineered and operated by Kuchimoto LLC.
          </p>
          <Link href="/work" className="group inline-flex items-center gap-2 text-2xl font-medium tracking-[-0.03em]">
            WORK <span className="text-ink-2">07</span>
            <Arrow dir="se" className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
          </Link>
        </div>
      </div>

      <Reveal className="mt-14 sm:mt-20">
        <ProjectCard project={flagship} feature />
      </Reveal>

      <div className="mt-20 grid gap-x-5 gap-y-20 sm:mt-28 md:grid-cols-2 lg:gap-x-6 lg:gap-y-28">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-24" : undefined}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
