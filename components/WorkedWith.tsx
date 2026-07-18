"use client";

import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

export default function WorkedWith() {
  const { t } = useLanguage();

  return (
    <Reveal>
      <div className="mx-auto max-w-3xl px-6 py-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          {t.ui.workedWithLabel}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {t.workedWith.map((name) => (
            <span key={name} className="text-lg font-semibold tracking-tight text-foreground/70">
              {name}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
