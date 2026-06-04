import type { MetadataRoute } from "next";
import { getBlogPages, getContentPages, getOfferPages } from "@/data/pages";
import { getSiteConfig } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPages, contentPages, offerPages, siteConfig] = await Promise.all([
    getBlogPages(),
    getContentPages(),
    getOfferPages(),
    getSiteConfig(),
  ]);

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
