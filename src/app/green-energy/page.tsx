import type { Metadata } from "next";
import GreenEnergyContent from "./content";

export const metadata: Metadata = {
  title: "Green Energy",
  description:
    "Technology-enabled green and renewable energy: waste-to-energy, solar PV, biogas, and circular-economy infrastructure by Violet Global Indonesia.",
};

export default function GreenEnergyPage() {
  return <GreenEnergyContent />;
}
