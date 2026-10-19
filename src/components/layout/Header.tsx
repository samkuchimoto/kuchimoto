import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container, Logo } from "@/components/ui";
import { LanguageToggle, MobileMenu, NavLinks, type NavItem } from "./Nav";

export function navItems(lang: Locale, dict: Dictionary): NavItem[] {
  const l = dict.nav.links;
  return [
    { href: localizedPath(lang, "/happy-homes"), label: l.happyHomes, segment: "happy-homes" },
    { href: localizedPath(lang, "/bambootails"), label: l.bambootails, segment: "bambootails" },
    { href: localizedPath(lang, "/lab"), label: l.lab, segment: "lab" },
    { href: localizedPath(lang, "/a-propos"), label: l.about, segment: "a-propos" },
    { href: localizedPath(lang, "/contact"), label: l.contact, segment: "contact" },
  ];
}

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = navItems(lang, dict);
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-paper/95 backdrop-blur">
      <Container className="relative flex h-18 items-center justify-between gap-3 sm:gap-6">
        <Link href={localizedPath(lang, "/")} aria-label={`KUCHIMOTO, ${dict.nav.links.home}`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-1 sm:gap-4 lg:gap-8">
          <NavLinks items={items} label={dict.nav.label} />
          <LanguageToggle lang={lang} label={dict.nav.language} className="hidden sm:block" />
          <MobileMenu
            items={items}
            label={dict.nav.label}
            open={dict.nav.menu}
            close={dict.nav.close}
            lang={lang}
            languageLabel={dict.nav.language}
          />
        </div>
      </Container>
    </header>
  );
}
