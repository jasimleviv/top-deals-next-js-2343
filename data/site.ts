import { getRemoteJson } from "./remote";

export type SiteConfig = {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export type SiteData = {
  siteConfig: SiteConfig;
  navigationLinks: unknown[];
  breadcrumbs: unknown[];
  webpageJsonLd: Record<string, unknown>;
  faqJsonLd: Record<string, unknown>;
  breadcrumbJsonLd: Record<string, unknown>;
};

export function getSiteData() {
  return getRemoteJson<SiteData>("site.json");
}

export async function getSiteConfig() {
  return (await getSiteData()).siteConfig;
}

export async function getStructuredData() {
  const siteData = await getSiteData();

  return {
    webpageJsonLd: siteData.webpageJsonLd,
    faqJsonLd: siteData.faqJsonLd,
    breadcrumbJsonLd: siteData.breadcrumbJsonLd,
  };
}
