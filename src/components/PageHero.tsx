import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "./Section";

export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0B0618]">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-violet-700/30 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {lede}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        <nav className="mt-8 text-xs text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-300">{eyebrow}</span>
        </nav>
      </div>
    </section>
  );
}
