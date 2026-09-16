import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Compass, ShieldCheck, Cpu, Leaf } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Card } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "PT Violet Global Indonesia — deep-tech company and digital transformation consultant for AI, digital intelligence, cybersecurity, and sustainable infrastructure.",
};

const mission = [
  ["Monitor", "Collect and process data in real time."],
  ["Analyze", "Use AI to extract insights with high accuracy."],
  ["Detect", "Provide early warnings against threats, anomalies, and operational risks."],
  ["Protect", "Deliver comprehensive cybersecurity and infrastructure protection."],
  ["Transform", "Support digital, environmental, and energy transformation through scalable technology."],
  ["Develop", "Facilitate bankable projects, partnerships, and sustainable infrastructure development."],
  ["Support", "Provide technology, procurement, implementation, and operational support."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Digital Ecosystem Architect for high-stakes transformation"
        lede="PT Violet Global Indonesia integrates technology, data, infrastructure, and strategic partnerships to support complex decision-making for government institutions and corporations."
      >
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">
          Work with us <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/platforms" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
          See platforms
        </Link>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Who we are"
                title="Deep tech, applied to national-scale problems"
                lede="We focus on advanced Artificial Intelligence, strategic data infrastructure, cybersecurity, digital intelligence, and technology-enabled sustainable infrastructure."
              />
              <div className="mt-6 space-y-4 leading-7 text-slate-600">
                <p>
                  Unlike a conventional system integrator, Violet designs
                  connected ecosystems: sensors and data pipelines, AI models
                  tuned for Indonesian context, security operations, and —
                  where relevant — physical infrastructure for waste and energy.
                </p>
                <p>
                  Our clients are institutions where failure is not an option:
                  ministries, regional governments, state-owned enterprises,
                  regulated industries, and large corporations operating
                  critical assets.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-4">
                <Card>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-violet-700" />
                    <h3 className="font-display font-bold text-slate-950">Vision</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    To become a leading technology and sustainable
                    infrastructure platform in Indonesia — integrating AI,
                    cybersecurity, digital intelligence, and green energy to
                    help organizations protect assets, improve efficiency, and
                    make strategic decisions for a sustainable future.
                  </p>
                </Card>
                <Card>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-violet-700" />
                    <h3 className="font-display font-bold text-slate-950">Objective</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Create connected projects in which digital technology
                    improves the planning, monitoring, efficiency, security,
                    and scalability of sustainable infrastructure.
                  </p>
                </Card>
                <Card>
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-violet-700" />
                    <h3 className="font-display font-bold text-slate-950">How we engage</h3>
                  </div>
                  <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                    {["Advisory & assessment", "Platform deployment", "Managed operations", "Capacity building", "PPP facilitation", "Procurement support"].map((t) => (
                      <li key={t} className="flex gap-2"><span className="text-violet-500">•</span>{t}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Mission"
              title="Monitor. Analyze. Detect. Protect. Transform."
              lede="Seven verbs govern every engagement — from a SOC shift to a waste-to-energy feasibility study."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mission.map(([t, d], i) => (
              <Reveal key={t} delay={Math.min(i * 0.05, 0.3)}>
                <Card className="h-full">
                  <p className="font-display text-2xl font-bold text-violet-200">0{i + 1}</p>
                  <h3 className="mt-1 font-display font-bold text-slate-950">{t}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{d}</p>
                </Card>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex h-full flex-col justify-between rounded-2xl bg-slate-950 p-6 text-white">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-violet-300" />
                  <h3 className="font-display font-bold">Operating principles</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Accuracy, speed, intelligence, security, actionability, and
                  sustainability — measured in outcomes, not dashboards.
                </p>
                <div className="mt-4 flex gap-2">
                  <Cpu className="h-4 w-4 text-cyan-300" />
                  <Leaf className="h-4 w-4 text-emerald-300" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
