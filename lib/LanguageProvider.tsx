"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Locale } from "./content";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "khang-portfolio-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // One-time sync from localStorage/navigator on mount — window isn't
    // available during SSR, so this can't move into the useState initializer.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "vi") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
      return;
    }
    const browserLocale = window.navigator.language?.toLowerCase() ?? "";
    if (browserLocale.startsWith("vi")) setLocaleState("vi");
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: content[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
