import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentShell } from "@/components/layout/ContentShell";
import { contentPages } from "@/data/pages";
import { siteConfig } from "@/data/site";

type GenericPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return contentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: GenericPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = contentPages.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: `${page.title} | ${siteConfig.name}`,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function GenericContentPage({ params }: GenericPageProps) {
  const { slug } = await params;
  const page = contentPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <ContentShell title={page.title} description={page.description}>
      {page.sections.map((section) => (
        <section className="content-section" key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}
    </ContentShell>
  );
}
