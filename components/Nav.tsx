"use client";

import { useEffect, useState } from "react";
import { Download, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border bg-white p-0.5 text-xs font-semibold">
      {(["en", "vi"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1.5 transition-colors duration-300 ${
            locale === l ? "bg-foreground text-white" : "text-muted hover:text-foreground"
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
      className={`fixed top-0 z-[1000] w-full transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-white/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="shrink-0 text-lg font-bold tracking-[-0.03em]">
          Khang Tran<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-5 text-sm text-muted lg:flex">
          <a
            href={`mailto:${t.profile.email}`}
            className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-accent"
          >
            <Mail size={14} />
            {t.profile.email}
          </a>
          <a
            href={`tel:${t.profile.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-accent"
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium transition-colors duration-300 hover:border-foreground"
          >
            <Download size={14} />
            <span className="hidden sm:inline">{t.ui.resume}</span>
          </a>
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-foreground px-[15px] py-[7px] text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent sm:inline-flex"
          >
            {t.ui.contactLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
