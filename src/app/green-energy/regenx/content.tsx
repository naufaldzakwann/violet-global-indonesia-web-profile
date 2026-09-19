"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Ban,
  CalendarDays,
  Check,
  Cog,
  Droplets,
  FlaskConical,
  Fuel,
  Globe,
  Leaf,
  MapPin,
  Recycle,
  Sprout,
  Truck,
  Users,
  Wind,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { img } from "@/lib/site";

/* Poster-derived palette: deep pine green panels + bright emerald accents on the site's cream/ink system. */
const PINE = "bg-[#12382D] dark:bg-[#0c2a21]";

function Wordmark({ tagline }: { tagline: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center bg-emerald-600 text-white">
        <Leaf className="h-5 w-5" aria-hidden="true" />
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
      </span>
      <span>
        <span className="font-display block text-2xl uppercase leading-none tracking-wide text-[#141419] dark:text-[#f4f1eb]">
          E3i <span className="text-emerald-700 dark:text-emerald-400">RegenX</span>
        </span>
        <span className="font-tech mt-1 block text-[9px] uppercase tracking-[0.3em] text-stone-500 dark:text-white/45">
          {tagline}
        </span>
      </span>
    </div>
  );
}

function CheckBadge() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white" aria-hidden="true">
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

/* Recycle-number chip like the poster's plastic-type markers */
function ResinNumber({ n }: { n: string }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-emerald-700/70 font-display text-base text-emerald-800 dark:border-emerald-400/70 dark:text-emerald-300" aria-hidden="true">
      {n}
      <Recycle className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#FAF6EE] p-0.5 text-emerald-700 dark:bg-[#0a0a0b] dark:text-emerald-400" />
    </span>
  );
}

export default function RegenxContent() {
  const { d } = useLanguage();
  const r = d.regenx;
  const flowIcons = [Recycle, FlaskConical, Droplets];
  const impactIcons = [Sprout, Recycle, Wind, Users, Globe];
  const statIcons = [Truck, CalendarDays, Recycle, Fuel, Cog, MapPin];

  return (
    <>
      {/* ============ HERO — poster top board ============ */}
      <section className="noise relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px] dark:bg-emerald-500/20" aria-hidden="true" />
        <div className="hero-grid absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 pt-24 md:px-10 md:pt-32">
          {/* brand bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-stone-900/10 pb-6 dark:border-white/12">
            <Wordmark tagline={r.tagline} />
            <p className="font-tech max-w-xs text-right text-[10px] uppercase leading-5 tracking-[0.28em] text-stone-500 dark:text-white/45">
              {r.turningLabel}
              <span className="mt-2 block h-px w-16 bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
            </p>
          </div>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="font-tech flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {r.heroKicker} <span className="text-stone-400 dark:text-white/35">/ {r.heroEyebrow}</span>
              </p>
              <h1 className="font-display mt-5 text-[15vw] uppercase leading-[0.9] tracking-wide text-[#141419] sm:text-8xl lg:text-[7.5rem] dark:text-[#f4f1eb]">
                {r.heroTitle}
              </h1>
              <p className="font-display mt-2 text-[7.5vw] uppercase leading-none tracking-wide text-emerald-700 sm:text-5xl lg:text-6xl dark:text-emerald-400">
                {r.heroSubtitle}
              </p>
              <p className="mt-6 text-sm font-semibold tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                {r.heroLocation}
                <span className="mx-3 font-normal text-stone-400 dark:text-white/30" aria-hidden="true">|</span>
                <span className="text-stone-600 dark:text-white/60">{r.heroMeta}</span>
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8 dark:text-white/65">
                {r.heroDesc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-600 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-emerald-500 dark:bg-emerald-400 dark:text-black dark:hover:bg-emerald-300"
                >
                  {r.heroCta} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/green-energy"
                  className="inline-flex items-center gap-2 border border-stone-900/20 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-[#141419] transition-colors hover:border-emerald-700 hover:text-emerald-800 dark:border-white/25 dark:text-white/85 dark:hover:border-emerald-300 dark:hover:text-emerald-300"
                >
                  {d.green.heroEyebrow} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* facility panel */}
            <div className="relative aspect-[4/3] overflow-hidden border border-stone-900/10 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.4)] lg:aspect-[16/11] dark:border-white/15">
              <Image src={img.regenxLab} alt="Process engineering laboratory for the E3i RegenX plastics-to-fuel program" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12382D]/70 via-transparent to-transparent" aria-hidden="true" />
              <p className="font-tech absolute bottom-4 left-4 right-4 text-[10px] uppercase leading-4 tracking-[0.2em] text-white/90">
                {r.heroLocation}
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-stone-900/10 pt-5 font-tech text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:border-white/15 dark:text-white/45">
            <nav aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-emerald-700 dark:hover:text-white">{d.index}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/green-energy" className="transition-colors hover:text-emerald-700 dark:hover:text-white">{d.green.heroEyebrow}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-stone-700 dark:text-white/70">{r.brand}</span>
            </nav>
            <span className="hidden sm:block">{d.localeTag}</span>
          </div>
        </div>
      </section>

      {/* ============ STAT BAND — poster deep-green strip ============ */}
      <section className={`${PINE} relative overflow-hidden`}>
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-16 md:px-10">
          <p className="font-tech mb-8 text-[10px] uppercase tracking-[0.3em] text-emerald-300/80">{r.statsLabel}</p>
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {r.stats.map(([num, unit, label], i) => {
              const Icon = statIcons[i];
              return (
                <div key={label} className={`${PINE} p-6`}>
                  <Icon className="h-6 w-6 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />
                  <p className="font-display mt-4 text-3xl uppercase leading-none tracking-wide text-white md:text-4xl xl:text-[2.6rem]">{num}</p>
                  <p className="font-tech mt-2 text-[10px] uppercase tracking-[0.2em] text-emerald-300">{unit}</p>
                  <p className="mt-2 text-xs leading-5 text-white/55">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CHALLENGE / SOLUTION / TARGET / OUTPUT ============ */}
      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {/* Tantangan */}
            <Reveal>
              <div className="flex h-full flex-col border-t-2 border-emerald-700/70 pt-5 dark:border-emerald-400/70">
                <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                  {r.challengeTitle}
                  <span className="mt-1 block text-sm tracking-[0.08em] text-emerald-700 dark:text-emerald-400">{r.challengeSub}</span>
                </h2>
                <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-white/60">{r.challengeBody}</p>
                <div className="relative mt-6 flex-1 basis-40 overflow-hidden">
                  <Image src={img.plasticBales} alt="Baled post-consumer PET bottles awaiting conversion" fill sizes="(max-width:1280px) 100vw, 25vw" className="object-cover" />
                </div>
                <p className="mt-2 text-[10px] leading-4 text-stone-500 dark:text-white/35">
                  Photo: Grendelkhan, CC BY-SA 4.0, via{" "}
                  <a className="underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300" href="https://commons.wikimedia.org/wiki/File:Bales_of_PET_bottles_closeup.jpg" target="_blank" rel="noreferrer">
                    Wikimedia Commons
                  </a>
                </p>
              </div>
            </Reveal>

            {/* Solusi */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col border-t-2 border-emerald-700/70 pt-5 dark:border-emerald-400/70">
                <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                  {r.solutionTitle}
                  <span className="mt-1 block text-sm tracking-[0.08em] text-emerald-700 dark:text-emerald-400">{r.solutionSub}</span>
                </h2>
                <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-white/60">{r.solutionBody}</p>

                {/* process flow */}
                <div className="mt-8 flex flex-col items-start">
                  {r.flow.map((step, i) => {
                    const Icon = flowIcons[i];
                    const isLast = i === r.flow.length - 1;
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                          <span className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border ${i === 2 ? "bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600" : "bg-[#12382D] dark:bg-[#0c2a21]"} border-stone-900/10 dark:border-white/15`}>
                            {i === 0 && <Image src={img.plasticBales} alt="" fill sizes="80px" className="object-cover" />}
                            {i === 1 && <Image src={img.thermalPlant} alt="" fill sizes="80px" className="object-cover opacity-90" />}
                            {i === 2 && <Droplets className="h-7 w-7 text-white drop-shadow" aria-hidden="true" />}
                            {i < 2 && <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-2"><Icon className="h-4 w-4 text-emerald-300" aria-hidden="true" /></span>}
                          </span>
                          <span className="font-tech text-[10px] uppercase leading-4 tracking-[0.14em] text-stone-700 dark:text-white/70">{step}</span>
                        </div>
                        {!isLast && <ArrowDown className="my-2 h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Jenis plastik target */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col border-t-2 border-emerald-700/70 pt-5 dark:border-emerald-400/70">
                <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                  {r.targetTitle}
                </h2>
                <ul className="mt-6 space-y-4">
                  {r.targets.map(([n, name]) => (
                    <li key={name} className="flex items-center gap-4 border-b border-stone-900/10 pb-4 dark:border-white/12">
                      <ResinNumber n={n} />
                      <span className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border border-red-700/30 bg-red-500/5 p-4 dark:border-red-400/30">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-300">
                    <Ban className="h-4 w-4" aria-hidden="true" /> {r.pvcTitle}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-red-800/80 dark:text-red-200/70">{r.pvcNote}</p>
                </div>
              </div>
            </Reveal>

            {/* Hasil akhir */}
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col border-t-2 border-emerald-700/70 pt-5 dark:border-emerald-400/70">
                <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                  {r.outputTitle}
                  <span className="mt-1 block text-sm tracking-[0.08em] text-emerald-700 dark:text-emerald-400">{r.outputSub}</span>
                </h2>
                <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600">
                  <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" aria-hidden="true" />
                  <span className="absolute right-4 top-4 h-10 w-10 rounded-full bg-emerald-500/70 blur-[2px]" aria-hidden="true" />
                  <span className="absolute left-6 bottom-6 h-6 w-6 rounded-full bg-amber-200/70 blur-[1px]" aria-hidden="true" />
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 border border-white/40 bg-black/10 px-5 py-3 backdrop-blur-[2px]">
                    <Droplets className="h-7 w-7 text-white drop-shadow" aria-hidden="true" />
                    <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-white">≈ Diesel</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {r.outputChecks.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-6 text-stone-600 dark:text-white/70">
                      <CheckBadge /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ BUSINESS MODEL + FINANCIALS ============ */}
      <section className="border-t border-stone-900/10 bg-[#F3EDE1] dark:border-white/12 dark:bg-[#0d0d10]">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.2fr]">
          {/* Model bisnis */}
          <Reveal>
            <div>
              <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">{r.bizTitle}</p>
              <div className="mt-8 border-t border-stone-900/10 dark:border-white/12">
                {r.biz.map(([t, desc]) => (
                  <div key={t} className="border-b border-stone-900/10 py-7 dark:border-white/12">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-[#141419] dark:text-[#f4f1eb]">{t}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-white/60">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="font-serif-accent mt-6 max-w-md text-lg text-emerald-800 dark:text-emerald-300">{r.bizNote}</p>
            </div>
          </Reveal>

          {/* Gambaran finansial */}
          <Reveal delay={0.08}>
            <div>
              <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
                {r.finTitle} <span className="text-stone-500 dark:text-white/40">{r.finTag}</span>
              </p>
              <div className="mt-8 border border-stone-900/15 dark:border-white/15">
                {r.fin.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-stone-900/[0.03] dark:bg-white/[0.04]" : ""} ${i === r.fin.length - 1 ? "border-t-2 border-emerald-700/60 bg-emerald-500/[0.07] dark:border-emerald-400/60 dark:bg-emerald-400/[0.08]" : "border-b border-stone-900/10 dark:border-white/12"}`}
                  >
                    <span className={`text-sm leading-6 ${i === r.fin.length - 1 ? "font-semibold text-emerald-900 dark:text-emerald-200" : "text-stone-700 dark:text-white/70"}`}>{label}</span>
                    <span className={`font-display text-xl tracking-wide ${i === r.fin.length - 1 ? "text-emerald-800 dark:text-emerald-300" : "text-[#141419] dark:text-[#f4f1eb]"}`}>{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-lg text-xs leading-5 text-stone-500 dark:text-white/40">{r.finDisclaimer}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ DAMPAK POSITIF ============ */}
      <section className="bg-[#FAF6EE] dark:bg-[#0a0a0b]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-[#141419] sm:text-5xl dark:text-[#f4f1eb]">
              {r.impactTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-stone-900/10 bg-stone-900/10 sm:grid-cols-2 lg:grid-cols-5 dark:border-white/12 dark:bg-white/12">
            {r.impact.map((item, i) => {
              const Icon = impactIcons[i];
              return (
                <Reveal key={item} delay={Math.min(i * 0.05, 0.2)} className="h-full">
                  <div className="flex h-full flex-col gap-4 bg-[#FAF6EE] p-6 dark:bg-[#0a0a0b]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-6 text-stone-700 dark:text-white/70">{item}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CLOSING — full-bleed poster finale ============ */}
      <section className="noise relative overflow-hidden">
        <Image src={img.indonesiaDawn} alt="" fill sizes="100vw" className="object-cover" priority={false} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12382D]/80 via-[#12382D]/45 to-[#0b241c]/90" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-between px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <p className="font-tech inline-flex items-center gap-2 border border-white/25 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" /> {r.closingPin}
            </p>
            <h2 className="font-display mt-8 text-[10vw] uppercase leading-[0.92] tracking-wide text-white sm:text-7xl">
              {r.closingTitle}
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-emerald-400 px-7 py-4 font-tech text-[11px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-300"
            >
              {r.heroCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-9 w-9 items-center justify-center bg-emerald-500 text-white"><Leaf className="h-4 w-4" aria-hidden="true" /></span>
              <span className="font-display text-lg uppercase tracking-wide text-white">E3i <span className="text-emerald-300">RegenX</span></span>
              <span className="font-tech hidden text-[9px] uppercase tracking-[0.25em] text-white/50 sm:block">
                {r.strip.join("  |  ")}
              </span>
            </div>
            <div className="bg-emerald-600 px-5 py-3 text-right">
              <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-white/80">{r.heroKicker}</p>
              <p className="font-display text-sm uppercase tracking-wide text-white">{r.badge}</p>
            </div>
          </div>
          <p className="font-tech text-[9px] uppercase tracking-[0.2em] text-white/30">
            Photos:{" "}
            <a className="underline underline-offset-2 hover:text-white/50" href="https://commons.wikimedia.org/wiki/File:INdustrial_piping.jpg" target="_blank" rel="noreferrer">
              Bitjungle
            </a>{" "}
            (CC BY-SA 3.0) &amp;{" "}
            <a className="underline underline-offset-2 hover:text-white/50" href="https://commons.wikimedia.org/wiki/File:Keindahan_alam_pagi_hari_di_pedesaan.jpg" target="_blank" rel="noreferrer">
              RahmadHimawan Photography
            </a>{" "}
            (CC BY-SA 4.0), via Wikimedia Commons
          </p>
        </div>
      </section>
    </>
  );
}
