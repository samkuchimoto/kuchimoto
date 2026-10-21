// /src/components/offers.tsx
// Blocks shared by the Lab and Studio pages: the proof strip under the
// hero (text only, no logos), "Who builds it" and the FAQ. Photos show only
// once their file is in the public folder, so nothing breaks before then.

import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { fill } from "@/lib/format";
import { Container } from "@/components/ui";

/** True when public/<path> exists (read at build time). */
export function publicFileExists(path: string): boolean {
  return existsSync(join(process.cwd(), "public", path));
}

export function ProofStrip({ t }: { t: Dictionary["proof"] }) {
  return (
    <section aria-label={t.label} className="border-b hairline bg-washi">
      <Container className="py-6">
        <ul className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 bg-lab" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const FOUNDER_PHOTO = "/images/samuel.jpg";

export function Founder({ t }: { t: Dictionary["founder"] }) {
  const photo = publicFileExists(FOUNDER_PHOTO);
  return (
    <section aria-labelledby="founder" className="border-t hairline">
      <Container className={`grid gap-10 py-16 sm:py-20 ${photo ? "md:grid-cols-[12rem_1fr] md:items-start" : ""}`}>
        {photo && (
          <div className="relative aspect-[4/5] w-40 overflow-hidden bg-washi md:w-48">
            <Image src={FOUNDER_PHOTO} alt={t.photoAlt} fill sizes="12rem" className="object-cover" />
          </div>
        )}
        <div className="max-w-3xl">
          <h2 id="founder" className="text-2xl sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-6 text-lg text-ink-soft">{t.body}</p>
        </div>
      </Container>
    </section>
  );
}

export function Faq({ t, price }: { t: Dictionary["faq"]; price: string }) {
  return (
    <section aria-labelledby="faq" className="border-t hairline">
      <Container className="py-16 sm:py-20">
        <h2 id="faq" className="text-2xl sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-8 max-w-3xl divide-y divide-line border-y hairline">
          {t.items.map(([question, answer]) => (
            <details key={question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-medium">
                {fill(question, { price })}
                <span aria-hidden className="shrink-0 text-lab transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 text-ink-soft">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
