import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { COMPANY, SITE_URL } from "@/config/site";
import { isLocale, locales, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { fontVariables } from "../fonts";
import "../globals.css";

// French, English and Japanese only; any other first segment falls
// through to app/global-not-found.tsx.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.home.title, template: `%s | ${COMPANY.name}` },
    description: t.home.description,
    applicationName: COMPANY.name,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

/**
 * Browser page translation (Chrome's "Translate this page") replaces text
 * with elements of its own; when React later updates that text, the
 * browser throws and the page breaks. This standard guard makes the two
 * calls involved skip the missing node instead of throwing.
 */
const TRANSLATION_GUARD = `(function () {
  if (typeof Node !== "function" || !Node.prototype) return;
  var removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return removeChild.apply(this, arguments);
  };
  var insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, reference) {
    if (reference && reference.parentNode !== this) return node;
    return insertBefore.apply(this, arguments);
  };
})();`;

/** schema.org Organization: only facts stated on the site. */
function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    url: SITE_URL,
    founder: { "@type": "Person", name: COMPANY.president },
    address: {
      "@type": "PostalAddress",
      streetAddress: "13 rue André Chénier",
      postalCode: "92260",
      addressLocality: "Fontenay-aux-Roses",
      addressCountry: "FR",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={fontVariables}>
      <head>
        {/* Runs before React starts: see TRANSLATION_GUARD. */}
        <script dangerouslySetInnerHTML={{ __html: TRANSLATION_GUARD }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <CookieBanner
          title={dict.cookies.title}
          body={dict.cookies.body}
          accept={dict.cookies.accept}
          refuse={dict.cookies.refuse}
          more={dict.cookies.more}
          privacyHref={`${localizedPath(lang, "/confidentialite")}#cookies`}
        />
      </body>
    </html>
  );
}
