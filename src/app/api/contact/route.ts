// /src/app/api/contact/route.ts
// The contact form, the Canada and United States waiting lists, and Lab
// project requests: one endpoint, emailed to the company.

import { DIVISIONS, FORM_KINDS, PROJECT_TYPES, US_LOCATIONS } from "@/lib/forms/options";
import { deliver, fail, rateLimited, reader, sameOrigin } from "@/lib/forms/server";

const SUBJECT: Record<string, string> = {
  contact: "Nouveau message",
  waitlist: "Liste d'attente",
  project: "Projet Kuchimoto Lab",
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("invalid", 403);
  if (rateLimited(request, "contact")) return fail("rate_limited", 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("invalid", 400);
  }
  const read = reader(form);
  // A bot filled the hidden field: answer as usual, keep nothing.
  if (read.bot()) return Response.json({ ok: true });

  const kind = read.oneOf("kind", FORM_KINDS);
  const division = read.oneOf("division", DIVISIONS);
  const name = read.text("name", 120);
  const email = read.email();
  const invalid: string[] = [];
  if (!kind) invalid.push("kind");
  if (!division) invalid.push("division");
  if (!name) invalid.push("name");
  if (!email) invalid.push("email");
  if (!read.checked("consent")) invalid.push("consent");

  const message = read.text("message", 4000);
  const projectType = read.oneOf("projectType", PROJECT_TYPES);
  const location = read.oneOf("location", US_LOCATIONS);
  const city = read.text("city", 120);
  if ((kind === "contact" || kind === "project") && !message) invalid.push("message");
  if (kind === "project" && !projectType) invalid.push("projectType");
  if (kind === "waitlist" && division === "hh-usa" && !location) invalid.push("location");
  if (kind === "waitlist" && division === "hh-canada" && !city) invalid.push("city");
  if (invalid.length) return fail("invalid", 400, invalid);

  return deliver("contact", {
    subject: `${SUBJECT[kind!]} · ${division}`,
    replyTo: email!,
    rows: [
      ["Type", kind!],
      ["Métier", division!],
      ["Nom", name],
      ["E-mail", email!],
      ["Téléphone", read.text("phone", 40)],
      ["Entreprise", read.text("company", 120)],
      ["Type de projet", projectType ?? ""],
      ["Lieu", location ?? city],
      ["Services", read.list("services", 300)],
      ["Langue", read.text("lang", 2)],
      ["Message", message],
      ["Consentement", "Accepte la politique de confidentialité"],
    ],
  });
}
