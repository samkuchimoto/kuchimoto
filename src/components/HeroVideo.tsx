// /src/components/HeroVideo.tsx
// A muted, looping background video behind a hero (/studio), under a white
// wash that keeps the title and the form readable. The poster comes first,
// preloaded, as two JPEGs made in advance (not through the image optimiser,
// whose first AVIF encode of a large poster takes far too long). The video
// itself is fetched only once the page has loaded and the browser is idle,
// then fades in over the poster, so it never delays the first screen.
// Visitors who ask for reduced motion or data saving keep the poster only.
// Decorative: hidden from screen readers.

"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

export function HeroVideo({ src, poster, posterSmall }: { src: string; poster: string; posterSmall: string }) {
  const srcSet = `${posterSmall} 768w, ${poster} 1280w`;
  // The poster is the hero's largest image: ask for it first.
  preload(poster, { as: "image", fetchPriority: "high", imageSrcSet: srcSet, imageSizes: "100vw" });
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce.matches || saveData) return;

    let cancelled = false;
    const start = () => {
      const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
      idle(() => !cancelled && setLoad(true), { timeout: 4000 });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Switching reduced motion on while here stops the video.
    const onChange = () => {
      if (!reduce.matches) return;
      setLoad(false);
      setPlaying(false);
    };
    reduce.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- made in advance at two sizes, see above */}
      <img src={poster} srcSet={srcSet} sizes="100vw" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {load && (
        <video
          ref={video}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          poster={poster}
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* The wash: the title, the intro and the form stay readable over the painting. */}
      <div className="absolute inset-0 bg-paper/[0.86] lg:bg-gradient-to-r lg:from-paper/[0.92] lg:via-paper/[0.82] lg:to-paper/[0.55]" />
    </div>
  );
}
