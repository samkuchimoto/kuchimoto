"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { Arrow } from "@/components/ui/Icons";
import { useScrollControl } from "./SmoothScroll";

/** An email opens the inquiry form with the address already filled in. */
export function QuickScope() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  return (
    <form
      className="mt-8 flex h-16 items-center rounded-[14px] bg-surface pr-2 pl-6 shadow-[0_0_0_1px_var(--color-hairline)] focus-within:shadow-[0_0_0_1px_var(--color-ink)]"
      onSubmit={(e) => {
        e.preventDefault();
        const value = email.trim();
        router.push(value ? `/contact?email=${encodeURIComponent(value)}#inquiry` : "/contact#inquiry");
      }}
    >
      <label htmlFor="quick-scope" className="sr-only">
        Your email
      </label>
      <input
        id="quick-scope"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to request a scope"
        className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-2/70"
      />
      <button
        type="submit"
        aria-label="Request a scope"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] transition-colors hover:bg-washi"
      >
        <Arrow className="h-5 w-5" />
      </button>
    </form>
  );
}

export function ScrollTop() {
  const { toTop } = useScrollControl();
  const audio = useAudio();
  return (
    <button
      type="button"
      onClick={() => {
        audio.chime(0);
        toTop();
      }}
      aria-label="Back to top"
      className="grid h-12 w-12 place-items-center rounded-full bg-ink text-washi transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Arrow dir="n" className="h-5 w-5" />
    </button>
  );
}
