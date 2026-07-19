"use client";

import { FileText, GitCompare, ListChecks, MessagesSquare } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

const ICONS = [FileText, GitCompare, ListChecks, MessagesSquare];

export default function AiWorkflow() {
  const { t } = useLanguage();

  return (
    <section id="ai-workflow" className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {t.ui.differentiatorLabel}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.ui.differentiatorTitle}
            </h2>
            <p className="mt-4 text-muted">{t.ui.differentiatorSubtitle}</p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.aiWorkflow.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="card-hover h-full rounded-2xl border border-border bg-surface p-5">
                    <div className="inline-flex rounded-lg border border-accent/25 bg-accent/10 p-2 text-accent">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
