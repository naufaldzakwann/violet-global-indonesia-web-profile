import type { Metadata } from "next";
import TermsContent from "./content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use of the PT Violet Global Indonesia website.",
};

export default function TermsPage() {
  return <TermsContent />;
}
