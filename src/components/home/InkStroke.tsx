"use client";

import { useEffect, useRef } from "react";

// One calligraphic sumi stroke, drawn as its section scrolls through.
const STROKE =
  "M -80 210 C 220 120 470 150 560 300 C 650 450 470 610 300 640 C 120 672 40 820 220 900 C 420 990 760 820 980 860 C 1180 896 1250 1040 1520 980";

/** Fills its positioned parent; the stroke's length follows the parent's progress through the viewport. */
export function InkStroke() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = svg.current?.parentElement;
    const stroke = path.current;
    if (!section || !stroke) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stroke.style.strokeDashoffset = "0";
      return;
    }
    let current = 0;
    let target = 0;
    let raf = 0;
    const tick = () => {
      current += (target - current) * 0.12;
      stroke.style.strokeDashoffset = String(1 - current);
      raf = Math.abs(target - current) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const measure = () => {
      const r = section.getBoundingClientRect();
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      target = Math.min(Math.max((progress - 0.08) / 0.64, 0), 1);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <svg
      ref={svg}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 1100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={path}
        d={STROKE}
        pathLength={1}
        fill="none"
        stroke="#111113"
        strokeLinecap="round"
        strokeDasharray="1 1"
        strokeDashoffset="1"
        vectorEffect="non-scaling-stroke"
        className="[stroke-width:14px] sm:[stroke-width:26px]"
      />
    </svg>
  );
}
