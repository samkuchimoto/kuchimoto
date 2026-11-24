/**
 * The seal: 口元 (Kuchimoto) cut in white into a vermilion block, 口 above
 * 元, as a name seal reads. Drawn as strokes so it never depends on a
 * Japanese font being installed.
 */
export function Hanko({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 40"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="0.5" y="0.5" width="23" height="39" rx="2.5" fill="#c83e2b" />
      <g fill="none" stroke="#f4f2ed" strokeWidth="2.1" strokeLinecap="square" strokeLinejoin="miter">
        {/* 口 */}
        <path d="M6.5 5.5 V16.5 M6.5 5.5 H17.5 V16.5 M6.5 16 H17.5" />
        {/* 元 */}
        <path d="M8 21.5 H16 M4.5 26 H19.5" />
        <path d="M10 26 C10 30.5 9.2 33.5 5.5 35.5" />
        <path d="M14 26 V33.2 C14 34.6 14.8 35.2 16.2 35.2 H19.2 V32.4" />
      </g>
    </svg>
  );
}
