import { useSyncExternalStore } from "react";

// framer-motion's useReducedMotion reads the media query on the first client
// render, so SSR markup (always "motion on") mismatches for reduced-motion
// users. This version reports false while hydrating, then the real setting.

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
