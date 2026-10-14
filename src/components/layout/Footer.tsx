import Link from "next/link";
import { CONTACT, COMPANY } from "@/config/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container, Logo, Todo } from "@/components/ui";
import { ManageCookiesButton } from "@/components/CookieBanner";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const href = (path: string) => localizedPath(lang, path);
  const link = "text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline";

  return (
    <footer className="mt-24 border-t hairline bg-washi">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-ink-soft">{t.tagline}</p>
          <p className="mt-5 text-sm text-ink-soft">{COMPANY.address}</p>
          <p className="mt-2 text-sm">
            {CONTACT.email ? (
              <a href={`mailto:${CONTACT.email}`} className={link}>
                {CONTACT.email}
              </a>
            ) : (
              <Todo>{dict.common.placeholderEmail}</Todo>
            )}
          </p>
        </div>

        <nav aria-label={t.divisions}>
          <p className="eyebrow text-ink-soft">{t.divisions}</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={href("/happy-homes")} className={link}>
                Happy Homes
              </Link>
            </li>
            <li>
              <Link href={href("/bambootails")} className={link}>
                BambooTails
              </Link>
            </li>
            <li>
              <Link href={href("/lab")} className={link}>
                Kuchimoto Lab
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={t.company}>
          <p className="eyebrow text-ink-soft">{t.company}</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={href("/a-propos")} className={link}>
                {dict.nav.links.about}
              </Link>
            </li>
            <li>
              <Link href={href("/contact")} className={link}>
                {dict.nav.links.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={t.legal}>
          <p className="eyebrow text-ink-soft">{t.legal}</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={href("/mentions-legales")} className={link}>
                {t.legalLinks.notice}
              </Link>
            </li>
            <li>
              <Link href={href("/cgv")} className={link}>
                {t.legalLinks.terms}
              </Link>
            </li>
            <li>
              <Link href={href("/confidentialite")} className={link}>
                {t.legalLinks.privacy}
              </Link>
            </li>
            <li>
              <ManageCookiesButton label={t.legalLinks.cookies} />
            </li>
          </ul>
        </nav>
      </Container>
      <div className="border-t hairline">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ink-soft md:flex-row md:justify-between">
          <p>{t.rights(new Date().getFullYear())}</p>
          <p>{t.trademark}</p>
        </Container>
      </div>
    </footer>
  );
}
