"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const HOME_HERO_UNLOCK_EVENT = "violet:home-hero-unlock";

function createRandomRevealSchedule(ids: string[], start = 0, step = 70) {
  const shuffled = [...ids];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return Object.fromEntries(shuffled.map((id, index) => [id, start + index * step]));
}

const navLinks = [
  { href: "/home", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/case-study", key: "caseStudy" },
  { href: "/blog", key: "blog" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") {
      return "light";
    }

    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });
  const [homeNavUnlocked, setHomeNavUnlocked] = useState(false);
  const [revealSchedule, setRevealSchedule] = useState<Record<string, number>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "id" ? "en" : "id";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const isHome =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === `/${locale}/home` ||
    pathname === `/${locale}/home/`;
  const isDarkNav = isHome && !scrolled && !mobileOpen;
  const segments = pathname.split("/").filter(Boolean);
  const isPortfolioDetail = segments[0] === locale && segments[1] === "portfolio" && segments.length >= 3;
  const isCaseStudyDetail = segments[0] === locale && segments[1] === "case-study" && segments.length >= 3;

  useEffect(() => {
    const handleHeroUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ unlocked?: boolean }>;
      const unlocked = Boolean(customEvent.detail?.unlocked);
      setHomeNavUnlocked(unlocked);
      setRevealSchedule(
        unlocked
          ? createRandomRevealSchedule(
              ["brand", ...navLinks.map((link) => `link-${link.key}`), "locale", "wa", "cta", "menu"],
              0,
              80,
            )
          : {},
      );
      if (!customEvent.detail?.unlocked) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(HOME_HERO_UNLOCK_EVENT, handleHeroUnlock);
    return () => window.removeEventListener(HOME_HERO_UNLOCK_EVENT, handleHeroUnlock);
  }, []);

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`;
    return pathname === fullHref || (href !== "/home" && pathname.startsWith(`${fullHref}/`));
  };

  const shouldHideHomeNav = isHome && !homeNavUnlocked;
  const isThemeDark = theme === "dark";
  const useDarkChrome = isThemeDark;
  const shouldUseSolidNav = scrolled || mobileOpen || (useDarkChrome && !isHome);
  const getRevealProps = (id: string, fallbackDelay = 0) => ({
    className: cn("hero-nav-pop", (!isHome || homeNavUnlocked) && "is-visible"),
    style:
      isHome && homeNavUnlocked
        ? ({ animationDelay: `${revealSchedule[id] ?? fallbackDelay}ms` } as CSSProperties)
        : undefined,
  });

  if (isPortfolioDetail || isCaseStudyDetail) {
    return null;
  }

  const toggleTheme = () => {
    const nextTheme = isThemeDark ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("violet-theme", nextTheme);
  };

  return (
    <nav
      className={cn(
        "navbar-fixed transition-all duration-500",
        shouldHideHomeNav && "pointer-events-none -translate-y-6 opacity-0",
        shouldUseSolidNav
          ? (useDarkChrome ? "navbar-scrolled navbar-scrolled-dark" : "navbar-scrolled")
          : "bg-transparent",
      )}
    >
      <div className="section-container">
        <div className="flex h-18 items-center justify-between py-4">
          <Link
            href={`/${locale}/home`}
            onClick={() => window.scrollTo(0, 0)}
            className={cn("group relative flex items-center gap-3", getRevealProps("brand").className)}
            style={getRevealProps("brand").style}
          >
            <Image
              src="/favicon.svg"
              alt="Violet Global Indonesia"
              width={72}
              height={72}
              priority
              className={cn(
                "h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-[1.06] md:h-14 md:w-14",
                isDarkNav
                  ? "drop-shadow-[0_0_22px_rgba(168,85,247,0.72)]"
                  : "drop-shadow-[0_0_16px_rgba(168,85,247,0.36)]",
              )}
            />
            <div className="flex flex-col leading-tight md:hidden">
              <span
                className={cn(
                  "text-sm font-bold transition-colors duration-300",
                  isDarkNav ? "text-white" : (useDarkChrome ? "text-white" : "text-violet-900"),
                )}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Violet Global
              </span>
              <span
                className={cn(
                  "-mt-0.5 text-[10px] transition-colors duration-300",
                  isDarkNav ? "text-violet-200" : (useDarkChrome ? "text-violet-100/80" : "text-gray-500"),
                )}
              >
                Indonesia
              </span>
            </div>
            <div className="hidden flex-col leading-tight md:flex">
              <span
                className={cn(
                  "text-lg font-bold transition-colors duration-300",
                  isDarkNav ? "text-white" : (useDarkChrome ? "text-white" : "text-violet-900"),
                )}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Violet Global
              </span>
              <span
                className={cn(
                  "-mt-0.5 text-xs transition-colors duration-300",
                  isDarkNav ? "text-violet-200" : (useDarkChrome ? "text-violet-100/80" : "text-gray-500"),
                )}
              >
                Indonesia
              </span>
            </div>
            <div className="pointer-events-none absolute -left-2 top-1/2 hidden h-16 w-16 -translate-y-1/2 rounded-full bg-fuchsia-500/18 blur-2xl md:block" />
            <div className="pointer-events-none absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-cyan-400/12 blur-2xl md:block" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ href, key }, index) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                onClick={() => {
                  if (href === "/home") window.scrollTo(0, 0);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  getRevealProps(`link-${key}`, 100 + index * 55).className,
                  isActive(href)
                    ? (isDarkNav || useDarkChrome
                      ? "bg-[linear-gradient(135deg,rgba(124,58,237,0.24)_0%,rgba(59,130,246,0.18)_100%)] text-white shadow-[0_10px_28px_rgba(4,6,17,0.22),inset_0_1px_0_rgba(255,255,255,0.10)]"
                      : "bg-violet-50 text-violet-800")
                    : (isDarkNav || useDarkChrome
                      ? "text-violet-50 hover:bg-white/[0.08] hover:text-white"
                      : "text-gray-600 hover:bg-violet-50 hover:text-violet-800"),
                )}
                style={getRevealProps(`link-${key}`, 100 + index * 55).style}
              >
                {t(key as never)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={newPath}
              className={cn(
                "flex h-[2.2rem] min-w-[1.8rem] items-center justify-center rounded-[0.7rem] border px-2 text-[10px] font-semibold tracking-[0.06em] transition-all duration-300 md:hidden",
                getRevealProps("locale", 420).className,
                isDarkNav
                  ? "border-violet-400/50 text-violet-100 hover:bg-white/10 hover:text-white"
                  : useDarkChrome
                    ? "border-violet-200/20 bg-white/[0.05] text-white shadow-[0_10px_24px_rgba(4,6,17,0.18)] hover:bg-white/[0.09]"
                    : "border-violet-200 bg-white/90 text-violet-700 hover:bg-violet-50",
              )}
              style={getRevealProps("locale", 420).style}
            >
              {otherLocale.toUpperCase()}
            </Link>

            <Link
              href={newPath}
              className={cn(
                "hidden items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all duration-300 md:flex",
                getRevealProps("locale", 420).className,
                isDarkNav
                  ? "border-violet-400/50 text-violet-100 hover:bg-white/10 hover:text-white"
                  : useDarkChrome
                    ? "border-violet-200/20 bg-white/[0.05] text-white shadow-[0_10px_24px_rgba(4,6,17,0.18)] hover:bg-white/[0.09]"
                    : "border-violet-200 text-violet-700 hover:bg-violet-50",
              )}
              style={getRevealProps("locale", 420).style}
            >
              <Icon name="Globe" size={14} />
              {otherLocale.toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isThemeDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isThemeDark}
              className={cn(
                "hidden items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-300 md:inline-flex",
                getRevealProps("cta", 500).className,
                isDarkNav
                  ? "border-white/20 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.08)] hover:border-white/40 hover:bg-white/14"
                  : isThemeDark
                    ? "border-violet-200/20 bg-[linear-gradient(180deg,rgba(23,17,37,0.96)_0%,rgba(16,12,28,0.96)_100%)] text-white shadow-[0_16px_36px_rgba(4,6,17,0.30),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-violet-300/35 hover:bg-[#1d1530]"
                    : "border-violet-200 bg-white/90 text-violet-800 shadow-[0_10px_25px_rgba(76,29,149,0.08)] hover:bg-violet-50",
              )}
              style={getRevealProps("cta", 500).style}
            >
              <Icon name={isThemeDark ? "Sun" : "Moon"} size={16} />
              <span>{isThemeDark ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "rounded-lg p-2 transition-colors lg:hidden",
                getRevealProps("menu", 580).className,
                isDarkNav ? "text-white hover:bg-white/10" : (useDarkChrome ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"),
              )}
              style={getRevealProps("menu", 580).style}
              aria-label="Toggle menu"
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} className={cn(isDarkNav ? "text-white" : (useDarkChrome ? "text-white" : "text-gray-700"))} />
            </button>
          </div>
        </div>

        {mobileOpen && (
            <div className="lg:hidden">
              <button
                type="button"
                aria-label="Close menu overlay"
                className="fixed inset-0 z-40 bg-[#12071d]/28 backdrop-blur-[2px]"
              onClick={() => setMobileOpen(false)}
            />

            <div className="fixed right-2 top-2 z-50 w-[min(17rem,calc(100vw-1rem))]">
              <div className={cn(
                "overflow-hidden rounded-[1.25rem] p-2 backdrop-blur-xl",
                useDarkChrome
                  ? "border border-violet-300/16 bg-[linear-gradient(180deg,rgba(12,10,22,0.96)_0%,rgba(19,14,33,0.94)_100%)] shadow-[0_22px_46px_rgba(2,6,23,0.42)]"
                  : "border border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,255,0.95)_100%)] shadow-[0_18px_36px_rgba(26,11,54,0.1)]",
              )}>
                <div className="mb-1.5 flex items-center justify-end px-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-[0.8rem] transition-colors",
                      useDarkChrome
                        ? "border border-white/10 bg-white/[0.05] text-violet-50 hover:bg-white/[0.1]"
                        : "border border-violet-100 bg-white/90 text-violet-700 hover:bg-violet-50",
                    )}
                    aria-label="Close menu"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={cn(
                      "mb-1 flex items-center justify-between rounded-[0.95rem] border px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
                      isThemeDark
                        ? "border-violet-200/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] text-white shadow-[0_10px_24px_rgba(4,6,17,0.24)] hover:bg-white/10"
                        : "border-violet-200 bg-white/90 text-violet-800 hover:bg-violet-50",
                    )}
                  >
                    <span>{isThemeDark ? "Light Mode" : "Dark Mode"}</span>
                    <Icon name={isThemeDark ? "Sun" : "Moon"} size={15} />
                  </button>

                  {navLinks.map(({ href, key }) => (
                    <Link
                      key={key}
                      href={`/${locale}${href}`}
                      onClick={() => {
                        setMobileOpen(false);
                        if (href === "/home") window.scrollTo(0, 0);
                      }}
                      className={cn(
                        "rounded-[0.9rem] px-3 py-2.25 text-[13px] font-medium transition-colors",
                        isActive(href)
                          ? useDarkChrome
                            ? "bg-[linear-gradient(135deg,rgba(124,58,237,0.24)_0%,rgba(59,130,246,0.18)_100%)] text-white shadow-[0_10px_28px_rgba(4,6,17,0.24),inset_0_1px_0_rgba(255,255,255,0.10)]"
                            : "bg-[linear-gradient(135deg,#f6f1ff_0%,#ece4fb_100%)] text-violet-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                          : useDarkChrome
                            ? "text-violet-50 hover:bg-white/[0.08] hover:text-white"
                            : "text-gray-600 hover:bg-white/90 hover:text-violet-800",
                      )}
                    >
                      {t(key as never)}
                    </Link>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
