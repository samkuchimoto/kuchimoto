import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { termsContent } from "@/i18n/legal/terms";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

// The text, in French and English, is in src/i18n/legal/terms.tsx.

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = termsContent(lang, getDictionary(lang));
  return pageMetadata({ lang, path: "/cgv", title: t.title, description: t.description });
}

export default async function Cgv() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = termsContent(lang, dict);
  return <LegalPage lang={lang} dict={dict} path="/cgv" title={t.title} sections={t.sections} numbered />;
}
