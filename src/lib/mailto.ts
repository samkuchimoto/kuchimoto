// /src/lib/mailto.ts
// A link that opens the visitor's email app on a message to us, with the
// subject and the first lines already written: one click from an offer
// to a request.

import { CONTACT } from "@/config/site";

export function mailto({ subject, body }: { subject: string; body?: string }): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  // Mail apps expect CRLF line breaks in a mailto body (RFC 6068).
  if (body) params.push(`body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`);
  return `mailto:${CONTACT.email}?${params.join("&")}`;
}
