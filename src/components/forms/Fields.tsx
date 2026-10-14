// /src/components/forms/Fields.tsx
// Form building blocks: a labelled field whose hint and error are wired
// to screen readers, the hidden honeypot, checkboxes and the status line.

import type { ReactNode } from "react";

export const inputClass =
  "block w-full border border-field bg-paper px-3.5 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-ink focus:outline-none aria-[invalid=true]:border-danger";

export type ControlProps = { id: string; name: string; "aria-describedby"?: string; "aria-invalid"?: true };

export function Field({
  name,
  label,
  hint,
  optional,
  error,
  className = "",
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  /** "optional" in the page's language, for fields that are not required. */
  optional?: string;
  error?: string;
  className?: string;
  children: (control: ControlProps) => ReactNode;
}) {
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-ink-soft"> ({optional})</span>}
      </label>
      <div className="mt-2">
        {children({ id, name, "aria-describedby": describedBy, ...(error && { "aria-invalid": true as const }) })}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden from people and screen readers; the API ignores whatever fills it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function Checkbox({
  name,
  value = "yes",
  required,
  error,
  children,
}: {
  name: string;
  value?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name={name}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink)]"
        />
        <span>{children}</span>
      </label>
      {error && <p className="mt-1.5 pl-8 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}

export function Status({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`border-l-2 px-4 py-3 text-sm ${
        tone === "error" ? "border-danger bg-washi text-danger" : "border-hh bg-hh-wash text-ink"
      }`}
    >
      {children}
    </p>
  );
}
