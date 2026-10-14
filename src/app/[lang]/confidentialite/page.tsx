import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { privacyContent } from "@/i18n/legal/privacy";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

// The text, in French and English, is in src/i18n/legal/privacy.tsx.

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = privacyContent(lang, getDictionary(lang));
  return pageMetadata({ lang, path: "/confidentialite", title: t.title, description: t.description });
}

export default async function Confidentialite() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = privacyContent(lang, dict);
  return <LegalPage lang={lang} dict={dict} path="/confidentialite" title={t.title} sections={t.sections} />;
}
