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
    <section id="contact" className="mx-auto max-w-3xl px-6 pb-32 pt-4">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-foreground p-10 text-center text-background sm:p-16">
          <p className="text-xs font-medium uppercase tracking-widest text-background/60">
            {t.ui.contactLabel}
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.ui.contactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-background/70">
            {t.ui.heroBasedInLabel} {profile.location}. {t.ui.contactSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
              >
                <Mail size={15} />
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3 text-sm font-medium transition-colors hover:border-background/60"
              >
                <LinkedinIcon size={15} />
                {t.ui.heroLinkedin}
              </a>
            </Magnetic>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-background/60">
            <span className="inline-flex items-center gap-1.5">
              <Phone size={14} /> {profile.phone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {profile.location}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
