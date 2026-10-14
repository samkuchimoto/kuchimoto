import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { WaitlistPage } from "@/components/WaitlistPage";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.canada;
  return pageMetadata({ lang, path: "/happy-homes/canada", title: t.title, description: t.description });
}

export default async function Canada() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  return <WaitlistPage lang={lang} dict={dict} country="canada" division="hh-canada" copy={dict.canada} />;
}
