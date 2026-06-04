import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/data/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const siteConfig = await getSiteConfig();

  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080b14",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/images/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
