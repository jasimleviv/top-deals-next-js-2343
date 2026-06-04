import { getRemoteJson } from "./remote";

export type ContentSection = {
  heading: string;
  body: string;
};

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  sections: ContentSection[];
};

export type OfferPage = {
  slug: string;
  title: string;
  category: string;
  rating: string;
  description: string;
  highlights: string[];
  cta: string;
  readMore: string;
  "cta-link": string;
};

export type BlogPage = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  sections: ContentSection[];
};

export function getOfferPages() {
  return getRemoteJson<OfferPage[]>("offers.json");
}

export function getBlogPages() {
  return getRemoteJson<BlogPage[]>("blogs.json");
}

export function getContentPages() {
  return getRemoteJson<ContentPage[]>("content-pages.json");
}

export async function getAllContentSlugs() {
  const [contentPages, offerPages, blogPages] = await Promise.all([
    getContentPages(),
    getOfferPages(),
    getBlogPages(),
  ]);

  return new Set([
    ...contentPages.map((page) => page.slug),
    ...offerPages.map((page) => `offers/${page.slug}`),
    ...blogPages.map((page) => `blog/${page.slug}`),
  ]);
}
