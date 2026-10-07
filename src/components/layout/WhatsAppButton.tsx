"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const HOME_HERO_UNLOCK_EVENT = "violet:home-hero-unlock";

export function WhatsAppButton() {
  const locale = useLocale();
  const pathname = usePathname();
  const [homeWaUnlocked, setHomeWaUnlocked] = useState(false);
  const [revealDelay, setRevealDelay] = useState<number | null>(null);
  const phone = "6285166415046";
  const message = locale === "id"
    ? "Halo VGI, saya ingin berkonsultasi mengenai layanan Anda."
    : "Hello VGI, I would like to consult about your services.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleHeroUnlock = (event: Event) => {
      const customEvent = event as CustomEvent<{ unlocked?: boolean }>;
      const unlocked = Boolean(customEvent.detail?.unlocked);
      setHomeWaUnlocked(unlocked);
      setRevealDelay(unlocked ? 180 + Math.floor(Math.random() * 420) : null);
    };

    window.addEventListener(HOME_HERO_UNLOCK_EVENT, handleHeroUnlock);
    return () => window.removeEventListener(HOME_HERO_UNLOCK_EVENT, handleHeroUnlock);
  }, []);

  const shouldHideWa = isHome && !homeWaUnlocked;
  const revealStyle = isHome && homeWaUnlocked && revealDelay !== null
    ? ({ animationDelay: `${revealDelay}ms` } as CSSProperties)
    : undefined;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 ${shouldHideWa ? "pointer-events-none translate-y-4 opacity-0" : ""} ${!isHome || homeWaUnlocked ? "hero-nav-pop is-visible" : "hero-nav-pop"}`}
      style={revealStyle ? { ...revealStyle, background: "#25D366" } : { background: "#25D366" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="28"
        height="28"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.862L0 24l6.304-1.513A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 0 1-5.042-1.393l-.361-.214-3.74.897.94-3.634-.236-.373A9.823 9.823 0 0 1 2.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z"/>
      </svg>
    </a>
  );
}
