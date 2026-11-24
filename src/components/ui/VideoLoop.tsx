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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (!video.poster) video.poster = poster;
        if (still) return;
        if (video.preload !== "auto") {
          video.preload = "auto";
          video.load();
        }
        void video.play().catch(() => undefined);
      },
      { rootMargin: "300px" },
    );
    io.observe(video);
    return () => io.disconnect();
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
