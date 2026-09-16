import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.22em]",
        dark ? "text-violet-300" : "text-violet-700"
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-slate-950"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg sm:leading-8", dark ? "text-slate-300" : "text-slate-600")}>
          {lede}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-colors",
        dark
          ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
          : "border-slate-200 bg-white shadow-sm hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
