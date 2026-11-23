'use client';

import React from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

export function EducationSection() {
  const { data, t, lang } = usePortfolio();
  const { education: edu, languages } = data;

  return (
    <section
      id="education"
      className="relative bg-[var(--bg)] chapter-divider-sheen lg:min-h-[calc(100svh-4rem)] flex flex-col justify-center py-12 md:py-16 lg:py-14 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper sectionId="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          index="05"
          eyebrow={t.education.eyebrow}
          title={t.education.title}
          className="mb-8 lg:mb-10"
        />

        {/* Open Editorial 2-Column Split — Zero Boxed Cards, Pure Typography & Hairlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (5 cols): Academic Credential + Working Languages */}
          <div className="lg:col-span-5 space-y-8">
            {/* Degree & Institution */}
            <div className="space-y-3 pb-8 border-b border-[var(--hairline)]">
              <span className="font-mono text-xs tabular-nums text-[var(--accent)] font-medium block">
                {edu.period}
              </span>

              <h3 className="font-serif font-semibold text-2xl sm:text-3xl tracking-[-0.02em] text-[var(--text)] leading-tight">
                {edu.school}
              </h3>

              <p className="text-base font-medium text-[var(--accent)]">
                {edu.degree}
              </p>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {edu.major}
              </p>
            </div>

            {/* Language Proficiencies */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between pb-3 border-b border-[var(--hairline)]">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  {t.education.languagesTitle}
                </h4>
                <span className="font-mono text-xs text-[var(--accent)]">
                  {lang === 'vi' ? 'Song ngữ' : 'Bilingual'}
                </span>
              </div>

              <div className="space-y-4">
                {languages.map((langItem) => (
                  <div key={langItem.language} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif font-semibold text-base text-[var(--text)]">
                        {langItem.language}
                      </span>
                      <span className="font-mono text-xs text-[var(--accent)]">
                        {langItem.proficiency}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {langItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Core Coursework (Editorial Divided Ledger) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-baseline justify-between pb-3 border-b border-[var(--hairline)]">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {t.education.courseworkTitle}
              </h4>
              <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                01–0{edu.coursework.length}
              </span>
            </div>

            <div className="divide-y divide-[var(--hairline)]">
              {edu.coursework.map((course, idx) => (
                <div
                  key={course}
                  className="py-3.5 sm:py-4 flex items-center justify-between gap-4 group transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-xs tabular-nums font-semibold text-[var(--accent)] shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {course}
                    </span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--hairline-strong)] opacity-30 group-hover:opacity-100 group-hover:bg-[var(--accent)] transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
