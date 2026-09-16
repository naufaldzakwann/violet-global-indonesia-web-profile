"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Language / Bahasa"
      className={cn("flex items-center border border-white/20", className)}
    >
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "font-tech cursor-pointer px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors",
            lang === l ? "bg-[#f4f1eb] text-black" : "text-white/60 hover:text-white"
          )}
        >
          {l === "id" ? "ID" : "EN"}
        </button>
      ))}
    </div>
  );
}
