// /src/components/ui.tsx
// Small building blocks shared by every page: the logo, the division
// accents, page headers, photo placeholders and the visible "to fill in"
// placeholder.

import type { ReactNode } from "react";
import Link from "next/link";

export type Division = "hh" | "bt" | "lab";

/** Tailwind classes for each division's accent colour. */
export const ACCENT: Record<Division | "company", { text: string; bg: string; wash: string; border: string }> = {
  company: { text: "text-seal", bg: "bg-seal", wash: "bg-washi", border: "border-seal" },
  hh: { text: "text-hh", bg: "bg-hh", wash: "bg-hh-wash", border: "border-hh" },
  bt: { text: "text-bt", bg: "bg-bt", wash: "bg-bt-wash", border: "border-bt" },
  lab: { text: "text-lab", bg: "bg-lab", wash: "bg-lab-wash", border: "border-lab" },
};

/** The wordmark, with a small square seal in the company red. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="grid size-7 place-items-center bg-seal font-display text-sm text-paper">
        K
      </span>
      <span className="font-display text-base tracking-[0.18em] sm:text-lg sm:tracking-[0.22em]">KUCHIMOTO</span>
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Eyebrow in the division colour, a title, and an introduction. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  accent = "company",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  accent?: Division | "company";
  children?: ReactNode;
}) {
  return (
    <header className="border-b hairline">
      <Container className="py-16 sm:py-24">
        <p className={`eyebrow ${ACCENT[accent].text}`}>{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-ink-soft">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}

/**
 * Where a photo goes, until it is supplied. Announced to screen readers
 * with its description, so the page reads the same before and after.
 */
export function PhotoPlaceholder({
  alt,
  label,
  ratio = "aspect-[4/3]",
  className = "",
}: {
  alt: string;
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative grid place-items-center border hairline bg-washi ${ratio} ${className}`}
    >
      <div aria-hidden className="px-6 text-center">
        <span className="mx-auto block size-8 border border-field" />
        <p className="mt-3 text-sm text-ink-soft">{label}</p>
        <p className="mt-1 text-xs text-ink-soft">{alt}</p>
      </div>
    </div>
  );
}

/** A fact still to supply, shown as it is: « [e-mail] ». Never a guess. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="bg-todo-wash px-1 font-medium text-todo">{children}</mark>;
}

/** A link styled as a button, filled in the accent colour or outlined. */
export function ButtonLink({
  href,
  children,
  accent = "company",
  variant = "solid",
  external = false,
  externalLabel,
}: {
  href: string;
  children: ReactNode;
  accent?: Division | "company";
  variant?: "solid" | "outline";
  external?: boolean;
  /** Read after the label for a link that opens a new tab, e.g. "(new tab)". */
  externalLabel?: string;
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors";
  const style =
    variant === "solid"
      ? `${accent === "company" ? "bg-ink" : ACCENT[accent].bg} text-paper hover:opacity-90`
      : `border ${accent === "company" ? "border-ink text-ink" : `${ACCENT[accent].border} ${ACCENT[accent].text}`} hover:bg-washi`;
  const className = `${base} ${style}`;
  // An email or phone link opens the visitor's app: a plain link, same tab.
  if (/^(mailto|tel):/.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span aria-hidden>↗</span>
        {externalLabel && <span className="sr-only">{externalLabel}</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
