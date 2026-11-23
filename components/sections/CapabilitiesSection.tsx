'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SkillCategory, SkillItem } from '@/types/portfolio';
import { TechIcon } from '@/components/ui/TechIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ProjectFilterKey =
  | 'all'
  | 'bw-industrial'
  | 'flexiconnect'
  | 'saigon-savory'
  | 'dev-portfolio';

interface ProjectFilterOption {
  key: ProjectFilterKey;
  labelEn: string;
  labelVi: string;
  matchTokens: string[];
}

const PROJECT_FILTERS: ProjectFilterOption[] = [
  { key: 'all', labelEn: 'All', labelVi: 'Tất cả', matchTokens: [] },
  {
    key: 'bw-industrial',
    labelEn: 'BW Industrial',
    labelVi: 'BW Industrial',
    matchTokens: ['bw industrial', 'bwid'],
  },
  {
    key: 'flexiconnect',
    labelEn: 'FlexiConnect Web',
    labelVi: 'FlexiConnect Web',
    matchTokens: ['flexiconnect'],
  },
  {
    key: 'saigon-savory',
    labelEn: 'Saigon Savory App',
    labelVi: 'Saigon Savory App',
    matchTokens: ['saigon savory'],
  },
  {
    key: 'dev-portfolio',
    labelEn: 'Dev Portfolio',
    labelVi: 'Dev Portfolio',
    matchTokens: ['dev portfolio', 'soodfolio'],
  },
];

function skillMatchesFilter(skill: SkillItem, filter: ProjectFilterOption): boolean {
  if (filter.key === 'all') return true;
  if (!skill.contexts || skill.contexts.length === 0) return false;
  return skill.contexts.some((ctx) => {
    const lower = ctx.label.toLowerCase();
    return filter.matchTokens.some((token) => lower.includes(token));
  });
}

export function CapabilitiesSection() {
  const { data, t, lang } = usePortfolio();
  const [activeFilterKey, setActiveFilterKey] = useState<ProjectFilterKey>('all');

  const activeFilter = useMemo(
    () => PROJECT_FILTERS.find((f) => f.key === activeFilterKey) ?? PROJECT_FILTERS[0],
    [activeFilterKey]
  );

  const getCategoryLabel = (category: SkillCategory): string => {
    switch (category) {
      case 'Languages':
        return t.capabilities.filterLanguages;
      case 'Frameworks & Platforms':
        return t.capabilities.filterFrameworks;
      case 'Databases':
        return t.capabilities.filterDatabases;
      case 'Tools & DevOps':
        return t.capabilities.filterTools;
      case 'AI-Assisted Engineering':
        return t.capabilities.filterAi;
      default:
        return category;
    }
  };

  return (
    <section
      id="skills"
      className="relative bg-[var(--bg-alt)] chapter-divider-sheen lg:min-h-[calc(100svh-4rem)] flex flex-col justify-center py-20 md:py-28 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper sectionId="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          index="04"
          eyebrow={t.capabilities.eyebrow}
          title={t.capabilities.title}
          className="mb-12"
        />

        {/* Project Cross-Highlighter Bar (shared layoutId active pill) */}
        <div
          role="tablist"
          aria-label="Filter skills by project"
          className="flex flex-wrap items-center gap-2 pb-8 border-b border-[var(--hairline)]"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeFilterKey === filter.key;
            const label = lang === 'vi' ? filter.labelVi : filter.labelEn;
            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilterKey(filter.key)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[var(--accent-cta-text)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--hairline)] bg-[var(--surface-1)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectCrossHighlightPill"
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-full bg-[var(--accent-deep)] -z-10"
                  />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Grouped Rows (1px horizontal hairlines, zero nested cards) */}
        <div className="divide-y divide-[var(--hairline)]">
          {data.skills.map((group) => (
            <div
              key={group.category}
              className="py-6 md:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <div className="md:col-span-3 pt-1">
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  {getCategoryLabel(group.category)}
                </h3>
              </div>

              <div className="md:col-span-9 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => {
                  const isHighlighted =
                    activeFilterKey !== 'all' && skillMatchesFilter(skill, activeFilter);
                  const isDimmed =
                    activeFilterKey !== 'all' && !skillMatchesFilter(skill, activeFilter);

                  return (
                    <motion.span
                      key={skill.name}
                      animate={{
                        opacity: isDimmed ? 0.25 : 1,
                        scale: isHighlighted ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors will-change-transform ${
                        isHighlighted
                          ? 'border-[var(--hairline-strong)] bg-[var(--surface-2)] text-[var(--text)] ring-1 ring-[var(--accent)]/30'
                          : 'border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text)]'
                      }`}
                    >
                      <TechIcon
                        name={skill.name}
                        size={15}
                        className={
                          isHighlighted
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--text-muted)]'
                        }
                      />
                      <span>{skill.name}</span>
                    </motion.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
