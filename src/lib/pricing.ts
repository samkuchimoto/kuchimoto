// /src/lib/pricing.ts
// The price of a Thailand booking, in baht, from config/site.ts. The form
// shows it; the booking API recomputes it before charging, so a price
// edited in the browser is never what gets charged.

import { THAILAND_PRICES } from "@/config/site";
import type { BookingService, HomeSize } from "@/lib/forms/options";

export const MAX_AIRCON_UNITS = 10;

/** The amount to pay online, or null for a villa (quoted from photos). */
export function bookingTotal(service: BookingService, size: HomeSize, units: number): number | null {
  switch (service) {
    case "oneOff":
      return THAILAND_PRICES.oneOff[size];
    case "weekly":
      return THAILAND_PRICES.weeklyPerMonth[size];
    case "deepClean":
      return THAILAND_PRICES.deepClean;
    case "aircon":
      return Math.min(Math.max(units, 1), MAX_AIRCON_UNITS) * THAILAND_PRICES.airconPerUnit;
    case "villaCare":
      return THAILAND_PRICES.villaCarePerMonth;
    case "villaQuote":
      return null;
  }
}
