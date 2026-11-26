import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/ui/Icons";
import { PillLink } from "@/components/ui/PillLink";
import { Registration } from "@/components/ui/Registration";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, getProject, nextProject } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}: ${project.category[0]}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.name} · Kuchimoto`,
      description: project.summary,
      images: [{ url: project.og, width: 1200, height: 630, alt: project.image.alt }],
    },
    twitter: { card: "summary_large_image", title: `${project.name} · Kuchimoto`, description: project.summary, images: [project.og] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(project.slug);

  return (
    <article>
      <header className="container-k pt-32 sm:pt-44">
        <nav aria-label="Breadcrumb" className="mono flex items-center gap-2 text-ink-2">
          <Link href="/work" className="hover:text-ink">
            Work
          </Link>
          <span aria-hidden="true">/</span>
          <span>{project.index}</span>
        </nav>
        <h1 className="display mt-6 text-[clamp(3.4rem,10vw,9.5rem)]">{project.name}</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <ul className="flex flex-wrap content-start items-start gap-2 self-start lg:col-span-5" aria-label="Disciplines">
            {project.category.map((c) => (
              <li key={c} className="mono rounded-full bg-surface px-3 py-2 shadow-[0_0_0_1px_var(--color-hairline)]">
                {c}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.5] tracking-[-0.01em]">{project.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PillLink href={project.url} tone="dark" external>
                Visit live platform ↗
              </PillLink>
              <span className="mono text-ink-2">{project.domain}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container-k relative mt-16 sm:mt-24">
        <Registration count={2} className="absolute -top-[18px] right-0 left-0 px-4 sm:px-8 lg:px-[52px]" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-stage)] sm:aspect-[16/8]" style={{ backgroundColor: project.image.tone }}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            quality={80}
            sizes="(min-width: 1024px) calc(100vw - 104px), 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="container-k mt-24 grid gap-14 sm:mt-36 lg:grid-cols-12" aria-labelledby="challenge">
        <Reveal className="lg:col-span-6">
          <h2 id="challenge" className="mono text-ink-2">
            01 / The challenge
          </h2>
          <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] tracking-[-0.025em]">{project.challenge}</p>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <h2 className="mono text-ink-2">02 / In production</h2>
          <dl className="mt-6 border-t border-hairline-strong">
            {project.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-hairline-strong py-4">
                <dt className="mono text-ink-2">{f.label}</dt>
                <dd className="text-right text-lg font-medium tracking-[-0.01em] tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mono mt-4 text-ink-2/80">Counted from the production source code.</p>
        </Reveal>
      </section>

      <section className="container-k mt-24 sm:mt-36" aria-labelledby="architecture">
        <h2 id="architecture" className="mono text-ink-2">
          03 / Engineering architecture
        </h2>
        <ol className="mt-8 border-t border-hairline-strong">
          {project.architecture.map((item, i) => (
            <Reveal as="li" key={item} className="grid gap-3 border-b border-hairline-strong py-8 sm:grid-cols-12 sm:gap-6">
              <span className="mono text-vermilion sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.5] sm:col-span-10">{item}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-k mt-24 sm:mt-32" aria-labelledby="stack">
        <h2 id="stack" className="mono text-ink-2">
          04 / Stack
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="mono-12 rounded-full bg-ink px-4 py-2.5 text-washi">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-k mt-24 sm:mt-36" aria-label="Inquire">
        <div data-dark="" className="flex flex-col gap-8 rounded-[var(--radius-stage)] bg-sumi px-6 py-14 text-washi sm:px-12 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display display-md max-w-[16ch]">Need a system built to this standard?</h2>
          <div className="flex flex-wrap gap-3">
            <PillLink href="/contact#inquiry" tone="ghost">
              Inquire
            </PillLink>
            <PillLink href={project.url} tone="ghost" external>
              Visit {project.domain} ↗
            </PillLink>
          </div>
        </div>
      </section>

      <nav className="container-k mt-24 pb-24 sm:mt-32" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="group grid items-end gap-8 border-t border-hairline-strong pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mono text-ink-2">Next system · {next.index}</p>
            <p className="display mt-4 text-[clamp(2.8rem,7vw,6.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
              {next.name}
            </p>
            <p className="mono mt-4 flex items-center gap-2 text-ink-2">
              {next.category.join(" · ")} <Arrow className="h-4 w-4" />
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] md:col-span-5" style={{ backgroundColor: next.image.tone }}>
            <Image
              src={next.image.src}
              alt=""
              fill
              quality={70}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </Link>
      </nav>
    </article>
  );
}
