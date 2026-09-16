import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Market entry, strategic technology, business development, and market-enabler consulting by Violet Global Indonesia.",
};

const items = [
  {
    no: "01",
    title: "Market Entry Consultant",
    sub: "Opening market-entry doors with the right strategy",
    intro:
      "For foreign technology, energy, and infrastructure firms entering Indonesia — and Indonesian firms expanding outward. We de-risk entry with data, regulatory clarity, and the right first partners.",
    points: [
      "Market research and analysis based on data & AI",
      "Regulatory, licensing, and local compliance mapping",
      "Market positioning and penetration strategy",
      "Key partnership and stakeholder identification",
      "Go-to-market roadmap and execution support",
      "Competitive intelligence and benchmarking",
    ],
    deliverable: "Deliverable: market-entry blueprint with regulatory map, partner shortlist, and 12-month GTM plan.",
  },
  {
    no: "02",
    title: "Strategic Technology Consultant",
    sub: "Technology architecture for competitive advantage",
    intro:
      "For boards and CIOs modernizing under pressure. We translate business mandates into architectures that are secure, scalable, and auditable.",
    points: [
      "IT strategic planning and digital transformation roadmap",
      "Enterprise architecture and technology assessment",
      "AI/ML implementation strategy and data infrastructure",
      "Cybersecurity framework design and compliance advisory",
      "Cloud migration strategy and infrastructure optimization",
      "Technology due diligence and vendor evaluation",
    ],
    deliverable: "Deliverable: architecture blueprint, phased roadmap, and investment priorities.",
  },
  {
    no: "03",
    title: "Business Development Consultant",
    sub: "Accelerating sustainable business growth",
    intro:
      "For teams that must build pipeline in complex B2G and enterprise markets — long cycles, many stakeholders, formal procurement.",
    points: [
      "Strategic pipeline development and lead generation",
      "Partnership and alliance building",
      "Government tender and enterprise proposal support",
      "Revenue model and pricing strategy",
      "Market expansion planning",
      "Relationship management and client retention",
    ],
    deliverable: "Deliverable: qualified pipeline, proposal assets, and a repeatable BD operating cadence.",
  },
  {
    no: "04",
    title: "Prospective Market Enabler",
    sub: "Activating untapped market potential",
    intro:
      "For opportunities that do not yet look like markets — new zones, new infrastructure, new demand. We create the conditions for bankable projects.",
    points: [
      "Identification and validation of new market opportunities",
      "Ecosystem mapping and stakeholder engagement",
      "Demand creation and market education",
      "Pilot project and proof-of-concept design",
      "Public-Private Partnership (PPP) facilitation",
    ],
    deliverable: "Deliverable: validated concept, stakeholder coalition, and pilot-to-scale pathway.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="Senior counsel, backed by data and execution power"
        lede="Four practices — market entry, technology strategy, business development, and market enabling — for institutions and firms operating in Indonesia's most complex markets."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Brief our consultants <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
          {items.map((c, i) => (
            <Reveal key={c.no} delay={Math.min(i * 0.04, 0.15)}>
              <Card>
                <div className="grid gap-6 lg:grid-cols-[220px_1fr_1fr]">
                  <div>
                    <p className="font-display text-4xl font-bold text-violet-200">{c.no}</p>
                    <h2 className="mt-2 font-display text-xl font-bold text-slate-950">{c.title}</h2>
                    <p className="mt-1 text-sm font-medium text-violet-700">{c.sub}</p>
                  </div>
                  <p className="leading-7 text-slate-600">{c.intro}</p>
                  <ul className="space-y-1.5 text-sm leading-6 text-slate-700">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-violet-500">✦</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <p className="mt-5 rounded-xl bg-violet-50 px-4 py-3 text-sm font-medium text-violet-900">{c.deliverable}</p>
              </Card>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-2xl bg-slate-950 p-7 text-white">
              <SectionHeading
                dark
                eyebrow="How we work"
                title="Diagnose → design → de-risk → deliver"
                lede="Fixed-scope diagnostics first, then phased execution with clear owners, milestones, and measurable outcomes."
              />
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
                Start with a diagnostic <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
