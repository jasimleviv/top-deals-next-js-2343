import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentShell } from "@/components/layout/ContentShell";
import { offerPages } from "@/data/pages";
import { siteConfig } from "@/data/site";

type OfferPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return offerPages.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = offerPages.find((item) => item.slug === slug);
  if (!offer) return {};

  return {
    title: `${offer.title} | ${siteConfig.name}`,
    description: offer.description,
    alternates: { canonical: `/offers/${offer.slug}` },
  };
}

export default async function OfferDetailPage({ params }: OfferPageProps) {
  const { slug } = await params;
  const offer = offerPages.find((item) => item.slug === slug);
  if (!offer) notFound();

  return (
    <ContentShell eyebrow={offer.category} title={offer.title} description={offer.description}>
      <div className="detail-card">
        <div className="detail-meta">Rating: {offer.rating}</div>
        <ul className="detail-list">
          {offer.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <a href={offer["cta-link"]} className="btn btn-primary btn-lg">
          {offer.cta}
        </a>
      </div>
    </ContentShell>
  );
}
