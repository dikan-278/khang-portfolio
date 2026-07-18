"use client";

import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

export default function StatCards() {
  const { t } = useLanguage();
  const [first, second] = t.statHighlights;

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col justify-center rounded-[1.75rem] border border-border bg-surface p-8">
            <p className="text-5xl font-semibold tracking-tight">
              {first.value}
              <span className="ml-1 text-accent">+</span>
            </p>
            <p className="mt-2 text-sm font-medium">{first.label}</p>
            <p className="mt-1 text-sm text-muted">{first.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="dot-pattern relative flex h-full flex-col justify-center overflow-hidden rounded-[1.75rem] bg-accent p-8 text-white">
            <p className="text-5xl font-semibold tracking-tight">{second.value}</p>
            <p className="mt-2 text-sm font-medium">{second.label}</p>
            <p className="mt-1 text-sm text-white/75">{second.sub}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
