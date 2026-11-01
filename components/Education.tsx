"use client";

import { Award, GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        label={t.ui.educationLabel}
        title={t.ui.educationTitle}
        subtitle={t.ui.educationSubtitle}
      />

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="h-full rounded-card border border-border bg-white p-6 shadow-subtle">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap size={20} />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{t.ui.educationHeading}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {t.education.map((e) => (
                <li key={e.degree} className="rounded-lg bg-surface-2 px-4 py-3">
                  <p className="text-[15px] font-medium text-foreground/90">{e.degree}</p>
                  <p className="mt-0.5 text-sm text-muted">{e.institution}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full rounded-card border border-border bg-white p-6 shadow-subtle">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Award size={20} />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{t.ui.certificationsHeading}</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {t.certifications.map((c) => (
                <li key={c.name} className="rounded-lg bg-surface-2 px-4 py-3">
                  <p className="text-[15px] font-medium text-foreground/90">{c.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
