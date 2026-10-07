"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

// Global variable to track navigation across template remounts
let lastPath: string | null = null;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  const splashPath = `/${locale}`;
  const splashPathWithSlash = `/${locale}/`;
  const homePath = `/${locale}/home`;
  const homePathWithSlash = `/${locale}/home/`;

  const wasOnSplash = lastPath === splashPath || lastPath === splashPathWithSlash;
  const isGoingToHome = pathname === homePath || pathname === homePathWithSlash;

  // Tentukan secara instan (sebelum render) apakah boleh beranimasi
  // Jika dari Splash ke Home, jangan ada animasi splash tambahan
  const disableAnimation = wasOnSplash && isGoingToHome;

  useEffect(() => {
    // Update tracker setelah render
    lastPath = pathname;
  }, [pathname]);

  if (disableAnimation) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
