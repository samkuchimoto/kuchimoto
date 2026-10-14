// The 404 for a URL that matches no route at all. It sits outside
// app/[lang], so its language is unknown: it says it in both.

import type { Metadata } from "next";
import Link from "next/link";
import fr from "@/i18n/dictionaries/fr";
import en from "@/i18n/dictionaries/en";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 | KUCHIMOTO" };

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center px-6 text-center">
        <main>
          <p className="eyebrow text-seal">404</p>
          <h1 className="mt-5 text-4xl">{fr.notFound.title}</h1>
          <p lang="en" className="mt-3 text-ink-soft">
            {en.notFound.title}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/" className="min-h-12 bg-ink px-6 py-3 text-sm text-paper">
              {fr.notFound.home}
            </Link>
            <Link href="/en" lang="en" className="min-h-12 border border-ink px-6 py-3 text-sm">
              {en.notFound.home}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
