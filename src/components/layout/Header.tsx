"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { SoundToggle } from "@/components/audio/SoundToggle";
import { Arrow } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { NAV } from "@/data/site";

/** True while any [data-dark] section passes under the wordmark (a 1 px line at its height). */
function useDarkUnderHeader(pathname: string): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const under = new Set<Element>();
    let io: IntersectionObserver | null = null;
    const arm = () => {
      io?.disconnect();
      under.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) under.add(e.target);
            else under.delete(e.target);
          }
          setDark(under.size > 0);
        },
        { rootMargin: `-34px 0px -${Math.max(window.innerHeight - 35, 0)}px 0px` },
      );
      document.querySelectorAll("[data-dark]").forEach((el) => io!.observe(el));
    };
    arm();
    window.addEventListener("resize", arm);
    return () => {
      window.removeEventListener("resize", arm);
      io?.disconnect();
    };
  }, [pathname]);
  return dark;
}

/** True once the page has moved off its very top. */
function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const audio = useAudio();
  const card = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const dark = useDarkUnderHeader(pathname);
  const scrolled = useScrolled();

  // A navigation closes the menu (adjusting state during render, not in an effect).
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  useEffect(() => {
    if (!open) return;
    card.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!card.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <Link
        href="/"
        aria-label="Kuchimoto, home"
        className={`fixed top-4 left-1 z-50 flex h-10 items-center gap-1.5 rounded-full px-3 transition-[color,background-color,box-shadow] duration-500 sm:top-6 sm:left-5 lg:left-[40px] ${
          dark ? "text-washi" : "text-ink"
        } ${
          // Once the page scrolls, the wordmark sits on a frosted pill like the controls on the right,
          // so it never reads over a headline passing underneath.
          scrolled
            ? dark
              ? "bg-sumi/60 shadow-[0_0_0_1px_var(--color-hairline-dark)] backdrop-blur-md"
              : "bg-surface/85 shadow-[0_0_0_1px_var(--color-hairline)] backdrop-blur-md"
            : ""
        }`}
        onPointerEnter={audio.tap}
      >
        <span className="text-[19px] font-semibold tracking-[0.04em] sm:text-[22px]">KUCHIMOTO</span>
        <span className="mt-[-10px] block h-[5px] w-[5px] rounded-full bg-current" aria-hidden="true" />
      </Link>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:top-6 sm:right-8 sm:gap-3 lg:right-[52px]">
        <SoundToggle />
        <Magnetic className="hidden sm:block">
          <Link
            href="/contact"
            onPointerEnter={audio.tap}
            className="group mono-12 flex h-10 items-center gap-3 rounded-full bg-ink pr-4 pl-5 font-medium text-washi shadow-[0_0_0_1px_rgb(255_255_255/0.1)] transition-colors hover:bg-black"
          >
            Start a project
            <span className="block h-[5px] w-[5px] rounded-full bg-vermilion transition-transform duration-300 group-hover:scale-[1.8]" />
          </Link>
        </Magnetic>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
          onPointerEnter={audio.tap}
          className="mono-12 flex h-10 items-center gap-3 rounded-full bg-surface pr-4 pl-5 font-medium text-ink shadow-[0_0_0_1px_var(--color-hairline)] transition-colors hover:bg-white"
        >
          <span className="w-[42px] text-left">{open ? "Close" : "Menu"}</span>
          <span
            className={`flex gap-[3px] transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-90" : ""}`}
            aria-hidden="true"
          >
            <i className="block h-[4px] w-[4px] rounded-full bg-ink" />
            <i className="block h-[4px] w-[4px] rounded-full bg-ink" />
          </span>
        </button>
      </div>

      <div
        ref={card}
        id="site-menu"
        role="dialog"
        aria-label="Site menu"
        inert={!open}
        className={`fixed top-[68px] right-4 left-4 z-50 origin-top-right transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out-expo)] sm:top-[80px] sm:right-8 sm:left-auto sm:w-[320px] lg:right-[52px] ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-3 scale-[0.97] opacity-0"
        }`}
      >
        <nav aria-label="Main" className="rounded-[14px] bg-surface p-2 shadow-[0_24px_60px_-24px_rgb(17_17_19/0.35),0_0_0_1px_var(--color-hairline)]">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onPointerEnter={audio.tap}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between rounded-[10px] px-4 py-3 text-[26px] font-medium tracking-[-0.03em] uppercase transition-colors hover:bg-washi"
                >
                  <span>
                    {item.label}
                    {"count" in item && <span className="mono ml-2 align-top text-ink-2">({item.count})</span>}
                  </span>
                  {isActive(item.href) && <span className="block h-[7px] w-[7px] rounded-full bg-ink" />}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mono-12 mt-1 flex items-center justify-between rounded-[10px] bg-ink px-4 py-3.5 text-washi sm:hidden"
          >
            Start a project
            <span className="block h-[6px] w-[6px] rounded-full bg-vermilion" />
          </Link>
        </nav>
        <Link
          href="/lab"
          onPointerEnter={audio.tap}
          onClick={() => setOpen(false)}
          className="group mt-2 flex items-center justify-between rounded-[14px] bg-sumi px-5 py-5 text-washi shadow-[0_24px_60px_-24px_rgb(17_17_19/0.5)]"
        >
          <span className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <g className="orbit">
                <circle cx="12" cy="4" r="2.2" fill="#c83e2b" />
              </g>
            </svg>
            <span className="text-[22px] font-medium tracking-[-0.03em] uppercase">Kuchimoto Lab</span>
          </span>
          <Arrow dir="ne" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </>
  );
}
