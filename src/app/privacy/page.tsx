import type { Metadata } from "next";
import PrivacyContent from "./content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy notice of PT Violet Global Indonesia.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
