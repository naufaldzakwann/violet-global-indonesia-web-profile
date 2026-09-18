"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function ProcurementContent() {
  const { d } = useLanguage();
  const p = d.procurement;

  return (
    <>
      <PageHero
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        accent={p.heroAccent}
        lede={p.heroLede}
        image={img.soc}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
          {p.requestQuotation} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="border-t border-stone-900/10 dark:border-white/12">
            {p.cats.map(([no, t, desc], i) => (
              <Reveal key={no} delay={Math.min(i * 0.04, 0.15)}>
                <div className="index-row grid items-baseline gap-2 border-b border-stone-900/10 dark:border-white/12 py-7 md:grid-cols-[1fr_1fr] md:gap-10">
                  <span className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb] md:text-4xl">{t}</span>
                  <span className="col-span-2 leading-7 text-stone-600 dark:text-white/55 md:col-span-1">{desc}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading title={p.howTitle} accent={p.howAccent} lede={p.howLede} />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                {p.sendBoq} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={img.strategy} alt="Procurement planning and vendor evaluation" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
              </div>
              <p className="font-tech mt-5 text-[11px] uppercase leading-6 tracking-[0.18em] text-stone-500 dark:text-white/45">
                {p.ecosystem}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
