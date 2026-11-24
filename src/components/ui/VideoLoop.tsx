"use client";

import { useEffect, useRef } from "react";

/**
 * A muted ambient video. Nothing is downloaded, not even the poster, until
 * it comes near the screen. A loop plays only while visible. With `once`,
 * the film plays from the start each time it is at least half on screen,
 * then rests on its last frame. Reduced motion gets the poster alone.
 */
export function VideoLoop({
  src,
  poster,
  className = "",
  label,
  once = false,
}: {
  src: { mp4: string; webm?: string };
  poster: string;
  className?: string;
  label?: string;
  /** Play through once per visit to the screen, then hold the last frame. */
  once?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rewind = false;
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
    // On screen: play. A loop pauses when it leaves; a single take starts over
    // the next time it is half in view.
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (still) return;
        if (!entry.isIntersecting) {
          video.pause();
          if (once) rewind = true;
          return;
        }
        if (once && entry.intersectionRatio < 0.5) return;
        fetchFilm();
        if (once && (rewind || video.ended)) {
          video.currentTime = 0;
          rewind = false;
        }
        void video.play().catch(() => undefined);
      },
      { threshold: [0, 0.5] },
    );
    near.observe(video);
    seen.observe(video);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [poster, once]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop={!once}
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
