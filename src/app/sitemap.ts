import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-24");
  const pages = ["", "/work", "/consulting", "/studio", "/lab", "/contact", "/legal"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    priority: path === "" ? 1 : path === "/legal" ? 0.2 : 0.8,
  }));
  const work = PROJECTS.map((p) => ({ url: `${SITE.url}/work/${p.slug}`, lastModified: now, priority: 0.7 }));
  return [...pages, ...work];
}
