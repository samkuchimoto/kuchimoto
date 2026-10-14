import type { Metadata } from "next";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { stripe } from "@/lib/stripe";
import { ButtonLink, Container } from "@/components/ui";

// Where Stripe sends a customer after paying. The session is checked with
// Stripe, so the page only says "paid" when the payment really went
// through; anything else sends the visitor back to the booking form.

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.bookingThanks;
  return pageMetadata({
    lang,
    path: "/happy-homes/thailande/merci",
    title: t.title,
    description: t.description,
    noindex: true,
  });
}

async function isPaid(sessionId: string | undefined): Promise<boolean> {
  const client = stripe();
  if (!client || !sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return false;
  try {
    const session = await client.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export default async function BookingThanks({ searchParams }: PageProps<"/[lang]/happy-homes/thailande/merci">) {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const { session_id } = await searchParams;
  const paid = await isPaid(typeof session_id === "string" ? session_id : undefined);
  const back = localizedPath(lang, "/happy-homes/thailande");

  return (
    <Container className="py-28 text-center">
      {paid ? (
        <>
          <p className="eyebrow text-hh">Happy Homes</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl">{dict.thanks.title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">{dict.thanks.body}</p>
        </>
      ) : (
        <>
          <h1 className="mx-auto max-w-2xl text-3xl">{dict.forms.errors.payment}</h1>
        </>
      )}
      <div className="mt-10">
        <ButtonLink href={paid ? back : `${back}#reservation`} accent="hh">
          {dict.thanks.back}
        </ButtonLink>
      </div>
    </Container>
  );
}
