// /src/components/happy-homes.tsx
// Pieces shared by the Happy Homes pages: the country tabs and the notice
// that Happy Homes does not search for housing or manage rentals.

import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui";

export const COUNTRIES = ["thailande", "canada", "etats-unis"] as const;
export type Country = (typeof COUNTRIES)[number];

export function CountryTabs({ lang, dict, current }: { lang: Locale; dict: Dictionary; current?: Country }) {
  const t = dict.happyHomes;
  return (
    <nav aria-label={t.tabsLabel} className="border-b hairline">
      <Container>
        <ul className="-mb-px flex gap-8 overflow-x-auto text-sm">
          {COUNTRIES.map((country) => {
            const active = country === current;
            return (
              <li key={country} className="shrink-0">
                <Link
                  href={localizedPath(lang, `/happy-homes/${country}`)}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b-2 py-4 ${
                    active ? "border-hh font-medium text-hh" : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.countries[country].name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}

export function NoHousingNotice({ dict }: { dict: Dictionary }) {
  return (
    <aside className="border-l-2 border-hh bg-hh-wash px-5 py-4 text-sm">
      <p>{dict.common.noHousing}</p>
    </aside>
  );
}
