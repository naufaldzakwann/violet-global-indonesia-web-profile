import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CTASection } from "@/components/sections/CTASection";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata(locale, "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="home-atmosphere">
      <HeroSection isInitiallyUnlocked={true} />
      
      {/* 
        Ultra-Subtle Grid Pattern Overlay (Motif Bleeding)
        Using scoped CSS to inject a borderline invisible architectural blueprint 
        over the distinct background colors of the sections underneath.
      */}
      <div className="relative subtle-grid-theme home-atmosphere-sections">
        <style dangerouslySetInnerHTML={{ __html: `
          html[data-theme="light"] .subtle-grid-theme section {
            background-image: 
              linear-gradient(rgba(124, 58, 237, 0.025) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(124, 58, 237, 0.025) 1px, transparent 1px) !important;
            background-size: 80px 80px !important;
            background-position: center top !important;
          }

          html[data-theme="dark"] .subtle-grid-theme section {
            background-image: 
              none !important;
          }
        `}} />

        <ServicesSection limit={6} locale={locale} />
        <WhyUsSection />
        <PortfolioSection limit={4} locale={locale} />
        <ClientsSection />
      </div>
      
      <CTASection />
    </main>
  );
}
