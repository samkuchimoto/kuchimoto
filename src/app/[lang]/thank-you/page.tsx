import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLang } from "@/i18n/server";
import { ThankYouPage, thankYouMetadata } from "@/components/ThankYouPage";

/** The thank-you page in English and Japanese. French uses /merci. */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return lang === "fr" ? {} : thankYouMetadata(lang);
}

export default async function ThankYou() {
  const lang = await getLang();
  if (lang === "fr") notFound();
  return <ThankYouPage lang={lang} />;
}
