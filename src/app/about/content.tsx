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
        eyebrow={a.heroEyebrow}
        title={a.heroTitle}
        accent={a.heroAccent}
        lede={a.heroLede}
        image={img.satellite}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
          {a.workWithUs} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link href="/platforms" className="inline-flex items-center gap-2 border border-stone-900/25 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-all hover:border-violet-500 hover:bg-violet-600 hover:text-white dark:border-white/30 dark:text-white">
          {a.seePlatforms}
        </Link>
      </PageHero>

      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <SectionHeading title={a.whoTitle} accent={a.whoAccent} lede={a.whoLede} />
            <div className="mt-8 space-y-5 leading-7 text-stone-600 dark:text-white/60">
              <p>{a.whoP1}</p>
              <p>{a.whoP2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={img.team} alt="Violet team collaborating on analysis" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
            <div className="mt-6 border border-stone-900/10 dark:border-white/12 bg-white dark:bg-[#0d0d10] p-7">
              <Eyebrow>{a.visionLabel}</Eyebrow>
              <p className="mt-3 leading-7 text-stone-600 dark:text-white/70">{a.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-stone-900/10 dark:border-white/12 bg-[#F3EDE1] dark:bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={a.missionTitle} accent={a.missionAccent} />
          </Reveal>
          <div className="mt-12 border-t border-stone-900/10 dark:border-white/12">
            {a.mission.map(([t, desc], i) => (
              <Reveal key={t} delay={Math.min(i * 0.03, 0.15)}>
                <div className="index-row grid items-baseline gap-2 border-b border-stone-900/10 py-6 md:grid-cols-[240px_1fr] md:gap-10 dark:border-white/12">
                  <span className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb] md:text-3xl">{t}</span>
                  <span className="col-span-2 leading-7 text-stone-600 dark:text-white/55 md:col-span-1">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Rule className="mt-14" />
            <div className="mt-14">
              <SectionHeading title={a.valuesTitle} accent={a.valuesAccent} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map(([t, desc]) => (
              <div key={t} className="border-t-2 border-stone-900/80 pt-5 dark:border-white/70">
                <h3 className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-white/55">{desc}</p>
              </div>
            ))}
          </div>
          <Reveal>
            <div className="mt-14">
              <SectionHeading title={a.whyTitle} accent={a.whyAccent} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {a.why.map(([t, desc]) => (
              <div key={t}>
                <h3 className="font-display text-2xl uppercase tracking-wide text-[#141419] md:text-3xl dark:text-[#f4f1eb]">{t}</h3>
                <p className="mt-2 leading-7 text-stone-600 dark:text-white/55">{desc}</p>
              </div>
            ))}
          </div>
          <Reveal>
            <Rule className="mt-14" />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <p className="font-tech max-w-3xl text-[11px] uppercase leading-6 tracking-[0.2em] text-stone-500 dark:text-white/45">
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
