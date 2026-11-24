"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { useScrollControl } from "@/components/layout/SmoothScroll";
import { Close, Play } from "@/components/ui/Icons";
import { Registration } from "@/components/ui/Registration";
import { VideoLoop } from "@/components/ui/VideoLoop";

/**
 * The horizon reel: a black monolith on volcanic stone in Pacific mist.
 * A muted twelve-second loop (crossfaded, so it never jumps) plays while
 * the stage is on screen; PLAY ▶ REEL opens the full film with its sound.
 */
export function Reel() {
  const [open, setOpen] = useState(false);
  const audio = useAudio();
  const label = useRef<HTMLSpanElement>(null);

  return (
    <section className="defer-render container-k py-10 sm:py-16" aria-label="Studio reel">
      <Registration className="mb-[5px]" />
      <button
        type="button"
        data-dark=""
        onClick={() => {
          audio.chime(2);
          setOpen(true);
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !label.current) return;
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.08;
          const y = (e.clientY - r.top - r.height / 2) * 0.08;
          label.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }}
        onPointerLeave={() => {
          if (label.current) label.current.style.transform = "";
        }}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-stage)] bg-sumi sm:aspect-[16/8]"
      >
        <VideoLoop
          src={{ mp4: "/videos/kuchimoto-horizon-reel.mp4", webm: "/videos/kuchimoto-horizon-reel.webm" }}
          poster="/videos/kuchimoto-horizon-reel-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[66%_50%] opacity-90 transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-sumi/20" />
        <span
          ref={label}
          className="absolute inset-0 flex items-center justify-center gap-[3vw] text-washi transition-transform duration-700 ease-[var(--ease-out-expo)]"
          aria-hidden="true"
        >
          <span className="text-[clamp(3rem,10vw,9rem)] font-light tracking-[-0.04em]">PLAY</span>
          <span className="grid h-[clamp(56px,7vw,96px)] w-[clamp(88px,11vw,150px)] place-items-center rounded-full bg-surface text-ink transition-transform duration-500 group-hover:scale-110">
            <Play className="h-[clamp(18px,2vw,28px)] w-[clamp(18px,2vw,28px)]" />
          </span>
          <span className="text-[clamp(3rem,10vw,9rem)] font-light tracking-[-0.04em]">REEL</span>
        </span>
        <span className="sr-only">Play reel, with sound: the horizon film</span>
        <span aria-hidden="true" className="mono absolute bottom-5 left-5 text-washi/70">Horizon · Kuchimoto coast · 2026</span>
        <span aria-hidden="true" className="mono absolute right-5 bottom-5 text-washi/70">Sound on ↗</span>
      </button>
      <Registration className="mt-[5px]" />
      {open && <ReelModal onClose={() => setOpen(false)} />}
    </section>
  );
}

function ReelModal({ onClose }: { onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const { lock, unlock } = useScrollControl();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lock();
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      previous?.focus();
    };
  }, [lock, unlock, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio reel"
      className="fade-in fixed inset-0 z-[80] flex items-center justify-center bg-sumi/95 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <div className="rise-in relative w-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
        <video
          className="aspect-video w-full rounded-[var(--radius-card)] bg-black"
          src="/videos/kuchimoto-horizon-reel-sound.mp4"
          poster="/videos/kuchimoto-horizon-reel-poster.jpg"
          controls
          autoPlay
          playsInline
        />
        <button
          ref={close}
          type="button"
          onClick={onClose}
          className="mono-12 absolute -top-14 right-0 flex h-10 items-center gap-2 rounded-full bg-surface pr-3 pl-4 text-ink"
        >
          Close <Close className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
