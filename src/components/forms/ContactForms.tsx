// /src/components/forms/ContactForms.tsx
// The Contact page's forms: choose the business first, preselected from
// ?business=lab, studio, happy-homes or bambootails. Kuchimoto Lab and
// Kuchimoto Studio requests go through the lead pipeline (LeadForm, then
// the thank-you page); the others keep the contact form.

"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { DIVISIONS, type DivisionKey } from "@/lib/forms/options";
import { Field, inputClass } from "./Fields";
import { InquiryForm } from "./InquiryForm";
import { LeadForm, type LeadFormProps } from "./LeadForm";

type Business = DivisionKey | "studio";

const FROM_PARAM: Record<string, Business> = {
  lab: "lab",
  studio: "studio",
  "happy-homes": "hh-thailand",
  bambootails: "bambootails",
};

type Props = {
  lang: Locale;
  forms: Dictionary["forms"];
  studioLabel: string;
  privacyHref: string;
  contactEmail: string;
  lead: Omit<LeadFormProps, "id" | "role" | "source" | "business" | "preset">;
};

function Forms({ initial, lang, forms, studioLabel, privacyHref, contactEmail, lead }: Props & { initial: Business | "" }) {
  const [business, setBusiness] = useState<Business | "">(initial);
  const options: [Business, string][] = [...DIVISIONS.map((key): [Business, string] => [key, forms.divisions[key]]), ["studio", studioLabel]];

  return (
    <div className="space-y-8">
      <Field name="business" label={forms.division}>
        {(control) => (
          <select
            {...control}
            value={business}
            onChange={(event) => setBusiness(event.target.value as Business)}
            className={inputClass}
          >
            <option value="" disabled>
              {forms.divisionChoose}
            </option>
            {options.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        )}
      </Field>

      {business === "lab" || business === "studio" ? (
        <LeadForm
          key={business}
          {...lead}
          id="lead-contact"
          role="final"
          source="contact"
          business={business}
          preset={business === "studio" ? "creative" : "agent"}
          accentClass="bg-ink"
        />
      ) : business ? (
        <InquiryForm
          key={business}
          kind="contact"
          division={business}
          lang={lang}
          t={forms}
          privacyHref={privacyHref}
          contactEmail={contactEmail}
        />
      ) : null}
    </div>
  );
}

function FromUrl(props: Props) {
  const param = useSearchParams().get("business") ?? "";
  return <Forms {...props} initial={FROM_PARAM[param] ?? ""} />;
}

export function ContactForms(props: Props) {
  // The page is static: the query string is read in the browser.
  return (
    <Suspense fallback={<Forms {...props} initial="" />}>
      <FromUrl {...props} />
    </Suspense>
  );
}
