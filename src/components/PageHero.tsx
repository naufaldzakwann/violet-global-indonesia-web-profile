import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({
  index,
  eyebrow,
  title,
  accent,
  lede,
  image,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="noise relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-[#0a0a0b]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/55 to-[#0a0a0b]/30" />
        <div className="absolute inset-0 bg-violet-950/25 mix-blend-multiply" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-10 pt-36 md:px-10">
        <p className="font-tech flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-violet-300">
          <span className="text-white/40">[{index}]</span> {eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-6xl text-[15vw] uppercase leading-[0.88] tracking-wide text-balance text-[#f4f1eb] sm:text-7xl lg:text-8xl">
          {title}{" "}
          {accent && <em className="font-serif-accent normal-case tracking-normal text-violet-300">{accent}</em>}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{lede}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5 font-tech text-[10px] uppercase tracking-[0.25em] text-white/45">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">Index</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/70">{eyebrow}</span>
          </nav>
          <span className="hidden sm:block">VGI — Jakarta, ID</span>
        </div>
      </div>
    </section>
  );
}
