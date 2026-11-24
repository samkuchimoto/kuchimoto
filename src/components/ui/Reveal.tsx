/**
 * Rises into place the first time it scrolls into view. Server-rendered:
 * the CSS in globals.css hides it, RevealObserver (in the layout) shows it.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return (
    <Tag data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
