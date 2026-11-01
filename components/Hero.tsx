"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { BrandLogoIcon, brandLogos } from "@/lib/brandLogos";
import HeroFloaters, { CollabCursors } from "./HeroFloaters";
import Magnetic from "./Magnetic";

// Handles of the "selection frame" drawn around the headline, like a layer
// picked on a design canvas.
const HANDLES = [
  "left-0 top-0",
  "left-1/2 top-0",
  "left-full top-0",
  "left-0 top-1/2",
  "left-full top-1/2",
  "left-0 top-full",
  "left-1/2 top-full",
  "left-full top-full",
];

const INLINE_TOOLS = [
  brandLogos.jira,
  brandLogos.confluence,
  brandLogos.figma,
  brandLogos.drawio,
  brandLogos.claude,
];

export default function Hero() {
  const { t } = useLanguage();
  const { profile } = t;
  const reduce = useReducedMotionSafe();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-clip px-6 pb-16 pt-28"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <HeroFloaters />

      {/* the column's empty space lets hover reach the canvas items beneath it */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center [&>*]:pointer-events-auto">
        {/* headline — the name, set like a layer selected on a canvas */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative border border-dashed border-foreground/25 px-5 py-2 sm:px-10 sm:py-4"
        >
          {HANDLES.map((pos, i) => (
            <motion.span
              key={pos}
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.04, type: "spring", stiffness: 400, damping: 18 }}
              className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-accent bg-white ${pos}`}
              aria-hidden="true"
            />
          ))}
          <h1 className="whitespace-nowrap text-[clamp(2.75rem,10.5vw,7.5rem)] font-bold leading-[1] tracking-[-0.04em]">
            {profile.name}
            <span className="text-accent" aria-hidden="true">
              .
            </span>
          </h1>
        </motion.div>

        {/* identity: avatar + title, and the open-to-work status */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="inline-flex max-w-full items-center gap-3 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-5 text-left shadow-subtle">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-xs font-bold text-white">
              KT
            </span>
            <span className="text-sm font-semibold leading-tight">{profile.title}</span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-4 py-2.5 text-sm font-semibold text-[#00794f]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-accent-2" />
            </span>
            {t.ui.heroStatus}
          </span>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="mt-7 max-w-xl text-lg leading-[1.4] text-muted"
        >
          {profile.exitStory}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8 flex flex-col items-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-accent"
              >
                {t.ui.heroCtaPrimary}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={12} />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-foreground/15 bg-white px-6 py-3 text-[15px] font-semibold transition-colors duration-300 hover:border-foreground"
              >
                {t.ui.heroCtaSecondary}
              </a>
            </Magnetic>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            {t.ui.heroRatingNote}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-chip bg-surface-2 px-3 py-1.5 text-muted">
              <MapPin size={12} />
              {t.ui.heroBasedInLabel}{" "}
              <strong className="font-medium text-foreground">{profile.location}</strong>
            </span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-chip bg-surface-2 px-3 py-1.5 font-medium text-foreground transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {t.ui.heroLinkedin} <ArrowUpRight size={12} />
            </a>
          </div>

          {/* below xl the floating canvas is hidden — keep the toolkit visible */}
          <div className="mt-8 flex items-center justify-center gap-2 xl:hidden" aria-hidden="true">
            {INLINE_TOOLS.map((logo) => (
              <span
                key={logo.title}
                className="flex h-10 w-10 items-center justify-center rounded-card bg-white shadow-subtle"
              >
                <BrandLogoIcon logo={logo} className="h-5 w-5" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <CollabCursors />
    </section>
  );
}
