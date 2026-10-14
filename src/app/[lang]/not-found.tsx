import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { ButtonLink, Container } from "@/components/ui";

export default async function NotFound() {
  const lang = await getLang();
  const t = getDictionary(lang).notFound;
  return (
    <Container className="py-32 text-center">
      <p className="eyebrow text-seal">404</p>
      <h1 className="mt-5 text-4xl">{t.title}</h1>
      <p className="mt-4 text-ink-soft">{t.body}</p>
      <div className="mt-10">
        <ButtonLink href={localizedPath(lang, "/")}>{t.home}</ButtonLink>
      </div>
    </Container>
  );
}
