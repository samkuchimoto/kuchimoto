"use client";

import Link from "next/link";
import { useAudio } from "@/components/audio/AudioEngine";

/**
 * A link with the hinoki tap on hover. With `track`, it also writes the
 * cursor position into --cx / --cy for a .cursor-pill inside it.
 */
export function TapLink({
  href,
  external = false,
  track = false,
  className,
  style,
  children,
  ...aria
}: {
  href: string;
  external?: boolean;
  track?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const audio = useAudio();
  const onPointerMove = track
    ? (e: React.PointerEvent<HTMLAnchorElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
      }
    : undefined;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className} style={style} onPointerEnter={audio.tap} onPointerMove={onPointerMove} {...aria}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} onPointerEnter={audio.tap} onPointerMove={onPointerMove} {...aria}>
      {children}
    </Link>
  );
}
