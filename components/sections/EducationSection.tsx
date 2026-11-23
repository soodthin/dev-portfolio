'use client';

import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

export function EducationSection() {
  const { data, t } = usePortfolio();
  const edu = data.education;
  const languages = data.languages;

  return (
    <section
      id="education"
      className="relative py-24 md:py-32 border-b border-[var(--hairline)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Choreography: Focus-Pull Blur-to-Sharp Lift */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
              05
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              {t.education.eyebrow}
            </span>
          </div>

          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ filter: 'blur(10px)', opacity: 0, y: 24 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--text)] font-bold tracking-tight"
            >
              {t.education.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-muted)] mt-2 font-sans max-w-2xl"
          >
            {t.education.subtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-[var(--hairline)] mt-6 origin-left w-full"
          />
        </div>

        {/* 2-Column Editorial Dossier Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Academic Degree & Coursework Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-6 sm:p-8 border border-[var(--hairline)] bg-[var(--surface-1)]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-[var(--accent)] px-2.5 py-0.5 border border-[var(--hairline)] bg-[var(--surface-2)]">
                  {edu.period}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {edu.status || 'Good Standing'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
                {edu.school}
              </h3>

              <p className="font-sans text-base sm:text-lg font-semibold text-[var(--accent)] mb-1">
                {edu.degree}
              </p>

              <p className="font-sans text-sm text-[var(--text-muted)] mb-6">
                {edu.major}
              </p>

              {/* Coursework Tiles Grid */}
              <div className="pt-6 border-t border-[var(--hairline)]">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-4">
                  {"// "}{t.education.courseworkTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {edu.coursework.map((course, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="p-3 border border-[var(--hairline)] bg-[var(--surface-2)] hover:border-[var(--accent)] transition-all font-sans text-xs text-[var(--text)] flex items-center gap-2.5"
                    >
                      <span className="font-mono text-[10px] text-[var(--accent)] font-bold">
                        0{idx + 1}
                      </span>
                      <span>{course}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Languages Dossier with Animated Hairline Progress Bars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 border border-[var(--hairline)] bg-[var(--surface-1)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-6">
                <h3 className="font-serif text-2xl font-bold text-[var(--text)]">
                  {t.education.languagesTitle}
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Bilingual
                </span>
              </div>

              <div className="space-y-6">
                {languages.map((langItem, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-lg font-bold text-[var(--text)]">
                        {langItem.language}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                        {langItem.proficiency} ({langItem.levelPercent}%)
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                      {langItem.description}
                    </p>

                    {/* Animated Hairline Progress Bar */}
                    <div className="relative w-full h-1.5 bg-[var(--hairline)] overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${langItem.levelPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-[var(--accent)]"
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
