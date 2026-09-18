import Image from "next/image";

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/logo-violet-indonesia.png"
      alt="PT Violet Global Indonesia"
      width={240}
      height={236}
      priority
      className={`rounded-md bg-white object-contain ring-1 ring-stone-900/15 dark:ring-white/20 ${className}`}
    />
  );
}
