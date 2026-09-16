import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { img } from "@/lib/site";

export const metadata: Metadata = {
  title: "Procurement",
  description:
    "Professional IT procurement services — hardware, software, security appliances, network, servers, and licensing by Violet Global Indonesia.",
};

const cats: Array<[string, string, string]> = [
  ["01", "Hardware & Software", "End-to-end sourcing with genuine licensing and warranty discipline."],
  ["02", "Security Appliances", "Firewalls, IDS/IPS, EDR, SIEM appliances, and HSMs."],
  ["03", "Network Infrastructure", "Switching, routing, wireless, structured cabling at enterprise grade."],
  ["04", "Servers & Storage", "Compute, storage, backup, hyperconverged platforms."],
  ["05", "Licensing", "Lifecycle management for renewals, true-ups, compliance."],
];

export default function ProcurementPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Procurement"
        title="Specified right,"
        accent="delivered clean."
        lede="Professional procurement for IT infrastructure and security — specified correctly, sourced genuinely, documented completely."
        image={img.industrial}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          Request quotation <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="border-t border-white/12">
            {cats.map(([no, t, d], i) => (
              <Reveal key={no} delay={Math.min(i * 0.04, 0.15)}>
                <div className="index-row grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/12 py-7 md:grid-cols-[80px_1fr_1fr] md:gap-10">
                  <span className="font-tech text-xs text-violet-400">{no}</span>
                  <span className="font-display text-2xl uppercase tracking-wide text-[#f4f1eb] md:text-4xl">{t}</span>
                  <span className="col-span-2 leading-7 text-white/55 md:col-span-1">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading index="02" eyebrow="How we run it" title="BoQ to" accent="BAST." lede="Requirements & specification → vendor evaluation → commercial proposal → delivery, installation & handover → warranty support." />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                Send your BoQ / RFP <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="scan relative aspect-[16/10] overflow-hidden">
                <Image src={img.engineer} alt="Engineer commissioning infrastructure" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
              </div>
              <p className="font-tech mt-5 text-[11px] uppercase leading-6 tracking-[0.18em] text-white/45">
                Ecosystem — ISP: Telkom · Biznet · CBN · FirstMedia / DC: DCI · NTT · Equinix / Cloud: AWS · GCP · Alibaba
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
