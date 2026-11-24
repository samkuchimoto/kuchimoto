"use client";

import { useEffect, useRef } from "react";

/**
 * A muted ambient loop. Nothing is downloaded, not even the poster, until
 * it comes near the screen; it plays only while visible. Reduced motion
 * gets the poster alone.
 */
export function VideoLoop({
  src,
  poster,
  className = "",
  label,
}: {
  src: { mp4: string; webm?: string };
  poster: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fetch the poster and the film, once. load() resets a playing video,
    // so whichever observer fires first does it and the other skips it.
    const fetchFilm = () => {
      if (!video.poster) video.poster = poster;
      if (!still && video.preload !== "auto") {
        video.preload = "auto";
        video.load();
      }
    };
    // Near the screen: start fetching.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchFilm();
      },
      { rootMargin: "300px" },
    );
    // On screen: play; off screen: pause.
    const seen = new IntersectionObserver(([entry]) => {
      if (still) return;
      if (!entry.isIntersecting) {
        video.pause();
        return;
      }
      fetchFilm();
      void video.play().catch(() => undefined);
    });
    near.observe(video);
    seen.observe(video);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [poster]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {src.webm && <source src={src.webm} type="video/webm" />}
      <source src={src.mp4} type="video/mp4" />
    </video>
  );
}
