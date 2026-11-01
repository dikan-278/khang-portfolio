"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";
import { Sparkles, SquareTerminal } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { BrandLogoIcon, brandLogos, type BrandLogo } from "@/lib/brandLogos";

// The decorative "design canvas" around the hero headline. Every item sits in
// an absolutely positioned slot and drifts on its own slow loop; hovering an
// item selects it like a layer on a canvas. The whole layer is aria-hidden.

const CORNERS = ["left-0 top-0", "left-full top-0", "left-0 top-full", "left-full top-full"];

function Floater({
  left,
  top,
  delay,
  drift = 8,
  driftX = 0,
  duration = 6,
  rotate = 0,
  children,
}: {
  left: string;
  top: string;
  delay: number;
  drift?: number;
  driftX?: number;
  duration?: number;
  rotate?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotionSafe();

  return (
    <div className="group pointer-events-auto absolute hover:z-10" style={{ left, top }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, y: [0, -drift, 0], x: [0, driftX, 0] }
        }
        transition={{
          opacity: { duration: 0.6, delay },
          scale: { duration: 0.6, delay },
          y: { duration, repeat: Infinity, ease: "easeInOut", delay },
          x: { duration: duration * 1.3, repeat: Infinity, ease: "easeInOut", delay },
        }}
      >
        {/* hover: straighten, lift and show a selection frame — only this item reacts */}
        <motion.div
          className="relative"
          initial={{ rotate }}
          animate={{ rotate, scale: 1, y: 0 }}
          whileHover={reduce ? undefined : { rotate: 0, scale: 1.06, y: -6 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          {children}
          <span
            className="pointer-events-none absolute -inset-1.5 border border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden="true"
          >
            {CORNERS.map((pos) => (
              <span
                key={pos}
                className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 border border-accent bg-white ${pos}`}
              />
            ))}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ToolChip({
  logo,
  children,
  active = true,
  glow = false,
}: {
  logo?: BrandLogo;
  children?: ReactNode;
  active?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative flex h-14 w-14 items-center justify-center rounded-card bg-white shadow-float transition-all duration-300 ${
        glow ? "ring-2 ring-accent/50" : ""
      } ${active ? "" : "opacity-40 grayscale"}`}
    >
      {logo ? <BrandLogoIcon logo={logo} className="h-7 w-7" /> : children}
      {glow && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
          <Sparkles size={11} />
        </span>
      )}
    </div>
  );
}

function Cursor({ color, label, dark = false }: { color: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-start">
      <svg width="16" height="20" viewBox="0 0 12 18" fill={color} aria-hidden="true">
        <path d="M0 0 L0 14 L3.6 10.6 L6.3 17 L8.6 16 L6 9.8 L11 9.8 Z" />
      </svg>
      <span
        className="-ml-0.5 mt-3.5 rounded-md px-2 py-0.5 text-[11px] font-semibold shadow-subtle"
        style={{ background: color, color: dark ? "#1d1d1f" : "#fff" }}
      >
        {label}
      </span>
    </div>
  );
}

// --- Figma-style collaborator cursors ------------------------------------
// Each cursor loops through waypoints (in % of the hero): it glides to a
// spot, "clicks" (a ripple at the arrow tip), lingers, then moves on. One
// waypoint per cursor shows its cursor chat while it lingers there.

type Waypoint = { x: number; y: number; hold: number; chat?: boolean };
type Collaborator = { color: string; dark?: boolean; delay: number; path: Waypoint[] };

const MOVE_BASE = 0.9; // seconds for any hop, plus a share per % travelled
const MOVE_PER_UNIT = 0.035;
const RIPPLE = 0.55;

function buildTimeline(path: Waypoint[]) {
  const left: string[] = [];
  const top: string[] = [];
  const at: number[] = [];
  const ease: ("linear" | "easeInOut")[] = [];
  const arrivals: number[] = [];
  const chatWindows: [number, number][] = [];
  let t = 0;

  path.forEach((p, i) => {
    const next = path[(i + 1) % path.length];
    arrivals.push(t);
    left.push(`${p.x}%`, `${p.x}%`);
    top.push(`${p.y}%`, `${p.y}%`);
    at.push(t, t + p.hold);
    if (p.chat) chatWindows.push([t, t + p.hold]);
    ease.push("linear", "easeInOut");
    t += p.hold + MOVE_BASE + Math.hypot(next.x - p.x, next.y - p.y) * MOVE_PER_UNIT;
  });
  left.push(`${path[0].x}%`);
  top.push(`${path[0].y}%`);
  at.push(t);

  const total = t;
  const times = (list: number[]) => list.map((v) => Math.min(v / total, 1));

  const ripple = { t: [] as number[], opacity: [] as number[], scale: [] as number[] };
  arrivals.forEach((a) => {
    if (a > 0) {
      ripple.t.push(a - 0.01);
      ripple.opacity.push(0);
      ripple.scale.push(0.3);
    }
    ripple.t.push(a, a + RIPPLE);
    ripple.opacity.push(0.55, 0);
    ripple.scale.push(0.3, 1.8);
  });
  ripple.t.push(total);
  ripple.opacity.push(0);
  ripple.scale.push(1.8);

  const chat = { t: [0] as number[], opacity: [0] as number[] };
  chatWindows.forEach(([from, to]) => {
    chat.t.push(from, from + 0.25, to - 0.2, to);
    chat.opacity.push(0, 1, 1, 0);
  });
  chat.t.push(total);
  chat.opacity.push(0);

  return {
    total,
    left,
    top,
    times: times(at),
    ease,
    ripple: { ...ripple, times: times(ripple.t) },
    chat: { ...chat, times: times(chat.t) },
  };
}

// Cursors may glide over the headline (they render above it), but every chat
// stop sits in the side gutters (x < 14% or x > 66%) so a bubble never covers
// the hero copy.
const COLLABORATORS: Collaborator[] = [
  {
    color: "#00d084",
    delay: 0.7,
    path: [
      { x: 15.5, y: 26, hold: 1.2 },
      { x: 24.5, y: 20.5, hold: 1 },
      { x: 3, y: 34, hold: 2.8, chat: true },
      { x: 19, y: 19, hold: 1 },
    ],
  },
  {
    color: "#0693e3",
    delay: 1.6,
    path: [
      { x: 77, y: 27, hold: 1 },
      { x: 86, y: 31, hold: 1.2 },
      { x: 84, y: 69, hold: 2.8, chat: true },
      { x: 76, y: 38, hold: 1 },
    ],
  },
  {
    color: "#f78da7",
    dark: true,
    delay: 2.4,
    path: [
      { x: 18, y: 57, hold: 1 },
      { x: 24, y: 37, hold: 1 },
      { x: 12, y: 58, hold: 2.8, chat: true },
      { x: 13, y: 47, hold: 1 },
    ],
  },
  {
    color: "#fcb900",
    dark: true,
    delay: 1.1,
    path: [
      { x: 67, y: 90, hold: 1 },
      { x: 76, y: 83, hold: 1.4 },
      { x: 70, y: 72, hold: 2.8, chat: true },
      { x: 55, y: 92, hold: 1 },
    ],
  },
  {
    color: "#9b51e0",
    delay: 3.1,
    path: [
      { x: 12, y: 40, hold: 1 },
      { x: 11, y: 53, hold: 1.2 },
      { x: 13, y: 77, hold: 2.8, chat: true },
      { x: 4, y: 45, hold: 0.8 },
    ],
  },
  {
    color: "#ff6900",
    delay: 2,
    path: [
      { x: 84, y: 55, hold: 1 },
      { x: 90, y: 47, hold: 1.2 },
      { x: 80, y: 50, hold: 2.8, chat: true },
      { x: 72, y: 58, hold: 0.8 },
    ],
  },
];

// Timelines depend only on the static paths above, so build them once.
const TIMELINES = COLLABORATORS.map((c) => buildTimeline(c.path));

function CollabCursor({
  collaborator,
  label,
  chat,
}: {
  collaborator: Collaborator;
  label: string;
  chat: string;
}) {
  const reduce = useReducedMotionSafe();
  const { color, dark, delay } = collaborator;
  const tl = TIMELINES[COLLABORATORS.indexOf(collaborator)];
  const start = { left: tl.left[0], top: tl.top[0] };
  const loop = { duration: tl.total, times: tl.times, ease: tl.ease, repeat: Infinity, delay };

  return (
    <motion.div
      className="absolute"
      initial={{ ...start, opacity: 0 }}
      animate={reduce ? { ...start, opacity: 1 } : { left: tl.left, top: tl.top, opacity: 1 }}
      transition={reduce ? { duration: 0.6 } : { left: loop, top: loop, opacity: { duration: 0.6, delay } }}
    >
      <div className="relative">
        {!reduce && (
          <motion.span
            className="absolute -left-2 -top-2 h-4 w-4 rounded-full"
            style={{ background: color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: tl.ripple.opacity, scale: tl.ripple.scale }}
            transition={{ duration: tl.total, times: tl.ripple.times, repeat: Infinity, delay, ease: "linear" }}
          />
        )}
        <Cursor color={color} label={label} dark={dark} />
        {!reduce && (
          <motion.p
            className="absolute left-4 top-10 w-max max-w-[12rem] rounded-xl rounded-tl-sm px-3 py-1.5 text-[11px] font-medium leading-snug shadow-float"
            style={{ background: color, color: dark ? "#1d1d1f" : "#fff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: tl.chat.opacity }}
            transition={{ duration: tl.total, times: tl.chat.times, repeat: Infinity, delay, ease: "linear" }}
          >
            {chat}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function WindowFrame({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-foreground/10 bg-white/90 shadow-float backdrop-blur-sm ${className}`}
    >
      <div className="flex gap-1 border-b border-foreground/10 bg-surface-2 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function Bubble({ name, time, text }: { name: string; time: string; text: string }) {
  return (
    <div className="flex w-[16.5rem] items-start gap-2.5 rounded-[14px] bg-white p-3 shadow-float">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
        {name.charAt(0)}
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold">
          {name} <span className="font-normal text-muted">{time}</span>
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-0.5 text-[12px] leading-snug text-foreground/85"
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HeroFloaters() {
  const { t } = useLanguage();
  const firstName = t.profile.name.split(" ")[0];

  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
      {/* documents & windows */}
      <Floater left="2%" top="21%" delay={0.3} rotate={-5} drift={6} duration={7}>
        <WindowFrame className="w-48">
          <p className="font-mono text-[10px] font-semibold text-accent">BRD · v1.2</p>
          <div className="mt-2 space-y-1.5">
            {["90%", "72%", "84%", "55%"].map((w) => (
              <div key={w} className="h-1.5 rounded bg-foreground/10" style={{ width: w }} />
            ))}
          </div>
          <span className="mt-3 inline-block rounded-full bg-accent-2/15 px-2 py-0.5 text-[9px] font-semibold text-[#00794f]">
            Approved
          </span>
        </WindowFrame>
      </Floater>

      <Floater left="7%" top="63%" delay={0.5} rotate={4} drift={7} duration={8}>
        <WindowFrame className="w-52">
          <p className="font-mono text-[10px] font-semibold text-accent">User story</p>
          <p className="mt-1.5 text-[11px] leading-snug text-foreground/80">
            As a sales rep, I want one customer view, so I can follow up faster.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            {["CRM", "UAT"].map((tag) => (
              <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[9px]">
                {tag}
              </span>
            ))}
          </div>
        </WindowFrame>
      </Floater>

      <Floater left="84%" top="22%" delay={0.4} rotate={5} drift={6} duration={7.5}>
        <WindowFrame className="w-44">
          <div className="grid grid-cols-3 gap-1.5">
            {[2, 1, 3].map((n, col) => (
              <div key={col} className="space-y-1.5">
                <div className="h-1 w-6 rounded bg-foreground/25" />
                {Array.from({ length: n }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-5 rounded ${col === 2 ? "bg-accent-2/25" : col === 1 ? "bg-accent/20" : "bg-foreground/10"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </WindowFrame>
      </Floater>

      <Floater left="81%" top="63%" delay={0.6} rotate={-4} drift={7} duration={8.5}>
        <WindowFrame className="w-48">
          <div className="space-y-1 font-mono text-[10px] text-foreground/70">
            <p>
              <span className="text-accent">GET</span> /customers/{"{id}"}
            </p>
            <p className="text-[#00794f]">200 OK</p>
            <p>{`{ "status": "live" }`}</p>
          </div>
        </WindowFrame>
      </Floater>

      {/* tool chips */}
      <Floater left="17%" top="16%" delay={0.2} drift={9} duration={6}>
        <ToolChip logo={brandLogos.jira} />
      </Floater>
      <Floater left="9%" top="48%" delay={0.35} drift={8} duration={7}>
        <ToolChip logo={brandLogos.confluence} />
      </Floater>
      <Floater left="25%" top="84%" delay={0.45} drift={9} duration={6.5}>
        <ToolChip glow>
          <SquareTerminal size={26} className="text-foreground" />
        </ToolChip>
      </Floater>
      <Floater left="79%" top="15%" delay={0.25} drift={9} duration={6.2}>
        <ToolChip logo={brandLogos.figma} />
      </Floater>
      <Floater left="90%" top="51%" delay={0.4} drift={8} duration={7.2}>
        <ToolChip logo={brandLogos.claude} glow />
      </Floater>
      <Floater left="75%" top="80%" delay={0.55} drift={9} duration={6.8}>
        <ToolChip logo={brandLogos.drawio} />
      </Floater>

      {/* chat bubbles — the AI agents at work */}
      <Floater left="77%" top="36%" delay={0.65} drift={7} duration={8}>
        <Bubble name={firstName} time={t.hero.bubbles[0].time} text={t.hero.bubbles[0].text} />
      </Floater>
      <Floater left="3%" top="80%" delay={0.75} drift={7} duration={8.4}>
        <Bubble name={firstName} time={t.hero.bubbles[1].time} text={t.hero.bubbles[1].text} />
      </Floater>
    </div>
  );
}

// Collaborator cursors live in their own layer stacked above the hero copy,
// so a cursor passing over the headline stays visible, like Figma multiplayer.
export function CollabCursors() {
  const { t } = useLanguage();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block" aria-hidden="true">
      {COLLABORATORS.map((c, i) => (
        <CollabCursor key={c.color} collaborator={c} label={t.hero.cursors[i]} chat={t.hero.chats[i]} />
      ))}
    </div>
  );
}
