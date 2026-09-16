"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function GreenEnergyContent() {
  const { d } = useLanguage();
  const g = d.green;

  return (
    <>
      <PageHero
        index="05"
        eyebrow={g.heroEyebrow}
        title={g.heroTitle}
        accent={g.heroAccent}
        lede={g.heroLede}
        image={img.wind}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-400 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-emerald-300">
          {g.discussProject} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="border border-amber-300/25 bg-amber-300/[0.06] p-5 text-sm leading-6 text-amber-200/90">
              {g.disclaimer}
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-14">
              <SectionHeading index="01" eyebrow={g.approachEyebrow} title={g.approachTitle} accent={g.approachAccent} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {g.steps.map(([no, t, desc], i) => (
              <Reveal key={t} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full bg-[#0a0a0b] p-7 transition-colors hover:bg-[#0e1a14]">
                  <p className="font-tech text-xs text-emerald-400">{no}</p>
                  <h3 className="font-display mt-2 text-2xl uppercase tracking-wide text-[#f4f1eb]">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="02" eyebrow={g.pipelineEyebrow} title={g.pipelineTitle} accent={g.pipelineAccent} />
          </Reveal>
          <div className="mt-12 border-t border-white/12">
            {g.projects.map((p, i) => (
              <Reveal key={p.no} delay={Math.min(i * 0.04, 0.15)}>
                <div className="index-row grid gap-3 border-b border-white/12 py-8 md:grid-cols-[80px_1fr_1.2fr] md:gap-10">
                  <span className="font-tech text-xs text-emerald-400">{p.no}</span>
                  <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#f4f1eb] md:text-4xl">{p.title}</h2>
                  <div>
                    <p className="max-w-xl leading-7 text-white/60">{p.desc}</p>
                    <p className="font-tech mt-3 text-[11px] uppercase leading-6 tracking-[0.16em] text-white/40">{p.stakeholders}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="scan relative aspect-[16/10] overflow-hidden">
                <Image src={img.solar} alt="Solar PV installation" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-emerald-950/25 mix-blend-multiply" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow>{g.wasteEyebrow}</Eyebrow>
              <p className="mt-4 leading-7 text-white/60">{g.wasteBody}</p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-emerald-400 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-emerald-300">
                {g.feasibility} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
