// /src/components/layout/Nav.tsx
// The navigation links, the FR | EN switch and the phone menu. Client
// side because each needs the current page, which is read from the
// layout tree: proxy.ts rewrites the URL, so the server and the browser
// would disagree on it.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { localeMeta, localizedPath, type Locale } from "@/i18n/config";

export type NavItem = { href: string; label: string; segment: string | null };

function useIsActive() {
  const segment = useSelectedLayoutSegment();
  return (item: NavItem) => item.segment === segment;
}

export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const isActive = useIsActive();
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-7 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item) ? "page" : undefined}
              className={`border-b py-1 transition-colors ${
                isActive(item) ? "border-ink text-ink" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const ORDER: Locale[] = ["fr", "en"];

export function LanguageToggle({ lang, label }: { lang: Locale; label: string }) {
  const segments = useSelectedLayoutSegments().filter((s) => !s.startsWith("(") && !s.startsWith("__"));
  const path = `/${segments.join("/")}`;
  return (
    <nav aria-label={label}>
      <ul className="flex items-center text-xs tracking-widest">
        {ORDER.map((locale, i) => (
          <li key={locale} className="flex items-center">
            {i > 0 && <span aria-hidden className="px-1.5 text-line">|</span>}
            <Link
              href={localizedPath(locale, path)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === lang ? "true" : undefined}
              className={`grid min-h-11 min-w-9 place-items-center ${
                locale === lang ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              <span aria-hidden>{localeMeta[locale].short}</span>
              <span className="sr-only">{localeMeta[locale].name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileMenu({
  items,
  label,
  open: openLabel,
  close: closeLabel,
}: {
  items: NavItem[];
  label: string;
  open: string;
  close: string;
}) {
  const [open, setOpen] = useState(false);
  const isActive = useIsActive();
  const segment = useSelectedLayoutSegment();

  // Close the menu after a page change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [segment]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="grid min-h-11 min-w-11 place-items-center text-sm"
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        <span aria-hidden className="flex w-5 flex-col gap-1.5">
          <span className={`h-px bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </span>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={label}
          className="absolute inset-x-0 top-full border-b hairline bg-paper shadow-sm"
        >
          <ul className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={`block py-3 font-display text-xl ${isActive(item) ? "text-ink" : "text-ink-soft"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
