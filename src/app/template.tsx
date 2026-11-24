"use client";

import { useEffect } from "react";

// A template remounts on every navigation. The first page of a visit
// renders as is (the preloader already introduces it); every page reached
// by a link after that rises in.
let firstRenderDone = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = firstRenderDone;
  useEffect(() => {
    firstRenderDone = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
