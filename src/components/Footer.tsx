"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function Footer() {
  const { d } = useLanguage();
  const f = d.footer;
  const solutionHrefs = ["/platforms", "/platforms", "/cybersecurity", "/consulting", "/green-energy", "/procurement"];

  return (
    <footer className="noise relative overflow-hidden border-t border-white/10 bg-[#08070c]">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <p className="font-tech text-[11px] uppercase tracking-[0.3em] text-violet-400">
          [ {f.working} ]
        </p>
        <Link href="/contact" className="group mt-4 block" aria-label={f.cta}>
          <span className="font-display block text-[19vw] uppercase leading-[0.85] text-[#f4f1eb] transition-colors duration-300 group-hover:text-violet-300 md:text-[11rem] lg:text-[13rem]">
            {f.cta}
          </span>
          <span className="mt-4 flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </span>
            <span className="font-tech text-xs uppercase tracking-[0.25em] text-white/60">
              {f.enquire}
            </span>
          </span>
        </Link>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-20 w-20" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">{f.desc}</p>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">{f.solutions}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {f.solutionsLinks.map((label, i) => (
                <li key={label}><Link className="transition-colors hover:text-white" href={solutionHrefs[i]}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">{f.company}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {d.navHrefs.map((href, i) => (
                <li key={href}><Link className="transition-colors hover:text-white" href={href}>{d.nav[i]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-tech text-[11px] uppercase tracking-[0.25em] text-white/40">{f.enquiries}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a className="text-violet-300 hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="leading-6 text-white/55">{site.address}</li>
              <li><a href={site.mapsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">Google Maps ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-5 font-tech text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {site.name} — {f.rights}</p>
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <p>vgi.web.id — Jakarta, Indonesia</p>
          </div>
          <a href="#top" className="hover:text-white">{f.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}
