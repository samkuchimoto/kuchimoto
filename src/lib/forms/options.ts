// /src/lib/forms/options.ts
// The choices the forms offer, shared by the browser and the API so both
// agree on what is valid. Labels are in the dictionaries.

export const DIVISIONS = ["hh-thailand", "hh-canada", "hh-usa", "bambootails", "lab"] as const;
export type DivisionKey = (typeof DIVISIONS)[number];

export const PROJECT_TYPES = ["consulting", "subcontracting", "testers", "app", "other"] as const;

export const US_LOCATIONS = ["denver", "florida"] as const;

export const FORM_KINDS = ["contact", "waitlist", "project"] as const;
export type FormKind = (typeof FORM_KINDS)[number];

/** Thailand booking: what can be booked, for which home. */
export const BOOKING_SERVICES = ["oneOff", "weekly", "deepClean", "aircon", "villaCare", "villaQuote"] as const;
export type BookingService = (typeof BOOKING_SERVICES)[number];

export const HOME_SIZES = ["studio", "oneBed", "twoBed"] as const;
export type HomeSize = (typeof HOME_SIZES)[number];

export const TIMES = ["morning", "afternoon"] as const;

/** Services the size of the home changes the price of. */
export const SIZED_SERVICES: readonly BookingService[] = ["oneOff", "weekly"];
