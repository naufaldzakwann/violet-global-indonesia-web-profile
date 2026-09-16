"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

const images = [img.narativa, img.blockchain, img.automation];

export default function PlatformsContent() {
  const { d } = useLanguage();
  const p = d.platforms;

  return (
    <>
      <PageHero
        index="02"
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        accent={p.heroAccent}
        lede={p.heroLede}
        image={img.matrix}
        crumbHome={d.index}
        localeTag={d.localeTag}
      >
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
          {p.requestDemo} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] space-y-24 px-5 py-24 md:px-10 md:py-32">
          {p.items.map((item, i) => (
            <div key={item.name} className={`grid items-start gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <Link href="/contact" className="work-card group block" aria-label={`${item.name} — ${p.requestDemo}`}>
                  <div className="scan relative aspect-[16/11] overflow-hidden">
                    <Image src={images[i]} alt={item.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
                    <span className="font-display absolute left-5 top-4 text-6xl text-white/25 transition-colors group-hover:text-violet-300">0{i + 1}</span>
                  </div>
                </Link>
              </Reveal>
              <Reveal delay={0.08}>
                <Eyebrow>{item.tag}</Eyebrow>
                <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] tracking-wide text-[#f4f1eb] md:text-6xl">{item.name}</h2>
                <p className="mt-5 max-w-xl leading-7 text-white/60">{item.desc}</p>
                <ul className="mt-7 space-y-3 border-t border-white/12 pt-7">
                  {item.capabilities.map((c) => (
                    <li key={c} className="flex gap-3 text-[15px] leading-6 text-white/70">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /> {c}
                    </li>
                  ))}
                </ul>
                <p className="font-tech mt-7 text-[11px] uppercase leading-6 tracking-[0.18em] text-violet-300/90">
                  {p.useCases} — {item.cases}
                </p>
              </Reveal>
            </div>
          ))}

          <Reveal>
            <div className="noise relative overflow-hidden border border-white/12 bg-gradient-to-br from-violet-800 via-[#3b1d7a] to-[#150d2b] p-8 md:p-12">
              <SectionHeading eyebrow={p.deployEyebrow} title={p.deployTitle} accent={p.deployAccent} lede={p.deployLede} />
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#0a0a0b] hover:text-white">
                {p.scopePilot} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
