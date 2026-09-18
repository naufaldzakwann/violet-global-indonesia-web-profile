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
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        accent={c.heroAccent}
        lede={c.heroLede}
        image={img.cyber}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
          {c.requestAssessment} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={c.practicesTitle} accent={c.practicesAccent} />
          </Reveal>
          <div className="mt-12 border-t border-stone-900/10 dark:border-white/12">
            {c.services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.04, 0.12)}>
                <div className="index-row grid gap-3 border-b border-stone-900/10 dark:border-white/12 py-8 md:grid-cols-[1fr_1.2fr] md:gap-10 md:py-10">
                  <div>
                    <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb] md:text-4xl">{s.title}</h2>
                    <p className="font-tech mt-4 text-[11px] uppercase leading-6 tracking-[0.16em] text-stone-500 dark:text-white/40">{s.points}</p>
                  </div>
                  <p className="max-w-xl leading-7 text-stone-600 dark:text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-900/10 dark:border-white/12 bg-[#F3EDE1] dark:bg-[#0d0d10]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={img.engineer} alt="Security analysts at monitoring screens" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading title={c.infraTitle} accent={c.infraAccent} lede={c.infraLede} />
            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {c.infra.map(([t, desc]) => (
                <div key={t}>
                  <p className="font-display text-xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{t}</p>
                  <p className="mt-1 max-w-md text-sm leading-6 text-stone-600 dark:text-white/55">{desc}</p>
                </div>
              ))}
            </div>
            <p className="font-tech mt-8 text-[11px] uppercase leading-6 tracking-[0.18em] text-stone-500 dark:text-white/45">
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
