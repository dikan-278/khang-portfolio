"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { GitBranch, Network } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import AgentLifecycle from "./AgentLifecycle";
import AgentTeams from "./AgentTeams";
import SectionHeader from "./SectionHeader";

// Two versions of the agent showcase share this section: a node graph of the
// agent team behind each role (PO / BA / PM), and the full delivery lifecycle.
type View = "roles" | "lifecycle";

export default function AiWorkflow() {
  const { t } = useLanguage();
  const reduce = useReducedMotionSafe();
  const [view, setView] = useState<View>("roles");

  const views: { id: View; label: string; icon: typeof Network }[] = [
    { id: "roles", label: t.ui.agentViewRoles, icon: Network },
    { id: "lifecycle", label: t.ui.agentViewLifecycle, icon: GitBranch },
  ];

  return (
    // overflow-clip, not hidden: the glow blobs bleed past the edge, and an
    // overflow-hidden box can still be scrolled sideways when a child gets focus.
    <section id="ai-workflow" className="relative overflow-clip bg-foreground text-white">
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-accent/40 blur-[130px]"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-light/15 blur-[120px]"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <SectionHeader
          tone="dark"
          compact
          label={t.ui.differentiatorLabel}
          title={t.ui.differentiatorTitle}
          subtitle={t.ui.differentiatorSubtitle}
        />

        <div
          role="tablist"
          className="mt-10 inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1"
        >
          {views.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                view === id ? "bg-white text-foreground" : "text-white/65 hover:text-white"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8"
          >
            {view === "roles" ? <AgentTeams /> : <AgentLifecycle />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
