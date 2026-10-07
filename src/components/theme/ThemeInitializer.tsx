"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem("violet-theme");
      document.documentElement.dataset.theme = storedTheme === "dark" ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  return null;
}
