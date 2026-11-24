"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A muted ambient loop. Nothing is downloaded until it comes within
 * `margin` of the screen; it plays while within `playMargin` and pauses
 * beyond it. With `posterNow`, the poster sits under the video as an
 * optimized image, mounted when the section is within 800 px of the screen
 * (well before it shows, never during the first load); the film covers it
 * once it plays, so there is no blank frame. Otherwise the poster is
 * fetched with the film.
 * Reduced motion gets the poster alone.
 *
 * One file is chosen when the film is fetched: the VP9 WebM where the
 * browser plays it (smaller), and the H.264 MP4 on Apple devices, where
 * H.264 is decoded in hardware and VP9 is not reliable.
 */
export function VideoLoop({
  src,
  poster,
  className = "",
  label,
  margin = "300px",
  playMargin = "0px",
  posterNow = false,
}: {
  src: { mp4: string; webm?: string };
  poster: string;
  className?: string;
  label?: string;
  /** How close to the screen the film starts downloading. */
  margin?: string;
  /** How close to the screen it plays (and beyond which it pauses). */
  playMargin?: string;
  /** Lay the poster under the video as a lazy image (needs a positioned parent). */
  posterNow?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(false);
  const { mp4, webm } = src;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apple = navigator.vendor === "Apple Computer, Inc.";
    const file = webm && !apple && video.canPlayType('video/webm; codecs="vp9"') !== "" ? webm : mp4;
    // Fetch the poster and the film, once. Setting a source resets a playing
    // video, so whichever observer fires first does it and the other skips it.
    const fetchFilm = () => {
      if (!posterNow && !video.poster) video.poster = poster;
      if (!still && !video.getAttribute("src")) {
        video.muted = true;
        video.preload = "auto";
        video.src = file;
      }
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchFilm();
      },
      { rootMargin: margin },
    );
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (still) return;
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        fetchFilm();
        void video.play().catch(() => undefined);
      },
      { rootMargin: playMargin },
    );
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShowPoster(true);
        approach.disconnect();
      },
      { rootMargin: "800px" },
    );
    near.observe(video);
    seen.observe(video);
    if (posterNow) approach.observe(video);
    return () => {
      near.disconnect();
      seen.disconnect();
      approach.disconnect();
    };
  }, [mp4, webm, poster, margin, playMargin, posterNow]);

  return (
    <>
      {posterNow && showPoster && (
        <Image src={poster} alt="" fill sizes="(min-width: 1024px) calc(100vw - 104px), 100vw" quality={70} className="object-cover" />
      )}
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
    </>
  );
}
