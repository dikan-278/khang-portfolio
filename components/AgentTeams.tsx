"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowDown, CheckSquare, FileText, Inbox, SquareTerminal, UserCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { BrandLogoIcon, brandLogos } from "@/lib/brandLogos";
import type { RoleTeam, TeamRoleId, TeamToolId } from "@/lib/content";

// Version 2 of the agent showcase: one agent team per role, drawn as a node
// graph — trigger → lead agent → specialist sub-agents → tools → output →
// human approval. The highlighted sub-agent rotates every STEP_MS.
const STEP_MS = 2400;

const ROLE_COLOR: Record<TeamRoleId, string> = { po: "#b98cff", ba: "#4fb8f5", pm: "#2fe3a0" };

const TOOL_NAME: Record<TeamToolId, string> = {
  jira: "JIRA",
  confluence: "Confluence",
  clickup: "ClickUp",
  tracker: "JIRA / ClickUp",
  figma: "Figma",
  drawio: "Draw.io",
};

// Canvas geometry in viewBox units. HTML nodes are positioned with the same
// numbers converted to percentages, so the SVG edges always meet them.
const W = 1000;
const H = 500;
const X = { trigger: 92, lead: 288, agent: 505, tool: 725, out: 902 };
const HALF = { trigger: 78, lead: 82, agent: 98, tool: 76, out: 86 };
const OUT_Y = 170;
const APPROVAL_Y = 335;

function spread(n: number, top: number, bottom: number) {
  if (n === 1) return [(top + bottom) / 2];
  return Array.from({ length: n }, (_, i) => top + (i * (bottom - top)) / (n - 1));
}

function curve(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function slot(x: number, y: number, half: number) {
  return {
    left: `${((x - half) / W) * 100}%`,
    top: `${(y / H) * 100}%`,
    width: `${((half * 2) / W) * 100}%`,
    transform: "translateY(-50%)",
  };
}

function ToolIcon({ id, className }: { id: TeamToolId; className?: string }) {
  if (id === "clickup") return <CheckSquare className={className} style={{ color: "#7b68ee" }} />;
  if (id === "tracker") {
    return (
      <span className="flex shrink-0 items-center gap-1">
        <BrandLogoIcon logo={brandLogos.jira} className={className} />
        <CheckSquare className={className} style={{ color: "#7b68ee" }} />
      </span>
    );
  }
  return <BrandLogoIcon logo={brandLogos[id]} className={className} />;
}

function TinyLabel({ children }: { children: ReactNode }) {
  return <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">{children}</p>;
}

function TriggerNode({ text, label }: { text: string; label: string }) {
  return (
    <div className="rounded-card border border-white/15 bg-white/[0.05] px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <Inbox size={12} className="text-white/45" />
        <TinyLabel>{label}</TinyLabel>
      </div>
      <p className="mt-1 text-[13px] font-medium leading-snug text-white/85">{text}</p>
    </div>
  );
}

function LeadNode({ name, label, color }: { name: string; label: string; color: string }) {
  return (
    <div
      className="rounded-card border px-3 py-3"
      style={{ borderColor: color, background: `${color}1f`, boxShadow: `0 14px 34px -14px ${color}99` }}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${color}33`, color }}>
          <SquareTerminal size={15} />
        </span>
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/55">{label}</p>
    </div>
  );
}

function AgentNode({
  name,
  detail,
  active,
  color,
  onSelect,
}: {
  name: string;
  detail: string;
  active: boolean;
  color: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full rounded-card border px-3 py-2 text-left transition-all duration-500 ${
        active ? "bg-white/10" : "border-white/10 bg-white/[0.04] hover:border-white/30"
      }`}
      style={active ? { borderColor: color, boxShadow: `0 0 0 1px ${color}40, 0 12px 30px -14px ${color}99` } : undefined}
    >
      <p className="flex items-center gap-1.5 text-[13px] font-semibold">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500"
          style={{ background: active ? color : "rgba(255,255,255,0.3)" }}
        />
        {name}
      </p>
      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/55">{detail}</p>
    </button>
  );
}

function ToolNode({ id, active, color }: { id: TeamToolId; active: boolean; color: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-card bg-white px-3 py-2 text-foreground transition-shadow duration-500"
      style={active ? { boxShadow: `0 0 0 2px ${color}, 0 10px 26px -10px ${color}` } : undefined}
    >
      <ToolIcon id={id} className="h-5 w-5 shrink-0" />
      <span className="text-[13px] font-semibold">{TOOL_NAME[id]}</span>
    </div>
  );
}

function OutputNode({ text, label }: { text: string; label: string }) {
  return (
    <div className="rounded-card border border-white/15 bg-white/[0.06] px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <FileText size={12} className="text-accent-light" />
        <TinyLabel>{label}</TinyLabel>
      </div>
      <p className="mt-1 text-[13px] font-medium leading-snug">{text}</p>
    </div>
  );
}

function ApprovalNode({ text, label }: { text: string; label: string }) {
  return (
    <div className="rounded-card border border-accent-2/40 bg-accent-2/10 px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <UserCheck size={12} className="text-accent-2" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-2">{label}</p>
      </div>
      <p className="mt-1 text-[13px] font-medium leading-snug">{text}</p>
    </div>
  );
}

function Canvas({
  team,
  step,
  onSelect,
  reduce,
}: {
  team: RoleTeam;
  step: number;
  onSelect: (i: number) => void;
  reduce: boolean;
}) {
  const { t } = useLanguage();
  const color = ROLE_COLOR[team.id];
  const mid = H / 2;
  const agentY = spread(team.agents.length, 50, 450);
  const toolY = spread(team.tools.length, 150, 350);
  const activeTool = team.tools.indexOf(team.agents[step].tool);

  const triggerEdge = curve(X.trigger + HALF.trigger, mid, X.lead - HALF.lead, mid);
  const agentIn = agentY.map((y) => curve(X.lead + HALF.lead, mid, X.agent - HALF.agent, y));
  const agentOut = team.agents.map((a, i) =>
    curve(X.agent + HALF.agent, agentY[i], X.tool - HALF.tool, toolY[team.tools.indexOf(a.tool)]),
  );
  const toolOut = toolY.map((y) => curve(X.tool + HALF.tool, y, X.out - HALF.out, OUT_Y));
  const approvalEdge = `M${X.out} ${OUT_Y + 34} L${X.out} ${APPROVAL_Y - 36}`;
  const activeChain = `${agentIn[step]} ${agentOut[step]} ${toolOut[activeTool]}`;

  const base = { fill: "none", stroke: "rgba(255,255,255,0.12)", strokeWidth: 1.5 };
  const lit = { fill: "none", stroke: color, strokeWidth: 2, strokeDasharray: "5 5" };

  return (
    <div className="relative hidden w-full lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={triggerEdge} {...lit} stroke="rgba(255,255,255,0.4)" className={reduce ? undefined : "agent-flow"} />
        {agentIn.map((d, i) => (i === step ? null : <path key={`in-${i}`} d={d} {...base} />))}
        {agentOut.map((d, i) => (i === step ? null : <path key={`out-${i}`} d={d} {...base} />))}
        {toolOut.map((d, i) => (i === activeTool ? null : <path key={`tool-${i}`} d={d} {...base} />))}
        <path d={agentIn[step]} {...lit} className={reduce ? undefined : "agent-flow"} />
        <path d={agentOut[step]} {...lit} className={reduce ? undefined : "agent-flow"} />
        <path d={toolOut[activeTool]} {...lit} className={reduce ? undefined : "agent-flow"} />
        <path d={approvalEdge} {...lit} stroke="rgba(0,208,132,0.6)" className={reduce ? undefined : "agent-flow"} />

        {!reduce && (
          <>
            <circle r="4" fill="rgba(255,255,255,0.85)">
              <animateMotion dur="1.6s" repeatCount="indefinite" path={triggerEdge} />
            </circle>
            <circle key={`${team.id}-${step}`} r="5" fill={color}>
              <animateMotion dur="1.8s" repeatCount="indefinite" path={activeChain} />
            </circle>
            <circle r="4" fill="#00d084">
              <animateMotion dur="1.4s" repeatCount="indefinite" path={approvalEdge} />
            </circle>
          </>
        )}
      </svg>

      <div className="absolute" style={slot(X.trigger, mid, HALF.trigger)}>
        <TriggerNode text={team.trigger} label={t.ui.teamTrigger} />
      </div>
      <div className="absolute" style={slot(X.lead, mid, HALF.lead)}>
        <LeadNode name={team.lead} label={t.ui.teamLead} color={color} />
      </div>
      {team.agents.map((a, i) => (
        <div key={a.name} className="absolute" style={slot(X.agent, agentY[i], HALF.agent)}>
          <AgentNode
            name={a.name}
            detail={a.detail}
            active={i === step}
            color={color}
            onSelect={() => onSelect(i)}
          />
        </div>
      ))}
      {team.tools.map((id, i) => (
        <div key={id} className="absolute" style={slot(X.tool, toolY[i], HALF.tool)}>
          <ToolNode id={id} active={i === activeTool} color={color} />
        </div>
      ))}
      <div className="absolute" style={slot(X.out, OUT_Y, HALF.out)}>
        <OutputNode text={team.output} label={t.ui.teamOutput} />
      </div>
      <div className="absolute" style={slot(X.out, APPROVAL_Y, HALF.out)}>
        <ApprovalNode text={team.approval} label={t.ui.teamApproval} />
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center text-white/30" aria-hidden="true">
      <ArrowDown size={16} />
    </div>
  );
}

// Below lg the graph would be too cramped, so the same nodes stack vertically.
function Stack({ team, step, onSelect }: { team: RoleTeam; step: number; onSelect: (i: number) => void }) {
  const { t } = useLanguage();
  const color = ROLE_COLOR[team.id];
  const activeTool = team.agents[step].tool;

  return (
    <div className="space-y-2.5 lg:hidden">
      <TriggerNode text={team.trigger} label={t.ui.teamTrigger} />
      <Arrow />
      <LeadNode name={team.lead} label={t.ui.teamLead} color={color} />
      <Arrow />
      <div className="grid gap-2 sm:grid-cols-2">
        {team.agents.map((a, i) => (
          <AgentNode
            key={a.name}
            name={a.name}
            detail={a.detail}
            active={i === step}
            color={color}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
      <Arrow />
      <div className="flex flex-wrap justify-center gap-2">
        {team.tools.map((id) => (
          <ToolNode key={id} id={id} active={id === activeTool} color={color} />
        ))}
      </div>
      <Arrow />
      <OutputNode text={team.output} label={t.ui.teamOutput} />
      <Arrow />
      <ApprovalNode text={team.approval} label={t.ui.teamApproval} />
    </div>
  );
}

export default function AgentTeams() {
  const { t } = useLanguage();
  const teams = t.agentTeams;
  const reduce = useReducedMotionSafe();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [roleIndex, setRoleIndex] = useState(1);
  const [step, setStep] = useState(0);

  const team = teams[roleIndex];
  const color = ROLE_COLOR[team.id];
  const running = inView && !reduce;
  const activeAgent = team.agents[step];

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % team.agents.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, step, team.agents.length]);

  function pickRole(i: number) {
    setRoleIndex(i);
    setStep(0);
  }

  return (
    <div ref={ref}>
      <div role="tablist" className="grid gap-2 sm:grid-cols-3">
        {teams.map((r, i) => {
          const current = i === roleIndex;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={current}
              onClick={() => pickRole(i)}
              className={`rounded-card border p-4 text-left transition-colors duration-300 ${
                current ? "border-white bg-white text-foreground" : "border-white/15 hover:border-white/40"
              }`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full" style={{ background: ROLE_COLOR[r.id] }} />
                {r.label}
              </p>
              <p className={`mt-1 text-[13px] leading-snug ${current ? "text-muted" : "text-white/55"}`}>{r.summary}</p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={team.id}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="mt-8"
        >
          <Canvas team={team} step={step} onSelect={setStep} reduce={reduce} />
          <Stack team={team} step={step} onSelect={setStep} />
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex min-h-[2.5rem] items-center gap-3 rounded-card border border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: color }} />
          <span className="relative h-2 w-2 rounded-full" style={{ background: color }} />
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${team.id}-${step}`}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-white/80"
          >
            <span className="font-semibold text-white">
              {t.ui.teamRunning}: {activeAgent.name}
            </span>{" "}
            — {activeAgent.detail} <span className="text-white/45">→ {TOOL_NAME[activeAgent.tool]}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
