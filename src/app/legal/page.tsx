import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Legal notice & privacy",
  description: "Who publishes kuchimoto.com, who hosts it, and what happens to the details you send.",
  alternates: { canonical: "/legal" },
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Publisher",
    body: (
      <>
        <p>
          This site is published by {SITE.legalName}, a Wyoming limited liability company, {SITE.addressLine}.
        </p>
        <p>
          Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </>
    ),
  },
  {
    title: "Hosting",
    body: <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>,
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>
          When you send the inquiry form: your name, email, company or website, the kind of work, the
          field, markets and timeline you choose, the brief you describe, and your WhatsApp number and note if you give them. With it, where your visit began: a referral tag or campaign tags in the link you
          followed, the page that sent you, and the first page you opened.
        </p>
        <p>We use these details only to answer your request, prepare a scope and follow up on it. We do not sell them.</p>
      </>
    ),
  },
  {
    title: "Where it is kept",
    body: (
      <p>
        Inquiries are stored in a Neon Postgres database and delivered by email through Resend, both service providers
        acting on our behalf. They are kept as long as needed to answer and follow up on your request, and deleted
        sooner on request.
      </p>
    ),
  },
  {
    title: "Cookies and trackers",
    body: (
      <p>
        This site sets no cookies and runs no advertising or analytics trackers. Your browser keeps three small
        preferences in its own storage: whether sound is on, whether the intro has played in this session, and where
        your visit began (until you send a form or close the tab). Fonts, images and videos are served from this
        domain.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask to see, correct or delete the details you sent us at any time: write to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. If you are in the European Union or the United Kingdom, you
        can also complain to your data protection authority.
      </p>
    ),
  },
  {
    title: "Content",
    body: (
      <p>
        The projects shown are live systems engineered and operated by {SITE.legalName}; their names and marks belong
        to their respective owners. Facts about each system are taken from its production source code.
      </p>
    ),
  },
];

export default function LegalPage() {
  return (
    <section className="container-k pt-32 pb-24 sm:pt-44 sm:pb-36" aria-labelledby="legal-title">
      <p className="mono text-ink-2">Updated 24 November 2026</p>
      <h1 id="legal-title" className="display mt-6 text-[clamp(3rem,7vw,6rem)]">
        Legal notice &amp; privacy
      </h1>
      <div className="mt-16 border-t border-hairline-strong">
        {SECTIONS.map((s, i) => (
          <div key={s.title} className="grid gap-4 border-b border-hairline-strong py-10 md:grid-cols-12">
            <h2 className="mono text-ink-2 md:col-span-3">
              {String(i + 1).padStart(2, "0")} / {s.title}
            </h2>
            <div className="max-w-[68ch] space-y-4 text-[17px] leading-relaxed md:col-span-8 md:col-start-5 [&_a]:underline [&_a]:underline-offset-2">
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
