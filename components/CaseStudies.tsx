"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import type { CaseStudyContent, Content } from "@/lib/content";
import Reveal from "./Reveal";

function CaseStudyCard({
  study,
  index,
  ui,
}: {
  study: CaseStudyContent;
  index: number;
  ui: Content["ui"];
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 0.08}>
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface">
        <button
          onClick={() => setOpen((v) => !v)}
          className="card-hover relative flex h-64 w-full flex-col justify-end p-6 text-left sm:h-72"
          style={{ background: study.gradient }}
        >
          <div className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {study.period}
          </div>
          <div className="flex items-end justify-between gap-4 rounded-2xl bg-white/95 p-4 text-foreground shadow-lg backdrop-blur-sm">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-widest text-accent">
                {study.client}
              </span>
              <h3 className="mt-0.5 text-base font-semibold leading-snug sm:text-lg">
                {study.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{study.heroMetric}</p>
            </div>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform ${
                open ? "rotate-45" : ""
              }`}
            >
              <ArrowUpRight size={16} />
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted">
                    <Users size={12} /> {study.team}
                  </span>
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">{ui.problemLabel}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{study.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">{ui.approachLabel}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{study.approach}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">{ui.outcomeLabel}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{study.outcome}</p>
                  </div>
                </div>

                {study.aiNote && (
                  <div className="mt-6 flex gap-3 rounded-2xl bg-accent-soft p-4">
                    <Sparkles size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-foreground/85">{study.aiNote}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function CaseStudies() {
  const { t } = useLanguage();

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">{t.ui.workSectionLabel}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.ui.workTitle}</h2>
        <p className="mt-3 max-w-2xl text-muted">{t.ui.workSubtitle}</p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-5">
        {t.caseStudies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} ui={t.ui} />
        ))}
      </div>
    </section>
  );
}
