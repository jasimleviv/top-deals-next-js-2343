import {
  Benefits,
  Blog,
  Comparison,
  CookieBanner,
  ExitPopup,
  FAQ,
  Footer,
  Header,
  Hero,
  LeadCapture,
  MobileCta,
  MobileNav,
  Offers,
  PressBar,
  Testimonials,
  Ticker,
  Trust,
} from "@/components/sections/Sections";
import { ClientInteractions } from "@/components/ClientInteractions";
import { StructuredData } from "@/components/StructuredData";
import { getStructuredData } from "@/data/site";

export default async function Home() {
  const { webpageJsonLd, faqJsonLd, breadcrumbJsonLd } = await getStructuredData();

  return (
    <>
      <StructuredData data={webpageJsonLd} />
      <StructuredData data={faqJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Header />
      <MobileNav />
      <main>
        <Hero />
        <Ticker />
        <PressBar />
        <Offers />
        <Benefits />
        <Testimonials />
        <Comparison />
        <FAQ />
        <Trust />
        <LeadCapture />
        <Blog />
      </main>
      <Footer />
      <MobileCta />
      <CookieBanner />
      <ExitPopup />
      <ClientInteractions />
    </>
  );
}
