import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/config";
import { getLang } from "@/i18n/server";
import { stripe } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";
import { PurchaseConversion } from "@/components/PrototypeCheckout";

/**
 * Where Stripe's Embedded Checkout returns (/payment-success, /en/…,
 * /ja/…?session_id=cs_…). The session is read from Stripe on the server:
 * only a paid prototype session shows "Payment received" and fires the
 * GA4 purchase, once per session. Never generate_lead here. Kept out of
 * search engines and the sitemap.
 */

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.paymentSuccess;
  return { title: t.title, description: t.description, robots: { index: false, follow: false } };
}

async function paidSession(id: string | null): Promise<{ id: string; value: number } | null> {
  const client = stripe();
  if (!client || !id) return null;
  try {
    const session = await client.checkout.sessions.retrieve(id);
    if (session.payment_status !== "paid" || session.metadata?.kind !== "prototype") return null;
    return { id: session.id, value: (session.amount_total ?? 0) / 100 };
  } catch {
    return null;
  }
}

export default async function PaymentSuccess({ searchParams }: PageProps<"/[lang]/payment-success">) {
  const lang = await getLang();
  const t = getDictionary(lang).pay;
  const { session_id } = await searchParams;
  const id = typeof session_id === "string" && /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(session_id) ? session_id : null;
  const paid = await paidSession(id);

  return (
    <Container className="py-14 sm:py-24">
      {paid ? (
        <>
          <PurchaseConversion sessionId={paid.id} value={paid.value} />
          <h1 className="max-w-3xl text-3xl sm:text-5xl">{t.success}</h1>
        </>
      ) : (
        <>
          <h1 className="max-w-3xl text-3xl sm:text-4xl">{t.pending}</h1>
          <div className="mt-8">
            <ButtonLink href={localizedPath(lang, "/pay/prototype")} accent="lab">
              {t.retry}
            </ButtonLink>
          </div>
        </>
      )}
    </Container>
  );
}
