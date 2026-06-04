import blogPagesData from "./blogs.json";
import contentPagesData from "./content-pages.json";
import offerPagesData from "./offers.json";

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

export const offerPages = offerPagesData satisfies OfferPage[];
export const blogPages = blogPagesData satisfies BlogPage[];
export const contentPages = contentPagesData satisfies ContentPage[];

export const allContentSlugs = new Set([
  ...contentPages.map((page) => page.slug),
  ...offerPages.map((page) => `offers/${page.slug}`),
  ...blogPages.map((page) => `blog/${page.slug}`),
]);
