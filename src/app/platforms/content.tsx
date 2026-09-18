"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

const images = [img.narativa, img.blockchain, img.automation];

export default function PlatformsContent() {
  const { d } = useLanguage();
  const p = d.platforms;

  return (
    <>
      <PageHero
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        accent={p.heroAccent}
        lede={p.heroLede}
        image={img.matrix}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
          {p.requestDemo} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] space-y-24 px-5 py-24 md:px-10 md:py-32">
          {p.items.map((item, i) => (
            <div key={item.name}>
              {i === 1 ? (
                <div>
                  <Reveal>
                    <div className="relative aspect-[16/8] overflow-hidden">
                      <Image src={images[i]} alt={item.name} fill sizes="100vw" className="object-cover" />
                    </div>
                  </Reveal>
                  <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <Reveal>
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-[#141419] md:text-6xl dark:text-[#f4f1eb]">{item.name}</h2>
                        <span className="font-tech text-[11px] uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">{item.tag}</span>
                      </div>
                      <p className="mt-5 max-w-xl leading-7 text-stone-600 dark:text-white/60">{item.desc}</p>
                      <p className="font-tech mt-6 text-[11px] uppercase leading-6 tracking-[0.18em] text-violet-800 dark:text-violet-300/90">
                        {p.useCases}: {item.cases}
                      </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                      <ul className="space-y-3 border-t-2 border-stone-900/80 pt-6 dark:border-white/70">
                        {item.capabilities.map((c) => (
                          <li key={c} className="flex gap-3 text-[15px] leading-6 text-stone-600 dark:text-white/70">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" /> {c}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                </div>
              ) : (
                <div className={`grid items-start gap-10 lg:grid-cols-2 ${i === 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <Reveal>
                    <div className="work-card relative aspect-[16/11] overflow-hidden">
                      <Image src={images[i]} alt={item.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-[#141419] md:text-5xl dark:text-[#f4f1eb]">{item.name}</h2>
                      <span className="font-tech text-[11px] uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">{item.tag}</span>
                    </div>
                    <p className="mt-5 max-w-xl leading-7 text-stone-600 dark:text-white/60">{item.desc}</p>
                    <ul className="mt-7 space-y-3 border-t border-stone-900/10 pt-7 dark:border-white/12">
                      {item.capabilities.map((c) => (
                        <li key={c} className="flex gap-3 text-[15px] leading-6 text-stone-600 dark:text-white/70">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" /> {c}
                        </li>
                      ))}
                    </ul>
                    <p className="font-tech mt-7 text-[11px] uppercase leading-6 tracking-[0.18em] text-violet-800 dark:text-violet-300/90">
                      {p.useCases}: {item.cases}
                    </p>
                  </Reveal>
                </div>
              )}
            </div>
          ))}

          <Reveal>
            <div className="noise relative overflow-hidden border border-stone-900/10 dark:border-white/12 bg-gradient-to-br from-violet-800 via-[#3b1d7a] to-[#150d2b] p-8 md:p-12">
              <SectionHeading dark eyebrow={p.deployEyebrow} title={p.deployTitle} accent={p.deployAccent} lede={p.deployLede} />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white">
                {p.scopePilot} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
