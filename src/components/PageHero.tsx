import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Day / Night hero concept:
 * - Light (day shift): cream paper, ink display type, photo as a framed field panel.
 * - Dark (night shift): full-bleed cinematic photo with violet grade.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  image,
  children,
  crumbHome = "Index",
  localeTag = "vgi.web.id",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  children?: ReactNode;
  crumbHome?: string;
  localeTag?: string;
}) {
  return (
    <section
      className={`noise relative flex flex-col justify-end overflow-hidden bg-[#FAF6EE] dark:bg-[#0a0a0b] ${image ? "min-h-[92svh]" : "min-h-[64svh]"}`}
    >
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-violet-500/15 blur-[130px] dark:bg-violet-600/20" aria-hidden="true" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <p className="font-tech flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-violet-700 dark:text-violet-300">
          {eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-6xl text-[12vw] break-words uppercase leading-[0.9] tracking-wide text-balance text-[#141419] sm:text-7xl lg:text-8xl dark:text-[#f4f1eb]">
          {title}{" "}
          {accent && <em className="font-serif-accent normal-case tracking-normal text-violet-700 dark:text-violet-300">{accent}</em>}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8 dark:text-white/70">{lede}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}

        {/* Field panel — same structure in both modes */}
        {image && (
        <div className="relative mt-10 aspect-[16/7] overflow-hidden border border-stone-900/10 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)] dark:border-white/15 dark:shadow-[0_30px_90px_-30px_rgb(124_58_237/0.3)]">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
        </div>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-stone-900/10 pt-5 font-tech text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:border-white/15 dark:text-white/45">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-violet-700 dark:hover:text-white">{crumbHome}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-stone-700 dark:text-white/70">{eyebrow}</span>
          </nav>
          <span className="hidden sm:block">{localeTag}</span>
        </div>
      </div>
    </section>
  );
}
