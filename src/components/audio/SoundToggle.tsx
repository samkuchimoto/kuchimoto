"use client";

import { useState } from "react";
import { useAudio } from "./AudioEngine";

const HINT_KEY = "kuchimoto:sound-hint";

/** The 40 px pill: three breathing bars when on, a dash when muted. */
export function SoundToggle() {
  const { enabled, toggle } = useAudio();
  const [hint, setHint] = useState(false);

  const showHintOnce = () => {
    try {
      if (localStorage.getItem(HINT_KEY)) return;
      localStorage.setItem(HINT_KEY, "1");
    } catch {
      return;
    }
    setHint(true);
    setTimeout(() => setHint(false), 2600);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        onPointerEnter={showHintOnce}
        aria-pressed={enabled}
        aria-label={enabled ? "Sound on: ambient. Turn off" : "Sound off. Turn on ambient sound"}
        className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shadow-[0_0_0_1px_var(--color-hairline)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {enabled ? (
          <span className="wave flex h-4 items-center gap-[3px]" data-on="true" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span className="block h-[1.5px] w-4 rounded-full bg-ink" aria-hidden="true" />
        )}
      </button>
      <span
        role="status"
        className={`mono pointer-events-none absolute top-1/2 right-[calc(100%+10px)] -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-washi transition-all duration-500 ${
          hint ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        {hint ? "Sound: Ambient" : ""}
      </span>
    </div>
  );
}
