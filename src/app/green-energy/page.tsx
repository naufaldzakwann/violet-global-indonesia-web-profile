import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Recycle, Sun, Leaf, Factory, Trash2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";

export const metadata: Metadata = {
  title: "Green Energy",
  description:
    "Technology-enabled green and renewable energy: waste-to-energy, solar PV, biogas, and circular-economy infrastructure by Violet Global Indonesia.",
};

const steps = [
  ["01", "Identify", "Assess energy demand, feedstock, site conditions, infrastructure, and stakeholders."],
  ["02", "Design", "Develop technical concepts, project structures, and roadmaps with qualified technology partners."],
  ["03", "Integrate", "Connect physical infrastructure with IoT, AI, cybersecurity, and real-time data platforms."],
  ["04", "Finance & Partner", "Facilitate strategic partnerships, PPP structures, and potential financing pathways."],
  ["05", "Implement", "Support development, procurement, construction, commissioning, and readiness via project partners."],
  ["06", "Monitor", "Provide digital monitoring, analytics, and performance management across the lifecycle."],
];

const projects = [
  {
    icon: Factory,
    title: "Integrated Waste-to-Energy Project",
    desc: "Integrated waste-processing and energy-recovery facility combining waste management, resource recovery, energy generation, and digital monitoring.",
    stakeholders: "Government / municipal partners; technology providers; investors; off-takers",
  },
  {
    icon: Sun,
    title: "Solar PV & Smart Energy Project",
    desc: "Solar PV systems supported by energy monitoring, performance analytics, and optional storage.",
    stakeholders: "Industrial estates; commercial facilities; public assets; private developers",
  },
  {
    icon: Leaf,
    title: "Organic Waste-to-Biogas Project",
    desc: "Conversion of suitable organic waste into biogas/biomethane or electricity and useful by-products, subject to feedstock quality and feasibility.",
    stakeholders: "Food industry; agriculture; municipal organic waste generators",
  },
  {
    icon: Sun,
    title: "Green Industrial Energy Platform",
    desc: "Integrated renewable energy, storage, and digital energy-management for industrial users seeking lower costs and resilience.",
    stakeholders: "Industrial estates and large energy users",
  },
  {
    icon: Recycle,
    title: "Smart Waste & Circular Economy Hub",
    desc: "Integrated sorting, recycling, organic treatment, and resource-recovery infrastructure with digital environmental supervision.",
    stakeholders: "Municipalities, regencies, industrial zones, strategic development areas",
  },
];

const waste = [
  "Planning, consultation, and waste-processing infrastructure development (TPST/TPA)",
  "Operational management consultation & feasibility studies",
  "Scheme alignment with government & business entities (KPBU/PPP)",
  "Sorting facilities, recycling & sustainable circular economy",
  "Smart-bin technology & IoT-based fleet monitoring",
  "Analytics dashboard for environmental supervision & compliance",
  "Community education & sustainable empowerment programs",
];

export default function GreenEnergyPage() {
  return (
    <>
      <PageHero
        eyebrow="Green energy"
        title="Digital intelligence meets energy and environmental infrastructure"
        lede="Violet is expanding into Green & Renewable Energy — technology-enabled projects supporting decarbonization, resource recovery, and energy resilience, complementing our AI, cybersecurity, and smart-waste capabilities."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">
          Discuss a project <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              The projects below are Violet&apos;s target development opportunities and
              business-development pipeline concepts. They should not be interpreted as
              completed or commissioned projects unless separately identified by Violet.
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8">
              <SectionHeading
                eyebrow="Approach"
                title="Our green energy approach"
                lede="A six-stage discipline that keeps technically ambitious projects bankable, governable, and operable."
              />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([no, t, d], i) => (
              <Reveal key={t} delay={Math.min(i * 0.05, 0.25)}>
                <Card className="h-full border-emerald-100">
                  <p className="text-xs font-bold text-emerald-700">{no}</p>
                  <h3 className="mt-1 font-display font-bold text-slate-950">{t}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Pipeline concepts"
              title="Green energy project opportunities"
              lede="Five target concepts under business development — each scoped with stakeholders, feedstock, and commercial structure before capital is committed."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.05, 0.2)}>
                <Card className="h-full">
                  <p.icon className="h-7 w-7 text-emerald-700" />
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-950">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.desc}</p>
                  <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
                    <strong>Potential stakeholders:</strong> {p.stakeholders}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Smart waste"
                title="Integrated smart waste management"
                lede="Management, infrastructure, and smart processing — the feedstock foundation for circular-economy and waste-to-energy value chains."
              />
              <ul className="mt-6 space-y-2.5 text-sm leading-6 text-slate-700">
                {waste.map((w) => (
                  <li key={w} className="flex gap-2">
                    <Trash2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /> {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-slate-950 p-7 text-white">
                <h3 className="font-display text-xl font-bold">Project development capabilities</h3>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 sm:grid-cols-2">
                  {[
                    "Pre-feasibility & feasibility coordination",
                    "Site and feedstock assessment",
                    "Technology and vendor evaluation",
                    "Stakeholder & government coordination",
                    "PPP / partnership structuring",
                    "Commercial & off-take coordination",
                    "Proposal & investment documentation",
                    "Digital monitoring & operational intelligence",
                  ].map((c) => (
                    <li key={c} className="flex gap-2"><span className="text-emerald-400">✓</span>{c}</li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">
                  Start a feasibility discussion <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
