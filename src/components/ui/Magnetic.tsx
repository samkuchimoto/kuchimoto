"use client";

import { useRef } from "react";

/** Leans toward the cursor while hovered and eases back on leave (a CSS transition does the spring). */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ease-[var(--ease-out-expo)] ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (e.pointerType !== "mouse" || !el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength * 1.2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
