"use client";

import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useAudio } from "@/components/audio/AudioEngine";
import { canRun3D, isLowPower, useInView } from "./useInView";

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
 * The hero's dark viewport. It paints a still of the sculpture at once,
 * then loads the live WebGL scene (three.js) on the visitor's first move,
 * scroll or touch, or after three quiet seconds on a desktop, and fades it
 * in over the still. Off screen, the scene stops rendering. With reduced
 * motion or no WebGL, the still stays.
 */
export function KigumiStage({
  className = "",
  captions = true,
  label = "Fig. 01 · Kigumi study",
  priority = true,
}: {
  className?: string;
  captions?: boolean;
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
    if (!canRun3D()) return;
    const low = isLowPower();
    let fired = false;
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;
    const fire = () => {
      if (fired) return;
      fired = true;
      setQuality(low ? "low" : "high");
      cleanup();
    };
    const timer = low ? null : window.setTimeout(fire, 3000);
    events.forEach((e) => window.addEventListener(e, fire, { passive: true }));
    function cleanup() {
      if (timer) window.clearTimeout(timer);
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
      aria-label="Interactive 3D sculpture of interlocking joinery modules in black lacquer, basalt and titanium. Drag to turn it, click to strike it, or use the arrow keys."
      className={`relative isolate touch-pan-y overflow-hidden rounded-[var(--radius-stage)] bg-sumi select-none ${quality ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={POSTER_WIDE.srcSet} sizes={POSTER_WIDE.sizes} />
        {/* Art-directed still via getImageProps (next/image has no <picture> mode). */}
        <img
          {...POSTER_TALL}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </picture>
      {quality && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <KigumiScene
            active={visible}
            quality={quality}
            eventSource={ref}
            onReady={onReady}
            onGrab={audio.knock}
            onStrike={audio.chime}
          />
        </div>
      )}
      {/* Vignette: keeps the captions legible and the edges quiet. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgb(11 11 13 / 0.55) 100%)" }}
      />
      {captions && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-washi/70 sm:p-6">
          <div className="flex justify-between gap-4">
            <span className="mono">{label}</span>
            <span className="mono hidden sm:block">Urushi · Sumi · Titanium</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="mono">Interactive WebGL · Drag to inspect</span>
            <span className="mono hidden sm:block">Scroll to explore ↓</span>
          </div>
        </div>
      )}
    </div>
  );
}
