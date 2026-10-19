import { HeroSection } from "@/components/sections/HeroSection";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata(locale, "landing");
}

export default async function LandingPage() {
  return <HeroSection isInitiallyUnlocked={false} />;
}
