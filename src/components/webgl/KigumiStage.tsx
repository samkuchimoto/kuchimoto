"use client";

import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useAudio } from "@/components/audio/AudioEngine";
import { canRun3D, useInView } from "./useInView";

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
 * The Kigumi sculpture's dark viewport. Every screen paints a still of it
 * at once, then the live scene (three.js) loads and fades in over it: on a
 * desktop at the first move, scroll or key, or after a quiet moment; on a
 * phone or tablet at the first touch or scroll, as a lighter scene. So the
 * first paint never waits on WebGL. Off screen, the scene stops rendering.
 * With reduced motion or no WebGL, the still stays.
 */
export function KigumiStage({
  className = "",
  label = "Fig. 01 · Joinery study",
  priority = true,
}: {
  className?: string;
  label?: string;
  /** Above the fold: preload the still and fetch it first. */
  priority?: boolean;
}) {
  if (priority) preloadPosters();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, "80px");
  const [quality, setQuality] = useState<"high" | "low" | null>(null);
  const [ready, setReady] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 1024;
    let fired = false;
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;
    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      if (canRun3D()) setQuality(desktop ? "high" : "low");
    };
    const timer = desktop ? window.setTimeout(fire, 2500) : 0;
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
      tabIndex={quality ? 0 : -1}
      data-dark=""
      role="application"
      aria-roledescription="3D sculpture"
      aria-label="Interactive 3D sculpture of interlocking joinery modules in black lacquer, volcanic basalt and brushed titanium. Hold the mouse button, a finger or the space bar to open the joinery; drag or use the arrow keys to turn it."
      className={`stage-dark relative isolate touch-pan-y overflow-hidden rounded-[var(--radius-stage)] bg-sumi select-none [-webkit-touch-callout:none] ${quality ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={POSTER_WIDE.srcSet} sizes={POSTER_WIDE.sizes} />
        {/* Art-directed still via getImageProps (next/image has no <picture> mode). */}
        <img
          {...POSTER_TALL}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={`stage-still absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </picture>
      {quality && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <KigumiScene
            active={visible}
            quality={quality}
            eventSource={ref}
            onReady={onReady}
            onSettle={audio.knock}
            onStrike={audio.knock}
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-washi/70 sm:p-6">
        <div className="flex justify-between gap-4">
          <span className="mono">{label}</span>
          <span className="mono hidden sm:block">Lacquer · Basalt · Titanium</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <span className="mono hidden motion-safe:pointer-fine:block">Interactive WebGL · Hold to open the joinery</span>
          <span className="mono hidden motion-safe:pointer-coarse:block">Interactive WebGL · Touch and hold</span>
          <span className="mono hidden motion-reduce:block">Precision joinery</span>
          <span className="mono hidden sm:block">Scroll to explore ↓</span>
        </div>
      </div>
    </div>
  );
}
