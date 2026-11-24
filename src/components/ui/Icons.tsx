// Arrows drawn as SVG: the display face has no arrow glyphs of its own.

type Direction = "ne" | "se" | "e" | "s" | "n" | "w";

const ROTATION: Record<Direction, number> = { e: 0, se: 45, s: 90, w: 180, n: -90, ne: -45 };

export function Arrow({
  dir = "e",
  className,
  strokeWidth = 1.5,
}: {
  dir?: Direction;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      style={{ transform: `rotate(${ROTATION[dir]}deg)` }}
    >
      <path d="M3 12 H20 M13 5 L20 12 L13 19" />
    </svg>
  );
}

export function Play({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M7 4.5 L20 12 L7 19.5 Z" />
    </svg>
  );
}

export function Close({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 5 L19 19 M19 5 L5 19" />
    </svg>
  );
}

/** Registration mark: the hairline + of an architect's drawing. */
export function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 13 13" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6.5 0 V13 M0 6.5 H13" />
    </svg>
  );
}
