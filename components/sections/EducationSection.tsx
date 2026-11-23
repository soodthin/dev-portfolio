'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function EducationSection() {
  const { data, t } = usePortfolio();
  const { education: edu, languages } = data;

  return (
    <section
      id="education"
      className="relative bg-[var(--bg)] chapter-divider-sheen lg:min-h-[calc(100svh-4rem)] flex flex-col justify-center py-16 md:py-24 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper sectionId="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          index="05"
          eyebrow={t.education.eyebrow}
          title={t.education.title}
          className="mb-14"
        />

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (7 cols): Degree + Compact 2-Col Coursework Grid */}
          <div className="lg:col-span-7 space-y-7">
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
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3.5">
                {t.education.courseworkTitle}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {edu.coursework.map((course, idx) => (
                  <div
                    key={course}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <span className="font-mono text-[11px] tabular-nums font-semibold text-[var(--accent)] shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-[var(--text)] leading-snug">
                      {course}
                    </span>
                  </div>
                ))}
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

                    {/* GPU-composited scaleX bar */}
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
      </ScrollDepthWrapper>
    </section>
  );
}
