'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

const SECTIONS = [
  { id: 'summary', number: '01', labelEn: 'Summary', labelVi: 'Tổng quan' },
  { id: 'experience', number: '02', labelEn: 'Work History', labelVi: 'Kinh nghiệm' },
  { id: 'works', number: '03', labelEn: 'Selected Works', labelVi: 'Dự án' },
  { id: 'skills', number: '04', labelEn: 'Capabilities', labelVi: 'Năng lực' },
  { id: 'education', number: '05', labelEn: 'Academic', labelVi: 'Học vấn' },
  { id: 'contact', number: '06', labelEn: 'Contact', labelVi: 'Liên hệ' },
];

export function SectionTracker() {
  const { activeSection, setActiveSection, lang } = usePortfolio();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <aside
      aria-label="Section Tracker"
      className="hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 p-1 bg-[var(--surface-1)]/85 backdrop-blur-md border border-[var(--hairline)] select-none no-print shadow-md"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const label = lang === 'vi' ? sec.labelVi : sec.labelEn;

        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(`#${sec.id}`, { offset: -60 })}
            className="group relative flex items-center justify-center cursor-pointer"
            aria-label={`Jump to section ${sec.number} ${label}`}
          >
            {/* Tooltip Label on Hover floating to the left */}
            <span
              className={`absolute right-full mr-2.5 px-2 py-0.5 bg-[var(--surface-1)] border border-[var(--hairline)] font-mono text-[10px] tracking-wider uppercase whitespace-nowrap shadow-lg pointer-events-none transition-all duration-200 ${
                isActive
                  ? 'text-[var(--accent)] font-semibold opacity-100'
                  : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0'
              }`}
            >
              {sec.number} {"//"} {label}
            </span>

            {/* Monospace Indicator Box */}
            <span
              className={`w-6 h-6 flex items-center justify-center font-mono text-[10px] font-semibold transition-all ${
                isActive
                  ? 'bg-[var(--accent)] text-white border border-[var(--accent)] shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--hairline)] group-hover:text-[var(--text)] group-hover:border-[var(--accent)]'
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
