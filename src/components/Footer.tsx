"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function Footer() {
  const { d, lang } = useLanguage();
  const f = d.footer;

  return (
    <footer className="noise relative overflow-hidden border-t border-stone-900/10 bg-[#F5EFE1] dark:border-white/10 dark:bg-[#08070c]">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-700 dark:text-violet-400">
            {f.working}
          </p>
          <Link href="/contact" className="font-tech inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-950 dark:text-white/70 dark:hover:text-white">
            {f.cta} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <Link href="/contact" className="group mt-4 block" aria-label={f.cta}>
          <span className="font-display block text-[19vw] uppercase leading-[0.85] text-[#141419] transition-colors duration-300 group-hover:text-violet-700 md:text-[11rem] lg:text-[13rem] dark:text-[#f4f1eb] dark:group-hover:text-violet-300">
            {f.cta}
          </span>
        </Link>
        <p className="font-tech mt-4 text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-white/60">
          {f.enquire}
        </p>

        <div className="mt-14 grid gap-10 border-t border-stone-900/10 pt-10 md:grid-cols-3 dark:border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <div className="leading-none">
                <p className="font-display text-xl tracking-wide text-[#141419] dark:text-[#f4f1eb]">VIOLET</p>
                <p className="font-tech mt-1 text-[9px] tracking-[0.28em] text-stone-500 dark:text-white/50">GLOBAL INDONESIA</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-stone-600 dark:text-white/55">{f.desc}</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-stone-500 dark:text-white/40">{f.solutions}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-700 dark:text-white/70">
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/platforms">{f.solutionsLinks[0]}</Link></li>
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/platforms">{f.solutionsLinks[1]}</Link></li>
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/cybersecurity">{f.solutionsLinks[2]}</Link></li>
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/consulting">{f.solutionsLinks[3]}</Link></li>
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/green-energy">{f.solutionsLinks[4]}</Link></li>
              <li><Link className="transition-colors hover:text-violet-700 dark:hover:text-white" href="/procurement">{f.solutionsLinks[5]}</Link></li>
            </ul>
          </nav>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-stone-500 dark:text-white/40">{f.enquiries}</h3>
            <ul className="mt-4 space-y-2 text-sm text-stone-700 dark:text-white/70">
              <li><a className="text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="leading-6 text-stone-600 dark:text-white/55">
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-violet-700 dark:hover:text-white">
                  {site.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-900/10 dark:border-white/10">
        <div className="font-tech mx-auto flex max-w-[1600px] flex-col gap-2 px-5 py-5 text-[10px] uppercase tracking-[0.2em] text-stone-500 sm:flex-row sm:items-center sm:justify-between md:px-10 dark:text-white/35">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-violet-700 dark:hover:text-white">
              {lang === "id" ? "Privasi" : "Privacy"}
            </Link>
            <Link href="/terms" className="hover:text-violet-700 dark:hover:text-white">
              {lang === "id" ? "Ketentuan" : "Terms"}
            </Link>
            <a href="#top" className="hover:text-violet-700 dark:hover:text-white">{f.backToTop}</a>
          </p>
          <p>vgi.web.id</p>
        </div>
      </div>
    </footer>
  );
}
