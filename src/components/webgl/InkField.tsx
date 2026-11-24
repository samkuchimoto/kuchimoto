"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { canRun3D, isLowPower, useInView } from "./useInView";

const InkScene = dynamic(() => import("./InkScene"), { ssr: false });

/** Loads the particle field when its section comes near, renders it only while visible. */
export function InkField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, "600px");
  const visible = useInView(ref, "0px");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!near || count !== null || !canRun3D()) return;
    // The section has come near: decide once, then mount the scene.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(isLowPower() ? 1100 : 2800);
  }, [near, count]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* Without WebGL: a still mist. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, rgb(239 228 210 / 0.07), transparent 70%), radial-gradient(50% 40% at 75% 65%, rgb(207 210 214 / 0.06), transparent 70%)",
        }}
      />
      {count !== null && <InkScene active={visible} count={count} />}
    </div>
  );
}
