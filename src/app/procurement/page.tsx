import type { Metadata } from "next";
import ProcurementContent from "./content";

export const metadata: Metadata = {
  title: "Procurement",
  description:
    "Professional IT procurement services — hardware, software, security appliances, network, servers, and licensing by Violet Global Indonesia.",
};

export default function ProcurementPage() {
  return <ProcurementContent />;
}
