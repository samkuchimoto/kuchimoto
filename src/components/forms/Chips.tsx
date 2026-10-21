// /src/components/forms/Chips.tsx
// A single choice shown as tappable chips: radio inputs underneath, so the
// arrow keys, screen readers and form data all work as usual. The radios
// are visually hidden; the chip next to each one shows its state and its
// keyboard focus.

"use client";

export function Chips<T extends string>({
  id,
  name,
  legend,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  /** Unique on the page: two lead forms can share one. */
  id: string;
  name: string;
  legend: string;
  options: readonly (readonly [T, string])[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
  /** "optional" in the page's language, when no choice is needed. */
  optional?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="text-sm font-medium">
        {legend}
        {optional && <span className="font-normal text-ink-soft"> ({optional})</span>}
      </legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map(([key, label]) => (
          <label key={key} className="relative">
            <input
              type="radio"
              name={name}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            <span
              className={`inline-flex min-h-10 items-center border px-3 py-1.5 text-sm sm:min-h-11 sm:px-3.5 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-hover:border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                error ? "border-danger" : "border-field"
              }`}
            >
              {label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
