// /src/components/BackgroundVideo.tsx
// A silent, looping background video from public/video (name.webm, name.mp4,
// name-poster.jpg, name-poster-768.jpg), under an overlay that keeps the text
// on top readable: the /studio and /lab heroes, and the Studio's workshop
// band. The poster comes first, as two JPEGs made in advance (not through
// the image optimiser, whose first AVIF encode of a large poster takes far
// too long). A hero's poster is preloaded and its video fetched once the
// page has loaded and the browser is idle; a band waits until it nears the
// screen, poster included. The video then fades in over the poster (no
// poster attribute of its own: a second, larger poster painted after load
// would count as the page's largest paint), VP9
// WebM where the browser plays it, H.264 MP4 otherwise. Visitors who ask
// for reduced motion or data saving keep the poster only. Decorative:
// hidden from screen readers.

"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

export function BackgroundVideo({ name, hero = false, overlay }: { name: string; hero?: boolean; overlay: string }) {
  const poster = `/video/${name}-poster.jpg`;
  const srcSet = `/video/${name}-poster-768.jpg 768w, ${poster} 1280w`;
  // A hero's poster is its largest image: ask for it first.
  if (hero) preload(poster, { as: "image", fetchPriority: "high", imageSrcSet: srcSet, imageSizes: "100vw" });
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce.matches || saveData) return;

    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    const start = () => {
      if (hero) {
        const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
        idle(() => !cancelled && setLoad(true), { timeout: 4000 });
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          if (!cancelled) setLoad(true);
        },
        // A quarter of the band on screen: a sliver under the fold is not "in view".
        { threshold: 0.25 },
      );
      if (box.current) observer.observe(box.current);
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
      observer?.disconnect();
      window.removeEventListener("load", start);
      reduce.removeEventListener("change", onChange);
    };
  }, [hero]);

  return (
    <div ref={box} aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element -- made in advance at two sizes, see above */}
      <img
        src={poster}
        srcSet={srcSet}
        sizes="100vw"
        alt=""
        {...(hero ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {load && (
        <video
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          <source src={`/video/${name}.webm`} type="video/webm" />
          <source src={`/video/${name}.mp4`} type="video/mp4" />
        </video>
      )}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
