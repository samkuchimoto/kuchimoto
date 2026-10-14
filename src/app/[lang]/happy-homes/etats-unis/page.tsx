import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { WaitlistPage } from "@/components/WaitlistPage";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.usa;
  return pageMetadata({ lang, path: "/happy-homes/etats-unis", title: t.title, description: t.description });
}

export default async function UnitedStates() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  return <WaitlistPage lang={lang} dict={dict} country="etats-unis" division="hh-usa" copy={dict.usa} />;
}
