import { Cross } from "./Icons";

/** A row of hairline + marks, evenly spaced along a frame's edge. */
export function Registration({
  count = 5,
  className = "",
  tone = "text-ink",
}: {
  count?: number;
  className?: string;
  tone?: string;
}) {
  return (
    <div className={`pointer-events-none flex justify-between ${tone} ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Cross key={i} className="-mx-[6.5px] h-[13px] w-[13px]" />
      ))}
    </div>
  );
}
