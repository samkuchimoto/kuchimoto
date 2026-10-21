// /src/components/Analytics.tsx
// Google Analytics 4 and Google Ads through one gtag.js, on every page,
// with Consent Mode v2: ad_storage, ad_user_data, ad_personalization and
// analytics_storage start denied, and only "Accept" in the cookie banner
// grants them (now, or on the next visit from the saved choice). Nothing
// loads while neither NEXT_PUBLIC_GA4_ID nor NEXT_PUBLIC_GOOGLE_ADS_ID is
// set. The events themselves are in lib/track.ts.

import Script from "next/script";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

const IDS = [process.env.NEXT_PUBLIC_GA4_ID, process.env.NEXT_PUBLIC_GOOGLE_ADS_ID].filter(
  (id): id is string => Boolean(id && /^[A-Z]{1,3}-[A-Z0-9]+$/.test(id)),
);

const SETUP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var denied = {ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'};
var granted = {ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'};
gtag('consent', 'default', Object.assign({wait_for_update: 500}, denied));
try { if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') gtag('consent', 'update', granted); } catch (e) {}
window.addEventListener('${CONSENT_EVENT}', function (e) { gtag('consent', 'update', e.detail === 'granted' ? granted : denied); });
gtag('js', new Date());
${IDS.map((id) => `gtag('config', '${id}');`).join("\n")}
`;

export function Analytics() {
  if (!IDS.length) return null;
  return (
    <>
      {/* Before the page starts: the consent defaults come first, and gtag()
          exists for the thank-you page's conversion as soon as it renders.
          The library then reads the queue in order. */}
      <Script id="gtag-setup" strategy="beforeInteractive">
        {SETUP}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${IDS[0]}`} strategy="afterInteractive" />
    </>
  );
}
