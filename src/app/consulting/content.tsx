"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

export default function ConsultingContent() {
  const { d } = useLanguage();
  const c = d.consulting;

  return (
    <>
      <PageHero
        index="04"
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        accent={c.heroAccent}
        lede={c.heroLede}
        image={img.strategy}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          {c.briefUs} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="border-t border-white/12">
            {c.items.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.04, 0.12)}>
                <div className="index-row grid gap-4 border-b border-white/12 py-10 md:grid-cols-[80px_1fr_1fr] md:gap-10 md:py-12">
                  <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                  <div>
                    <h2 className="font-display text-4xl uppercase leading-[0.92] tracking-wide text-[#f4f1eb] md:text-6xl">{item.title}</h2>
                    <p className="font-serif-accent mt-2 text-xl text-violet-300">{item.sub}</p>
                  </div>
                  <div>
                    <p className="max-w-xl leading-7 text-white/60">{item.intro}</p>
                    <ul className="mt-5 space-y-2 border-t border-white/12 pt-5">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-6 text-white/70">
                          <span className="text-violet-400" aria-hidden="true">✦</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-white/12 bg-[#0d0d10] p-8 md:p-10">
              <SectionHeading eyebrow={c.engageEyebrow} title={c.engageTitle} accent={c.engageAccent} />
              <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-500">
                {c.startDiagnostic} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
