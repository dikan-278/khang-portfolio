"use client";

import { useLanguage } from "@/lib/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {t.profile.name}
        </p>
        <p>{t.ui.footerBuiltWith}</p>
      </div>
    </footer>
  );
}
