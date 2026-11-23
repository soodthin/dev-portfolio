'use client';

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SpotlightSurface } from '@/components/ui/SpotlightSurface';
import { TechIcon } from '@/components/ui/TechIcons';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function WorkHistorySection() {
  const { data, t } = usePortfolio();
  const experience = data.experiences[0];
  const stages = experience?.pipelineStages || [];

  // Stage 01 active by default — 2-way synced with Deliverables 01–05 on the right
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!experience) return null;

  const activeStage = stages[activeIndex] || stages[0];

  return (
    <section
      id="experience"
      className="relative bg-[var(--bg-alt)] chapter-divider-sheen py-12 md:py-16 lg:py-16 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper stickySafe sectionId="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow={t.experience.eyebrow}
          title={experience.company}
          subtitle={
            <>
              <span className="text-[var(--text)] font-medium">{experience.role}</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="font-mono text-xs sm:text-sm tabular-nums">{experience.period}</span>
              <span className="block text-xs mt-1">{experience.location}</span>
            </>
          }
        />

        {/* Sticky Split-Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Column (5 cols): Overview + Live SVG 5-Stage Pipeline */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-6">
            <SpotlightSurface className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-7 shadow-[var(--surface-shadow)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-[var(--accent)] bg-[var(--accent-wash)] border border-[var(--hairline-strong)]">
                  {t.experience.companyBadge}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                  {experience.teamSize}
                </span>
              </div>

              <h3 className="font-serif font-semibold text-2xl tracking-[-0.02em] text-[var(--text)] mb-2.5">
                {experience.projectTitle}
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {experience.description}
              </p>

              {experience.projectUrl && (
                <MagneticButton strength={0.18} className="w-full">
                  <a
                    href={experience.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-5 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-sm font-semibold transition-all"
                  >
                    <span>{t.experience.liveAppBtn}</span>
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                </MagneticButton>
              )}
            </SpotlightSurface>

            {/* 5-Stage Pipeline with Live SVG Data Stream */}
            {stages.length > 0 && (
              <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 shadow-[var(--surface-shadow)]">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--hairline)] mb-5">
                  <h4 className="text-sm font-semibold text-[var(--text)]">
                    {t.experience.pipelineTitle}
                  </h4>
                  <span className="font-mono text-xs tabular-nums text-[var(--accent)]">
                    {activeStage.step} / 0{stages.length}
                  </span>
                </div>

                {/* Stage Nodes + Animated SVG Data Stream */}
                <div className="relative flex items-center justify-between py-2 mb-6">
                  <svg
                    aria-hidden="true"
                    className="absolute left-5 right-5 top-1/2 -translate-y-1/2 w-[calc(100%-2.5rem)] h-3 pointer-events-none"
                    preserveAspectRatio="none"
                    viewBox="0 0 200 12"
                  >
                    <line
                      x1="0"
                      y1="6"
                      x2="200"
                      y2="6"
                      stroke="var(--hairline)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="0"
                      y1="6"
                      x2="200"
                      y2="6"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeDasharray="6 10"
                      className="animate-pipeline-flow opacity-80"
                    />
                  </svg>

                  {stages.map((stg, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={stg.step}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        aria-pressed={isActive}
                        aria-label={`${stg.step} ${stg.name}`}
                        className="relative z-10 flex flex-col items-center cursor-pointer group"
                      >
                        <motion.span
                          animate={{ scale: isActive ? 1.08 : 1 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs tabular-nums font-semibold border transition-colors ${
                            isActive
                              ? 'bg-[var(--accent-deep)] text-[var(--accent-cta-text)] border-[var(--accent)]'
                              : 'bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--hairline)] group-hover:border-[var(--hairline-strong)] group-hover:text-[var(--text)]'
                          }`}
                        >
                          {stg.step}
                        </motion.span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Stage Details (flat hairline divider, fixed minimum height to prevent jitter) */}
                <div className="pt-4 border-t border-[var(--hairline)] min-h-[195px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.step}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                      className="space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[var(--accent)]">
                          {activeStage.name}
                        </span>
                        {activeStage.metric && (
                          <span className="font-mono text-xs tabular-nums font-semibold text-[var(--text)] px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--hairline)]">
                            {activeStage.metric}
                          </span>
                        )}
                      </div>

                      <h5 className="font-serif font-semibold text-lg text-[var(--text)]">
                        {activeStage.title}
                      </h5>

                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {activeStage.description}
                      </p>

                      <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--hairline)] leading-relaxed">
                        {activeStage.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 cols): 2-Way Synced Deliverables & Core Stack */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="flex items-baseline justify-between pb-3 border-b border-[var(--hairline)] mb-4">
                <h4 className="text-sm font-semibold text-[var(--text)]">
                  {t.experience.deliverablesTitle}
                </h4>
                <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                  01–0{experience.highlights.length}
                </span>
              </div>

              <div className="divide-y divide-[var(--hairline)]">
                {experience.highlights.map((highlight, idx) => {
                  const colonIndex = highlight.indexOf(':');
                  const itemTitle = colonIndex > -1 ? highlight.slice(0, colonIndex) : null;
                  const itemBody =
                    colonIndex > -1 ? highlight.slice(colonIndex + 1).trim() : highlight;
                  const isSynced = activeIndex === idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left py-5 px-4 -mx-4 rounded-xl transition-colors cursor-pointer flex items-start gap-4 relative ${
                        isSynced
                          ? 'bg-[var(--surface-1)] shadow-[var(--surface-shadow)]'
                          : 'hover:bg-[var(--surface-1)]/60'
                      }`}
                    >
                      {/* Active Left Indicator */}
                      <span
                        aria-hidden="true"
                        className={`w-0.5 self-stretch rounded-full transition-colors shrink-0 ${
                          isSynced ? 'bg-[var(--accent)]' : 'bg-transparent'
                        }`}
                      />

                      <span
                        className={`font-mono text-xs tabular-nums font-semibold pt-0.5 shrink-0 transition-colors ${
                          isSynced ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="space-y-1.5 flex-1">
                        {itemTitle && (
                          <h5
                            className={`font-serif font-semibold text-lg tracking-[-0.01em] transition-colors ${
                              isSynced ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                            }`}
                          >
                            {itemTitle}
                          </h5>
                        )}
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {itemBody}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Stack Applied */}
            <div className="pt-6 border-t border-[var(--hairline)]">
              <h4 className="text-sm font-semibold text-[var(--text)] mb-4">
                {t.experience.techStackTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text)]"
                  >
                    <TechIcon name={tech} size={13} className="text-[var(--accent)]" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
