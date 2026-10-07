import { HeroSection } from "@/components/sections/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Violet Global Indonesia — Digital Solution",
  description: "Violet Global Indonesia — Solusi IT dan digital terlengkap untuk bisnis Anda.",
};

export default async function LandingPage() {
  return <HeroSection isInitiallyUnlocked={false} />;
}
