"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow, Rule } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function AboutContent() {
  const { d } = useLanguage();
  const a = d.about;

  return (
    <>
      <PageHero
        index="01"
        eyebrow={a.heroEyebrow}
        title={a.heroTitle}
        accent={a.heroAccent}
        lede={a.heroLede}
        image={img.city}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          {a.workWithUs} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link href="/platforms" className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:border-violet-500 hover:bg-violet-600">
          {a.seePlatforms}
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <SectionHeading index="01" eyebrow={a.whoEyebrow} title={a.whoTitle} accent={a.whoAccent} lede={a.whoLede} />
            <div className="mt-8 space-y-5 leading-7 text-white/60">
              <p>{a.whoP1}</p>
              <p>{a.whoP2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="scan relative aspect-[4/3] overflow-hidden">
              <Image src={img.satellite} alt="Orbital view of earth systems" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
            <div className="mt-6 border border-white/12 bg-[#0d0d10] p-7">
              <Eyebrow>{a.visionLabel}</Eyebrow>
              <p className="mt-3 leading-7 text-white/70">{a.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="02" eyebrow={a.missionEyebrow} title={a.missionTitle} accent={a.missionAccent} />
          </Reveal>
          <div className="mt-12 border-t border-white/12">
            {a.mission.map(([t, desc], i) => (
              <Reveal key={t} delay={Math.min(i * 0.03, 0.15)}>
                <div className="index-row grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/12 py-6 md:grid-cols-[80px_240px_1fr] md:gap-10">
                  <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                  <span className="font-display text-2xl uppercase tracking-wide text-[#f4f1eb] md:text-3xl">{t}</span>
                  <span className="col-span-2 leading-7 text-white/55 md:col-span-1">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Rule className="mt-14" />
            <div className="mt-14">
              <SectionHeading index="03" eyebrow={a.valuesEyebrow} title={a.valuesTitle} accent={a.valuesAccent} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map(([t, desc], i) => (
              <Reveal key={t} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full bg-[#0d0d10] p-7 transition-colors hover:bg-[#150d2b]">
                  <p className="font-tech text-xs text-violet-400">0{i + 1}</p>
                  <h3 className="font-display mt-2 text-2xl uppercase tracking-wide text-[#f4f1eb]">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-14">
              <SectionHeading index="04" eyebrow={a.whyEyebrow} title={a.whyTitle} accent={a.whyAccent} />
            </div>
          </Reveal>
          <div className="mt-10 border-t border-white/12">
            {a.why.map(([t, desc], i) => (
              <Reveal key={t} delay={Math.min(i * 0.03, 0.12)}>
                <div className="index-row grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/12 py-6 md:grid-cols-[80px_1fr_1fr] md:gap-10">
                  <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                  <span className="font-display text-2xl uppercase tracking-wide text-[#f4f1eb] md:text-3xl">{t}</span>
                  <span className="col-span-2 leading-7 text-white/55 md:col-span-1">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Rule className="mt-14" />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <p className="font-tech max-w-3xl text-[11px] uppercase leading-6 tracking-[0.2em] text-white/45">
                {a.objectiveNote}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                {a.startConversation} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
