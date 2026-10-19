"use client";

import { useEffect } from "react";

/**
 * Menyamakan atribut `lang` pada <html> dengan locale route aktif.
 *
 * Root layout sets the initial language through getLocale(). It persists across
 * client navigation, so keep the document language synchronized here as well.
 */
export function LocaleInitializer({ locale }: { locale: string }) {
  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
