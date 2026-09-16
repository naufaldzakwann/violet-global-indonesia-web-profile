"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, defaultLang, type Dict, type Lang } from "./dictionaries";

type Ctx = {
  lang: Lang;
  d: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx>({
  lang: defaultLang,
  d: dictionaries[defaultLang],
  setLang: () => {},
  toggle: () => {},
});

const KEY = "vgi-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return defaultLang;
    try {
      const saved = window.localStorage.getItem(KEY);
      return saved === "en" || saved === "id" ? saved : defaultLang;
    } catch {
      return defaultLang;
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === "id" ? "id" : "en";
    try {
      window.localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, d: dictionaries[lang], setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
