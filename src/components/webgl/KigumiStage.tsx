"use client";

import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useAudio } from "@/components/audio/AudioEngine";
import { isDesktop, useInView } from "./useInView";

const KigumiScene = dynamic(() => import("./KigumiScene"), { ssr: false });

// Stills rendered from the live scene itself: wide for desktop, tall for phones.
const POSTER_WIDE = getImageProps({
  src: "/images/studio/kigumi-poster.jpg",
  alt: "",
  width: 1816,
  height: 757,
  quality: 80,
  sizes: "(min-width: 1024px) calc(100vw - 104px), calc(100vw - 64px)",
}).props;
const POSTER_TALL = getImageProps({
  src: "/images/studio/kigumi-poster-tall.jpg",
  alt: "",
  width: 716,
  height: 922,
  quality: 80,
  sizes: "calc(100vw - 32px)",
}).props;

/** The hero's still is its largest paint: fetch the one this screen needs before anything else. */
function preloadPosters() {
  preload(POSTER_TALL.src, {
    as: "image",
    imageSrcSet: POSTER_TALL.srcSet,
    imageSizes: POSTER_TALL.sizes,
    fetchPriority: "high",
    media: "(max-width: 639px)",
  });
  preload(POSTER_WIDE.src, {
    as: "image",
    imageSrcSet: POSTER_WIDE.srcSet,
    imageSizes: POSTER_WIDE.sizes,
    fetchPriority: "high",
    media: "(min-width: 640px)",
  });
}

/**
 * The hero's dark viewport: the Kigumi sculpture. Every screen paints a
 * still of it at once. On a desktop, three.js is imported on the visitor's
 * first move, scroll or key (or after a quiet moment) and the live scene
 * fades in over the still; off screen it stops rendering. Phones and
 * tablets keep the still, breathing slowly in CSS, so their scroll never
 * waits on WebGL.
 */
export function KigumiStage({ className = "" }: { className?: string }) {
  preloadPosters();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, "80px");
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    if (!isDesktop()) return;
    let fired = false;
    const events = ["pointermove", "pointerdown", "wheel", "keydown", "scroll"] as const;
    const fire = () => {
      if (fired) return;
      fired = true;
      setLive(true);
      cleanup();
    };
    const timer = window.setTimeout(fire, 2500);
    events.forEach((e) => window.addEventListener(e, fire, { passive: true }));
    function cleanup() {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, fire));
    }
    return cleanup;
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <div
      ref={ref}
      tabIndex={live ? 0 : -1}
      data-dark=""
      role="application"
      aria-roledescription="3D sculpture"
      aria-label="Interactive 3D sculpture of interlocking joinery modules in black urushi lacquer, volcanic basalt and brushed titanium. Hold the mouse button or the space bar to open the joinery; drag or use the arrow keys to turn it."
      className={`stage-dark relative isolate touch-pan-y overflow-hidden rounded-[var(--radius-stage)] bg-sumi select-none ${live ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={POSTER_WIDE.srcSet} sizes={POSTER_WIDE.sizes} />
        {/* Art-directed still via getImageProps (next/image has no <picture> mode). */}
        <img
          {...POSTER_TALL}
          alt=""
          loading="eager"
          fetchPriority="high"
          className={`stage-still absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </picture>
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <KigumiScene
            active={visible}
            quality="high"
            eventSource={ref}
            onReady={onReady}
            onOpen={audio.chime}
            onSettle={audio.knock}
            onStrike={audio.chime}
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-washi/70 sm:p-6">
        <div className="flex justify-between gap-4">
          <span className="mono">Fig. 01 · Kigumi study</span>
          <span className="mono hidden sm:block">Urushi · Basalt · Titanium</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <span className="mono hidden lg:pointer-fine:motion-safe:block">Interactive WebGL · Hold to open the joinery</span>
          <span className="mono lg:pointer-fine:motion-safe:hidden">Kigumi · Precision joinery</span>
          <span className="mono hidden sm:block">Scroll to explore ↓</span>
        </div>
      </div>
    </div>
  );
}
