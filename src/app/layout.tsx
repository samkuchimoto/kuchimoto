import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { Providers } from "@/components/layout/Providers";
import { SITE } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
  // Preloaded like the display face: the labels in the first screen use it,
  // and a font found late in the stylesheet would hold the first paint.
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s · Kuchimoto" },
  description: SITE.description,
  applicationName: "Kuchimoto",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kuchimoto",
    title: "Kuchimoto · Crafted in Code. Built to Endure.",
    description: SITE.description,
    url: "/",
    locale: "en_US",
    images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630, alt: "Kuchimoto: crafted in code, built to endure. Interlocking joinery in black lacquer, basalt and titanium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuchimoto · Crafted in Code. Built to Endure.",
    description: SITE.description,
    images: ["/og/kuchimoto-crafted.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ed",
  colorScheme: "light",
};

// Runs before the first paint: marks that scripts run (reveals may hide
// content until it scrolls in), and plays the preloader once per session.
const SEEN = `var d=document.documentElement;d.setAttribute("data-js","");try{if(sessionStorage.getItem("k:seen"))d.setAttribute("data-seen","");else sessionStorage.setItem("k:seen","1")}catch(e){d.setAttribute("data-seen","")}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SEEN }} />
      </head>
      <body>
        <Preloader />
        <Providers>
          <a
            href="#main"
            className="mono fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-ink px-4 py-3 text-washi focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
