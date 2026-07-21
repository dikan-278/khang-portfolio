"use client";

import { Award, GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">{t.ui.educationLabel}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.ui.educationTitle}</h2>
        <p className="mt-3 text-muted">{t.ui.educationSubtitle}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="h-full rounded-[1.5rem] border border-border bg-surface p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap size={18} />
              </span>
              <h3 className="font-semibold">{t.ui.educationHeading}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {t.education.map((e) => (
                <li key={e.degree} className="rounded-xl bg-surface-2 px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground/90">{e.degree}</p>
                  <p className="mt-0.5 text-xs text-muted">{e.institution}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full rounded-[1.5rem] border border-border bg-surface p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Award size={18} />
              </span>
              <h3 className="font-semibold">{t.ui.certificationsHeading}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {t.certifications.map((c) => (
                <li key={c.name} className="rounded-xl bg-surface-2 px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground/90">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
