// /src/components/ThankYou.tsx
// The browser side of the thank-you page (/merci, /en/thank-you,
// /ja/thank-you):
//   - generate_lead fires once, on load, for the lead the form just sent
//     (lib/track.ts); a visit without one, a reload or a second tab
//     fires nothing;
//   - the Cal.com booking is embedded inline from NEXT_PUBLIC_BOOKING_URL,
//     with Cal.com's own loader, prefilled with the visitor's name and
//     email; book_call fires when Cal.com reports a booking.

"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { STORAGE } from "@/lib/leads/options";
import { trackCall, trackLead } from "@/lib/track";

/** Fired on window by the Cal.com callback below. */
const BOOKED_EVENT = "kuchimoto-booked";

/** Fires generate_lead once per lead. Renders nothing. */
export function LeadConversion() {
  useEffect(() => {
    let lead: { id?: unknown; need?: string; source?: string } | null = null;
    try {
      lead = JSON.parse(sessionStorage.getItem(STORAGE.pending) ?? "null");
      if (!lead || typeof lead.id !== "string" || sessionStorage.getItem(STORAGE.fired) === lead.id) return;
      // Marked before sending, so a second run of this effect cannot send it twice.
      sessionStorage.setItem(STORAGE.fired, lead.id);
    } catch {
      return;
    }
    trackLead({ id: lead.id as string, need: lead.need ?? "", source: lead.source ?? "" });
  }, []);
  return null;
}

/** "https://cal.com/samuel/15min": where embed.js lives and which event to show. */
function calTarget(bookingUrl: string) {
  try {
    const url = new URL(bookingUrl);
    const app = url.hostname.endsWith("cal.eu") ? "https://app.cal.eu" : "https://app.cal.com";
    return { origin: url.origin, calLink: url.pathname.replace(/^\/+/, ""), embed: `${app}/embed/embed.js` };
  } catch {
    return null;
  }
}

export function BookingEmbed({ bookingUrl, title }: { bookingUrl: string; title: string }) {
  const booked = useRef(false);

  useEffect(() => {
    const onBooked = () => {
      if (booked.current) return;
      booked.current = true;
      trackCall();
    };
    window.addEventListener(BOOKED_EVENT, onBooked);
    return () => window.removeEventListener(BOOKED_EVENT, onBooked);
  }, []);

  const target = calTarget(bookingUrl);
  if (!target) return null;
  const json = JSON.stringify;
  const embed = `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, ${json(target.embed)}, "init");
var lead = null; try { lead = JSON.parse(sessionStorage.getItem(${json(STORAGE.pending)}) || "null"); } catch (e) {}
var config = { layout: "month_view" };
if (lead && lead.name) config.name = lead.name;
if (lead && lead.email) config.email = lead.email;
Cal("init", "kuchimoto", { origin: ${json(target.origin)} });
Cal.ns.kuchimoto("inline", { elementOrSelector: "#cal-booking", calLink: ${json(target.calLink)}, layout: "month_view", config: config });
var booked = function () { window.dispatchEvent(new Event(${json(BOOKED_EVENT)})); };
Cal.ns.kuchimoto("on", { action: "bookingSuccessfulV2", callback: booked });
Cal.ns.kuchimoto("on", { action: "bookingSuccessful", callback: booked });
`;

  return (
    <section aria-labelledby="book" className="border hairline p-5 sm:p-8">
      <h2 id="book" className="text-2xl">
        {title}
      </h2>
      <div id="cal-booking" className="mt-6 min-h-[36rem] w-full overflow-auto" />
      <Script id="cal-embed" strategy="afterInteractive">
        {embed}
      </Script>
    </section>
  );
}
