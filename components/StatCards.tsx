"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Bottom-only margin: a symmetric one excludes the viewport's left/right
  // strips, so a number hugging the left edge would never count as in view.
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
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
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.statHighlights.map((stat, i) => {
          const accentCard = i % 2 === 1;
          return (
            <Reveal key={stat.label} delay={i * 0.06} className="h-full">
              <div
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-card p-6 ${
                  accentCard ? "dot-pattern bg-accent text-white" : "bg-surface-2"
                }`}
              >
                <p className="whitespace-nowrap text-4xl font-bold tracking-[-0.04em] xl:text-5xl">
                  <CountUp value={stat.value} />
                  <span className={accentCard ? "text-accent-light" : "text-accent"}>{stat.suffix}</span>
                </p>
                <div className="mt-8">
                  <p className="text-[15px] font-semibold leading-snug">{stat.label}</p>
                  <p className={`mt-1 text-sm leading-snug ${accentCard ? "text-white/75" : "text-muted"}`}>
                    {stat.sub}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
