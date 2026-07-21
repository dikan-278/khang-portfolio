"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium">
      {(["en", "vi"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            locale === l ? "bg-accent text-white" : "text-muted hover:text-foreground"
          }`}
          aria-pressed={locale === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="shrink-0 font-semibold tracking-tight">
          Khang Tran
        </a>

        <div className="hidden items-center gap-5 text-sm text-muted lg:flex">
          <a
            href={`mailto:${t.profile.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <Mail size={14} />
            {t.profile.email}
          </a>
          <a
            href={`tel:${t.profile.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <Phone size={14} />
            {t.profile.phone}
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <a
            href="/cv-khang-tran.pdf"
            download="Khang-Tran-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Download size={14} />
            <span className="hidden sm:inline">{t.ui.resume}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
