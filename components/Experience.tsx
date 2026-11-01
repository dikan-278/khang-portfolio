"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { experienceYears } from "@/lib/content";
import { employerLogos } from "@/lib/clientLogos";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  const { t } = useLanguage();
  const { experience } = t;

  const [activeYear, setActiveYear] = useState(experienceYears[0]);
  const activeJob =
    experience.find((e) => activeYear >= e.startYear && activeYear <= e.endYear) ?? experience[0];

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader label={t.ui.careerLabel} title={t.ui.careerTitle} subtitle={t.ui.careerSubtitle} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[200px_1fr]">
        <Reveal delay={0.1}>
          <div
            role="tablist"
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {experienceYears.map((year) => {
              const active = year === activeYear;
              return (
                <button
                  key={year}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveYear(year)}
                  className={`inline-flex shrink-0 items-center justify-between gap-3 rounded-full border px-5 py-2.5 font-mono text-sm font-medium transition-colors duration-300 ${
                    active
                      ? "border-foreground bg-foreground text-white"
                      : "border-border bg-white text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {year}
                  {active && <Check size={14} strokeWidth={3} className="text-accent-2" />}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal key={activeJob.company} delay={0.15}>
          <div className="rounded-card border border-border bg-white p-6 shadow-subtle sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{activeJob.role}</h3>
              <span className="rounded-chip bg-surface-2 px-3 py-1 font-mono text-xs text-foreground/80">
                {activeJob.period}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              {employerLogos[activeJob.logoKey] && (
                <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                  <Image
                    src={employerLogos[activeJob.logoKey]}
                    alt={activeJob.company}
                    fill
                    className="object-contain p-0.5"
                  />
                </span>
              )}
              <p className="text-[15px] font-semibold text-accent">{activeJob.company}</p>
            </div>
            <ul className="mt-6 space-y-3">
              {activeJob.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-[1.5] text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
