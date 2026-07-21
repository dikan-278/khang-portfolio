"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageProvider";
import { clientLogos } from "@/lib/clientLogos";
import Reveal from "./Reveal";

export default function WorkedWith() {
  const { t } = useLanguage();

  return (
    <Reveal>
      <div className="mx-auto max-w-5xl px-6 py-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          {t.ui.workedWithLabel}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {t.workedWith.map((name) => {
            const logo = clientLogos[name];
            return logo ? (
              <span
                key={name}
                className="card-hover flex h-14 w-32 items-center justify-center rounded-xl border border-border bg-surface p-3 sm:h-16 sm:w-36"
              >
                <span className="relative h-full w-full">
                  <Image src={logo} alt={name} fill sizes="144px" className="object-contain object-center" />
                </span>
              </span>
            ) : (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold tracking-tight text-foreground/80"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
