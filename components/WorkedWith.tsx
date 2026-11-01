"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageProvider";
import { clientLogos } from "@/lib/clientLogos";
import Reveal from "./Reveal";

export default function WorkedWith() {
  const { t } = useLanguage();

  return (
    <Reveal>
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-4 text-center">
        <p className="text-sm font-medium text-muted">{t.ui.workedWithLabel}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {t.workedWith.map((name) => {
            const logo = clientLogos[name];
            return logo ? (
              <span
                key={name}
                className="card-hover flex h-16 w-36 items-center justify-center rounded-card border border-border bg-white p-3 sm:h-[72px] sm:w-40"
              >
                <span className="relative h-full w-full">
                  <Image src={logo} alt={name} fill sizes="160px" className="object-contain object-center" />
                </span>
              </span>
            ) : (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold tracking-tight text-foreground/80"
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
