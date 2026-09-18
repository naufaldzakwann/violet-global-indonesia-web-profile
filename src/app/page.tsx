"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { SectionHeading } from "@/components/Section";
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
        .fromTo(".h-line > span", { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: 0.1 }, 0.25);
      gsap.to(".h-title", {
        yPercent: -18, opacity: 0.3, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".h-bg", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="noise relative overflow-hidden bg-[#FAF6EE] dark:bg-[#0a0a0b]">
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-violet-500/15 blur-[130px] dark:bg-violet-600/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-24 h-96 w-96 rounded-full bg-emerald-400/15 blur-[130px] dark:bg-emerald-500/15" aria-hidden="true" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pt-24 md:px-10">
        <p className="h-fade max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8 dark:text-white/70">
          {h.heroSub}
        </p>

        <h1 className="h-title mt-6 max-w-6xl">
          <span className="h-line block overflow-hidden pb-1">
            <span className="font-display block text-[12vw] uppercase leading-[1.02] tracking-wide text-[#141419] sm:text-[11vw] md:text-[10vw] dark:text-[#f4f1eb]">
              {titleA}
            </span>
          </span>
          <span className="h-line block overflow-hidden pb-2">
            <span className="font-display block text-[12vw] uppercase leading-[1.02] tracking-wide text-[#141419] sm:text-[11vw] md:text-[10vw] dark:text-[#f4f1eb]">
              <span className="text-stroke-violet">{titleB1}</span>{titleB2}
            </span>
          </span>
        </h1>

        <div className="h-fade mt-8">
          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 bg-[#17171d] px-7 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white"
          >
            {h.heroCta} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="h-bg relative mt-12 aspect-[16/10] overflow-hidden border border-stone-900/10 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)] md:aspect-[16/7] dark:border-white/15 dark:shadow-[0_30px_90px_-30px_rgb(124_58_237/0.35)]">
          <Image src={img.hero} alt="Modern corporate towers" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
        </div>
      </div>
      <div className="h-6 md:h-10" aria-hidden="true" />
    </section>
  );
}

function ProcessAccordion() {
  const { d } = useLanguage();
  const [active, setActive] = useState("");
  return (
    <div className="mt-10 border-t border-stone-900/10 dark:border-white/12">
      {d.home.processSteps.map((p) => {
        const isOpen = active === p.title;
        return (
          <div key={p.title} className={isOpen ? "acc-open" : ""}>
            <button
              onClick={() => setActive(isOpen ? "" : p.title)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-center gap-5 border-b border-stone-900/10 py-6 text-left md:gap-10 dark:border-white/12"
            >
              <span className={`font-display flex-1 text-3xl uppercase tracking-wide transition-colors md:text-5xl ${isOpen ? "text-[#141419] dark:text-white" : "text-stone-500 hover:text-[#141419] dark:text-white/60 dark:hover:text-white"}`}>
                {p.title}
              </span>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-violet-500 bg-violet-600" : "border-stone-900/20 dark:border-white/25"}`}>
                <Plus className="h-4 w-4 text-stone-900 dark:text-white" />
              </span>
            </button>
            <div className="acc-body">
              <div className="acc-inner">
                <p className="max-w-3xl pb-8 pr-4 leading-7 text-stone-600 md:text-lg md:leading-8 dark:text-white/60">
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

      <div className="border-y border-stone-900/10 bg-[#EFE7D3] py-5 dark:border-white/12 dark:bg-[#0c0716]">
        <Marquee items={[...h.ticker]} outline />
      </div>

      <section className="noise relative bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <p className="mt-8 max-w-6xl text-3xl font-medium leading-[1.25] tracking-tight text-balance text-[#141419] md:text-5xl md:leading-[1.15] dark:text-[#f4f1eb]">
              {h.manifestoA} <em className="font-serif-accent text-violet-700 dark:text-violet-300">{h.manifestoAccent}</em>{" "}
              {h.manifestoB} <span className="text-stone-500 dark:text-white/40">{h.manifestoC}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {h.stats.map(([k, v]) => (
                <div key={v} className="border-t-2 border-stone-900/80 pt-5 dark:border-white/70">
                  <dt className="font-display text-4xl tracking-wide text-[#141419] md:text-5xl dark:text-white">{k}</dt>
                  <dd className="font-tech mt-3 text-[10px] uppercase leading-5 tracking-[0.2em] text-stone-500 dark:text-white/45">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-stone-900/10 bg-[#F3EDE1] dark:border-white/12 dark:bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={h.creedTitle} accent={h.creedAccent} />
          </Reveal>
          <div className="mt-6">
            {h.creed.map((c, i) => (
              <Reveal key={c.word} delay={i * 0.06}>
                <div className={`border-t border-stone-900/10 py-10 md:py-14 dark:border-white/12 ${i % 2 === 1 ? "lg:ml-[18%]" : "lg:mr-[18%]"}`}>
                  <h3 className="font-display text-4xl uppercase tracking-wide text-[#141419] md:text-6xl dark:text-[#f4f1eb]">{c.word}</h3>
                  <p className="mt-4 max-w-2xl text-[15px] leading-7 text-stone-600 md:text-lg md:leading-8 dark:text-white/60">{c.body}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-stone-900/10 dark:border-white/12" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="border-t border-stone-900/10 bg-[#FAF6EE] dark:border-white/12 dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading title={h.worksTitle} accent={h.worksAccent} />
              <Link href="/platforms" className="group hidden items-center gap-2 border border-stone-900/20 px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-all hover:border-violet-500 hover:bg-violet-600 hover:text-white md:inline-flex dark:border-white/25 dark:text-white">
                {h.allPlatforms} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
            <Reveal className="lg:col-span-2">
              <Link href="/platforms" className="work-card group grid overflow-hidden border border-stone-900/10 bg-white transition-shadow hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.35)] md:grid-cols-2 dark:border-white/12 dark:bg-[#101014]" aria-label={h.works[0].name}>
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                  <Image src={workImages[0]} alt={h.works[0].name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-violet-700 dark:text-violet-300">{h.works[0].tag}</p>
                  <h3 className="font-display mt-3 text-3xl uppercase tracking-wide text-[#141419] md:text-4xl dark:text-[#f4f1eb]">{h.works[0].name}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-stone-600 dark:text-white/55">{h.works[0].desc}</p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 font-tech text-[11px] uppercase tracking-[0.22em] text-stone-900 dark:text-white">
                    {h.allPlatforms} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
            {h.works.slice(1).map((w, i) => (
              <Reveal key={w.name} delay={i * 0.08}>
                <Link href="/platforms" className="work-card group block" aria-label={w.name}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-[#121214]">
                    <Image src={workImages[i + 1]} alt={w.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <p className="font-tech mt-5 text-[10px] uppercase tracking-[0.25em] text-violet-700 dark:text-violet-300">{w.tag}</p>
                  <h3 className="font-display mt-2 text-2xl uppercase tracking-wide text-[#141419] md:text-3xl dark:text-[#f4f1eb]">{w.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-white/55">{w.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-900/10 bg-[#F3EDE1] dark:border-white/12 dark:bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={h.indexTitle} accent={h.indexAccent} lede={h.indexLede} />
          </Reveal>
          <div className="mt-12 border-t-2 border-stone-900/80 dark:border-white/70">
            {h.indexRows.map((r) => (
              <Link key={r.title} href={r.href} className="index-row group grid grid-cols-[1fr_auto] items-center gap-5 py-7 md:grid-cols-[1fr_1fr_auto] md:gap-10 md:py-9">
                <span className="font-display text-3xl uppercase tracking-wide text-[#141419] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-6xl dark:text-[#f4f1eb]">
                  {r.title}
                </span>
                <span className="font-tech col-span-2 text-[10px] uppercase tracking-[0.22em] text-stone-500 md:col-span-1 md:text-xs dark:text-white/45">{r.meta}</span>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-stone-900/20 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600 group-hover:text-white sm:inline-flex dark:border-white/25 dark:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-stone-900/10 bg-[#EDF5E9] dark:border-white/12 dark:bg-[#07130d]">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-emerald-400/25 blur-[130px] dark:bg-emerald-500/20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-violet-500/15 blur-[120px] dark:bg-violet-600/25" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden border border-stone-900/10 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.4)] dark:border-white/15">
              <Image src={img.solar} alt="Solar photovoltaic array under daylight" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-balance text-[#141419] sm:text-5xl dark:text-[#f4f1eb]">
              {h.energyTitle}{" "}
              <em className="font-serif-accent normal-case tracking-normal text-emerald-700 dark:text-emerald-300">{h.energyAccent}</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8 dark:text-white/65">{h.energyLede}</p>
            <div className="font-tech mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-emerald-800 dark:text-emerald-200/80">
              {h.energyMeta.map((m) => (
                <span key={m} className="border border-emerald-700/25 bg-emerald-500/10 px-3.5 py-1.5 dark:border-emerald-300/25 dark:bg-emerald-400/10">{m}</span>
              ))}
            </div>
            <Link href="/green-energy" className="mt-8 inline-flex items-center gap-2 bg-emerald-600 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-emerald-500 dark:bg-emerald-400 dark:text-black dark:hover:bg-emerald-300">
              {h.energyCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="noise relative overflow-hidden border-t border-stone-900/10 bg-[#FAF6EE] dark:border-white/12 dark:bg-[#0a0a0b]">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionHeading title={h.processTitle} accent={h.processAccent} lede={h.processLede} />
          </Reveal>
          <Reveal delay={0.08}>
            <ProcessAccordion />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-stone-900/10 bg-[#F3EDE1] dark:border-white/12 dark:bg-[#0d0d10]">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
          <Reveal>
            <p className="font-tech text-center text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-white/40">
              {h.partnersLabel}
            </p>
            <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-5 text-center md:grid-cols-4">
              {["Telkom Indonesia", "Biznet", "DCI Indonesia", "NTT Indonesia", "AWS", "Google Cloud", "Alibaba Cloud", "Equinix"].map((p) => (
                <li key={p} className="text-base font-semibold tracking-tight text-stone-700 md:text-lg dark:text-white/70">{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-10 border-t border-stone-900/10 px-5 py-20 md:px-10 lg:grid-cols-2 lg:items-center dark:border-white/12">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={img.city} alt="Metropolitan skyline from above" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-violet-950/20 mix-blend-multiply dark:bg-violet-950/30" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-[#141419] sm:text-5xl dark:text-[#f4f1eb]">
              {h.companyTitleA} <em className="font-serif-accent normal-case tracking-normal text-violet-700 dark:text-violet-300">{h.companyAccent}</em>
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-stone-600 dark:text-white/60">{h.companyBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#17171d] px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-violet-600 dark:bg-[#f4f1eb] dark:text-black dark:hover:bg-violet-500 dark:hover:text-white">
                {h.ourStory} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-stone-900/20 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-all hover:border-violet-500 hover:bg-violet-600 hover:text-white dark:border-white/25 dark:text-white">
                {site.email}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
