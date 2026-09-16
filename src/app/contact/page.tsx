import type { Metadata } from "next";
import ContactContent from "./content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PT Violet Global Indonesia — Jakarta Barat. Intelligence, cybersecurity, consulting, and green-energy inquiries.",
};

export default function ContactPage() {
  return <ContactContent />;
}
