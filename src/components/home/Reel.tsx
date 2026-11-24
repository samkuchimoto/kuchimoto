"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAudio } from "@/components/audio/AudioEngine";
import { useScrollControl } from "@/components/layout/SmoothScroll";
import { Close, Play } from "@/components/ui/Icons";
import { Registration } from "@/components/ui/Registration";
import { VideoLoop } from "@/components/ui/VideoLoop";

// One reel.
//   Cover (muted 14 s loop on the page): public/videos/kuchimoto-reel-loop.mp4
//   (+ .webm), the montage of the studio reel (joinery, the ink drop, ripples,
//   the ring) then the coast monolith, blending back into the joinery.
//   Player (with sound, on click): public/videos/kuchimoto-reel.mp4, one film:
//   the whole studio reel (50 s), then the coast monolith film (20 s). So a
//   click plays the footage the cover shows, in full, and runs on.
const COVER = {
  mp4: "/videos/kuchimoto-reel-loop.mp4",
  webm: "/videos/kuchimoto-reel-loop.webm",
  poster: "/videos/kuchimoto-reel-loop-poster.jpg",
};
const FILM = { mp4: "/videos/kuchimoto-reel.mp4", poster: "/videos/kuchimoto-reel-poster.jpg" };

/** PLAY ▶ REEL: the studio reel montage loops on the page; a click opens the full reel with sound. */
export function Reel() {
  const [open, setOpen] = useState(false);
  const audio = useAudio();
  const label = useRef<HTMLSpanElement>(null);

  return (
    <section className="defer-render container-k py-10 sm:py-16" aria-label="Studio reel">
      <Registration count={5} tone="text-ink/35" className="mb-[5px]" />
      <button
        type="button"
        data-dark=""
        onClick={() => setOpen(true)}
        onPointerEnter={audio.tap}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !label.current) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.06;
          const y = (e.clientY - r.top - r.height / 2) * 0.06;
          label.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }}
        onPointerLeave={() => {
          if (label.current) label.current.style.transform = "";
        }}
        className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-[var(--radius-stage)] bg-sumi"
      >
        <VideoLoop
          src={COVER}
          poster={COVER.poster}
          posterNow
          margin="200px"
          playMargin="200px"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
        {/* The magnetic drift on the outer span, the hover scale on the inner one. */}
        <span
          ref={label}
          className="absolute inset-0 flex items-center justify-center text-washi transition-transform duration-700 ease-[var(--ease-out-expo)]"
          aria-hidden="true"
        >
          <span className="flex items-center gap-[3vw] transition-transform duration-300 group-hover:scale-105">
            <span className="text-[clamp(2.25rem,10vw,9rem)] font-light tracking-[-0.04em]">PLAY</span>
            <span className="grid h-[clamp(44px,7vw,96px)] w-[clamp(72px,11vw,150px)] place-items-center rounded-full bg-washi text-ink">
              <Play className="h-[clamp(16px,2vw,28px)] w-[clamp(16px,2vw,28px)]" />
            </span>
            <span className="text-[clamp(2.25rem,10vw,9rem)] font-light tracking-[-0.04em]">REEL</span>
          </span>
        </span>
        <span className="sr-only">Play the full reel, with sound</span>
        <span aria-hidden="true" className="mono absolute bottom-3 left-4 text-washi sm:bottom-5 sm:left-5">
          Studio reel · 2026
        </span>
        {/* On a phone the two labels would meet along the bottom edge, so this one sits top right there. */}
        <span aria-hidden="true" className="mono absolute top-3 right-4 text-washi sm:top-auto sm:right-5 sm:bottom-5">
          Play full reel · Sound on ↗
        </span>
      </button>
      <Registration count={5} tone="text-ink/35" className="mt-[5px]" />
      {open && <ReelModal onClose={() => setOpen(false)} />}
    </section>
  );
}

/**
 * The full studio reel with sound, in a full-screen theatre. Rendered into
 * <body>: the reel section skips its layout while off screen
 * (content-visibility), which also makes it the box that fixed elements
 * inside it fill, so the player must live outside it. While it is open the
 * page does not scroll and the ambient soundscape steps back.
 */
function ReelModal({ onClose }: { onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const { lock, unlock } = useScrollControl();
  const audio = useAudio();
  const { duck } = audio;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const video = film.current;
    lock();
    document.body.style.overflow = "hidden";
    duck(true);
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        video?.pause();
        onClose();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      video?.pause();
      duck(false);
      document.body.style.overflow = "";
      unlock();
      previous?.focus();
    };
  }, [lock, unlock, onClose, duck]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio reel"
      className="fade-in fixed inset-0 z-50 flex items-center justify-center bg-sumi/95 p-4 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <button
        ref={close}
        type="button"
        onClick={onClose}
        className="mono-12 absolute top-4 right-4 z-10 flex h-10 items-center gap-2 rounded-full bg-washi pr-3 pl-4 text-ink md:top-6 md:right-6"
      >
        Close <Close className="h-4 w-4" />
      </button>
      {/* As wide as fits: never taller than the window. On a phone held sideways (a short window) it
          takes nearly the full height and leaves the right edge to the Close button. */}
      <div
        className="rise-in relative w-full max-w-[min(1400px,calc((100dvh-8rem)*16/9))] [@media(max-height:500px)]:max-w-[min(calc((100dvh-2rem)*16/9),calc(100vw-14.5rem))]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={film}
          className="aspect-video w-full rounded-[var(--radius-card)] bg-black"
          src={FILM.mp4}
          poster={FILM.poster}
          controls
          autoPlay
          playsInline
          muted={false}
          preload="none"
        />
      </div>
    </div>,
    document.body,
  );
}
