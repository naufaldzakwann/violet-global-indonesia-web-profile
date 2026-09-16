"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
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
const EVENT = "vgi-lang-change";

function readStored(): Lang {
  try {
    return window.localStorage.getItem(KEY) === "id" ? "id" : "en";
  } catch {
    return defaultLang;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

const getSnapshot = () => readStored();
const getServerSnapshot = () => defaultLang;

function writeStored(lang: Lang) {
  try {
    window.localStorage.setItem(KEY, lang);
  } catch {
    /* private mode — session only */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore is the hydration-safe way to read localStorage:
  // server renders `defaultLang`, client re-renders with the stored value
  // without a hydration error.
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeStored(l), []);
  const toggle = useCallback(
    () => writeStored(readStored() === "en" ? "id" : "en"),
    []
  );

  return (
    <LanguageContext.Provider value={{ lang, d: dictionaries[lang], setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
