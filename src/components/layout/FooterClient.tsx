"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow } from "@/components/ui/Icons";
import { useScrollControl } from "./SmoothScroll";

/** The problem in one sentence opens the inquiry form with the brief already started; the email comes last there. */
export function QuickScope() {
  const router = useRouter();
  const [brief, setBrief] = useState("");
  return (
    <form
      className="mt-8 flex h-16 items-center rounded-[14px] bg-surface pr-2 pl-6 shadow-[0_0_0_1px_var(--color-hairline)] focus-within:shadow-[0_0_0_1px_var(--color-ink)]"
      onSubmit={(e) => {
        e.preventDefault();
        const value = brief.trim();
        router.push(value ? `/contact?brief=${encodeURIComponent(value.slice(0, 1000))}#inquiry` : "/contact#inquiry");
      }}
    >
      <label htmlFor="quick-scope" className="sr-only">
        The problem, in one sentence
      </label>
      <input
        id="quick-scope"
        type="text"
        autoComplete="off"
        maxLength={1000}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder="Describe it in a sentence"
        className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-2/70"
      />
      <button
        type="submit"
        aria-label="Continue to the inquiry form"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] transition-colors hover:bg-washi"
      >
        <Arrow className="h-5 w-5" />
      </button>
    </form>
  );
}

export function ScrollTop() {
  const { toTop } = useScrollControl();
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="grid h-12 w-12 place-items-center rounded-full bg-ink text-washi transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Arrow dir="n" className="h-5 w-5" />
    </button>
  );
}
