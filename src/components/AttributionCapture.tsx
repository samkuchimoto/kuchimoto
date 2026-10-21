// /src/components/AttributionCapture.tsx
// Reads the visit's landing page, referrer, UTM tags and gclid into
// sessionStorage (lib/leads/attribution.ts), on every page and again when
// the visitor accepts cookies, so an ad click's gclid is kept from then on.

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT } from "@/lib/consent";
import { captureAttribution } from "@/lib/leads/attribution";

export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    const onConsent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "granted") captureAttribution();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
