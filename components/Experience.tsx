"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { experienceYears } from "@/lib/content";
import { employerLogos } from "@/lib/clientLogos";
import Reveal from "./Reveal";

export default function Experience() {
  const { t } = useLanguage();
  const { experience } = t;

  const [activeYear, setActiveYear] = useState(experienceYears[0]);
  const activeJob =
    experience.find((e) => activeYear >= e.startYear && activeYear <= e.endYear) ?? experience[0];

  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">{t.ui.careerLabel}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.ui.careerTitle}</h2>
        <p className="mt-3 text-muted">{t.ui.careerSubtitle}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex items-center overflow-x-auto pb-2">
          {experienceYears.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className="group relative flex flex-1 flex-col items-center gap-2 py-1"
            >
              <span className="h-px w-full bg-border">
                <span
                  className={`block h-px bg-accent transition-all duration-300 ${
                    year === activeYear ? "w-full" : "w-0"
                  }`}
                />
              </span>
              {year === activeYear ? (
                <span className="-mt-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-accent-2 text-foreground">
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : (
                <span className="-mt-[5px] h-2.5 w-2.5 rounded-full border-2 border-background bg-border transition-colors group-hover:bg-accent/40" />
              )}
              <span
                className={`font-mono text-sm font-medium transition-colors ${
                  year === activeYear ? "text-2xl font-semibold text-foreground" : "text-muted"
                }`}
              >
                {year}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal key={activeJob.company} delay={0.15}>
        <div className="mt-8 rounded-[1.75rem] border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-semibold">{activeJob.role}</h3>
            <span className="font-mono text-sm text-muted">{activeJob.period}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {employerLogos[activeJob.logoKey] && (
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                <Image
                  src={employerLogos[activeJob.logoKey]}
                  alt={activeJob.company}
                  fill
                  className="object-contain p-0.5"
                />
              </span>
            )}
            <p className="text-sm font-medium text-accent">{activeJob.company}</p>
          </div>
          <ul className="mt-4 space-y-2.5">
            {activeJob.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm text-foreground/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
