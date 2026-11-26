import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { Hanko } from "@/components/ui/Hanko";
import { CONSULTING, ENGINEERING, SITE, TRACKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Tell Kuchimoto the problem, with or without a technical specification: strategic consulting and research, or a software engineering and digital design commission. Each engagement is scoped by written proposal.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Inquire · Kuchimoto", images: [{ url: "/og/kuchimoto-crafted.jpg", width: 1200, height: 630 }] },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const email = one(params.email).slice(0, 254);
  const track = one(params.track).slice(0, 20);
  // The footer's one-sentence problem arrives here and starts the brief (27 November 2026).
  const brief = one(params.brief).slice(0, 1000);

  return (
    <section className="container-k pt-32 pb-24 sm:pt-44 sm:pb-36" aria-labelledby="contact-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="mono text-ink-2">Direct inquiry</p>
          <h1 id="contact-title" className="display mt-6 text-[clamp(3.4rem,8vw,7rem)]">
            Begin with the problem.
          </h1>
          <p className="mt-8 max-w-[40ch] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.5]">
            Tell us the problem, with or without a technical specification. Samuel answers personally, in writing: what
            we would look at first, and how we would scope it.
          </p>

          <dl className="mt-12 border-t border-hairline-strong">
            <div className="border-b border-hairline-strong py-4">
              <dt className="mono text-ink-2">{CONSULTING.practice}</dt>
              <dd className="mt-2 text-[15px]">
                <Link href="/consulting" className="underline-offset-4 hover:underline">
                  Diagnosis, benchmarking and roadmaps
                </Link>
              </dd>
            </div>
            <div className="border-b border-hairline-strong py-4">
              <dt className="mono text-ink-2">{ENGINEERING.practice}</dt>
              {TRACKS.map((t) => (
                <dd key={t.id} className="mt-2 text-[15px]">
                  {t.title}
                </dd>
              ))}
            </div>
          </dl>
          <p className="mono mt-4 text-ink-2">Each engagement is defined by its own written proposal.</p>

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

        <div id="inquiry" className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <InquiryForm email={email} track={track} brief={brief} />
        </div>
      </div>
    </section>
  );
}
