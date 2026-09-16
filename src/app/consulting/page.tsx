import type { Metadata } from "next";
import ConsultingContent from "./content";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Market entry, strategic technology, business development, and market-enabler consulting by Violet Global Indonesia.",
};

export default function ConsultingPage() {
  return <ConsultingContent />;
}
