"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";

// Inertial scroll with Lenis on pointer devices. Touch keeps the phone's
// own native scroll (Lenis leaves it alone by default), and reduced motion
// gets plain scrolling. Menus and modals pause it through useScrollLock.

type ScrollControl = { lock: () => void; unlock: () => void; toTop: () => void };

const ScrollContext = createContext<ScrollControl>({ lock() {}, unlock() {}, toTop() {} });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });
    lenis.current = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // A new page starts at the top.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  const control = useMemo<ScrollControl>(
    () => ({
      lock: () => {
        lenis.current?.stop();
        document.documentElement.style.overflow = "hidden";
      },
      unlock: () => {
        lenis.current?.start();
        document.documentElement.style.overflow = "";
      },
      toTop: () => {
        if (lenis.current) lenis.current.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }),
    [],
  );

  return <ScrollContext.Provider value={control}>{children}</ScrollContext.Provider>;
}

export const useScrollControl = () => useContext(ScrollContext);
