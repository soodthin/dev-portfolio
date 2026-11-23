'use client';

import React from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

const SECTIONS = [
  { id: 'summary', number: '01', labelEn: 'Summary', labelVi: 'Tổng quan' },
  { id: 'experience', number: '02', labelEn: 'Experience', labelVi: 'Kinh nghiệm' },
  { id: 'works', number: '03', labelEn: 'Selected Works', labelVi: 'Dự án' },
  { id: 'skills', number: '04', labelEn: 'Capabilities', labelVi: 'Năng lực' },
  { id: 'education', number: '05', labelEn: 'Education', labelVi: 'Học vấn' },
  { id: 'contact', number: '06', labelEn: 'Contact', labelVi: 'Liên hệ' },
];

export function SectionTracker() {
  const { activeSection, lang } = usePortfolio();
  const { scrollTo } = useSmoothScroll();

  return (
    /* Restricted to 2xl (1536px+) so it never overlaps the max-w-7xl content grid at 1280px–1440px */
    <aside
      aria-label="Section Tracker"
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 py-2.5 px-1.5 rounded-full bg-[var(--surface-1)] border border-[var(--hairline)] shadow-[var(--surface-shadow)] select-none no-print"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const label = lang === 'vi' ? sec.labelVi : sec.labelEn;

        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(`#${sec.id}`, { offset: -64 })}
            className="group relative flex items-center justify-center cursor-pointer"
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`absolute right-full mr-3 px-2.5 py-1 rounded-full bg-[var(--surface-1)] border border-[var(--hairline)] text-[11px] font-medium whitespace-nowrap pointer-events-none transition-all duration-200 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <span className="font-mono tabular-nums mr-1.5">{sec.number}</span>· {label}
            </span>

            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] tabular-nums font-semibold transition-colors ${
                isActive
                  ? 'bg-[var(--accent-deep)] text-[var(--accent-cta-text)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {sec.number}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
