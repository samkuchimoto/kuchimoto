"use client";

import { useState } from "react";
import { useAudio } from "@/components/audio/AudioEngine";

const NOTES = [
  { name: "D", octave: "5", hz: "587.33" },
  { name: "E", octave: "5", hz: "659.25" },
  { name: "G", octave: "5", hz: "783.99" },
  { name: "A", octave: "5", hz: "880.00" },
  { name: "B", octave: "5", hz: "987.77" },
];

/** Five bells on the Yo scale. Each press plays, even with the ambience off. */
export function SoundPad() {
  const audio = useAudio();
  const [struck, setStruck] = useState<number | null>(null);
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {NOTES.map((n, i) => (
          <button
            key={n.name}
            type="button"
            onPointerDown={(e) => {
              if (e.pointerType === "mouse" && e.button !== 0) return;
              audio.play(i);
              setStruck(i);
              window.setTimeout(() => setStruck((s) => (s === i ? null : s)), 420);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              audio.play(i);
              setStruck(i);
              window.setTimeout(() => setStruck((s) => (s === i ? null : s)), 420);
            }}
            aria-label={`Play ${n.name}${n.octave}`}
            className={`relative flex aspect-[3/5] flex-col justify-between rounded-[14px] p-3 text-left transition-all duration-300 sm:p-4 ${
              struck === i ? "scale-[0.97] bg-washi text-ink" : "bg-sumi-2 text-washi shadow-[0_0_0_1px_var(--color-hairline-dark)] hover:bg-[#1d1d20]"
            }`}
          >
            <span className="text-[clamp(1.6rem,4vw,3rem)] leading-none font-light">{n.name}</span>
            <span className={`mono ${struck === i ? "text-ink-2" : "text-washi/50"}`}>
              {n.name}
              {n.octave} · {n.hz}
            </span>
            {struck === i && <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-vermilion" />}
          </button>
        ))}
      </div>
      <p className="mono mt-4 text-washi/50">Press a bell · Sine partials 1 : 2 : 3.01 : 4.17 · Convolution reverb</p>
    </div>
  );
}
