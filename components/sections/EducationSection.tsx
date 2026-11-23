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
      className="relative bg-[var(--bg)] chapter-divider-sheen lg:min-h-[calc(100svh-4rem)] flex flex-col justify-center py-10 md:py-14 lg:py-10 xl:py-12 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper sectionId="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeading
          index="05"
          eyebrow={t.education.eyebrow}
          title={t.education.title}
          className="mb-6 sm:mb-7 lg:mb-8"
        />

        {/* Structured Bento Grid: Degree & Languages on Top, Core Coursework Below */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: Academic Credential (7 cols) + Language Proficiencies (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Degree & Institution Card */}
            <div className="lg:col-span-7 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--hairline-strong)] transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs mb-3.5">
                  <span className="font-mono text-xs tabular-nums text-[var(--accent)] font-medium px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-2)]">
                    {edu.period}
                  </span>
                  {edu.status && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-2)] text-xs text-[var(--text)] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {edu.status}
                    </span>
                  )}
                  {edu.gpa && (
                    <span className="px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-2)] text-xs text-[var(--text-muted)] font-mono">
                      {edu.gpa}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[var(--text)] tracking-[-0.01em] leading-snug">
                  {edu.school}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[var(--accent)] mt-1.5">
                  {edu.degree}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{edu.major}</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {lang === 'vi' ? 'HCMCOU · Khoa CNTT' : 'HCMCOU · CS Dept'}
                </span>
              </div>
            </div>

            {/* Languages Card (Clean badges, zero tacky progress bars) */}
            <div className="lg:col-span-5 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--hairline-strong)] transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    {t.education.languagesTitle}
                  </h4>
                  <span className="font-mono text-xs text-[var(--accent)] font-medium">
                    {lang === 'vi' ? 'Song ngữ' : 'Bilingual'}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {languages.map((langItem) => (
                    <div key={langItem.language} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif font-semibold text-base text-[var(--text)]">
                          {langItem.language}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
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
          </div>

          {/* Row 2: Core Coursework (Full-width clean chip cloud, zero orphaned grid cells) */}
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-7 hover:border-[var(--hairline-strong)] transition-colors">
            <div className="flex items-center justify-between pb-3.5 border-b border-[var(--hairline)] mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {t.education.courseworkTitle}
              </h4>
              <span className="font-mono text-xs text-[var(--accent)] font-medium">
                {lang === 'vi' ? '07 Môn học Nền tảng' : '07 Foundation Disciplines'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {edu.coursework.map((course, idx) => (
                <div
                  key={course}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-2)]/60 hover:bg-[var(--surface-2)] hover:border-[var(--hairline-strong)] transition-colors group cursor-default"
                >
                  <span className="font-mono text-[11px] tabular-nums font-semibold text-[var(--accent)] shrink-0 px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--hairline)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--text)] leading-snug">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
