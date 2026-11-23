'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function EducationSection() {
  const { data, t } = usePortfolio();
  const { education: edu, languages } = data;
  const [activeCourseIdx, setActiveCourseIdx] = useState<number>(0);

  return (
    <section
      id="education"
      className="relative py-16 md:py-24 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Clean Masked Wipe-Up Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent)] mb-3">
            {t.education.eyebrow}
          </p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className="font-serif font-semibold text-3xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-[var(--text)] leading-[1.08]"
            >
              {t.education.title}
            </motion.h2>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        {/* 2-Column Editorial Spread (Flat Hairlines, Zero Nested Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Degree + Hairline Coursework Index */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2 pb-6 border-b border-[var(--hairline)]">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="font-mono tabular-nums text-[var(--accent)] font-medium">
                  {edu.period}
                </span>
                {edu.status && (
                  <>
                    <span>·</span>
                    <span>{edu.status}</span>
                  </>
                )}
              </div>

              <h3 className="font-serif font-semibold text-2xl sm:text-3xl tracking-[-0.02em] text-[var(--text)]">
                {edu.school}
              </h3>

              <p className="text-base font-medium text-[var(--accent)]">{edu.degree}</p>
              <p className="text-sm text-[var(--text-muted)]">{edu.major}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
                {t.education.courseworkTitle}
              </h4>

              <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                {edu.coursework.map((course, idx) => {
                  const isActive = activeCourseIdx === idx;
                  return (
                    <div
                      key={course}
                      onMouseEnter={() => setActiveCourseIdx(idx)}
                      onFocus={() => setActiveCourseIdx(idx)}
                      tabIndex={0}
                      className="relative py-3.5 pl-5 pr-2 flex items-center gap-4 outline-none cursor-default"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="courseworkActiveIndicator"
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[var(--accent)]"
                        />
                      )}
                      <span className="font-mono text-xs tabular-nums text-[var(--text-muted)] w-6 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          isActive ? 'text-[var(--text)] font-medium' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {course}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Languages with GPU scaleX Progress Bars */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-8">
              <h3 className="font-serif font-semibold text-2xl tracking-[-0.02em] text-[var(--text)] pb-4 border-b border-[var(--hairline)] mb-6">
                {t.education.languagesTitle}
              </h3>

              <div className="space-y-7">
                {languages.map((langItem, idx) => (
                  <div key={langItem.language} className="space-y-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif font-semibold text-lg text-[var(--text)]">
                        {langItem.language}
                      </span>
                      <span className="text-xs font-medium text-[var(--accent)]">
                        {langItem.proficiency} ·{' '}
                        <span className="font-mono tabular-nums">{langItem.levelPercent}%</span>
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {langItem.description}
                    </p>

                    {/* GPU-composited scaleX bar (never animates raw width) */}
                    <div className="relative w-full h-1.5 rounded-full bg-[var(--hairline)] overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: langItem.levelPercent / 100 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{
                          duration: 0.9,
                          delay: 0.1 + idx * 0.12,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="h-full w-full origin-left bg-[var(--accent)] rounded-full will-change-transform"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
