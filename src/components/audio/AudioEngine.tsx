"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SoundEngine } from "./engine";

// Sound is off by default. Turned on, the preference is kept in
// localStorage; on the next visit the ambience starts with the visitor's
// first click or key press (browsers allow no sound before that). The
// AudioContext is created inside that gesture, synchronously, which Safari
// requires.

const KEY = "kuchimoto:sound";

type Audio = {
  /** The visitor wants sound. */
  enabled: boolean;
  /** Sound is on but waits for the visitor's first tap or key (a returning visitor): nothing plays yet. */
  armed: boolean;
  toggle: () => void;
  /** Hover: a muted wooden tap. Only when sound is on. */
  tap: () => void;
  /** The 3D sculpture struck or closing: a knock. Only when sound is on. */
  knock: () => void;
  /** Lower the ambience while another sound plays (true), bring it back (false). */
  duck: (on: boolean) => void;
};

const AudioContextReact = createContext<Audio | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false);
  const engine = useRef<SoundEngine | null>(null);
  const enabledRef = useRef(false);

  const getEngine = useCallback(() => {
    engine.current ??= new SoundEngine();
    return engine.current;
  }, []);

  const apply = useCallback(
    (on: boolean) => {
      enabledRef.current = on;
      setEnabled(on);
      setArmed(false);
      try {
        localStorage.setItem(KEY, on ? "on" : "off");
      } catch {
        // Private mode: the choice lasts for this page only.
      }
      if (on) void getEngine().enable();
      else engine.current?.disable();
    },
    [getEngine],
  );

  // A returning visitor who left sound on: arm it, start on the first gesture.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      return;
    }
    if (stored !== "on") return;
    enabledRef.current = true;
    // Reading a stored preference after hydration is a sync from outside React.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    setArmed(true);
    const start = () => {
      setArmed(false);
      if (enabledRef.current) void getEngine().enable();
    };
    window.addEventListener("pointerdown", start, { once: true, capture: true });
    window.addEventListener("keydown", start, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", start, { capture: true });
      window.removeEventListener("keydown", start, { capture: true });
    };
  }, [getEngine]);

  useEffect(() => () => engine.current?.close(), []);

  const value = useMemo<Audio>(() => {
    const live = () => enabledRef.current && engine.current?.ctx.state === "running";
    return {
      enabled,
      armed,
      toggle: () => apply(!enabledRef.current),
      tap: () => {
        if (live()) engine.current!.tap();
      },
      knock: () => {
        if (live()) engine.current!.knock();
      },
      duck: (on: boolean) => engine.current?.duck(on),
    };
  }, [enabled, armed, apply]);

  return <AudioContextReact.Provider value={value}>{children}</AudioContextReact.Provider>;
}

export function useAudio(): Audio {
  const value = useContext(AudioContextReact);
  if (!value) throw new Error("useAudio must be used inside <AudioProvider>");
  return value;
}
