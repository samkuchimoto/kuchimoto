import { Consulting } from "@/components/home/Consulting";
import { DarkBand } from "@/components/home/DarkBand";
import { Engagement } from "@/components/home/Engagement";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Reel } from "@/components/home/Reel";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SITE } from "@/data/site";

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: "Kuchimoto",
  url: SITE.url,
  email: SITE.email,
  logo: `${SITE.url}/icon.svg`,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address[0],
    addressLocality: "Sheridan",
    addressRegion: "WY",
    postalCode: "82801",
    addressCountry: "US",
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
      <Hero />
      <Consulting />
      <Philosophy />
      <Reel />
      <SelectedWork />
      <Engagement />
      <DarkBand />
    </>
  );
}
