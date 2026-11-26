import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { Hanko } from "@/components/ui/Hanko";
import { SITE, TRACKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Request a written scope and a fixed price for a custom website, web application or AI system, or a strategic consultation in ecology, technology and science. First enquiry free. Answer within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Start a project · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const email = one(params.email).slice(0, 254);
  const track = one(params.track).slice(0, 20);

  return (
    <section className="container-k pt-32 pb-24 sm:pt-44 sm:pb-36" aria-labelledby="contact-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="mono text-ink-2">Direct scope inquiry</p>
          <h1 id="contact-title" className="display mt-6 text-[clamp(3.4rem,8vw,7rem)]">
            Start a project.
          </h1>
          <p className="mt-8 max-w-[40ch] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.5]">
            Strategic consulting in ecology, technology and science, and custom websites, web applications and AI
            systems. Tell us what you&apos;re building or solving: you&apos;ll get a written answer within 24 hours. The
            first enquiry is free.
          </p>

          <dl className="mt-12 border-t border-hairline-strong">
            <div className="flex items-baseline justify-between gap-6 border-b border-hairline-strong py-4">
              <dt className="text-[15px]">
                <Link href="/consulting" className="underline-offset-4 hover:underline">
                  Strategic consulting
                </Link>
              </dt>
              <dd className="mono shrink-0 text-ink-2">From $2,000</dd>
            </div>
            {TRACKS.map((t) => (
              <div key={t.id} className="flex items-baseline justify-between gap-6 border-b border-hairline-strong py-4">
                <dt className="text-[15px]">{t.title}</dt>
                <dd className="mono shrink-0 text-ink-2">{t.price}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="mono text-ink-2">Write directly</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 inline-block text-xl underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="mono text-ink-2">Entity</p>
              <p className="mt-2 leading-relaxed">
                {SITE.legalName}
                <br />
                {SITE.address[0]}, {SITE.address[1]}
              </p>
            </div>
          </div>

          <div className="relative mt-12 hidden aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[#0d0d0d] lg:block">
            <Image
              src="/images/studio/charred-slab.jpg"
              alt="A slab of charred wood and glass floating in darkness, lit by one line of light"
              fill
              quality={70}
              sizes="40vw"
              className="object-cover"
            />
            <Hanko className="absolute right-5 bottom-5 h-10 w-6" />
          </div>
        </div>

        <div id="inquiry" className="scroll-mt-28 lg:col-span-6 lg:col-start-7 lg:pt-4">
          <InquiryForm email={email} track={track} />
        </div>
      </div>
    </section>
  );
}
