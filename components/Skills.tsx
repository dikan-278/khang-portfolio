"use client";

import { useLanguage } from "@/lib/LanguageProvider";
import { skillCategoryIcons, skillItemIcons } from "@/lib/skillIcons";
import { skillBrandLogos, BrandLogoIcon } from "@/lib/brandLogos";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader label={t.ui.toolkitLabel} title={t.ui.toolkitTitle} />

      <Reveal delay={0.05}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-muted">{t.ui.domainsLabel}</span>
          {t.domains.map((d) => (
            <span
              key={d}
              className="rounded-chip border border-border bg-white px-3 py-1 text-sm font-medium"
            >
              {d}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.map((group, i) => {
            const CategoryIcon = skillCategoryIcons[i];
            return (
              <div
                key={group.category}
                className="card-hover h-full rounded-card border border-border bg-white p-6 shadow-subtle"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <CategoryIcon size={20} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{group.category}</h3>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {group.items.map((item, j) => {
                    const brand = skillBrandLogos[i]?.[j];
                    const ItemIcon = skillItemIcons[i]?.[j];

                    return (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-surface-2 px-2.5 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
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
