"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageProvider";

export default function LocaleSync() {
  const { locale, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [locale, t]);

  return null;
}
