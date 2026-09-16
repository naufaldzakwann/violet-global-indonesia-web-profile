"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function CybersecurityContent() {
  const { d } = useLanguage();
  const c = d.cyber;

  return (
    <>
      <PageHero
        index="03"
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        accent={c.heroAccent}
        lede={c.heroLede}
        image={img.cyber}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          {c.requestAssessment} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="01" eyebrow={c.practicesEyebrow} title={c.practicesTitle} accent={c.practicesAccent} />
          </Reveal>
          <div className="mt-12 border-t border-white/12">
            {c.services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.04, 0.12)}>
                <div className="index-row grid gap-3 border-b border-white/12 py-8 md:grid-cols-[80px_1fr_1.2fr] md:gap-10 md:py-10">
                  <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                  <div>
                    <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#f4f1eb] md:text-4xl">{s.title}</h2>
                    <p className="font-tech mt-4 text-[11px] uppercase leading-6 tracking-[0.16em] text-white/40">{s.points}</p>
                  </div>
                  <p className="max-w-xl leading-7 text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <div className="scan relative aspect-[16/10] overflow-hidden">
              <Image src={img.soc} alt="Security operations data center" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading index="02" eyebrow={c.infraEyebrow} title={c.infraTitle} accent={c.infraAccent} lede={c.infraLede} />
            <div className="mt-8 border-t border-white/12">
              {c.infra.map(([t, desc]) => (
                <div key={t} className="flex flex-col gap-1 border-b border-white/12 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-display text-xl uppercase tracking-wide text-[#f4f1eb]">{t}</p>
                  <p className="max-w-md text-sm leading-6 text-white/55 sm:text-right">{desc}</p>
                </div>
              ))}
            </div>
            <p className="font-tech mt-8 text-[11px] uppercase leading-6 tracking-[0.18em] text-white/45">
              {c.trainingNote}
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
              {c.discussScope} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
