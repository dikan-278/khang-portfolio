"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Magnetic from "./Magnetic";

// Signature: the photo reads as a laminated ID-badge portrait — a clean
// circular cutout (white halo, like a die-cut sticker) with a status seal
// stamped on its rim, the way a physical badge carries a foil "valid" seal
// rather than text wrapped around the photo itself.
function AvatarBadge({ initials, photoSrc }: { initials: string; photoSrc?: string }) {
  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      <div
        className="h-full w-full overflow-hidden rounded-full"
        style={{ boxShadow: "0 0 0 6px var(--surface), 0 8px 20px -8px rgba(20,21,26,0.35)" }}
      >
        {photoSrc ? (
          <Image src={photoSrc} alt="" width={112} height={112} className="h-full w-full object-cover" />
        ) : (
          <div className="dot-pattern relative h-full w-full opacity-90">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #4433ff 0%, #6c5cff 55%, #9b8fff 100%)" }}
            />
            <span className="relative flex h-full w-full items-center justify-center text-2xl font-bold text-white sm:text-[1.7rem]">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div
        className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-accent-2 sm:h-7 sm:w-7"
        style={{ left: "80%", top: "80%", transform: "translate(-50%, -50%)", boxShadow: "0 0 0 3px var(--surface)" }}
      >
        <motion.span
          className="absolute h-full w-full rounded-full bg-accent-2"
          animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative h-2 w-2 rounded-full bg-foreground" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const { profile } = t;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-xl px-6" style={{ perspective: 1200 }}>
        {/* lanyard clip */}
        <motion.div
          className="mx-auto -mb-1 flex w-fit origin-top flex-col items-center"
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-6 w-3 rounded-t-sm bg-border" />
          <div className="h-3 w-8 rounded-sm bg-foreground" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -36, rotate: -3, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.15 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
          className="group relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(20,21,26,0.35)] sm:p-8"
        >
          <div
            className="pointer-events-none absolute -inset-y-full left-[-60%] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100"
            aria-hidden="true"
          />

          <div className="h-1.5 w-full rounded-full bg-accent-soft">
            <div className="h-1.5 w-2/3 rounded-full bg-accent" />
          </div>

          <div className="mt-7 flex flex-col items-center text-center">
            <AvatarBadge initials="KT" />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm text-muted">{profile.title}</p>

            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {t.ui.heroStatus}
            </span>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted">
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              {t.ui.heroRatingNote}
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-muted">{profile.exitStory}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              >
                {t.ui.heroCtaPrimary}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={12} />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
              >
                {t.ui.heroCtaSecondary}
              </a>
            </Magnetic>
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
