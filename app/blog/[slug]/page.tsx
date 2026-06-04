import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentShell } from "@/components/layout/ContentShell";
import { getBlogPages } from "@/data/pages";
import { getSiteConfig } from "@/data/site";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogPages = await getBlogPages();

  return blogPages.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [blogPages, siteConfig] = await Promise.all([getBlogPages(), getSiteConfig()]);
  const post = blogPages.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blogPages = await getBlogPages();
  const post = blogPages.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <ContentShell eyebrow={post.category} title={post.title} description={post.description}>
      <div className="detail-meta">
        {post.date} · {post.readTime}
      </div>
      {post.sections.map((section) => (
        <section className="content-section" key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}
    </ContentShell>
  );
}
