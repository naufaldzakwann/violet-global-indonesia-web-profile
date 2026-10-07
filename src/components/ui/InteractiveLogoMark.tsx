"use client";

import Image from "next/image";

function LogoLayer({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/favicon.svg"
      alt=""
      aria-hidden="true"
      fill
      priority={priority}
      sizes="(max-width: 640px) 210px, (max-width: 1024px) 280px, 340px"
      className="object-contain"
    />
  );
}

export function InteractiveLogoMark() {
  return (
    <button
      type="button"
      className="hero-logo-stage group relative block h-[210px] w-[210px] cursor-pointer select-none bg-transparent outline-none sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]"
      aria-label="Interactive Violet logo"
    >
      <div className="hero-logo-3d pointer-events-none absolute inset-0">
        <div className="hero-logo-core absolute inset-0">
          <div className="hero-logo-depth hero-logo-depth-back absolute inset-0">
            <LogoLayer />
          </div>
          <div className="hero-logo-depth hero-logo-depth-mid absolute inset-0">
            <LogoLayer />
          </div>
          <div className="hero-logo-face absolute inset-0">
            <LogoLayer priority />
          </div>
        </div>
      </div>
    </button>
  );
}
