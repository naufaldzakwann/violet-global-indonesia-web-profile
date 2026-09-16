import type { Metadata } from "next";
import CybersecurityContent from "./content";

export const metadata: Metadata = {
  title: "Cybersecurity",
  description:
    "AI-powered penetration testing, exploit research, SOC 24/7, incident response, and enterprise security infrastructure by Violet Global Indonesia.",
};

export default function CybersecurityPage() {
  return <CybersecurityContent />;
}
