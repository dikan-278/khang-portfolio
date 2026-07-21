"use client";

import { motion } from "framer-motion";
import { FileText, GitCompare, ListChecks, MessagesSquare } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

const ICONS = [FileText, GitCompare, ListChecks, MessagesSquare];

export default function AiWorkflow() {
  const { t } = useLanguage();

  return (
    <section id="ai-workflow" className="relative overflow-hidden bg-[#14151a] text-white">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-2/10 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-accent-2">
              {t.ui.differentiatorLabel}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t.ui.differentiatorTitle}
            </h2>
            <p className="mt-4 text-white/65">{t.ui.differentiatorSubtitle}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.aiWorkflow.map((item, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div
                    key={item.title}
                    className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-2/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_-20px_rgba(182,255,60,0.15)]"
                  >
                    <div className="inline-flex rounded-lg border border-accent-2/25 bg-accent-2/10 p-2 text-accent-2 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-white/60">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
