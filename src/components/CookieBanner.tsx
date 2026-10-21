// /src/components/CookieBanner.tsx
// The cookie consent banner. Google Analytics and Google Ads
// (components/Analytics.tsx) start with every storage denied (Consent
// Mode v2) and are granted only by "Accept" here; the gclid of an ad
// click is kept only then (lib/leads/attribution.ts). Anything optional
// added later must call hasConsent() first and listen for CONSENT_EVENT.
// Refusing is as easy as accepting, and the footer link "Gérer les
// cookies" reopens the banner at any time.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY as STORAGE_KEY, OPEN_CONSENT_EVENT } from "@/lib/consent";

export { CONSENT_EVENT, OPEN_CONSENT_EVENT };

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** True only after the visitor accepted. Non-essential code checks this. */
export function hasConsent(): boolean {
  return readChoice() === "granted";
}

export function CookieBanner({
  title,
  body,
  accept,
  refuse,
  more,
  privacyHref,
}: {
  title: string;
  body: string;
  accept: string;
  refuse: string;
  more: string;
  privacyHref: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read after hydration: the server cannot know the visitor's choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (readChoice() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Private browsing: the choice holds for this visit.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
    setOpen(false);
  }

  if (!open) return null;

  return (
    <section
      aria-label={title}
      className="fixed inset-x-0 bottom-0 z-50 border-t hairline bg-paper shadow-[0_-8px_24px_rgba(0,0,0,0.06)]"
    >
      {/* Compact on phones, so a visitor from an ad still sees the form above it. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-5 py-3 sm:gap-4 sm:px-8 sm:py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-[0.8125rem] leading-snug text-ink-soft sm:text-sm sm:leading-relaxed">
          <strong className="font-medium text-ink">{title}. </strong>
          {body}{" "}
          <Link href={privacyHref} className="underline underline-offset-4 hover:text-ink">
            {more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="min-h-10 border border-ink px-4 text-sm font-medium hover:bg-washi sm:min-h-11 sm:px-5"
          >
            {refuse}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="min-h-10 bg-ink px-4 text-sm font-medium text-paper hover:opacity-90 sm:min-h-11 sm:px-5"
          >
            {accept}
          </button>
        </div>
      </div>
    </section>
  );
}

/** "Gérer les cookies" in the footer: shows the banner again. */
export function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="text-left text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
    >
      {label}
    </button>
  );
}
