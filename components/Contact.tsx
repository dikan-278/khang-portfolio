"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const { profile } = t;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-28 pt-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-card bg-accent p-8 text-white sm:p-16">
          <div className="dot-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-light/30 blur-[100px]" aria-hidden="true" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-chip bg-white/15 px-3 py-1 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {t.ui.contactLabel}
            </span>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              {t.ui.contactTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-[1.4] text-white/80">
              {t.ui.heroBasedInLabel} {profile.location}. {t.ui.contactSubtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-foreground"
                >
                  <Mail size={16} />
                  {profile.email}
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[15px] font-semibold transition-colors duration-300 hover:bg-white hover:text-foreground"
                >
                  <LinkedinIcon size={16} />
                  {t.ui.heroLinkedin}
                </a>
              </Magnetic>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Phone size={14} /> {profile.phone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
