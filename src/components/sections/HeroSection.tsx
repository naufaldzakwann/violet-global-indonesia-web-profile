"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { InteractiveLogoMark } from "@/components/ui/InteractiveLogoMark";
import MagicRings from "@/components/ui/MagicRings";
import { GridScan } from "@/components/ui/GridScan";
import { services } from "@/lib/data/services";

const HOME_HERO_UNLOCK_EVENT = "violet:home-hero-unlock";
const HERO_POPUP_POSITIONS = [
  {
    className: "left-[59%] top-[31%] sm:left-[63%] sm:top-[31%] lg:left-[72%] lg:top-[27%]",
    fromX: "58px",
    fromY: "150px",
  },
  {
    className: "left-[67%] top-[44%] sm:left-[71%] sm:top-[43%] lg:left-[88%] lg:top-[41%]",
    fromX: "-64px",
    fromY: "84px",
  },
  {
    className: "left-[60%] top-[58%] sm:left-[64%] sm:top-[58%] lg:left-[73%] lg:top-[57%]",
    fromX: "52px",
    fromY: "-18px",
  },
  {
    className: "left-[68%] top-[70%] sm:left-[72%] sm:top-[69%] lg:left-[89%] lg:top-[69%]",
    fromX: "-68px",
    fromY: "-118px",
  },
] as const;

export function HeroSection({ isInitiallyUnlocked = false }: { isInitiallyUnlocked?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);
  const unlockedRef = useRef(false);
  const popupTimeoutRef = useRef<number | null>(null);
  const popupIntervalRef = useRef<number | null>(null);
  const routePushTimeoutRef = useRef<number | null>(null);
  const unlockCompleteTimeoutRef = useRef<number | null>(null);
  const [hasUnlocked, setHasUnlocked] = useState(isInitiallyUnlocked);
  const [hasUnlockedComplete, setHasUnlockedComplete] = useState(isInitiallyUnlocked);
  const [showServicePopups, setShowServicePopups] = useState(false);
  const [activeServiceOffset, setActiveServiceOffset] = useState(0);

  useEffect(() => {
    if (isInitiallyUnlocked) {
      setHasUnlocked(true);
      setHasUnlockedComplete(true);
      
      // Force scroll to top instantly to override any lingering browser behavior
      window.scrollTo(0, 0);
      
      // Verification frames to ensure we STAY at top during initial load/render
      const scrollHandler = () => window.scrollTo(0, 0);
      const raf1 = requestAnimationFrame(scrollHandler);
      const raf2 = requestAnimationFrame(() => requestAnimationFrame(scrollHandler));
      const timer = setTimeout(scrollHandler, 10);

      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(timer);
      };
    }
  }, [isInitiallyUnlocked, pathname]);

  useEffect(() => {
    if (!isInitiallyUnlocked) {
      router.prefetch(`/${locale}/home`);
    }
  }, [locale, isInitiallyUnlocked, router]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isInitiallyUnlocked) {
      unlockedRef.current = true;
      html.classList.remove("hero-scroll-locked");
      body.classList.remove("hero-scroll-locked");
      window.scrollTo({ top: 0, behavior: "auto" });
      window.dispatchEvent(new CustomEvent(HOME_HERO_UNLOCK_EVENT, { detail: { unlocked: true } }));

      if (popupTimeoutRef.current) window.clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = window.setTimeout(() => {
        setShowServicePopups(true);
      }, 700);
    } else {
      unlockedRef.current = false;
      html.classList.add("hero-scroll-locked");
      body.classList.add("hero-scroll-locked");
      window.dispatchEvent(new CustomEvent(HOME_HERO_UNLOCK_EVENT, { detail: { unlocked: false } }));
    }

    return () => {
      if (popupTimeoutRef.current) {
        window.clearTimeout(popupTimeoutRef.current);
      }
      if (popupIntervalRef.current) {
        window.clearInterval(popupIntervalRef.current);
      }
      if (routePushTimeoutRef.current) {
        window.clearTimeout(routePushTimeoutRef.current);
      }
      if (unlockCompleteTimeoutRef.current) {
        window.clearTimeout(unlockCompleteTimeoutRef.current);
      }
      html.classList.remove("hero-scroll-locked");
      body.classList.remove("hero-scroll-locked");
      window.dispatchEvent(new CustomEvent(HOME_HERO_UNLOCK_EVENT, { detail: { unlocked: true } }));
    };
  }, [isInitiallyUnlocked]);

  useEffect(() => {
    if (!showServicePopups) {
      if (popupIntervalRef.current) {
        window.clearInterval(popupIntervalRef.current);
      }
      return;
    }

    popupIntervalRef.current = window.setInterval(() => {
      setActiveServiceOffset((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => {
      if (popupIntervalRef.current) {
        window.clearInterval(popupIntervalRef.current);
      }
    };
  }, [showServicePopups]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
      if (!isMouseActive) setIsMouseActive(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMouseActive]);

  const unlockHero = () => {
    if (unlockedRef.current) return;

    const isRoot = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

    if (isRoot) {
      setHasUnlocked(true);
      unlockedRef.current = true;

      // Much faster transition to home
      routePushTimeoutRef.current = window.setTimeout(() => {
        router.push(`/${locale}/home`);
      }, 50);
      return;
    }

    unlockedRef.current = true;
    setHasUnlocked(true);
    if (unlockCompleteTimeoutRef.current) {
      window.clearTimeout(unlockCompleteTimeoutRef.current);
    }
    unlockCompleteTimeoutRef.current = window.setTimeout(() => {
      setHasUnlockedComplete(true);
    }, 1500);
    setShowServicePopups(false);
    setActiveServiceOffset(0);
    if (popupTimeoutRef.current) {
      window.clearTimeout(popupTimeoutRef.current);
    }
    if (popupIntervalRef.current) {
      window.clearInterval(popupIntervalRef.current);
    }
    popupTimeoutRef.current = window.setTimeout(() => {
      setShowServicePopups(true);
    }, 1380);
    sectionRef.current?.style.setProperty("--hero-ring-pulse", "0.22");
    document.documentElement.classList.remove("hero-scroll-locked");
    document.body.classList.remove("hero-scroll-locked");
    window.dispatchEvent(new CustomEvent(HOME_HERO_UNLOCK_EVENT, { detail: { unlocked: true } }));
  };

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#09040f]"
      style={{ "--hero-ring-pulse": "0" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#12071d_0%,#09040f_58%,#05030a_100%)]" />
      
      {/* Organic Elliptical Mouse Glow */}
      <div 
        className={cn(
          "absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000",
          (isMouseActive && hasUnlocked) ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `
            radial-gradient(450px 250px ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.15), transparent 80%),
            radial-gradient(200px 120px ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.1), transparent 70%)
          `,
          mixBlendMode: 'screen',
          filter: 'blur(10px)'
        }}
      />

      {/* 3D Grid Landscape Phase 2 */}
      <div className="absolute inset-0 z-0">
        <GridScan
          lineThickness={0.7}
          linesColor="#6A0DAD"
          gridScale={0.16}
          enablePost={false}
          fade={hasUnlocked ? 1.0 : 0.0}
          className="h-full w-full"
        />
      </div>

      {!hasUnlockedComplete && (
        <div
          className={cn(
            "absolute inset-0 z-10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            hasUnlocked && "scale-[1.08] opacity-0",
          )}
        >
          <MagicRings
            color="#fc42ff"
            colorTwo="#42fcff"
            ringCount={6}
            speed={1}
            attenuation={10}
            lineThickness={2}
            baseRadius={0.35}
            radiusStep={0.1}
            scaleRate={0.1}
            opacity={0.82}
            blur={0}
            noiseAmount={0.07}
            rotation={0}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={false}
            mouseInfluence={0}
            hoverScale={1}
            parallax={0}
            clickBurst={false}
            onPulseChange={(pulse) => {
              if (unlockedRef.current) return;
              sectionRef.current?.style.setProperty("--hero-ring-pulse", pulse.toFixed(3));
            }}
          />
        </div>
      )}

      <div className="section-container relative z-30 flex h-full flex-col justify-start pt-8 sm:pt-10 lg:flex-row lg:items-center lg:justify-start lg:pt-0">
        {hasUnlocked && (
          <div className="mt-[50px] flex w-full flex-col items-center lg:hidden">
            <div className="relative mb-8 flex h-[17.5rem] w-full max-w-[19rem] items-center justify-center sm:mb-10 sm:h-[21rem] sm:max-w-[23rem] md:h-[27.5rem] md:max-w-[29.9rem]">
              <div className="pointer-events-none absolute inset-0 z-40">
                {showServicePopups
                  ? [0, 1].map((index) => {
                      const service = services[(activeServiceOffset + index) % services.length];

                      return (
                        <Link
                          key={`${service.id}-mobile-left-${index}`}
                          href={`/${locale}/services/${service.slug}`}
                          className={cn(
                            "hero-service-popup-card pointer-events-auto absolute !flex !min-w-0 !w-[8.9rem] !px-3 !py-3 !text-[10px] sm:!w-[10.4rem] sm:!text-[11px] md:!w-[13.5rem] md:!px-4 md:!py-3.5 md:!text-[13px]",
                            index === 0
                              ? "left-[4%] top-[16%] md:left-[6%] md:top-[14%]"
                              : "left-[2%] top-[55%] md:left-[4%] md:top-[58%]",
                          )}
                        >
                          {locale === "id" ? service.title : service.titleEn}
                        </Link>
                      );
                    })
                  : null}
              </div>

              <div
                className="hero-logo-launch-mobile relative z-30 mx-auto md:scale-[1.3]"
                onClick={unlockHero}
              >
                <InteractiveLogoMark />
              </div>

              <div className="pointer-events-none absolute inset-0 z-40">
                {showServicePopups
                  ? [2, 3].map((index) => {
                      const service = services[(activeServiceOffset + index) % services.length];

                      return (
                        <Link
                          key={`${service.id}-mobile-right-${index}`}
                          href={`/${locale}/services/${service.slug}`}
                          className={cn(
                            "hero-service-popup-card pointer-events-auto absolute !flex !min-w-0 !w-[8.9rem] !px-3 !py-3 !text-[10px] sm:!w-[10.4rem] sm:!text-[11px] md:!w-[13.5rem] md:!px-4 md:!py-3.5 md:!text-[13px]",
                            index === 2
                              ? "right-[4%] top-[28%] md:right-[6%] md:top-[24%]"
                              : "right-[2%] top-[68%] md:right-[4%] md:top-[70%]",
                          )}
                        >
                          {locale === "id" ? service.title : service.titleEn}
                        </Link>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "hero-content-launched flex w-full max-w-[600px] flex-col items-center gap-6 text-center transition-all duration-[1000ms] delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-x-[80px] lg:translate-x-0 lg:items-start lg:gap-10 lg:text-left",
            hasUnlocked ? "translate-x-0 translate-y-[2px] opacity-100 md:translate-x-[80px] lg:translate-x-0" : "-translate-x-12 translate-y-0 pointer-events-none invisible opacity-0 md:translate-x-0",
          )}
        >
          {/* 4-Line Segmented Heading */}
          <h1 className="text-[38px] font-semibold leading-[1.0] tracking-[-0.04em] text-white sm:text-[52px] md:text-[66px] lg:text-[78px] xl:text-[88px]">
            {locale === "id" ? (
              <>
                <span className="flex flex-col md:hidden lg:flex">
                  <span>Membangun</span>
                  <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Masa Depan</span>
                  <span>Bisnis</span>
                  <span className="font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Digital</span>
                </span>
                <span className="hidden md:flex md:flex-col lg:hidden">
                  <span>Membangun</span>
                  <span>
                    <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Masa Depan</span> Bisnis
                  </span>
                  <span className="font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Digital</span>
                </span>
              </>
            ) : (
              <>
                <span className="flex flex-col md:hidden lg:flex">
                  <span>Building</span>
                  <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Your Digital</span>
                  <span>Business</span>
                  <span className="font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Future</span>
                </span>
                <span className="hidden md:flex md:flex-col lg:hidden">
                  <span>Building</span>
                  <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Your Digital</span>
                  <span>
                    Business <span className="font-bold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Future</span>
                  </span>
                </span>
              </>
            )}
          </h1>

          <div className="flex w-full max-w-[26rem] self-center items-stretch justify-center gap-3 sm:max-w-[30rem] sm:gap-4 md:mt-[40px] md:max-w-[34rem] lg:mt-0 lg:w-auto lg:max-w-none lg:self-start lg:justify-start">
            {/* Portfolio Link - Primary */}
            <Link
              href={`/${locale}/portfolio`}
              className="group relative flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border border-violet-500/50 bg-violet-600/10 px-4 py-3 text-center text-[10px] font-bold tracking-[0.14em] text-white transition-all hover:bg-violet-600 sm:gap-3 sm:px-6 sm:text-[11px] md:py-3.5 md:text-[12px] lg:h-16 lg:flex-none lg:justify-start lg:gap-4 lg:px-8 lg:text-[13px] lg:tracking-[0.2em]"
            >
              <span className="relative z-10 whitespace-nowrap">
                {locale === "id" ? "LIHAT PROJECT" : "VIEW PROJECTS"}
              </span>
              <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1 sm:h-6 sm:w-6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Contact Link - Secondary */}
            <Link
              href={`/${locale}/contact`}
              className="group relative flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[10px] font-medium tracking-[0.14em] text-white/70 transition-all hover:bg-white/10 hover:text-white sm:gap-3 sm:px-6 sm:text-[11px] md:py-3.5 md:text-[12px] lg:h-16 lg:flex-none lg:justify-start lg:gap-4 lg:px-8 lg:text-[13px] lg:tracking-[0.2em]"
            >
              <span className="relative z-10 whitespace-nowrap">
                {locale === "id" ? "HUBUNGI KAMI" : "CONTACT US"}
              </span>
            </Link>
          </div>
        </div>

        {showServicePopups ? (
          <div className="pointer-events-none absolute inset-0 z-40 hidden lg:block">
            {HERO_POPUP_POSITIONS.map((positions, index) => {
              const service = services[(activeServiceOffset + index) % services.length];

              return (
                <div
                  key={`${service.id}-${activeServiceOffset}-${index}`}
                  className={cn("absolute -translate-x-1/2 -translate-y-1/2", positions.className)}
                >
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="hero-service-popup-card pointer-events-auto"
                    style={
                      {
                        "--service-pop-delay": `${index * 120}ms`,
                        "--service-pop-x": positions.fromX,
                        "--service-pop-y": positions.fromY,
                        "--service-float-duration": `${5.4 + index * 0.55}s`,
                        "--service-float-shift": `${5 + index}px`,
                      } as CSSProperties
                    }
                  >
                    {locale === "id" ? service.title : service.titleEn}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}

        {!hasUnlocked && (
          <div
            className={cn(
              "hero-logo-launch-mobile absolute left-1/2 top-[calc(38%+65px)] z-30 -translate-x-1/2 -translate-y-1/2 scale-[0.7] lg:hidden",
            )}
            onClick={unlockHero}
          >
            <InteractiveLogoMark />
          </div>
        )}

        <div
          className={cn(
            "hero-logo-launch absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block",
            hasUnlocked && "is-launched",
            showServicePopups && "services-visible",
          )}
          onClick={unlockHero}
        >
          <InteractiveLogoMark />
        </div>

        <div
          className={`pointer-events-none absolute left-1/2 top-[calc(38%+153px)] -translate-x-1/2 transition-all duration-500 sm:top-[calc(38%+169px)] lg:top-[calc(50%+118px)] ${hasUnlocked ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            }`}
        >
          <div className="flex flex-col items-center text-center">
            <span
              className="hero-brand-title text-[13px] font-semibold tracking-[0.16em] text-white/88 sm:text-[16px] lg:text-[22px]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Violet Global Indonesia
            </span>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute left-1/2 top-[calc(38%+275px)] -translate-x-1/2 transition-all duration-500 sm:top-[calc(38%+318px)] lg:top-[calc(50%+295px)] ${hasUnlocked ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            }`}
        >
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/44 sm:text-[11px] lg:hidden">
            <span className="h-px w-8 bg-white/14 sm:w-12" />
            <div className="flex flex-col items-center text-center leading-[1.4]">
              <span>{locale === "id" ? "Klik logo" : "Tap the logo"}</span>
              <span>{locale === "id" ? "untuk memulai" : "to begin"}</span>
            </div>
            <span className="h-px w-8 bg-white/14 sm:w-12" />
          </div>
          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/44 sm:text-[11px] lg:flex">
            <span className="h-px w-8 bg-white/14 sm:w-12" />
            <span>{locale === "id" ? "Klik logo untuk memulai" : "Tap the logo to begin"}</span>
            <span className="h-px w-8 bg-white/14 sm:w-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
