import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow, Rule } from "@/components/Section";
import { img } from "@/lib/site";

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
        index="01"
        eyebrow="About"
        title="Ecosystem architect for"
        accent="high-stakes change."
        lede="PT Violet Global Indonesia integrates technology, data, infrastructure, and strategic partnerships to support complex decisions for government and corporate institutions."
        image={img.city}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          Work with us <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link href="/platforms" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:border-violet-500 hover:bg-violet-600">
          See platforms
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Who we are"
              title="Deep tech,"
              accent="applied at national scale."
              lede="Advanced AI, strategic data infrastructure, cybersecurity, digital intelligence, and technology-enabled sustainable infrastructure — one operating picture."
            />
            <div className="mt-8 space-y-5 leading-7 text-white/60">
              <p>
                Unlike a conventional integrator, Violet designs connected ecosystems:
                sensors and pipelines, AI tuned for Indonesian context, security
                operations — and where relevant, physical infrastructure for waste and energy.
              </p>
              <p>
                Our clients are institutions where failure is not an option: ministries,
                regional governments, state-owned enterprises, regulated industries, and
                corporations operating critical assets.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="scan relative aspect-[4/3] overflow-hidden">
              <Image src={img.satellite} alt="Orbital view of earth systems" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
            <div className="mt-6 border border-white/12 bg-[#0d0d10] p-7">
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-3 leading-7 text-white/70">
                To become a leading technology and sustainable infrastructure platform in
                Indonesia — integrating AI, cybersecurity, digital intelligence, and green
                energy so organizations protect assets, improve efficiency, and decide for
                a sustainable future.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="02" eyebrow="Mission protocol" title="Monitor. Analyze." accent="Detect. Protect." />
          </Reveal>
          <div className="mt-12 border-t border-white/12">
            {mission.map(([t, d], i) => (
              <Reveal key={t} delay={Math.min(i * 0.03, 0.15)}>
                <div className="index-row grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/12 py-6 md:grid-cols-[80px_240px_1fr] md:gap-10">
                  <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                  <span className="font-display text-2xl uppercase tracking-wide text-[#f4f1eb] md:text-3xl">{t}</span>
                  <span className="col-span-2 leading-7 text-white/55 md:col-span-1">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Rule className="mt-14" />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/45">
                Objective — connected projects where digital technology improves planning, monitoring, efficiency, security & scalability
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                Start a conversation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
