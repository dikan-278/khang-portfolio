"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Approach() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
          <div className="flex items-start justify-between gap-4 bg-accent p-7 text-white">
            <div>
              <p className="text-5xl font-semibold leading-none">{t.process.length}</p>
              <p className="mt-3 text-sm font-medium">{t.ui.approachSectionTitle}</p>
              <p className="mt-1 max-w-xs text-sm text-white/75">{t.ui.approachSectionSubtitle}</p>
            </div>
            <ArrowUpRight className="shrink-0 text-white/60" size={22} />
          </div>

          <div>
            {t.process.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.06}>
                <div
                  className={`flex items-center gap-4 p-5 sm:p-6 ${
                    i !== t.process.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
