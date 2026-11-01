"use client";

import Reveal from "./Reveal";

// Shared section heading: pill label + large bold title + optional subtitle.
// `tone="dark"` is for sections that sit on the near-black band.
export default function SectionHeader({
  label,
  title,
  subtitle,
  tone = "light",
  compact = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <Reveal>
      {label && (
        <span
          className={`inline-flex items-center gap-2 rounded-chip px-3 py-1 text-xs font-medium ${
            dark ? "bg-white/10 text-white" : "bg-surface-2 text-foreground"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-accent-light" : "bg-accent"}`} />
          {label}
        </span>
      )}
      <h2
        className={`${label ? "mt-4" : ""} font-bold leading-[1.05] tracking-[-0.03em] ${
          compact ? "text-3xl sm:text-5xl" : "text-4xl sm:text-6xl"
        } ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-[1.4] ${dark ? "text-white/65" : "text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
