import { Hanko } from "@/components/ui/Hanko";

// An odometer from 24 short lines of text, stepped by CSS (globals.css):
// the ones strip (0 to 9, then 0) turns ten times while the tens strip
// turns once, and the hundreds strip shows its 1 on the last frame. 00 to
// 100 in 0.6 s, transform-only, with almost nothing for the first layout
// to measure.
const TURN = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0";

/** First visit of a session only (see the script in app/layout.tsx and the CSS in globals.css). */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-bar">
        <i />
        <b />
      </div>
      <div className="absolute bottom-[0.04em] left-3 leading-none font-light tracking-[-0.05em] text-washi [font-size:clamp(7rem,20vw,17rem)] [font-variant-numeric:tabular-nums] sm:left-6">
        <span className="preloader-digit">
          <span className="pl-hundreds">{"\n1"}</span>
        </span>
        <span className="preloader-digit">
          <span className="pl-tens">{TURN}</span>
        </span>
        <span className="preloader-digit">
          <span className="pl-ones">{TURN}</span>
        </span>
      </div>
      <div className="absolute right-5 bottom-6 flex items-end gap-3 sm:right-8 sm:bottom-8">
        <span className="mono text-mist">Kuchimoto</span>
        <Hanko className="h-10 w-6" />
      </div>
    </div>
  );
}
