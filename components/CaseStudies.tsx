"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import type { CaseStudyContent, Content } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

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

  const initial = study.client.trim().charAt(0);
  const docCode = `CASE-${String(index + 1).padStart(2, "0")}`;
  const isLive = study.status === "live";

  return (
    <Reveal delay={index * 0.08}>
      <div className="overflow-hidden rounded-card border border-border bg-white shadow-subtle">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="card-hover flex w-full flex-col text-left sm:flex-row"
        >
          <div
            className="relative h-28 shrink-0 overflow-hidden sm:h-auto sm:w-64"
            style={{ background: study.gradient }}
          >
            <div className="dot-pattern absolute inset-0 opacity-50" />
            <span className="absolute left-5 top-5 text-5xl font-bold tracking-[-0.03em] text-white/90">
              {initial}
            </span>

            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                {isLive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                )}
                <span className={`relative h-1.5 w-1.5 rounded-full ${isLive ? "bg-accent-2" : "bg-white/70"}`} />
              </span>
              {isLive ? ui.caseStatusLive : ui.caseStatusShipped}
            </span>

            <span className="absolute bottom-4 left-5 max-w-[calc(100%-2.5rem)] overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] font-medium tracking-tight text-white backdrop-blur-sm">
              {docCode} · {study.period}
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between gap-4 p-6 sm:p-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                {study.client}
              </span>
              <h3 className="mt-1.5 text-2xl font-semibold leading-tight tracking-[-0.02em]">
                {study.title}
              </h3>
              <p className="mt-2 text-[15px] text-muted">{study.heroMetric}</p>
            </div>
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-white transition-transform duration-300 ${
                open ? "rotate-45 bg-accent" : ""
              }`}
            >
              <ArrowUpRight size={18} />
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-chip border border-border px-3 py-1 font-mono text-xs text-muted">
                    <Users size={12} /> {study.team}
                  </span>
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-chip bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">{ui.problemLabel}</p>
                    <p className="mt-2 text-[15px] leading-[1.5] text-foreground/85">{study.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">{ui.approachLabel}</p>
                    <p className="mt-2 text-[15px] leading-[1.5] text-foreground/85">{study.approach}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">{ui.outcomeLabel}</p>
                    <p className="mt-2 text-[15px] leading-[1.5] text-foreground/85">{study.outcome}</p>
                  </div>
                </div>

                {study.aiNote && (
                  <div className="mt-6 flex gap-3 rounded-card bg-accent-soft p-4">
                    <Sparkles size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-[15px] leading-[1.5] text-foreground/85">{study.aiNote}</p>
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
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader label={t.ui.workSectionLabel} title={t.ui.workTitle} subtitle={t.ui.workSubtitle} />

      <div className="mt-12 flex flex-col gap-4">
        {t.caseStudies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} ui={t.ui} />
        ))}
      </div>
    </section>
  );
}
