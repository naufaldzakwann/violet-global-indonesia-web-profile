"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
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
        <div className="border-b border-stone-900/10 bg-[#FAF6EE]/95 shadow-[0_1px_0_rgb(0_0_0/0.05)] backdrop-blur-md dark:border-white/10 dark:bg-[#0a0a0b]/80 dark:shadow-none">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-[72px] md:px-10">
            <Link href="/" className="flex items-center gap-3" aria-label="Violet home">
              <Logo className="h-11 w-11" />
              <span className="leading-none">
                <span className="font-display block text-lg tracking-wide text-[#141419] dark:text-[#f4f1eb]">
                  VIOLET
                </span>
                <span className="font-tech block text-[9px] tracking-[0.28em] text-stone-500 dark:text-white/50">
                  GLOBAL INDONESIA
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
              {links.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-tech text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    pathname?.startsWith(item.href)
                      ? "text-stone-900 dark:text-white"
                      : "text-stone-500 hover:text-stone-900 dark:text-white/55 dark:hover:text-white"
                  }`}
                >
                  [{item.label}]
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageToggle className="hidden sm:flex" />
              <ThemeToggle className="hidden h-9 w-9 sm:inline-flex" />
              <Link
                href="/contact"
                className="font-tech hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-stone-600 transition-colors hover:text-stone-950 lg:inline-flex dark:text-white/80 dark:hover:text-white"
              >
                {d.letsTalk} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? d.close : d.menu}
                aria-expanded={open}
                className="group flex h-11 cursor-pointer items-center gap-3 border border-transparent bg-[#17171d] px-5 text-white transition-colors hover:border-violet-500 hover:bg-violet-600 dark:border-white/25 dark:bg-transparent dark:text-white"
              >
                <span className="font-tech text-[11px] uppercase tracking-[0.25em]">
                  {open ? d.close : d.menu}
                </span>
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-[5.5px] h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
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
            className="noise fixed inset-0 z-[55] flex flex-col bg-[#FAF6EE]/[.98] pt-24 backdrop-blur-xl dark:bg-[#0c0716]/[.985]"
          >
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <nav className="relative mx-auto flex w-full min-h-0 max-w-[1600px] flex-1 flex-col overflow-y-auto px-5 py-4 md:px-10" aria-label="Menu">
              <div className="my-auto flex flex-col">
              <Link
                href="/"
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-stone-900/10 py-3 dark:border-white/10"
              >
                <span className="font-display text-5xl uppercase leading-none text-[#141419] transition-all duration-300 group-hover:translate-x-3 group-hover:text-violet-700 md:text-6xl 2xl:text-7xl dark:text-[#f4f1eb] dark:group-hover:text-violet-300">
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
                    className="group flex items-baseline gap-4 border-b border-stone-900/10 py-3 dark:border-white/10"
                  >
                    <span className="font-display text-4xl uppercase leading-none text-[#141419] transition-all duration-300 group-hover:translate-x-3 group-hover:text-violet-700 sm:text-5xl md:text-6xl 2xl:text-7xl dark:text-[#f4f1eb] dark:group-hover:text-violet-300">
                      {item.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-7 w-7 shrink-0 text-stone-400 transition-all duration-300 group-hover:text-violet-700 md:h-9 md:w-9 dark:text-white/30 dark:group-hover:text-violet-300" />
                  </Link>
                </motion.div>
              ))}
              </div>
            </nav>
            <div className="relative border-t border-stone-900/10 dark:border-white/10">
              <div className="font-tech mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-5 text-[11px] uppercase tracking-[0.2em] text-stone-500 sm:flex-row sm:items-center sm:justify-between md:px-10 dark:text-white/50">
                <span>vgi.web.id</span>
                <div className="flex items-center gap-4">
                  <LanguageToggle />
                  <ThemeToggle className="h-9 w-9" />
                  <a href={`mailto:${site.email}`} className="text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-white">
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
