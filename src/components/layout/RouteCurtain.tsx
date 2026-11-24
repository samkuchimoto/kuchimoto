"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const MS = 450;

/**
 * The sumi curtain between routes. A click on a link to another page is
 * held (captured before Next's Link sees it), a #0B0B0D panel rises over
 * the page in 0.45 s, the router moves on beneath it, and once the new
 * page has painted the panel leaves upward in 0.45 s. Back and forward,
 * modified clicks, new tabs, same-page anchors and reduced motion are
 * left alone.
 */
export function RouteCurtain() {
  const panel = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const state = useRef<{ covering: boolean; anim: Animation | null; safety: number; reveal: () => void }>({
    covering: false,
    anim: null,
    safety: 0,
    reveal: () => undefined,
  });

  useEffect(() => {
    const s = state.current;
    const reveal = () => {
      s.covering = false;
      window.clearTimeout(s.safety);
      s.anim?.cancel();
      const anim = panel.current?.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], { duration: MS, easing: EASE });
      if (anim) anim.onfinish = () => anim.cancel();
      s.anim = anim ?? null;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (s.covering || !panel.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      s.covering = true;
      router.prefetch(href);
      s.anim?.cancel();
      const anim = panel.current.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], { duration: MS, easing: EASE, fill: "forwards" });
      s.anim = anim;
      anim.onfinish = () => {
        router.push(href);
        // If the page never changes (an error, a redirect home), lift anyway.
        s.safety = window.setTimeout(reveal, 4000);
      };
    };
    s.reveal = reveal;
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(s.safety);
    };
  }, [router]);

  // The new page has rendered beneath the panel: wait for its first paint, then lift.
  useEffect(() => {
    const s = state.current;
    if (!s.covering) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => s.reveal());
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <div ref={panel} className="curtain" aria-hidden="true" />;
}
