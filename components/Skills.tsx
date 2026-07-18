"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Skills() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-accent">
          {t.ui.toolkitLabel}
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.ui.toolkitTitle}
        </h2>
      </Reveal>

      <div className="mt-10 divide-y divide-border rounded-[1.75rem] border border-border bg-surface">
        {t.skills.map((group, i) => {
          const open = openIndex === i;
          return (
            <div key={group.category} className="px-6">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-medium">{group.category}</span>
                <Plus
                  size={18}
                  className={`text-muted transition-transform duration-300 ${open ? "rotate-45 text-accent" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pb-5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
