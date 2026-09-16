"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { d } = useLanguage();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = d.navHrefs.map((href, i) => ({ href, label: d.nav[i] as string }));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] mix-blend-normal">
        <div className="border-b border-white/10 bg-[#0a0a0b]/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-[72px] md:px-10">
            <Link href="/" className="flex items-center gap-3" aria-label="Violet home">
              <Logo className="h-11 w-11" />
            </Link>

            <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
              {links.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-tech text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    pathname?.startsWith(item.href) ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  [{item.label}]
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageToggle className="hidden sm:flex" />
              <Link
                href="/contact"
                className="font-tech hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white lg:inline-flex"
              >
                {d.letsTalk} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? d.close : d.menu}
                aria-expanded={open}
                className="group flex h-11 cursor-pointer items-center gap-3 border border-white/20 px-5 transition-colors hover:border-violet-500 hover:bg-violet-600"
              >
                <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-white">
                  {open ? d.close : d.menu}
                </span>
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-[5.5px] h-px w-full bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="noise fixed inset-0 z-[55] flex flex-col bg-[#0c0716]/[.985] pt-24 backdrop-blur-xl"
          >
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <nav className="relative mx-auto grid w-full max-w-[1600px] flex-1 content-center gap-1 overflow-y-auto px-5 md:px-10" aria-label="Menu">
              <Link
                href="/"
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-white/10 py-3 md:py-4"
              >
                <span className="font-tech text-xs text-violet-400">00</span>
                <span className="font-display text-5xl uppercase leading-none text-[#f4f1eb] transition-all duration-300 group-hover:translate-x-3 group-hover:text-violet-300 md:text-7xl">
                  {d.index}
                </span>
              </Link>
              {links.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-3 md:py-4"
                  >
                    <span className="font-tech text-xs text-violet-400">0{i + 1}</span>
                    <span className="font-display text-5xl uppercase leading-none text-[#f4f1eb] transition-all duration-300 group-hover:translate-x-3 group-hover:text-violet-300 md:text-7xl">
                      {item.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-7 w-7 shrink-0 text-white/30 transition-all duration-300 group-hover:text-violet-300 md:h-9 md:w-9" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative border-t border-white/10">
              <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-5 font-tech text-[11px] uppercase tracking-[0.2em] text-white/50 sm:flex-row sm:items-center sm:justify-between md:px-10">
                <span>{d.coords}</span>
                <div className="flex items-center gap-4">
                  <LanguageToggle />
                  <a href={`mailto:${site.email}`} className="text-violet-300 hover:text-white">
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
