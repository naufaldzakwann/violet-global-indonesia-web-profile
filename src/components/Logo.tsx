import Image from "next/image";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo-violet-indonesia.png"
      alt="PT Violet Global Indonesia"
      width={800}
      height={595}
      priority
      className={`rounded-md bg-white object-contain ring-1 ring-white/20 ${className}`}
    />
  );
}
