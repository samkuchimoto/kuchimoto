import { Hanko } from "@/components/ui/Hanko";

// Three digit strips, each 101 lines (one per value 0 to 100), stepped in
// sync by CSS (globals.css): an odometer that never triggers layout.
const STEPS = Array.from({ length: 101 }, (_, n) => n);
const HUNDREDS = STEPS.map((n) => (n === 100 ? "1" : "")).join("\n");
const TENS = STEPS.map((n) => String(Math.floor(n / 10) % 10)).join("\n");
const ONES = STEPS.map((n) => String(n % 10)).join("\n");

/** First visit of a session only (see the script in app/layout.tsx and the CSS in globals.css). */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-bar">
        <i />
        <b />
      </div>
      <div className="absolute bottom-[0.04em] left-3 leading-none font-light tracking-[-0.05em] text-washi [font-size:clamp(7rem,20vw,17rem)] [font-variant-numeric:tabular-nums] sm:left-6">
        {[HUNDREDS, TENS, ONES].map((strip, i) => (
          <span key={i} className="preloader-digit">
            <span>{strip}</span>
          </span>
        ))}
      </div>
      <div className="absolute right-5 bottom-6 flex items-end gap-3 sm:right-8 sm:bottom-8">
        <span className="mono text-mist">Kuchimoto · クチモト</span>
        <Hanko className="h-10 w-6" />
      </div>
    </div>
  );
}
