"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "vgi-theme";
const EVENT = "vgi-theme-change";

function isDark(): boolean {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved === "dark";
  } catch {
    /* ignore */
  }
  return document.documentElement.classList.contains("dark");
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

const getSnapshot = () => (typeof window === "undefined" ? false : isDark());
const getServerSnapshot = () => false;

export default function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = useCallback(() => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-11 w-11 cursor-pointer items-center justify-center border transition-colors",
        "border-stone-900/20 text-stone-800 hover:border-violet-500 hover:bg-violet-600 hover:text-white",
        "dark:border-white/20 dark:text-white dark:hover:border-violet-500 dark:hover:bg-violet-600",
        className
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
