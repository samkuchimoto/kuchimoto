"use client";

import { AudioProvider } from "@/components/audio/AudioEngine";
import { Attribution } from "./Attribution";
import { RevealObserver } from "./RevealObserver";
import { RouteCurtain } from "./RouteCurtain";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <SmoothScroll>
        <Attribution />
        <RevealObserver />
        {children}
        <RouteCurtain />
      </SmoothScroll>
    </AudioProvider>
  );
}
