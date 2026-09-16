import type { Metadata } from "next";
import PlatformsContent from "./content";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Narativa-X social intelligence, blockchain analytics, and enterprise automation — AI platforms by Violet Global Indonesia.",
};

export default function PlatformsPage() {
  return <PlatformsContent />;
}
