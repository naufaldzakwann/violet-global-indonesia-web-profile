"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import type { CaseStudyItem } from "@/lib/data/case-studies";

type CaseStudyShelfProps = {
  studies: CaseStudyItem[];
  locale: string;
  isId: boolean;
};

const MIN_PAGE_COUNT = 15;
const MAX_PAGE_COUNT = 30;

function clampPageCount(value: number) {
  return Math.min(MAX_PAGE_COUNT, Math.max(MIN_PAGE_COUNT, value));
}

function getBookMetrics(pageCount: number) {
  const safeCount = clampPageCount(pageCount);
  const ratio = (safeCount - MIN_PAGE_COUNT) / (MAX_PAGE_COUNT - MIN_PAGE_COUNT);

  return {
    widthRem: 9.8 + ratio * 2.9,
    heightRem: 19.75 + ratio * 4.8,
    edgeWidthPx: 14 + ratio * 6,
    coverRadiusRem: 0.95 + ratio * 0.14,
    peekInsetLeftPx: 18 + ratio * 2,
    peekInsetRightPx: 24 + ratio * 4,
    peekInsetYPx: 10 + ratio * 1.5,
  };
}

function getEntryDelay(index: number) {
  const staggerOrder = [5, 1, 7, 0, 8, 3, 9, 2, 6, 4];
  const order = staggerOrder[index % staggerOrder.length];
  return order * 75;
}

export function CaseStudyShelf({ studies, locale, isId }: CaseStudyShelfProps) {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openingSlug, setOpeningSlug] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpen = (slug: string) => {
    if (openingSlug) return;

    setOpeningSlug(slug);
    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        router.push(`/${locale}/case-study/${slug}`);
      });
    }, 620);
  };

  return (
    <>
      <div className="library-shelf case-study-shelf relative flex h-full flex-col justify-end pt-3 lg:pt-6">
        <div className="pointer-events-none absolute inset-x-0 bottom-[14px] h-6 rounded-full bg-black/10 blur-xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden">
          <div className="absolute inset-x-6 bottom-[40px] h-10 border-y border-black/8 bg-[linear-gradient(180deg,#b48c6d_0%,#8d674e_58%,#73523f_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:inset-x-8 lg:inset-x-10" />
          <div className="absolute inset-x-0 bottom-[20px] h-7 border-t border-black/10 bg-[linear-gradient(180deg,#9e7356_0%,#7b5842_50%,#654735_100%)] shadow-[0_7px_10px_rgba(39,27,20,0.1),inset_0_1px_0_rgba(255,255,255,0.18)]" />
          <div className="absolute inset-x-0 bottom-0 h-7 border-y border-black/12 bg-[linear-gradient(180deg,#4c3528_0%,#38251b_100%)] shadow-[0_16px_24px_rgba(39,27,20,0.24),inset_0_1px_0_rgba(255,255,255,0.06)]" />
          <div className="absolute inset-x-10 bottom-[60px] h-5 rounded-full bg-black/6 blur-2xl sm:inset-x-16 lg:inset-x-24" />
        </div>
        <div className="book-rail relative z-10 flex flex-1 items-end justify-start gap-3.5 overflow-x-auto overflow-y-hidden px-5 pb-8 pt-2 sm:gap-4 sm:px-6 sm:pb-9 lg:gap-[1.15rem] lg:px-8 lg:pb-10">
          {studies.map((study, index) => {
            const isOpening = openingSlug === study.slug;
            const metrics = getBookMetrics(study.pageCount);

            return (
              <button
                key={study.id}
                type="button"
                onClick={() => handleOpen(study.slug)}
                disabled={Boolean(openingSlug)}
                className={`group case-book-scene relative block shrink-0 [perspective:2200px] ${isOpening ? "case-book-scene--opening z-30" : ""} ${openingSlug && !isOpening ? "case-book-scene--muted" : ""}`}
                style={{
                  width: `${metrics.widthRem}rem`,
                  height: `${metrics.heightRem}rem`,
                  animationDelay: `${getEntryDelay(index)}ms`,
                }}
              >
                <div className="absolute inset-x-[14px] bottom-[6px] h-5 rounded-full bg-black/16 blur-xl transition-all duration-500 group-hover:bg-black/22 group-hover:blur-2xl" />

                <div className="case-book-body relative h-full [transform-style:preserve-3d]">
                  <div
                    className="pointer-events-none absolute left-[-12px] border border-black/14 shadow-[inset_1px_0_0_rgba(255,255,255,0.15)]"
                    style={{
                      top: `${metrics.peekInsetYPx - 1.5}px`,
                      bottom: `${metrics.peekInsetYPx - 1.5}px`,
                      width: `${metrics.edgeWidthPx}px`,
                      borderTopLeftRadius: `${metrics.coverRadiusRem}rem`,
                      borderBottomLeftRadius: `${metrics.coverRadiusRem}rem`,
                      background: `linear-gradient(180deg, ${study.accentTone} 0%, rgba(255,255,255,0.2) 26%, rgba(0,0,0,0.08) 100%)`,
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute right-[-12px] border border-black/10 shadow-[8px_0_18px_rgba(15,23,42,0.14)]"
                    style={{
                      top: "3px",
                      bottom: "3px",
                      width: `${metrics.edgeWidthPx}px`,
                      borderTopRightRadius: `${metrics.coverRadiusRem - 0.08}rem`,
                      borderBottomRightRadius: `${metrics.coverRadiusRem - 0.08}rem`,
                      background: `linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%), ${study.spineTone}`,
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="case-book-interior absolute overflow-hidden border border-black/6 px-4 py-4 text-neutral-900 opacity-0 shadow-[0_20px_36px_rgba(15,23,42,0.08)]"
                    style={{
                      top: `${metrics.peekInsetYPx}px`,
                      bottom: `${metrics.peekInsetYPx}px`,
                      left: `${Math.max(2, metrics.peekInsetLeftPx - 18)}px`,
                      right: `${Math.max(6, metrics.peekInsetRightPx - 6)}px`,
                      borderRadius: `${metrics.coverRadiusRem - 0.08}rem`,
                      background: `
                        radial-gradient(circle at 18% 10%, rgba(255,255,255,0.7), transparent 22%),
                        repeating-linear-gradient(
                          180deg,
                          rgba(132,112,86,0.018) 0px,
                          rgba(132,112,86,0.018) 1px,
                          transparent 1px,
                          transparent 22px
                        ),
                        linear-gradient(180deg, rgba(254,252,247,0.98), rgba(245,238,226,0.98))
                      `,
                    }}
                  >
                    <div className="absolute inset-0 opacity-55">
                      <div className="absolute inset-y-0 left-[13px] w-px bg-[rgba(131,92,76,0.12)]" />
                      <div className="absolute inset-x-3 top-3 h-px bg-black/5" />
                      <div className="absolute inset-x-3 bottom-3 h-px bg-black/4" />
                    </div>

                    <div className="relative flex h-full flex-col">
                      <div className="pl-3">
                        <p className="text-[8px] uppercase tracking-[0.18em] text-black/28">
                          {isId ? "Isi Riset" : "Inside Notes"}
                        </p>
                        <p className="research-note-hand mt-2 text-[9px] leading-[1.55] text-black/58">
                          {isId ? study.insight : study.insightEn}
                        </p>
                      </div>

                      <div className="mt-3 space-y-1.5 pl-3">
                        <div className="h-px w-[90%] bg-black/10" />
                        <div className="h-px w-[86%] bg-black/8" />
                        <div className="h-px w-[93%] bg-black/8" />
                        <div className="h-px w-[78%] bg-black/8" />
                      </div>

                      <div className="mt-auto pl-3">
                        <p className="research-note-hand text-[8.5px] leading-[1.6] text-black/42">
                          {study.pageCount} {isId ? "halaman riset tersusun dalam pembacaan bertahap." : "research pages arranged in a layered reading flow."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="case-book-cover relative flex h-full origin-left flex-col justify-between overflow-hidden border border-black/8 px-4 pb-4 pt-5 text-left text-white shadow-[0_28px_50px_rgba(15,23,42,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
                    style={{
                      background: study.spineTone,
                      borderRadius: `${metrics.coverRadiusRem}rem`,
                    }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 w-[8px]"
                      style={{ backgroundColor: study.accentTone }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_24%,transparent_72%,rgba(255,255,255,0.06))]" />
                    <div className="absolute inset-y-0 right-0 w-px bg-white/14" />
                    <div className="absolute inset-x-[14%] top-[6px] h-10 rounded-full bg-white/12 blur-lg" />
                    <div className="absolute inset-y-3 left-[14px] w-px bg-white/12" />
                    <div className="absolute inset-x-3 bottom-3 h-[2px] bg-black/10 blur-[1px]" />

                    <div className="relative flex items-center justify-between gap-3">
                      <span className="flex flex-col leading-none text-white/60">
                        <span className="text-[9px] uppercase tracking-[0.18em]">
                          {isId ? study.month : study.monthEn}
                        </span>
                        <span className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                          {isId ? study.year : study.yearEn}
                        </span>
                      </span>
                      <span
                        className="h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.06)]"
                        style={{ backgroundColor: study.accentTone }}
                      />
                    </div>

                    <div className="relative mt-6 flex-1">
                      <div className="pl-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                          {isId ? study.category : study.categoryEn}
                        </p>
                        <h2 className="research-book-title mt-4 text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
                          {isId ? study.title : study.titleEn}
                        </h2>
                      </div>
                    </div>

                    <div className="relative space-y-3 pt-5 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                      <div className="h-px w-full bg-white/12" />
                      <div className="space-y-2">
                        <div className="h-[2px] w-16 rounded-full bg-white/28" />
                        <div className="h-[2px] w-24 rounded-full bg-white/18" />
                        <div className="h-[2px] w-12 rounded-full bg-white/14" />
                      </div>
                    </div>
                  </div>

                  <div
                    className="case-book-peek pointer-events-none absolute overflow-hidden border border-black/5 px-4 py-5 text-neutral-900 opacity-0 shadow-[0_18px_38px_rgba(15,23,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      top: `${metrics.peekInsetYPx}px`,
                      bottom: `${metrics.peekInsetYPx}px`,
                      left: `${Math.max(2, metrics.peekInsetLeftPx - 18)}px`,
                      right: `${Math.max(4, metrics.peekInsetRightPx - 8)}px`,
                      borderRadius: `${metrics.coverRadiusRem - 0.04}rem`,
                      background: `
                        radial-gradient(circle at 14% 12%, rgba(255,255,255,0.72), transparent 22%),
                        radial-gradient(circle at 84% 18%, rgba(137,120,95,0.08), transparent 28%),
                        repeating-linear-gradient(
                          180deg,
                          rgba(132,112,86,0.02) 0px,
                          rgba(132,112,86,0.02) 1px,
                          transparent 1px,
                          transparent 22px
                        ),
                        linear-gradient(180deg, rgba(255,255,255,0.96), rgba(246,240,229,0.98))
                      `,
                    }}
                  >
                    <div className="absolute inset-0 opacity-50">
                      <div className="absolute inset-y-0 left-[15px] w-px bg-[rgba(131,92,76,0.16)]" />
                      <div className="absolute inset-x-0 top-0 h-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),transparent)]" />
                      <div className="absolute inset-x-3 top-3 h-px bg-black/6" />
                    </div>

                    <div className="relative flex h-full flex-col">
                      <div className="pl-4">
                        <p className="text-[8.5px] uppercase tracking-[0.18em] text-black/28">
                          {isId ? "Catatan Riset" : "Research Note"}
                        </p>
                      </div>

                      <p className="research-note-hand mt-2 pl-4 text-[10px] leading-[1.72] text-black/60">
                        {isId ? (study.cardSummary || study.summary) : (study.cardSummaryEn || study.summaryEn)}
                      </p>

                      <div className="mt-3 space-y-2 pl-4">
                        <p className="research-note-hand text-[9px] leading-[1.55] text-black/48">
                          {isId ? study.insight : study.insightEn}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          <div className="h-px w-[88%] bg-black/10" />
                          <div className="h-px w-[94%] bg-black/8" />
                          <div className="h-px w-[82%] bg-black/8" />
                        </div>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3 pl-4 pt-3">
                        <div className="space-y-1 text-[8px] uppercase tracking-[0.16em] text-black/28">
                          <p>{isId ? study.month : study.monthEn}</p>
                          <p>{isId ? study.year : study.yearEn}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-[8px] uppercase tracking-[0.16em] text-black/28">
                            {study.pageCount} {isId ? "halaman" : "pages"}
                          </p>
                          <div className="mt-1 h-px w-12 bg-black/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .library-shelf::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 1.4rem;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.16),
            transparent 26%,
            transparent 74%,
            rgba(0, 0, 0, 0.03)
          );
        }

        .case-book-body {
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease;
        }

        .case-book-scene {
          scroll-snap-align: start;
          animation: shelf-pop-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: opacity 260ms ease, filter 260ms ease, transform 260ms ease;
        }

        .case-book-scene--muted {
          opacity: 0.85;
          transition-duration: 80ms;
        }

        .case-book-scene--muted .case-book-body {
          opacity: 0.85;
        }

        .book-rail {
          scrollbar-width: none;
          scrollbar-color: transparent transparent;
          scroll-snap-type: x proximity;
          -ms-overflow-style: none;
        }

        .book-rail::-webkit-scrollbar {
          height: 0;
          display: none;
        }

        .book-rail::-webkit-scrollbar-track {
          background: transparent;
        }

        .book-rail::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(87, 62, 47, 0.24);
        }

        .case-book-scene:hover {
          z-index: 40;
        }

        .case-book-scene:hover .case-book-body {
          z-index: 20;
          transform: translateZ(104px) scale(1.028);
        }

        .case-book-scene:hover .case-book-cover {
          transform: rotateY(-34deg);
        }

        .case-book-scene:hover .case-book-interior {
          opacity: 0.8;
          transform: translateX(3px) scale(0.998);
        }

        .case-book-scene:hover .case-book-peek {
          z-index: 24;
          opacity: 1;
          transform: translateX(54%) rotate(0.45deg);
        }

        .case-book-scene--opening .case-book-body {
          animation: book-pullout 280ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .case-book-scene--opening {
          animation: book-focus 440ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .case-book-scene--opening .case-book-cover {
          animation: book-open 280ms 110ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .case-book-scene--opening .case-book-interior {
          animation: book-interior-reveal 280ms 110ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .case-book-scene--opening .case-book-peek {
          animation: book-peek 260ms 120ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes book-pullout {
          0% {
            transform: translateZ(0);
          }
          48% {
            transform: translateZ(136px) scale(1.02);
          }
          100% {
            transform: translateZ(196px) scale(1.08);
          }
        }

        @keyframes book-focus {
          0% {
            transform: scale(1) translateY(0);
          }
          42% {
            transform: scale(1.04) translateY(-4px);
          }
          100% {
            transform: scale(1.16) translateY(-8px);
          }
        }

        @keyframes shelf-pop-in {
          0% {
            opacity: 0;
            transform: translateZ(-120px) translateY(18px) scale(0.94);
          }
          55% {
            opacity: 1;
            transform: translateZ(42px) translateY(-2px) scale(1.015);
          }
          100% {
            opacity: 1;
            transform: translateZ(0) translateY(0) scale(1);
          }
        }

        @keyframes book-open {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-88deg);
          }
        }

        @keyframes book-interior-reveal {
          0% {
            opacity: 0;
            transform: translateX(0) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(4px) scale(1.01);
          }
        }

        @keyframes book-peek {
          0% {
            opacity: 0;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: translateX(44%) rotate(0.6deg);
          }
        }

        .research-book-title {
          font-family: "Segoe Print", "Bradley Hand", "Marker Felt", "Comic Sans MS", cursive;
        }

        .research-note-hand {
          font-family: "Segoe Print", "Bradley Hand", "Marker Felt", "Comic Sans MS", cursive;
          letter-spacing: 0.01em;
        }
      `}</style>
    </>
  );
}
