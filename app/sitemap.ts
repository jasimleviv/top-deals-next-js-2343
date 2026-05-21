import type { MetadataRoute } from "next";
import { blogPages, contentPages, offerPages } from "@/data/pages";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const contentRoutes = contentPages.map((page) => ({
    url: `${siteConfig.url}/${page.slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const offerRoutes = offerPages.map((offer) => ({
    url: `${siteConfig.url}/offers/${offer.slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogPages.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...contentRoutes, ...offerRoutes, ...blogRoutes];
}
