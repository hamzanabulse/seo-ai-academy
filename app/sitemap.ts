import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date() },
    { url: `${siteUrl}/guides`, lastModified: new Date() },
    { url: `${siteUrl}/courses`, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
  ];

  const posts = getBlogPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));

  return [...staticRoutes, ...posts];
}
