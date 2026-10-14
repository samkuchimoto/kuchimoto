import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/happy-homes/thailande/merci", "/en/happy-homes/thailande/merci"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
