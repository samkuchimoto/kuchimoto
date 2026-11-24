import type { NextConfig } from "next";

// Sent with every page. Vercel adds HSTS on the domains.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// The previous site (French at the root, English under /en, Japanese under
// /ja) had pages that no longer exist. Each old address lands on its
// closest page today, so shared links and search results keep working.
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/:lang(en|ja)", destination: "/" },
  { source: "/:lang(en|ja)?/happy-homes/:path*", destination: "https://halohappyhomes.com" },
  { source: "/:lang(en|ja)?/happy-homes", destination: "https://halohappyhomes.com" },
  { source: "/:lang(en|ja)?/bambootails", destination: "https://bambootails.com" },
  { source: "/:lang(en|ja)?/a-propos", destination: "/studio" },
  { source: "/:lang(en|ja)?/demo-triage", destination: "/lab" },
  { source: "/:lang(en|ja)?/pay/:path*", destination: "/contact" },
  { source: "/:lang(en|ja)?/payment-success", destination: "/contact" },
  { source: "/:lang(en|ja)?/merci", destination: "/contact" },
  { source: "/:lang(en|ja)?/thank-you", destination: "/contact" },
  { source: "/:lang(en|ja)?/mentions-legales", destination: "/legal" },
  { source: "/:lang(en|ja)?/cgv", destination: "/legal" },
  { source: "/:lang(en|ja)?/confidentialite", destination: "/legal" },
  { source: "/privacy", destination: "/legal" },
  { source: "/projects", destination: "/work" },
  { source: "/:lang(en|ja)/:path*", destination: "/:path*" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 80] },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
