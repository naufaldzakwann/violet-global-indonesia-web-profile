import type { Metadata } from "next";
import AboutContent from "./content";

export const metadata: Metadata = {
  title: "About",
  description:
    "PT Violet Global Indonesia — deep-tech company and digital transformation consultant for AI, digital intelligence, cybersecurity, and sustainable infrastructure.",
};

export default function AboutPage() {
  return <AboutContent />;
}
