import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { noticeContent } from "@/i18n/legal/notice";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

// The text, in French and English, is in src/i18n/legal/notice.tsx.

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = noticeContent(lang, getDictionary(lang));
  return pageMetadata({ lang, path: "/mentions-legales", title: t.title, description: t.description });
}

export default async function MentionsLegales() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = noticeContent(lang, dict);
  return <LegalPage lang={lang} dict={dict} path="/mentions-legales" title={t.title} intro={t.intro} sections={t.sections} />;
}
