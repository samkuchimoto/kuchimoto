// /src/components/PrototypeCta.tsx
// On /lab, /studio and /demo-triage only: the "Get a 48h prototype" button
// in the sticky header, and on phones a bar at the bottom of the screen
// with the price, shown while no lead form is in view. Both take the
// visitor to the hero form, or to the final form once the hero is passed.
// PresetButton does the same from an offer card, preselecting its need.

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import type { Need } from "@/lib/leads/options";
import { goToLeadForm } from "@/lib/leads/scroll";

const PAGES = ["lab", "studio", "demo-triage"];

function useOnOfferPage() {
  const segment = useSelectedLayoutSegment();
  return segment !== null && PAGES.includes(segment);
}

export function HeaderPrototypeButton({ label, fallbackHref }: { label: string; fallbackHref: string }) {
  const router = useRouter();
  const onOfferPage = useOnOfferPage();
  if (!onOfferPage) return null;
  return (
    <button
      type="button"
      onClick={() => goToLeadForm() || router.push(fallbackHref)}
      className="hidden min-h-11 items-center bg-lab px-4 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:inline-flex"
    >
      {label}
    </button>
  );
}

export function MobilePrototypeBar({ label, fallbackHref }: { label: string; fallbackHref: string }) {
  const router = useRouter();
  const onOfferPage = useOnOfferPage();
  const [formInView, setFormInView] = useState(true);

  useEffect(() => {
    if (!onOfferPage) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setFormInView(visible.size > 0);
    });
    const watch = () => document.querySelectorAll("[data-lead-form]").forEach((form) => observer.observe(form));
    watch();
    // The demo's form appears once a brief is built: watch new forms too.
    const added = new MutationObserver(watch);
    added.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      added.disconnect();
    };
  }, [onOfferPage]);

  if (!onOfferPage) return null;
  return (
    <>
      {/* Room at the end of the page, so the bar never hides the footer's last line. */}
      <div aria-hidden className="h-20 md:hidden" />
      {!formInView && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-paper/95 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => goToLeadForm() || router.push(fallbackHref)}
            className="flex min-h-12 w-full items-center justify-center bg-lab px-5 text-base font-medium text-paper"
          >
            {label}
          </button>
        </div>
      )}
    </>
  );
}

/** An offer card's button: to the lead form, with its need selected. */
export function PresetButton({ need, children, variant = "solid" }: { need: Need; children: ReactNode; variant?: "solid" | "outline" }) {
  return (
    <button
      type="button"
      onClick={() => goToLeadForm(need)}
      className={`inline-flex min-h-12 items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-colors ${
        variant === "solid" ? "bg-lab text-paper hover:opacity-90" : "border border-lab text-lab hover:bg-washi"
      }`}
    >
      {children}
    </button>
  );
}
