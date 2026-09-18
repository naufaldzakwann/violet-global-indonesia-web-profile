import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  slow = false,
  outline = false,
  dark = false,
  className = "",
}: {
  items: string[];
  slow?: boolean;
  outline?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "font-display px-6 text-4xl uppercase leading-none tracking-wide sm:px-10 sm:text-6xl",
              dark ? "text-[#f4f1eb]" : "text-[#141419] dark:text-[#f4f1eb]",
              outline && i % 2 === 1 && (dark ? "text-stroke-bone" : "text-stroke")
            )}
          >
            {item}
          </span>
          <span
            className={cn("h-2.5 w-2.5 rotate-45", i % 2 === 1 ? "bg-emerald-500" : "bg-violet-500")}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee-track flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
