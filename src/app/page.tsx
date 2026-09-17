"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { SectionHeading, Eyebrow, Rule } from "@/components/Section";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site, img } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function Hero({ titleA, titleB1, titleB2 }: { titleA: string; titleB1: string; titleB2: string }) {
  const root = useRef<HTMLElement>(null);
  const { d } = useLanguage();
  const h = d.home;

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".h-fade", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.15)
        .fromTo(".h-line > span", { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.25)
        .fromTo(".h-bottom", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.9);
      gsap.to(".h-title", {
        yPercent: -22, opacity: 0.25, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".h-bg", {
        yPercent: 14, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="noise relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0b]">
      <div className="h-bg absolute inset-0" aria-hidden="true">
        <Image src={img.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/70 via-[#0a0a0b]/35 to-[#0a0a0b]" />
        <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" />
      </div>
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1600px] flex-1 px-5 pt-28 md:px-10 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="h-fade max-w-md text-sm leading-6 text-white/75 md:text-[15px]">
            {h.heroDescA}{" "}
            <em className="font-serif-accent text-white">{h.heroDescB}</em>
          </p>
          <p className="h-fade font-tech hidden text-[11px] uppercase tracking-[0.25em] text-white/50 md:block">
            {h.est}
          </p>
        </div>

        <h1 className="h-title mt-8 md:mt-10">
          <span className="h-line block overflow-hidden">
            <span className="font-display block text-[12vw] uppercase leading-[0.88] tracking-wide text-[#f4f1eb] sm:text-[11vw] md:text-[10.5vw]">
              {titleA}
            </span>
          </span>
          <span className="h-line block overflow-hidden">
            <span className="font-display block text-[12vw] uppercase leading-[0.88] tracking-wide text-[#f4f1eb] sm:text-[11vw] md:text-[10.5vw]">
              <span className="text-stroke-violet">{titleB1}</span>{titleB2}
            </span>
          </span>
        </h1>
      </div>

      <div className="h-bottom relative border-t border-white/12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-5 md:px-10">
          <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-white/60 md:text-[11px]">
            {h.heroTags}
          </p>
          <Link
            href="/about"
            className="group hidden items-center gap-2 border border-white/25 px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:border-violet-500 hover:bg-violet-600 sm:inline-flex"
          >
            {h.explore} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="font-tech flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 md:text-[11px]">
            {h.scroll}
            <span className="relative inline-block h-7 w-px overflow-hidden bg-white/20">
              <span className="animate-dropline absolute inset-x-0 top-0 h-2.5 bg-violet-400" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessAccordion() {
  const { d } = useLanguage();
  const [active, setActive] = useState(0);
  return (
    <div className="mt-10 border-t border-white/12">
      {d.home.processSteps.map((p, i) => {
        const isOpen = active === i;
        return (
          <div key={p.title} className={isOpen ? "acc-open" : ""}>
            <button
              onClick={() => setActive(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-center gap-5 border-b border-white/12 py-6 text-left md:gap-10"
            >
              <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
              <span className={`font-display flex-1 text-3xl uppercase tracking-wide transition-colors md:text-5xl ${isOpen ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                {p.title}
              </span>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-violet-500 bg-violet-600" : "border-white/25"}`}>
                <Plus className="h-4 w-4 text-white" />
              </span>
            </button>
            <div className="acc-body">
              <div className="acc-inner">
                <p className="max-w-3xl pb-8 pl-9 pr-4 leading-7 text-white/60 md:pl-[4.5rem] md:text-lg md:leading-8">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const workImages = [img.narativa, img.blockchain, img.automation];

export default function Home() {
  const { d, lang } = useLanguage();
  const h = d.home;
  const heroTitle = lang === "id"
    ? { a: "Mengorkestrasi", b1: "Inteli", b2: "jensi" }
    : { a: "Orchestrating", b1: "Intelli", b2: "gence" };

  return (
    <>
      <Hero titleA={heroTitle.a} titleB1={heroTitle.b1} titleB2={heroTitle.b2} />

      <div className="border-y border-white/12 bg-[#0c0716] py-5">
        <Marquee items={[...h.ticker]} outline />
      </div>

      <section className="noise relative bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <Eyebrow index="01">{h.manifestoEyebrow}</Eyebrow>
            <p className="mt-8 max-w-6xl text-3xl font-medium leading-[1.25] tracking-tight text-balance text-[#f4f1eb] md:text-5xl md:leading-[1.15]">
              {h.manifestoA} <em className="font-serif-accent text-violet-300">{h.manifestoAccent}</em>{" "}
              {h.manifestoB} <span className="text-white/40">{h.manifestoC}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-white/12 bg-white/12 lg:grid-cols-4">
              {h.stats.map(([k, v]) => (
                <div key={v} className="bg-[#0a0a0b] p-6 transition-colors hover:bg-[#120b22] md:p-8">
                  <dt className="font-display text-3xl tracking-wide text-white md:text-4xl">{k}</dt>
                  <dd className="font-tech mt-3 text-[10px] uppercase leading-5 tracking-[0.2em] text-white/45">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="02" eyebrow={h.creedEyebrow} title={h.creedTitle} accent={h.creedAccent} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-3">
            {h.creed.map((c, i) => (
              <Reveal key={c.word} delay={i * 0.08}>
                <div className="group h-full bg-[#0d0d10] p-8 transition-colors duration-300 hover:bg-[#150d2b] md:p-10">
                  <p className="font-tech text-xs text-violet-400">0{i + 1}</p>
                  <h3 className="font-display mt-4 text-4xl uppercase tracking-wide text-[#f4f1eb] md:text-5xl">{c.word}</h3>
                  <Rule className="my-6" />
                  <p className="text-[15px] leading-7 text-white/60">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading index="03" eyebrow={h.worksEyebrow} title={h.worksTitle} accent={h.worksAccent} />
              <Link href="/platforms" className="group hidden items-center gap-2 border border-white/25 px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:border-violet-500 hover:bg-violet-600 md:inline-flex">
                {h.allPlatforms} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {h.works.map((w, i) => (
              <Reveal key={w.name} delay={i * 0.08}>
                <Link href="/platforms" className="work-card group block" aria-label={`${w.name} — ${w.tag}`}>
                  <div className="scan relative aspect-[4/5] overflow-hidden bg-[#121214]">
                    <Image src={workImages[i]} alt={w.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                    <span className="font-display absolute left-5 top-4 text-6xl text-white/25 transition-colors group-hover:text-violet-300">0{i + 1}</span>
                    <span className="font-tech absolute right-5 top-6 text-[10px] uppercase tracking-[0.22em] text-white/70">{w.tag}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-white/12 py-5">
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#f4f1eb] md:text-3xl">{w.name}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-white/55">{w.desc}</p>
                    </div>
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="04" eyebrow={h.indexEyebrow} title={h.indexTitle} accent={h.indexAccent} lede={h.indexLede} />
          </Reveal>
          <div className="mt-12 border-t border-white/12">
            {h.indexRows.map((r, i) => (
              <Link key={r.title} href={r.href} className="index-row group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/12 py-7 md:grid-cols-[80px_1fr_1fr_auto] md:gap-10 md:py-9">
                <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                <span className="font-display text-3xl uppercase tracking-wide text-[#f4f1eb] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-6xl">
                  {r.title}
                </span>
                <span className="font-tech col-span-3 text-[10px] uppercase tracking-[0.22em] text-white/45 md:col-span-1 md:text-xs">{r.meta}</span>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600 sm:inline-flex">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="noise relative overflow-hidden border-t border-white/12 bg-[#0a0a0b]">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading index="05" eyebrow={h.processEyebrow} title={h.processTitle} accent={h.processAccent} lede={h.processLede} />
          </Reveal>
          <Reveal delay={0.08}>
            <ProcessAccordion />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/12 bg-[#0d0d10]">
        <div className="py-10">
          <p className="font-tech mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
            {h.partnersLabel}
          </p>
          <Marquee slow items={["Telkom Indonesia", "Biznet", "DCI Indonesia", "NTT Indonesia", "AWS", "Google Cloud", "Alibaba Cloud", "Equinix"]} />
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-10 border-t border-white/12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="scan relative aspect-[16/10] overflow-hidden">
              <Image src={img.tower} alt="Jakarta corporate towers" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/30 mix-blend-multiply" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="06">{h.companyEyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-4xl uppercase leading-[0.95] tracking-wide text-[#f4f1eb] sm:text-5xl">
              {h.companyTitleA} <em className="font-serif-accent normal-case tracking-normal text-violet-300">{h.companyAccent}</em>
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-white/60">{h.companyBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#f4f1eb] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-violet-500 hover:text-white">
                {h.ourStory} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:border-violet-500 hover:bg-violet-600">
                {site.email}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
