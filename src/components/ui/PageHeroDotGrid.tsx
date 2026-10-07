"use client";

import DotGrid from "@/components/ui/DotGrid";
import { cn } from "@/lib/utils";

export function PageHeroDotGrid({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Deep Dark Base (Sides) */}
      <div className="absolute inset-0 bg-[#06040a]" />
      
      {/* Central Spotlight Effect */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,rgba(139,92,246,0.1)_30%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* Top Edge Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Masked DotGrid */}
      <div className="absolute inset-0" style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }}>
        <DotGrid
          dotSize={1.8}
          gap={32}
          baseColor="#7c3aed"
          activeColor="#d8b4fe"
          proximity={140}
          shockRadius={250}
          shockStrength={5}
          resistance={1200}
          returnDuration={2}
          className="absolute inset-0 opacity-40 ml-[-1px]"
        />
      </div>

      {/* Polish Layers */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06040a]" />
    </div>
  );
}
