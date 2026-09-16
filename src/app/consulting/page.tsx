import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { img } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Market entry, strategic technology, business development, and market-enabler consulting by Violet Global Indonesia.",
};

const items = [
  {
    no: "01",
    title: "Market Entry",
    sub: "Opening doors with the right strategy",
    intro: "For foreign technology, energy, and infrastructure firms entering Indonesia. We de-risk entry with data, regulatory clarity, and the right first partners.",
    points: "Data & AI research · regulatory mapping · positioning · partner shortlist · 12-month GTM plan",
  },
  {
    no: "02",
    title: "Technology Strategy",
    sub: "Architecture for advantage",
    intro: "For boards and CIOs modernizing under pressure — business mandates translated into secure, scalable, auditable architectures.",
    points: "Transformation roadmap · enterprise architecture · AI & data strategy · cloud, security & compliance",
  },
  {
    no: "03",
    title: "Business Development",
    sub: "Pipeline for complex markets",
    intro: "For teams selling into long-cycle B2G and enterprise markets — many stakeholders, formal procurement, zero shortcuts.",
    points: "Pipeline development · alliances · tender & proposal support · revenue & pricing strategy",
  },
  {
    no: "04",
    title: "Market Enabler",
    sub: "Activating untapped potential",
    intro: "For opportunities that don't yet look like markets — new zones, new infrastructure, new demand. We create bankable conditions.",
    points: "Opportunity validation · ecosystem mapping · pilot design · PPP facilitation",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Consulting"
        title="Senior counsel,"
        accent="backed by data."
        lede="Market entry, technology strategy, business development, and market enabling — for Indonesia's most complex markets."
        image={img.strategy}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          Brief our consultants <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="border-t border-white/12">
            {items.map((c, i) => (
              <Reveal key={c.no} delay={Math.min(i * 0.04, 0.12)}>
                <div className="index-row grid gap-4 border-b border-white/12 py-10 md:grid-cols-[80px_1fr_1fr] md:gap-10 md:py-12">
                  <span className="font-tech text-xs text-violet-400">{c.no}</span>
                  <div>
                    <h2 className="font-display text-4xl uppercase leading-[0.92] tracking-wide text-[#f4f1eb] md:text-6xl">{c.title}</h2>
                    <p className="font-serif-accent mt-2 text-xl text-violet-300">{c.sub}</p>
                  </div>
                  <div>
                    <p className="max-w-xl leading-7 text-white/60">{c.intro}</p>
                    <p className="font-tech mt-5 text-[11px] uppercase leading-6 tracking-[0.16em] text-white/40">{c.points}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-white/12 bg-[#0d0d10] p-8 md:p-10">
              <SectionHeading eyebrow="Engagement" title="Diagnose first," accent="then execute." />
              <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                Start with a diagnostic <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
