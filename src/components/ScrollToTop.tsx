"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/**
 * Every route change starts at the very top.
 * Lenis hijacks native scroll, so we drive it directly (instant, no animation)
 * and fall back to native scrolling when Lenis isn't ready.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
    // Ensure ScrollTrigger positions recalc after the jump
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  }, [pathname]);

  return null;
}
