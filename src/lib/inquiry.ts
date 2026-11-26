import { z } from "zod";
import { BLOCKERS, BUDGETS, MARKETS, SECTORS, TIMELINES, TRACK_OPTIONS } from "@/data/site";

/** Free text that may land in a spreadsheet: a leading = + - @ would run as a formula. */
const safeText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v.replace(/^[=+@-]+/, "").trim());

const trackIds = TRACK_OPTIONS.map((t) => t.id) as [string, ...string[]];
const ids = (list: readonly { id: string }[]) => list.map((o) => o.id) as [string, ...string[]];
/** Several choices from a fixed list, each at most once. */
const picks = (list: readonly { id: string }[]) =>
  z
    .array(z.enum(ids(list)))
    .max(list.length)
    .optional()
    .default([])
    .transform((v) => [...new Set(v)]);

export const InquirySchema = z.object({
  name: safeText(120).pipe(z.string().min(1, "Please tell us your name.")),
  email: z.string().trim().max(254).pipe(z.email("Please enter a valid email address.")),
  company: safeText(200).optional().default(""),
  track: z.enum(trackIds).optional().default("unsure"),
  // The form stopped asking on 27 November 2026; an older page may still send one.
  budget: z.enum(BUDGETS).optional(),
  timeline: z.enum(TIMELINES).optional(),
  scope: safeText(5000).pipe(z.string().min(20, "A few sentences on what you want built, please (20 characters or more).")),
  // The detail questions (26 November 2026): all optional, so the form never blocks on them.
  sectors: picks(SECTORS),
  markets: picks(MARKETS),
  blockers: picks(BLOCKERS),
  current: safeText(300).optional().default(""),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s().-]*$/, "Digits, spaces and + only, please.")
    .optional()
    .default(""),
  note: safeText(2000).optional().default(""),
  source: z.enum(["contact", "footer", "drawer"]).optional().default("contact"),
  page: z.string().max(300).optional().default(""),
  /** Honeypot: people never see it, bots fill it. */
  website: z.string().max(500).optional().default(""),
  /** Milliseconds between the form appearing and being sent. */
  elapsed: z.number().optional().default(0),
  attribution: z.record(z.string(), z.string().max(500)).optional().default({}),
});

export type Inquiry = z.infer<typeof InquirySchema>;

export const MIN_FILL_MS = 2500;
