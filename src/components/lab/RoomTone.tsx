"use client";

import { useAudio } from "@/components/audio/AudioEngine";

/** The site's room tone, on or off: the same switch as the waveform pill in the header. */
export function RoomTone() {
  const { enabled, toggle } = useAudio();
  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        className={`flex w-full items-center justify-between gap-6 rounded-[var(--radius-card)] px-7 py-8 text-left transition-colors duration-500 sm:px-9 sm:py-10 ${
          enabled ? "bg-washi text-ink" : "bg-sumi-2 text-washi shadow-[0_0_0_1px_var(--color-hairline-dark)] hover:bg-[#1d1d20]"
        }`}
      >
        <span>
          <span className="block text-[clamp(1.6rem,3vw,2.4rem)] leading-none font-light tracking-[-0.03em]">
            {enabled ? "Room tone on" : "Room tone off"}
          </span>
          <span className={`mono mt-3 block ${enabled ? "text-ink-2" : "text-washi/50"}`}>
            {enabled ? "Press to fade it out" : "Press to fade it in"}
          </span>
        </span>
        {enabled ? (
          <span className="wave flex h-6 items-center gap-[4px]" data-on="true" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span className="block h-[1.5px] w-6 rounded-full bg-current" aria-hidden="true" />
        )}
      </button>
      <p className="mono mt-4 text-washi/50">Pink noise · Two filtered bands · Slow oscillators · Fades in over 1.2 s</p>
    </div>
  );
}
