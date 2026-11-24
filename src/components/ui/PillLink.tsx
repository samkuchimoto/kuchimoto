"use client";

import Link from "next/link";
import { useAudio } from "@/components/audio/AudioEngine";
import { Magnetic } from "./Magnetic";

/** The compact pill: a dot, an uppercase label. Dark, light or on-dark. */
export function PillLink({
  href,
  children,
  tone = "light",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const audio = useAudio();
  const look =
    tone === "dark"
      ? "bg-ink text-washi hover:bg-black"
      : tone === "ghost"
        ? "bg-washi/10 text-washi shadow-[0_0_0_1px_var(--color-hairline-dark)] hover:bg-washi/15"
        : "bg-surface text-ink shadow-[0_0_0_1px_var(--color-hairline)] hover:bg-white";
  const dot = tone === "dark" ? "bg-vermilion" : tone === "ghost" ? "bg-washi" : "bg-ink";
  const inner = (
    <>
      <span className={`block h-[6px] w-[6px] rounded-full transition-transform duration-300 group-hover:scale-150 ${dot}`} />
      {children}
    </>
  );
  const classes = `group mono-12 inline-flex h-12 items-center gap-3 rounded-full px-6 font-medium transition-colors ${look} ${className}`;
  return (
    <Magnetic className="inline-block" strength={0.2}>
      {external ? (
        <a href={href} target="_blank" rel="noopener" className={classes} onPointerEnter={audio.tap}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes} onPointerEnter={audio.tap}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
