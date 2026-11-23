'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { ExternalLinkIcon } from '@/components/ui/Icons';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function WorkHistorySection() {
  const { data, t } = usePortfolio();
  const experience = data.experiences[0]; // BW Industrial Dev JSC
  const stages = experience?.pipelineStages || [];
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 border-b border-[var(--hairline)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Choreography: Architectural Rule Draw + Horizontal Tracking Settle */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
              02
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              {t.experience.eyebrow}
            </span>
          </div>

          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ x: -40, opacity: 0, letterSpacing: '0.08em' }}
              whileInView={{ x: 0, opacity: 1, letterSpacing: '-0.02em' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--text)] font-bold tracking-tight"
            >
              {experience.company}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-muted)] mt-2 font-sans max-w-2xl"
          >
            {experience.role} — {experience.period} ({experience.location})
          </motion.p>

          {/* Architectural Rule Draw */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-[var(--hairline)] mt-6 origin-left w-full"
          />
        </div>

        {/* 2-Column Asymmetric Layout (Sticky Split-Screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column (Sticky 5 cols): Company Metadata, Live Link & 5-Stage AI Pipeline */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Company Badge & Live App Link */}
            <div className="p-6 border border-[var(--hairline)] bg-[var(--surface-1)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                  {t.experience.companyBadge}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {experience.period}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[var(--text)] mb-2">
                {experience.projectTitle || experience.company}
              </h3>

              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {experience.description}
              </p>

              {/* Live App CTA Button */}
              {experience.projectUrl && (
                <MagneticButton className="w-full">
                  <a
                    href={experience.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <span>{t.experience.liveAppBtn}</span>
                    <ExternalLinkIcon size={14} />
                  </a>
                </MagneticButton>
              )}
            </div>

            {/* Interactive 5-Stage Fintech AI Pipeline */}
            <div className="p-6 border border-[var(--hairline)] bg-[var(--surface-1)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-4">
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {t.experience.pipelineTitle}
                  </h4>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                    {t.experience.pipelineClickHint}
                  </p>
                </div>
              </div>

              {/* Pipeline Nodes Navigator */}
              <div className="relative flex items-center justify-between gap-1 py-3 mb-6">
                {/* Horizontal Connector Line */}
                <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--hairline)] z-0" />

                {stages.map((stg, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={stg.step}
                      onClick={() => setActiveStageIndex(idx)}
                      className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
                      aria-label={`Select pipeline stage ${stg.step}: ${stg.name}`}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? 'var(--accent)' : 'var(--surface-2)',
                          borderColor: isActive ? 'var(--accent)' : 'var(--hairline)',
                        }}
                        transition={{ duration: 0.2 }}
                        className={`w-9 h-9 rounded-sm flex items-center justify-center border font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? 'text-white shadow-md'
                            : 'text-[var(--text-muted)] group-hover:text-[var(--text)] group-hover:border-[var(--accent)]'
                        }`}
                      >
                        {stg.step}
                      </motion.div>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider whitespace-nowrap hidden sm:block ${
                          isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {stg.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Stage Telemetry Inspector Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 border border-[var(--hairline)] bg-[var(--surface-2)] space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-bold uppercase">
                      STAGE {activeStage.step} {"//"} {activeStage.name}
                    </span>
                    {activeStage.metric && (
                      <span className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-[var(--surface-1)] border border-[var(--hairline)] text-[var(--text)]">
                        {activeStage.metric}
                      </span>
                    )}
                  </div>

                  <h5 className="font-serif text-lg font-bold text-[var(--text)]">
                    {activeStage.title}
                  </h5>

                  <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                    {activeStage.description}
                  </p>

                  <p className="font-mono text-[11px] text-[var(--accent)]/90 pt-1 border-t border-[var(--hairline)] leading-normal">
                    › {activeStage.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (Scrollable 7 cols): Editorial Index Rows & Applied Tech Stack */}
          <div className="lg:col-span-7 space-y-10">
            {/* Key Deliverables (Editorial Index Rows) */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                  {"// "}{t.experience.deliverablesTitle}
                </h4>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {experience.highlights.length} Deliverables
                </span>
              </div>

              <div className="space-y-4">
                {experience.highlights.map((highlight, idx) => {
                  // Split title from description if formatted as "Title: Description"
                  const colonIndex = highlight.indexOf(':');
                  const itemTitle = colonIndex > -1 ? highlight.slice(0, colonIndex) : null;
                  const itemBody = colonIndex > -1 ? highlight.slice(colonIndex + 1).trim() : highlight;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      whileHover={{ x: 6 }}
                      className="p-5 border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--accent)] transition-all duration-200 group flex items-start gap-4"
                    >
                      <span className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-2)] shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="space-y-1.5 flex-1">
                        {itemTitle && (
                          <h5 className="font-serif text-base sm:text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                            {itemTitle}
                          </h5>
                        )}
                        <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {itemBody}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Core Applied Technologies */}
            <div className="pt-6 border-t border-[var(--hairline)]">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-4">
                {"// "}{t.experience.techStackTitle}
              </h4>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-3 py-1.5 border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
