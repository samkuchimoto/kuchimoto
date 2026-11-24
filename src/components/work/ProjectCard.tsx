import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";
import { TapLink } from "@/components/ui/TapLink";
import type { Project } from "@/data/projects";

/**
 * One live system: the image (hover: a slow 1.03 zoom and a VIEW SYSTEM
 * pill riding the cursor), its disciplines, its name, one line of proof,
 * and a direct link to the live domain.
 */
export function ProjectCard({
  project,
  feature = false,
  priority = false,
}: {
  project: Project;
  feature?: boolean;
  priority?: boolean;
}) {
  const href = `/work/${project.slug}`;
  return (
    <article className="flex flex-col">
      <TapLink
        href={href}
        track
        data-dark={project.image.dark ? "" : undefined}
        className={`group relative block overflow-hidden rounded-[var(--radius-card)] ${
          feature ? "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[16/11]"
        }`}
        style={{ backgroundColor: project.image.tone }}
      >
        <Image
          src={project.image.src}
          alt={`${project.name} case study: ${project.image.alt}`}
          fill
          priority={priority}
          quality={80}
          sizes={feature ? "(min-width: 1024px) calc(100vw - 104px), 100vw" : "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        <span aria-hidden="true" className="mono absolute top-4 left-4 rounded-full bg-sumi/55 px-3 py-1.5 text-washi backdrop-blur-md sm:top-5 sm:left-5">
          {project.index} / {project.domain}
        </span>
        <span aria-hidden="true" className="cursor-pill mono-12 flex h-11 items-center gap-2 rounded-full bg-surface px-5 font-medium whitespace-nowrap text-ink shadow-lg">
          View system <Arrow dir="ne" className="h-3.5 w-3.5" />
        </span>
      </TapLink>

      <p className="mono mt-5 text-ink-2">{project.category.join(" · ")}</p>
      <div className="mt-2 flex items-start justify-between gap-6">
        <h3
          className={`font-medium tracking-[-0.035em] ${
            feature ? "text-[clamp(2.2rem,4.5vw,4rem)] leading-[1]" : "text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.02]"
          }`}
        >
          <Link href={href} className="hover:text-ink-2">
            {project.name}
          </Link>
        </h3>
        <TapLink
          href={project.url}
          external
          className="mono mt-2 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-ink-2 shadow-[0_0_0_1px_var(--color-hairline-strong)] transition-colors hover:bg-ink hover:text-washi"
        >
          {project.domain}
          <Arrow dir="ne" className="h-3 w-3" />
          <span className="sr-only">(opens the live site)</span>
        </TapLink>
      </div>
      <p className={`mt-3 max-w-[62ch] leading-relaxed text-ink-2 ${feature ? "text-lg" : ""}`}>
        {feature ? project.summary : project.short}
      </p>
    </article>
  );
}
