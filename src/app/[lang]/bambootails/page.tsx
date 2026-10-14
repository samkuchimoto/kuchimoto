import type { Metadata } from "next";
import Image from "next/image";
import { BAMBOOTAILS } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { euros } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, PageHeader } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = getDictionary(lang).meta.bambootails;
  return pageMetadata({ lang, path: "/bambootails", title: t.title, description: t.description });
}

export default async function BambooTails() {
  const lang = await getLang();
  const dict = getDictionary(lang);
  const t = dict.bambootails;
  const products = [
    { key: "bandana" as const, image: "/images/bambootails/bandana-flat.webp", price: BAMBOOTAILS.prices.bandana },
    { key: "collar" as const, image: "/images/bambootails/collar-flat.webp", price: BAMBOOTAILS.prices.collar },
  ];

  const buttons = (
    <div className="mt-8 flex flex-wrap gap-4">
      <ButtonLink href={BAMBOOTAILS.url} accent="bt" external externalLabel={t.external}>
        {t.shop}
      </ButtonLink>
      <ButtonLink href={BAMBOOTAILS.tiktok} accent="bt" variant="outline" external externalLabel={t.external}>
        {t.tiktok}
      </ButtonLink>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} accent="bt">
        {buttons}
      </PageHeader>

      <section aria-labelledby="universe" className="border-b hairline">
        <Container className="py-16 sm:py-20">
          <h2 id="universe" className="text-2xl sm:text-3xl">
            {t.universe.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{t.universe.body}</p>
          <ul className="mt-12 grid grid-cols-2 gap-px border hairline bg-line sm:grid-cols-3 lg:grid-cols-6">
            {t.universe.characters.map(([slug, name, role]) => (
              <li key={slug} className="bg-paper p-5 text-center">
                <div className="relative mx-auto aspect-[2/3] w-full max-w-36">
                  <Image
                    src={`/images/bambootails/${slug}.webp`}
                    alt={t.universe.alt(name)}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-4 font-display text-lg">{name}</p>
                <p className="text-sm text-ink-soft">{role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="products" className="bg-bt-wash">
        <Container className="py-16 sm:py-20">
          <h2 id="products" className="text-2xl sm:text-3xl">
            {t.products.title}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {products.map(({ key, image, price }) => {
              const product = t.products[key];
              return (
                <article key={key} className="border hairline bg-paper">
                  <div className="relative aspect-square w-full border-b hairline">
                    <Image src={image} alt={product.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="eyebrow text-bt">{t.products.madeIn}</p>
                    <h3 className="mt-3 text-2xl">{product.name}</h3>
                    <p className="mt-2 font-display text-xl text-bt">{euros(price, lang)}</p>
                    <p className="mt-4 text-ink-soft">{product.body}</p>
                    <p className="mt-4 text-xs text-ink-soft">{dict.common.visual}</p>
                  </div>
                </article>
              );
            })}
          </div>
          {buttons}
        </Container>
      </section>

      <Container className="pt-12">
        <p className="border-t hairline pt-6 text-sm text-ink-soft">{dict.footer.trademark}</p>
      </Container>
    </>
  );
}
