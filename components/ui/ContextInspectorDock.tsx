'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillItem } from '@/types/portfolio';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { XIcon } from '@/components/ui/Icons';

interface ContextInspectorDockProps {
  selectedSkill: SkillItem | null;
  onClear: () => void;
}

export function ContextInspectorDock({ selectedSkill, onClear }: ContextInspectorDockProps) {
  const { t } = usePortfolio();

  return (
    <div
      id="skill-context-dock"
      className="w-full mt-8 border border-[var(--hairline)] bg-[var(--surface-1)] p-5 md:p-6 transition-all duration-300 scroll-mt-20"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] font-medium">
            {t.capabilities.dockTitle}
          </span>
        </div>
        {selectedSkill && (
          <button
            onClick={onClear}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1"
            aria-label="Close inspector"
          >
            <XIcon size={14} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedSkill ? (
          <motion.div
            key={selectedSkill.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-serif text-2xl text-[var(--text)] tracking-tight">
                {selectedSkill.name}
              </h4>
              {selectedSkill.level && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase">
                    {t.capabilities.levelLabel}:
                  </span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-[var(--surface-2)] text-[var(--accent)] border border-[var(--hairline)]">
                    {selectedSkill.level}
                  </span>
                </div>
              )}
            </div>

            {selectedSkill.contexts && selectedSkill.contexts.length > 0 ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                  {t.capabilities.whereAppliedLabel} ({selectedSkill.contexts.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {selectedSkill.contexts.map((ctx, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[var(--surface-2)] border border-[var(--hairline)] text-xs flex flex-col gap-1"
                    >
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--accent)]">
                        {ctx.type === 'exp'
                          ? '[PRODUCTION EXPERIENCE]'
                          : ctx.type === 'project'
                          ? '[SHIPPED SYSTEM]'
                          : ctx.type === 'tool'
                          ? '[AI TOOLING]'
                          : '[ACADEMIC LAB]'}
                      </span>
                      <span className="font-sans text-[var(--text)] font-medium">
                        {ctx.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic font-mono">
                Applied across core fullstack development and system engineering tasks.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-3 text-center"
          >
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wide">
              {t.capabilities.dockEmptyHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
