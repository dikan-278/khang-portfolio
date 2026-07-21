// Local logo assets for clients (WorkedWith) and employers (Experience).
// Sourced from each company's own site or Wikimedia Commons for factual
// "worked with" attribution. Any name/key without an entry falls back to the
// existing text treatment, so the UI degrades gracefully for the rest.
//
// WorkedWith is keyed by the exact client name (identical string in both
// locales). Experience is keyed by `logoKey` (see lib/content.ts), since the
// `company` field itself is translated per locale.
export const clientLogos: Record<string, string> = {
  Vietravel: "/logos/logo-vietravel.png",
  AstraZeneca: "/logos/astrazeneca.svg",
  Mobifone: "/logos/mobifone.svg",
  "De Heus Vietnam": "/logos/de-heus.svg",
  "KBank Vietnam": "/logos/kbank.svg",
};

export const employerLogos: Record<string, string> = {
  vietravel: "/logos/logo-vietravel.png",
  "dr-digital": "/logos/dr-digital.svg",
  "fpt-is": "/logos/fpt-is.svg",
  // "foolist-creative": no official logo asset found — falls back to text.
};
