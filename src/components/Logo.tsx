export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
  <defs>
    <linearGradient id="vgi-g" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
      <stop stopColor="#8B5CF6" />
      <stop offset="0.55" stopColor="#6D28D9" />
      <stop offset="1" stopColor="#4C1D95" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#vgi-g)" />
  <path
    d="M14 15l10 18 10-18"
    stroke="white"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <circle cx="24" cy="36" r="1.8" fill="#22D3EE" />
</svg>
  );
}
