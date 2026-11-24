"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { Arrow } from "@/components/ui/Icons";
import { FILTERS, PROJECTS, type ProjectFilter } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type View = "index" | "grid";

/** The seven systems, filterable, as an index (with a floating preview) or a grid. */
export function WorkIndex() {
  const [filter, setFilter] = useState<ProjectFilter | "All">("All");
  const [view, setView] = useState<View>("index");
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const audio = useAudio();

  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter));
  const count = (f: ProjectFilter) => PROJECTS.filter((p) => p.filters.includes(f)).length;

  // The preview trails the cursor with a little lag.
  useEffect(() => {
    if (!hovered) return;
    let raf = 0;
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      if (preview.current) preview.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const active = PROJECTS.find((p) => p.slug === hovered);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-hairline-strong pb-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by sector" className="flex flex-wrap gap-2">
          {(["All", ...FILTERS] as const).map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onPointerEnter={audio.tap}
                onClick={() => setFilter(f)}
                className={`mono-12 h-10 rounded-full px-4 transition-colors ${
                  on ? "bg-ink text-washi" : "bg-surface text-ink shadow-[0_0_0_1px_var(--color-hairline)] hover:bg-white"
                }`}
              >
                {f}{" "}
                <span className={on ? "text-washi/60" : "text-ink-2"}>
                  ({String(f === "All" ? PROJECTS.length : count(f)).padStart(2, "0")})
                </span>
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="View" className="hidden gap-1 rounded-full bg-surface p-1 shadow-[0_0_0_1px_var(--color-hairline)] md:flex">
          {(["index", "grid"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`mono-12 h-8 rounded-full px-4 ${view === v ? "bg-ink text-washi" : "text-ink-2 hover:text-ink"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "index" && (
        <ul
          className="relative hidden md:block"
          onPointerMove={(e) => {
            pos.current.tx = e.clientX;
            pos.current.ty = e.clientY;
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {shown.map((p) => (
            <li key={p.slug} className="border-b border-hairline-strong">
              <Link
                href={`/work/${p.slug}`}
                onPointerEnter={(e) => {
                  if (!hovered) {
                    pos.current.x = pos.current.tx = e.clientX;
                    pos.current.y = pos.current.ty = e.clientY;
                  }
                  setHovered(p.slug);
                  audio.tap();
                }}
                onFocus={() => setHovered(null)}
                className={`group grid grid-cols-12 items-center gap-6 py-7 transition-opacity duration-500 lg:py-9 ${
                  hovered && hovered !== p.slug ? "opacity-35" : "opacity-100"
                }`}
              >
                <span className="mono col-span-1 text-ink-2">{p.index}</span>
                <span className="col-span-5 text-[clamp(2rem,3.6vw,3.6rem)] leading-none font-medium tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                  {p.name}
                </span>
                <span className="mono col-span-4 text-ink-2">{p.category.join(" · ")}</span>
                <span className="mono col-span-2 flex items-center justify-end gap-2 text-ink-2">
                  {p.domain}
                  <Arrow dir="ne" className="h-3.5 w-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Phones always get cards; wide screens get them in grid view. */}
      <div className={`mt-12 grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:gap-x-6 ${view === "index" ? "md:hidden" : ""}`}>
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[3/2] w-[min(30vw,440px)] overflow-hidden rounded-[16px] shadow-[0_40px_80px_-30px_rgb(17_17_19/0.55)] transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] md:block ${
          active && view === "index" ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{ backgroundColor: active?.image.tone }}
      >
        {PROJECTS.map((p) => (
          <Image
            key={p.slug}
            src={p.image.src}
            alt=""
            fill
            sizes="440px"
            quality={70}
            className={`object-cover transition-opacity duration-300 ${p.slug === hovered ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
