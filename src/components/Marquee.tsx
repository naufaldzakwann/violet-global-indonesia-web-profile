export default function Marquee({
  items,
  slow = false,
  outline = false,
  className = "",
}: {
  items: string[];
  slow?: boolean;
  outline?: boolean;
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display px-6 text-4xl uppercase leading-none tracking-wide sm:px-10 sm:text-6xl ${
              outline && i % 2 === 1 ? "text-stroke" : ""
            }`}
          >
            {item}
          </span>
          <span className="h-2.5 w-2.5 rotate-45 bg-violet-500" aria-hidden="true" />
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
