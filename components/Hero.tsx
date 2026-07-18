"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  const { profile } = t;

  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-xl px-6">
        {/* lanyard clip */}
        <div className="mx-auto -mb-1 flex w-fit flex-col items-center">
          <div className="h-6 w-3 rounded-t-sm bg-border" />
          <div className="h-3 w-8 rounded-sm bg-foreground" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(20,21,26,0.35)] sm:p-8"
        >
          <div className="h-1.5 w-full rounded-full bg-accent-soft">
            <div className="h-1.5 w-2/3 rounded-full bg-accent" />
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                KT
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">{profile.name}</p>
                <p className="truncate text-xs text-muted">{profile.title}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent-2" />
              {t.ui.heroStatus}
            </div>
          </div>

          <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            {t.heroTitleLead} <span className="text-accent">{t.heroTitleHighlight}</span>
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {t.ui.heroRatingNote}
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">{profile.exitStory}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              {t.ui.heroCtaPrimary}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={12} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
            >
              {t.ui.heroCtaSecondary}
            </a>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} />
              {t.ui.heroBasedInLabel} <strong className="font-medium text-foreground">{profile.location}</strong>
            </span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
            >
              {t.ui.heroLinkedin} <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
