"use client";

import { useLanguage } from "@/lib/LanguageProvider";
import { skillCategoryIcons, skillItemIcons } from "@/lib/skillIcons";
import { skillBrandLogos, BrandLogoIcon } from "@/lib/brandLogos";
import Reveal from "./Reveal";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {t.ui.toolkitLabel}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.ui.toolkitTitle}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.map((group, i) => {
            const CategoryIcon = skillCategoryIcons[i];
            return (
              <div key={group.category} className="card-hover h-full rounded-[1.5rem] border border-border bg-surface p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <CategoryIcon size={18} />
                  </span>
                  <h3 className="font-semibold">{group.category}</h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {group.items.map((item, j) => {
                    const brand = skillBrandLogos[i]?.[j];
                    const ItemIcon = skillItemIcons[i]?.[j];

                    return (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl bg-surface-2 px-2.5 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface">
                          {brand ? (
                            <BrandLogoIcon logo={brand} className="h-3.5 w-3.5" />
                          ) : ItemIcon ? (
                            <ItemIcon size={13} className="text-accent" />
                          ) : null}
                        </span>
                        <span className="text-xs font-medium leading-tight text-foreground/85">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
