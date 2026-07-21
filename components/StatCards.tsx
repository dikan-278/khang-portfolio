"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  const target = parseInt(value, 10);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return <span ref={ref}>{Number.isNaN(target) ? value : display}</span>;
}

export default function StatCards() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <div className="grid gap-5 sm:grid-cols-2">
        {t.statHighlights.map((stat, i) => {
          const accentCard = i % 2 === 1;
          return (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div
                className={
                  accentCard
                    ? "dot-pattern relative flex h-full flex-col justify-center overflow-hidden rounded-[1.75rem] bg-accent p-8 text-white"
                    : "flex h-full flex-col justify-center rounded-[1.75rem] border border-border bg-surface p-8"
                }
              >
                <p className="font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp value={stat.value} />
                  <span className={accentCard ? "" : "text-accent"}>{stat.suffix}</span>
                </p>
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
                <p className={`mt-1 text-sm ${accentCard ? "text-white/75" : "text-muted"}`}>{stat.sub}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
