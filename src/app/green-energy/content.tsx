"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function GreenEnergyContent() {
  const { d } = useLanguage();
  const g = d.green;
  const rx = d.regenx;

  return (
    <>
      <PageHero
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

      {/* Featured flagship — E3i RegenX */}
      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-10 md:pt-28">
          <Reveal>
            <Link
              href="/green-energy/regenx"
              className="group relative block overflow-hidden bg-[#12382D] text-[#f4f1eb] transition-colors duration-300 hover:bg-[#174639]"
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-[110px]" aria-hidden="true" />
              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
                <div>
                  <p className="font-tech flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-300">
                    <Leaf className="h-3.5 w-3.5" aria-hidden="true" /> {g.featuredLabel}
                  </p>
                  <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] tracking-wide text-white sm:text-5xl">
                    E3i RegenX{" "}
                    <em className="font-serif-accent normal-case tracking-normal text-emerald-300">{rx.meta}</em>
                  </h2>
                  <p className="font-tech mt-3 text-[10px] uppercase tracking-[0.22em] text-white/50">{g.featuredMeta}</p>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{g.featuredDesc}</p>
                  <span className="mt-7 inline-flex items-center gap-2 bg-emerald-400 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors group-hover:bg-emerald-300">
                    {g.featuredCta} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-px border border-white/12 bg-white/12">
                  {[rx.stats[0], rx.stats[2], rx.stats[4]].map(([num, unit]) => (
                    <div key={unit} className="bg-[#12382D] p-4 text-center md:p-6">
                      <p className="font-display text-2xl uppercase leading-none tracking-wide text-white md:text-4xl">{num}</p>
                      <p className="font-tech mt-2 text-[9px] uppercase tracking-[0.2em] text-emerald-300">{unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="mt-14">
              <SectionHeading title={g.approachTitle} accent={g.approachAccent} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {g.steps.map(([t, desc]) => (
              <div key={t} className="border-t-2 border-emerald-700/60 pt-5 dark:border-emerald-400/60">
                <h3 className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-stone-900/10 dark:border-white/12 bg-[#F3EDE1] dark:bg-[#0d0d10]">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-[42rem] rounded-full bg-emerald-400/20 blur-[130px] dark:bg-emerald-500/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 rounded-full bg-lime-300/20 blur-[120px] dark:bg-lime-400/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={g.pipelineTitle} accent={g.pipelineAccent} />
            <p className="mt-5 max-w-3xl text-xs leading-5 text-stone-500 dark:text-white/40">{g.disclaimer}</p>
          </Reveal>
          <div className="mt-12 border-t border-stone-900/10 dark:border-white/12">
            {g.projects.map((p, i) => (
              <Reveal key={p.no} delay={Math.min(i * 0.04, 0.15)}>
                <div className="index-row grid gap-3 border-b border-stone-900/10 dark:border-white/12 py-8 md:grid-cols-[1fr_1.2fr] md:gap-10">
                  <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb] md:text-4xl">{p.title}</h2>
                  <div>
                    <p className="max-w-xl leading-7 text-stone-600 dark:text-white/60">{p.desc}</p>
                    <p className="font-tech mt-3 text-[11px] uppercase leading-6 tracking-[0.16em] text-stone-500 dark:text-white/40">{p.stakeholders}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={img.sortedPlastic} alt="Stacked bales of sorted PET bottles ready for recycling" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <p className="mt-3 text-xs leading-5 text-stone-500 dark:text-white/40">
                Baled PET bottles at a sorting facility. Photo: Grendelkhan, CC BY-SA 4.0, via{" "}
                <a className="underline underline-offset-2 hover:text-violet-700 dark:hover:text-white" href="https://commons.wikimedia.org/wiki/File:Bales_of_PET_bottles_stacked.jpg" target="_blank" rel="noreferrer">
                  Wikimedia Commons
                </a>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow>{g.wasteEyebrow}</Eyebrow>
              <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb] sm:text-5xl">
                {g.wasteTitle} <em className="font-serif-accent normal-case tracking-normal text-emerald-700 dark:text-emerald-300">{g.wasteAccent}</em>
              </h2>
              <ul className="mt-6 space-y-2.5 border-t border-stone-900/10 dark:border-white/12 pt-6">
                {g.waste.map((w) => (
                  <li key={w} className="flex gap-3 text-sm leading-6 text-stone-600 dark:text-white/70">
                    <span className="text-emerald-700 dark:text-emerald-400" aria-hidden="true">✓</span> {w}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-emerald-400 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-emerald-300">
                {g.feasibility} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-900/10 dark:border-white/12 bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
          <Reveal>
            <SectionHeading title={g.capsTitle} accent={g.capsAccent} />
          </Reveal>
          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {g.caps.map((cap) => (
              <li key={cap} className="flex gap-3 border-t border-stone-900/10 pt-4 text-sm font-medium leading-6 text-stone-700 dark:border-white/12 dark:text-white/75">
                <span className="text-emerald-700 dark:text-emerald-400" aria-hidden="true">✓</span> {cap}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
