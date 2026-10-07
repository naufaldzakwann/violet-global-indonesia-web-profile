"use client";

import { useEffect } from "react";

/**
 * Menyamakan atribut `lang` pada <html> dengan locale route aktif.
 *
 * Root layout adalah satu-satunya tempat yang boleh mendeklarasikan <html>,
 * dan root layout tidak menerima param `[locale]`. Komponen ini menutup celah
 * itu di sisi klien, sejalan dengan pola `ThemeInitializer`.
 */
export function LocaleInitializer({ locale }: { locale: string }) {
  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
