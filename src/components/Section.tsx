import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="font-tech flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-violet-400">
      {index && <span className="text-white/40">[{index}]</span>}
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
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-5xl", align === "center" && "mx-auto text-center")}>
      <div className={cn(align === "center" && "flex justify-center")}>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </div>
      <h2 className="font-display mt-5 text-5xl uppercase leading-[0.92] tracking-wide text-balance text-[#f4f1eb] sm:text-6xl lg:text-7xl">
        {title}{" "}
        {accent && <em className="font-serif-accent normal-case tracking-normal text-violet-300">{accent}</em>}
      </h2>
      {lede && (
        <p className={cn("mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8", align === "center" && "mx-auto")}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-white/10", className)} aria-hidden="true" />;
}
