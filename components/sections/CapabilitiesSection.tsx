'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SkillCategory, SkillItem } from '@/types/portfolio';
import { TechIcon } from '@/components/ui/TechIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';

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

  const allSkills = useMemo(
    () => data.skills.flatMap((group) => group.skills),
    [data.skills]
  );

  // Default to the first skill so the Context Inspector Bar communicates interactivity natively
  const [selectedSkillName, setSelectedSkillName] = useState<string>(
    () => allSkills[0]?.name ?? 'Java'
  );

  const selectedSkill = useMemo(
    () => allSkills.find((s) => s.name === selectedSkillName) ?? allSkills[0] ?? null,
    [allSkills, selectedSkillName]
  );

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

  const contextCount = selectedSkill?.contexts?.length ?? 0;
  const countLabel =
    contextCount === 1
      ? `1 ${t.capabilities.projectSingular}`
      : `${contextCount} ${t.capabilities.projectPlural}`;

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow={t.capabilities.eyebrow}
          title={t.capabilities.title}
          subtitle={t.capabilities.subtitle}
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
                  const isSelected = selectedSkill?.name === skill.name;

                  return (
                    <motion.button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedSkillName(skill.name)}
                      animate={{
                        opacity: isDimmed ? 0.25 : 1,
                        scale: isHighlighted ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors cursor-pointer will-change-transform ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-wash)] text-[var(--text)]'
                          : isHighlighted
                          ? 'border-[var(--hairline-strong)] bg-[var(--surface-2)] text-[var(--text)]'
                          : 'border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text)] hover:border-[var(--hairline-strong)]'
                      }`}
                    >
                      <TechIcon
                        name={skill.name}
                        size={15}
                        className={
                          isSelected || isHighlighted
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--text-muted)]'
                        }
                      />
                      <span>{skill.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Context Inspector Bar */}
        {selectedSkill && (
          <div className="mt-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[var(--accent-wash)] border border-[var(--hairline-strong)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <TechIcon name={selectedSkill.name} size={17} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-serif font-semibold text-xl text-[var(--text)]">
                        {selectedSkill.name}
                      </h4>
                      {contextCount > 0 && (
                        <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                          · {countLabel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedSkill.contexts && selectedSkill.contexts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedSkill.contexts.map((ctx, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--text)]"
                      >
                        <span className="text-[var(--accent)] font-medium">
                          {ctx.type === 'exp'
                            ? lang === 'vi'
                              ? 'Thực tế'
                              : 'Work'
                            : ctx.type === 'project'
                            ? lang === 'vi'
                              ? 'Dự án'
                              : 'System'
                            : 'Workflow'}
                        </span>
                        <span className="opacity-40">·</span>
                        <span>{ctx.label}</span>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
