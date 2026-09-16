import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/Section";
import { img } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platforms",
  description:
    "Narativa-X social intelligence, blockchain analytics, and enterprise automation — AI platforms by Violet Global Indonesia.",
};

const platforms = [
  {
    no: "01",
    name: "Narativa-X",
    tag: "Social Media Intelligence",
    desc: "An AI media-intelligence platform for monitoring, analyzing, and responding to public conversations — built for institutions that must understand narrative risk early.",
    image: img.narativa,
    capabilities: [
      "Multi-platform monitoring: social, news portals, dark web",
      "AI sentiment analysis with Indonesian language support",
      "Early detection of misinformation & negative campaigns",
      "Network mapping & key-actor identification",
      "Real-time dashboard & automated reporting",
    ],
    cases: "Policy sentiment tracking · reputation defense · amplification-network mapping · daily narrative briefs",
  },
  {
    no: "02",
    name: "Blockchain Analytics",
    tag: "Intelligence & Compliance",
    desc: "Blockchain analytics for transaction monitoring, forensic investigation, and regulatory compliance — for FIUs, exchanges, banks, and law enforcement.",
    image: img.blockchain,
    capabilities: [
      "Real-time multi-blockchain transaction monitoring",
      "Network analysis & wallet clustering",
      "Suspicious-activity detection: laundering, fraud",
      "Forensic tooling with court-ready evidence",
      "Integration with i2 Analyst Notebook",
    ],
    cases: "AML/KYC screening · fund-flow tracing · STR-ready exports · VASP supervision",
  },
  {
    no: "03",
    name: "Enterprise Automation",
    tag: "Secure Operations Platform",
    desc: "A secure, scalable automation platform for enterprise communications — large account fleets, engagement, amplification, and reporting from one dashboard.",
    image: img.automation,
    capabilities: [
      "Tens of thousands of accounts from one dashboard",
      "Smart engagement with natural patterns",
      "Video & live-stream amplification",
      "Growth & engagement ROI analytics",
      "Automated bulk content reporting",
    ],
    cases: "Public communications · launches · distributed-team governance · takedown workflows",
  },
];

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Platforms"
        title="Production-grade"
        accent="AI platforms."
        lede="Social intelligence, blockchain analytics, and enterprise automation — deployable on-premise or in sovereign cloud, with Indonesian-language AI at the core."
        image={img.matrix}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          Request a demo <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] space-y-24 px-5 py-24 md:px-10 md:py-32">
          {platforms.map((p, i) => (
            <div key={p.no} className={`grid items-start gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <Link href="/contact" className="work-card group block" aria-label={`${p.name} — request demo`}>
                  <div className="scan relative aspect-[16/11] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
                    <span className="font-display absolute left-5 top-4 text-6xl text-white/25 transition-colors group-hover:text-violet-300">{p.no}</span>
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={0.08}>
                <Eyebrow>{p.tag}</Eyebrow>
                <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] tracking-wide text-[#f4f1eb] md:text-6xl">{p.name}</h2>
                <p className="mt-5 max-w-xl leading-7 text-white/60">{p.desc}</p>
                <ul className="mt-7 space-y-3 border-t border-white/12 pt-7">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] leading-6 text-white/70">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /> {c}
                    </li>
                  ))}
                </ul>
                <p className="font-tech mt-7 text-[11px] uppercase leading-6 tracking-[0.18em] text-violet-300/90">
                  Use cases — {p.cases}
                </p>
              </Reveal>
            </div>
          ))}

          <Reveal>
            <div className="noise relative overflow-hidden border border-white/12 bg-gradient-to-br from-violet-800 via-[#3b1d7a] to-[#150d2b] p-8 md:p-12">
              <SectionHeading eyebrow="Deployment" title="On-premise or" accent="sovereign cloud." lede="Role-based access, audit logs, retention controls, analyst onboarding, and 24/7 support — scoped in a fixed-price pilot." />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#0a0a0b] hover:text-white">
                Scope your pilot <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
