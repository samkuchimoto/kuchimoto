import Link from "next/link";
import { Arrow } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="container-k flex min-h-[80vh] flex-col justify-end pt-40 pb-20">
      <p className="mono text-ink-2">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3.2rem,9vw,8rem)]">
        This joint
        <br />
        was never cut.
      </h1>
      <p className="mt-8 max-w-[44ch] text-lg text-ink-2">The page you asked for does not exist. Everything we have built is one click away.</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/" className="mono-12 inline-flex items-center gap-2 font-medium">
          Home <Arrow className="h-4 w-4" />
        </Link>
        <Link href="/work" className="mono-12 inline-flex items-center gap-2 font-medium">
          Work <Arrow className="h-4 w-4" />
        </Link>
        <Link href="/contact" className="mono-12 inline-flex items-center gap-2 font-medium">
          Inquire <Arrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
