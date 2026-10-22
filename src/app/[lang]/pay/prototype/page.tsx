import type { Metadata } from "next";
import { LAB } from "@/config/site";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { fill, wholeEuros } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { prototypePaymentsEnabled } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";
import { PrototypeCheckout } from "@/components/PrototypeCheckout";

/**
 * /pay/prototype, /en/pay/prototype, /ja/pay/prototype: the 48-hour AI
 * prototype in a few lines, then Stripe's Embedded Checkout on the same
 * page. Reached from the "Pay €490 and start" buttons on Lab, Studio and
 * the thank-you page. Without the Stripe keys it says payment is not open
 * yet and points to the Lab's form. Kept out of search engines.
 */

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.pay;
  return pageMetadata({ lang, path: "/pay/prototype", title: t.title, description: t.description, noindex: true });
}

export default async function PayPrototype() {
  const lang = await getLang();
  const t = getDictionary(lang).pay;
  const price = wholeEuros(LAB.prototype, lang);

  return (
    <Container className="grid gap-10 py-10 sm:py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      <div>
        <p className="eyebrow text-lab">{t.label}</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{t.title}</h1>
        <p className="mt-5 font-display text-2xl">{fill(t.price, { price })}</p>
        <p className="mt-4 max-w-md text-ink-soft">{t.summary}</p>
        <p className="mt-6 text-sm text-ink-soft">{t.secure}</p>
      </div>
      <div>
        {prototypePaymentsEnabled() ? (
          <PrototypeCheckout lang={lang} errorText={t.error} loadingText={t.loading} />
        ) : (
          <div className="border hairline p-6 sm:p-8">
            <p>{t.closed}</p>
            <div className="mt-6">
              <ButtonLink href={`${localizedPath(lang, "/lab")}#contact`} accent="lab">
                {t.closedLink}
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
