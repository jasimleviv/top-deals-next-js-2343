import { getOfferPages } from "@/data/pages";

const categoryFilters = [
  { label: "All Offers", value: "all" },
  { label: "VPN & Security", value: "vpn" },
  { label: "Software", value: "software" },
  { label: "Finance", value: "finance" },
  { label: "Health & Wellness", value: "health" },
  { label: "Featured", value: "featured" },
];

const categoryKeys: Record<string, string> = {
  "VPN & Security": "vpn",
  Software: "software",
  Finance: "finance",
  "Health & Wellness": "health",
  Featured: "featured",
};

function getRatingValue(rating: string) {
  return rating.match(/^\d(?:\.\d)?/)?.[0] ?? "5";
}

function OfferIcon() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5A2.5 2.5 0 1 1 10 4.5L12 7z" />
      <path d="M12 7h4.5A2.5 2.5 0 1 0 14 4.5L12 7z" />
    </svg>
  );
}

export async function Offers() {
  const offerPages = await getOfferPages();

  return (
    <section id="offers" className="section" aria-labelledby="offers-heading">
      <div className="container">
        <div className="section-header fade-in visible">
          <span className="tag">Exclusive Deals</span>
          <h2 className="section-title" id="offers-heading">
            Today's Top Offers
          </h2>
          <p className="section-sub">
            Hand-vetted deals with verified discounts. New offers refreshed every 24 hours.
          </p>
        </div>

        <div className="offers-filter fade-in visible" role="group" aria-label="Filter offers">
          {categoryFilters.map((filter) => (
            <button
              className={`filter-btn${filter.value === "all" ? " active" : ""}`}
              data-filter={filter.value}
              key={filter.value}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="offers-grid" id="offers-grid">
          {offerPages.map((offer, index) => {
            const category = categoryKeys[offer.category] ?? "all";
            const ratingValue = getRatingValue(offer.rating);

            return (
              <article
                className={`offer-card fade-in stagger-${(index % 3) + 1} visible${
                  index === 0 ? " featured" : ""
                }`}
                data-category={category}
                aria-label={`${offer.title} offer`}
                key={offer.slug}
              >
                {index === 0 && <span className="offer-badge hot">Hot</span>}
                <div className="offer-img">
                  <OfferIcon />
                </div>
                <div className="offer-body">
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-desc">{offer.description}</p>
                  <div className="offer-stars">
                    <span className="stars" aria-label={`${ratingValue} out of 5 stars`}>
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </span>
                    <span className="offer-rating-text">{offer.rating}</span>
                  </div>
                  <div className="offer-meta">
                    {offer.highlights.slice(0, 3).map((highlight) => (
                      <span className="meta-tag" key={highlight}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="offer-actions">
                    <a
                      href={offer["cta-link"]}
                      className="offer-cta"
                      aria-label={`${offer.cta} for ${offer.title}`}
                    >
                      {offer.cta}
                    </a>
                    <a
                      href={`/offers/${offer.slug}`}
                      className="offer-read-more"
                      aria-label={`${offer.readMore} about ${offer.title}`}
                    >
                      {offer.readMore}
                    </a>
                  </div>
                </div>
                <div className="offer-trust">
                  <span>SSL Secured</span>
                  <span>Verified Offer</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
