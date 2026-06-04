import type { Metadata } from "next";
import "./globals.css";
import { getSiteConfig } from "@/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/images/favicon.ico",
    },
    openGraph: {
      title: siteConfig.ogTitle,
      description: siteConfig.ogDescription,
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.ogTitle,
      description: siteConfig.ogDescription,
      images: [siteConfig.ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
