"use client";

import { useEffect, useState } from "react";
import { Briefcase, Home, Mail, Sparkles, User } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";

const SECTIONS = [
  { href: "#top", key: "navHome" as const, icon: Home },
  { href: "#work", key: "navWork" as const, icon: Briefcase },
  { href: "#ai-workflow", key: "navAi" as const, icon: Sparkles },
  { href: "#experience", key: "navCareer" as const, icon: User },
];

export default function FloatingNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = SECTIONS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface/95 p-1.5 shadow-[0_20px_50px_-20px_rgba(20,21,26,0.35)] backdrop-blur-md">
        {SECTIONS.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
                isActive ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{t.ui[link.key]}</span>
            </a>
          );
        })}
        <a
          href="#contact"
          className="ml-1 flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-sm font-medium text-background sm:px-4"
        >
          <Mail size={14} />
          <span className="hidden sm:inline">{t.ui.navContact}</span>
        </a>
      </div>
    </nav>
  );
}
