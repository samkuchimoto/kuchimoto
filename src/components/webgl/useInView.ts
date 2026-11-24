"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the element is on screen (or within the margin). */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** WebGL can run here, and the visitor has not asked for reduced motion. */
export function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** A desktop: a fine pointer that can hover, a wide window, and WebGL without reduced motion. */
export function isDesktop(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 1024 && canRun3D();
}

