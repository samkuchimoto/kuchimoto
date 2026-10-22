// /src/components/ThankYouPage.tsx
// Where the lead form lands once a request is sent: /merci in French,
// /en/thank-you and /ja/thank-you. Kept out of search engines and the
// sitemap; the conversion fires here (components/ThankYou.tsx).

import type { Metadata } from "next";
import { LAB } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fill, wholeEuros } from "@/lib/format";
import { payPath, thanksPath } from "@/lib/leads/props";
import { prototypePaymentsEnabled } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";
import { BookingEmbed, LeadConversion } from "@/components/ThankYou";

export function thankYouMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).meta.thankYou;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: thanksPath(lang) },
    robots: { index: false, follow: false },
  };
}

export function ThankYouPage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const t = dict.thankYou;
  const price = wholeEuros(LAB.prototype, lang);
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  // Under the booking: "Pay €490 and start", once Stripe is set up.
  const pay = prototypePaymentsEnabled() ? payPath(lang, "thank-you") : null;

  return (
    <Container className="py-12 sm:py-20">
      <LeadConversion />
      <h1 className="max-w-3xl text-3xl sm:text-5xl">{t.title}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        {(booking || pay) && (
          <div className="space-y-8">
            {booking && <BookingEmbed bookingUrl={booking} title={t.book} />}
            {pay && (
              <ButtonLink href={pay} accent="lab">
                {fill(dict.pay.button, { price })}
              </ButtonLink>
            )}
          </div>
        )}
        <section aria-labelledby="next" className={booking || pay ? "" : "lg:col-span-2"}>
          <h2 id="next" className="text-2xl">
            {t.next}
          </h2>
          <ol className="mt-6 space-y-6">
            {t.steps.map((step, i) => (
              <li key={step} className="flex gap-4 border-t border-lab pt-4">
                <span className="font-display text-xl text-lab tabular-nums">{i + 1}</span>
                <p>{fill(step, { price })}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Container>
  );
}
