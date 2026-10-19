"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { useTheme } from "./useTheme";

export function ThemeToggle({ className, style }: { className?: string; style?: CSSProperties }) {
  const t = useTranslations("theme");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t(isDark ? "switchToLight" : "switchToDark")}
      aria-pressed={isDark}
      className={cn("theme-toggle", className)}
      style={style}
    >
      <Icon name={isDark ? "Sun" : "Moon"} size={16} />
      <span>{t(isDark ? "light" : "dark")}</span>
    </button>
  );
}
