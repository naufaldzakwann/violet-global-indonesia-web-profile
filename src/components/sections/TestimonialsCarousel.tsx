"use client";

import { useEffect, useRef, useState } from "react";
import { AnimateOnView } from "@/components/ui/AnimateOnView";
import { cn } from "@/lib/utils";

type TestimonialCard = {
  id: string;
  name: string;
  position: string;
  company?: string;
  content: string;
  rating: number;
};

const DOT_COUNT = 3;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getActiveDot(scrollLeft: number, maxScrollLeft: number) {
  if (maxScrollLeft <= 0) return 0;
  const progress = scrollLeft / maxScrollLeft;
  return Math.min(DOT_COUNT - 1, Math.max(0, Math.round(progress * (DOT_COUNT - 1))));
}

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialCard[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateActiveDot = () => {
      const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
      setActiveDot(getActiveDot(scroller.scrollLeft, maxScrollLeft));
    };

    updateActiveDot();

    scroller.addEventListener("scroll", updateActiveDot, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateActiveDot();
    });

    resizeObserver.observe(scroller);
    Array.from(scroller.children).forEach((child) => resizeObserver.observe(child));
    window.addEventListener("resize", updateActiveDot);

    return () => {
      scroller.removeEventListener("scroll", updateActiveDot);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateActiveDot);
    };
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const targetLeft = maxScrollLeft * (index / Math.max(DOT_COUNT - 1, 1));

    scroller.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isPaused) return;

    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    if (maxScrollLeft <= 0) return;

    const intervalId = window.setInterval(() => {
      const nextDot = (activeDot + 1) % DOT_COUNT;
      const targetLeft = maxScrollLeft * (nextDot / Math.max(DOT_COUNT - 1, 1));

      scroller.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeDot, isPaused]);

  return (
    <div className="space-y-6">
      <div
        ref={scrollerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pt-12 pb-8 -mx-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {testimonials.map((testi, index) => (
          <AnimateOnView
            key={testi.id}
            delay={index * 70}
            className="w-[82vw] shrink-0 snap-center sm:w-[58vw] lg:w-[calc((100%-2rem)/3)] lg:snap-start"
          >
            <article className="card theme-card testimonial-card relative flex h-full flex-col overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.1),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_24%,transparent_100%)] opacity-80" />
              <div className="mb-3 flex gap-1">
                {Array.from({ length: Math.max(0, testi.rating) }).map((_, starIndex) => (
                  <svg key={starIndex} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="theme-body relative z-10 mb-5 flex-1 text-[13px] leading-relaxed italic sm:text-sm">
                &ldquo;{testi.content}&rdquo;
              </blockquote>

              <div className="theme-divider relative z-10 mb-4 h-px w-full bg-violet-100" />

              <div className="relative z-10 flex items-center gap-3">
                <div className="theme-avatar flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-violet-100 text-xs font-bold text-violet-700 shadow-sm sm:h-11 sm:w-11 sm:text-sm">
                  {getInitials(testi.name || "??")}
                </div>

                <div className="min-w-0">
                  <div className="theme-title truncate text-sm font-semibold">{testi.name}</div>
                  <div className="theme-muted text-[11px] leading-relaxed sm:text-xs">
                    {testi.position}
                    {testi.company ? `, ${testi.company}` : ""}
                  </div>
                </div>
              </div>
            </article>
          </AnimateOnView>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: DOT_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Pindah ke testimoni ${index + 1}`}
            aria-pressed={activeDot === index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              activeDot === index ? "w-6 bg-violet-700" : "w-2.5 bg-violet-200 hover:bg-violet-300",
            )}
          />
        ))}
      </div>
    </div>
  );
}
