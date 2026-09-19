import type { Metadata } from "next";
import RegenxContent from "./content";

export const metadata: Metadata = {
  title: "E3i RegenX — Plastics-to-Fuel",
  description:
    "E3i RegenX by Violet Global Indonesia: converting hard-to-recycle plastics into diesel-equivalent liquid fuel — 20 metric tons per day, two-module facility in Banyumas, Central Java.",
};

export default function RegenxPage() {
  return <RegenxContent />;
}
