import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, index, dark = false }: { children: ReactNode; index?: string; dark?: boolean }) {
  return (
    <p className={cn(
      "font-tech flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]",
      dark ? "text-violet-400" : "text-violet-700 dark:text-violet-400"
    )}>
      {index && <span className={dark ? "text-white/40" : "text-stone-500 dark:text-white/40"}>[{index}]</span>}
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lede,
  align = "left",
  dark = false,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-5xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow index={index} dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className={cn(
        "font-display mt-5 text-5xl uppercase leading-[0.92] tracking-wide text-balance sm:text-6xl lg:text-7xl",
        dark ? "text-[#f4f1eb]" : "text-[#141419] dark:text-[#f4f1eb]"
      )}>
        {title}{" "}
        {accent && <em className={cn(
          "font-serif-accent normal-case tracking-normal",
          dark ? "text-violet-300" : "text-violet-700 dark:text-violet-300"
        )}>{accent}</em>}
      </h2>
      {lede && (
        <p className={cn(
          "mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8",
          dark ? "text-white/60" : "text-stone-600 dark:text-white/60",
          align === "center" && "mx-auto"
        )}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-stone-900/10 dark:bg-white/10", className)} aria-hidden="true" />;
}
