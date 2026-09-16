import Image from "next/image";

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="PT Violet Global Indonesia"
      width={288}
      height={288}
      priority
      className={`rounded-md bg-white object-contain ring-1 ring-white/20 ${className}`}
    />
  );
}
