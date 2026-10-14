// /src/i18n/dictionaries/index.ts
// The dictionary for a language. French gets its punctuation spacing here,
// once (lib/typography.ts).

import type { Locale } from "../config";
import { withFrenchSpacing } from "@/lib/typography";
import fr, { type Dictionary } from "./fr";
import en from "./en";

const dictionaries: Record<Locale, Dictionary> = { fr: withFrenchSpacing(fr), en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
