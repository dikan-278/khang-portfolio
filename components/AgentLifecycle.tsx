"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import {
  Check,
  Code2,
  FileSearch,
  FileText,
  Inbox,
  KanbanSquare,
  Loader2,
  Pause,
  PenTool,
  Play,
  ShieldCheck,
  SquareTerminal,
  Target,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import type { AgentId } from "@/lib/content";
import Reveal from "./Reveal";

// Version 1 of the agent showcase: the whole delivery lifecycle as seven
// phases, each run by a subset of the agent team.

// How long each lifecycle phase stays on screen while auto-playing.
const PHASE_MS = 8000;
// Agent log lines appear one after another, each "finishing" shortly after.
const RUN_STEP = 0.9;
const RUN_FINISH = 0.7;

// Light tints so agent colours stay readable on the near-black band.
const AGENT_STYLE: Record<AgentId, { icon: LucideIcon; color: string }> = {
  po: { icon: Target, color: "#b98cff" },
  ba: { icon: FileSearch, color: "#4fb8f5" },
  pm: { icon: KanbanSquare, color: "#2fe3a0" },
  designer: { icon: PenTool, color: "#f9a8c4" },
  dev: { icon: Code2, color: "#fcc93d" },
  qa: { icon: ShieldCheck, color: "#ff8a3d" },
};

function PanelLabel({ icon: Icon, text, tone = "default" }: { icon: LucideIcon; text: string; tone?: "default" | "green" }) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
        tone === "green" ? "text-accent-2" : "text-white/55"
      }`}
    >
      <Icon size={14} />
      {text}
    </p>
  );
}

function RunLine({
  agent,
  name,
  text,
  delay,
  reduce,
}: {
  agent: AgentId;
  name: string;
  text: string;
  delay: number;
  reduce: boolean;
}) {
  const [done, setDone] = useState(reduce);
  const { color } = AGENT_STYLE[agent];

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setDone(true), (delay + RUN_FINISH) * 1000);
    return () => window.clearTimeout(id);
  }, [delay, reduce]);

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-3"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-accent-2/20" : "bg-white/10"
        }`}
      >
        {done ? (
          <Check size={12} strokeWidth={3} className="text-accent-2" />
        ) : (
          <Loader2 size={12} className="animate-spin text-white/60" />
        )}
      </span>
      <p className="min-w-0 text-sm leading-[1.5]">
        <span
          className="mr-2 rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
          style={{ background: `${color}26`, color }}
        >
          {name}
        </span>
        <span className="text-white/80">{text}</span>
      </p>
    </motion.li>
  );
}

export default function AgentLifecycle() {
  const { t } = useLanguage();
  const { agents, phases } = t.agentWorkflow;
  const reduce = useReducedMotionSafe();

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "0px 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  const phase = phases[active];
  const running = playing && inView && !reduce;
  const agentName = (id: AgentId) => agents.find((a) => a.id === id)?.name ?? id;
  const outputsDelay = reduce ? 0 : phase.runs.length * RUN_STEP + 0.4;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % phases.length), PHASE_MS);
    return () => window.clearTimeout(id);
  }, [running, active, phases.length]);

  // On narrow screens the stepper scrolls sideways — keep the active phase in
  // view without scrolling the page itself (so no scrollIntoView).
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  function select(i: number) {
    setActive(i);
    setPlaying(false);
  }

  return (
    <div ref={stageRef}>
      {/* org: human → orchestrator → agent team */}
      <Reveal>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground">
              <UserCheck size={15} className="text-accent" />
              {t.ui.agentHuman}
            </span>
            <span className="flow-x hidden h-px w-12 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-light/50 bg-accent/25 px-4 py-2 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-accent-light" />
              </span>
              <SquareTerminal size={15} />
              {t.ui.agentOrchestrator}
            </span>
          </div>

          <svg
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            className="mt-2 hidden h-10 w-full lg:block"
            aria-hidden="true"
          >
            {agents.map((a, i) => {
              const on = phase.agents.includes(a.id);
              return (
                <path
                  key={a.id}
                  d={`M300 0 V16 H${50 + i * 100} V40`}
                  fill="none"
                  stroke={on ? AGENT_STYLE[a.id].color : "rgba(255,255,255,0.14)"}
                  strokeWidth={on ? 2 : 1}
                  strokeDasharray={on ? "4 4" : undefined}
                  vectorEffect="non-scaling-stroke"
                  className={on && !reduce ? "agent-flow" : undefined}
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-0 lg:grid-cols-6">
          {agents.map((a) => {
            const on = phase.agents.includes(a.id);
            const { icon: Icon, color } = AGENT_STYLE[a.id];
            return (
              <div
                key={a.id}
                className={`rounded-card border bg-white/[0.04] p-4 transition-all duration-500 ${
                  on ? "bg-white/[0.08]" : "border-white/10 opacity-45"
                }`}
                style={
                  on
                    ? { borderColor: color, boxShadow: `0 0 0 1px ${color}40, 0 14px 32px -14px ${color}80` }
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${color}26`, color }}
                  >
                    <Icon size={16} />
                  </span>
                  {on && (
                    <span className="flex gap-0.5" aria-hidden="true">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="h-1 w-1 animate-bounce rounded-full"
                          style={{ background: color, animationDelay: `${d}ms` }}
                        />
                      ))}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold">{a.name}</p>
                <p className="mt-1 text-xs leading-snug text-white/55">{a.focus}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* lifecycle stepper */}
      <div className="mt-12 flex items-start gap-3">
        <div
          ref={tabsRef}
          role="tablist"
          className="no-scrollbar relative flex flex-1 gap-2 overflow-x-auto lg:grid lg:grid-cols-7 lg:overflow-visible"
        >
          {phases.map((p, i) => {
            const current = i === active;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={current}
                onClick={() => select(i)}
                className={`relative min-w-[9.5rem] shrink-0 overflow-hidden rounded-card border px-3 py-2.5 text-left transition-colors duration-300 lg:min-w-0 ${
                  current
                    ? "border-white bg-white text-foreground"
                    : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                <span className="block font-mono text-[11px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 block text-[13px] font-semibold leading-tight">{p.title}</span>
                {current && running && (
                  <motion.span
                    key={`progress-${active}`}
                    className="absolute bottom-0 left-0 h-0.5 bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: PHASE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-pressed={playing}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:border-white/50"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span className="hidden sm:inline">{playing ? t.ui.agentPause : t.ui.agentPlay}</span>
        </button>
      </div>

      {/* phase detail: input → agents at work → artifacts + human checkpoint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr_1fr]">
            <div className="rounded-card border border-white/10 bg-white/[0.04] p-5">
              <PanelLabel icon={Inbox} text={t.ui.agentInput} />
              <p className="mt-3 text-[15px] leading-[1.5] text-white/80">{phase.input}</p>
              <p className="mt-4 text-xs text-white/50">
                {t.ui.agentOwner}: <span className="font-semibold text-white/85">{phase.owner}</span>
              </p>
            </div>

            <div className="overflow-hidden rounded-card border border-white/10 bg-[#111214]">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-[11px] text-white/45">claude-code · {phase.id}</span>
                <span className="ml-auto text-[11px] font-medium text-white/50">{t.ui.agentRuns}</span>
              </div>
              <ul className="space-y-3.5 p-4">
                {phase.runs.map((r, i) => (
                  <RunLine
                    key={`${phase.id}-${i}`}
                    agent={r.agent}
                    name={agentName(r.agent)}
                    text={r.text}
                    delay={reduce ? 0 : 0.3 + i * RUN_STEP}
                    reduce={reduce}
                  />
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-card border border-white/10 bg-white/[0.04] p-5">
                <PanelLabel icon={FileText} text={t.ui.agentOutputs} />
                <div className="mt-3 flex flex-wrap gap-2">
                  {phase.outputs.map((o, i) => (
                    <motion.span
                      key={o}
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: outputsDelay + i * 0.15, duration: 0.3 }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium"
                    >
                      <FileText size={12} className="text-accent-light" />
                      {o}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: outputsDelay + 0.5, duration: 0.35 }}
                className="rounded-card border border-accent-2/30 bg-accent-2/10 p-5"
              >
                <PanelLabel icon={UserCheck} text={t.ui.agentGate} tone="green" />
                <p className="mt-2 text-[15px] leading-[1.45] text-white">{phase.gate}</p>
              </motion.div>
            </div>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/65">
            <span className="rounded-chip bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/85">
              {t.ui.agentEvidence}
            </span>
            {phase.evidence}
          </p>

          {phase.image && (
            <div className="mt-6 overflow-hidden rounded-card border border-white/10">
              <Image src={phase.image} alt={phase.title} width={1600} height={900} className="h-auto w-full" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
