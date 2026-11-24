'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';
import { TechIcon } from '@/components/ui/TechIcons';

const RIVER_PATH =
  'M 76 168 C 190 42, 278 46, 336 135 C 396 226, 488 224, 558 108 C 624 8, 718 24, 782 138 C 842 228, 916 202, 968 98';
const NODE_FRACS = [0.02, 0.25, 0.50, 0.74, 0.97];

const INITIAL_POINTS: Array<{ x: number; y: number }> = [
  { x: 91.6, y: 151.4 },
  { x: 316.6, y: 109.7 },
  { x: 541.2, y: 133.2 },
  { x: 756.5, y: 99.6 },
  { x: 951.2, y: 127.7 },
];
const INITIAL_PATH_LEN = 1139.7;

/**
 * Variant 01 — Classic Sinuous River (2 hạt dữ liệu chạy 60fps trên đường cong Bezier)
 */
export function WorkHistorySection() {
  const { data, t } = usePortfolio();
  const experience = data.experiences[0];
  const stages = experience?.pipelineStages || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>(INITIAL_POINTS);
  const [pathLen, setPathLen] = useState(INITIAL_PATH_LEN);

  const curveRef = useRef<SVGPathElement>(null);
  const dotARef = useRef<SVGCircleElement>(null);
  const dotBRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = curveRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLen(len);
    setPoints(
      NODE_FRACS.map((f) => {
        const p = path.getPointAtLength(len * f);
        return { x: p.x, y: p.y };
      })
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let progress = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      progress = (progress + dt * 0.14) % 1;
      const pA = path.getPointAtLength(len * progress);
      const pB = path.getPointAtLength(len * ((progress + 0.5) % 1));
      dotARef.current?.setAttribute('cx', String(pA.x));
      dotARef.current?.setAttribute('cy', String(pA.y));
      dotBRef.current?.setAttribute('cx', String(pB.x));
      dotBRef.current?.setAttribute('cy', String(pB.y));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!experience || stages.length === 0) return null;

  const cur = stages[activeIndex] || stages[0];
  const hl = experience.highlights[activeIndex] || '';
  const cIdx = hl.indexOf(':');
  const title = cIdx > -1 ? hl.slice(0, cIdx) : cur.title;
  const body = cIdx > -1 ? hl.slice(cIdx + 1).trim() : hl;

  return (
    <section
      id="experience"
      className="relative bg-[var(--bg-alt)] chapter-divider-sheen py-20 md:py-28 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper
        stickySafe
        sectionId="experience"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                02 · {t.experience.eyebrow} · {experience.period}
              </span>
              <span className="text-[var(--hairline-strong)]">·</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {experience.location} · {experience.teamSize}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-[var(--text)]">
              {experience.company}
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <span className="text-sm sm:text-base text-[var(--text-muted)] font-serif italic">
                {experience.role}
              </span>
              <span className="text-[var(--hairline-strong)]">―</span>
              <a
                href={experience.projectUrl || 'https://bwid-automation.onrender.com/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-[var(--accent)] bg-[var(--surface-1)] border border-[var(--hairline-strong)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] transition-all group cursor-pointer"
                title="Finance Data Processing Web"
              >
                <span>Finance Data Processing Web</span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-4xl pt-1">
              {experience.description}
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <svg viewBox="0 0 1040 270" className="w-full min-w-[760px] h-auto overflow-visible select-none">
            <path
              ref={curveRef}
              d={RIVER_PATH}
              fill="none"
              stroke="var(--hairline-strong)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={RIVER_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={pathLen || 1}
              strokeDashoffset={(pathLen || 1) * (1 - (NODE_FRACS[activeIndex] ?? 0.02))}
              className="transition-[stroke-dashoffset] duration-300 ease-out"
            />
            <circle ref={dotARef} cx="76" cy="168" r="5" fill="var(--accent)" />
            <circle ref={dotBRef} cx="76" cy="168" r="3.5" fill="var(--text)" opacity="0.7" />
            {stages.map((stg, idx) => {
              const pt = points[idx];
              if (!pt) return null;
              const isAct = idx === activeIndex;
              return (
                <g
                  key={stg.step}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="cursor-pointer group"
                >
                  {isAct && (
                    <circle
                      r="26"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                      className="animate-[spin_12s_linear_infinite]"
                    />
                  )}
                  <circle
                    r={isAct ? 18 : 13}
                    fill={isAct ? 'var(--accent)' : 'var(--bg)'}
                    stroke={idx <= activeIndex ? 'var(--accent)' : 'var(--hairline-strong)'}
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  <text
                    y="3.5"
                    textAnchor="middle"
                    className="font-mono text-[10px] font-semibold select-none pointer-events-none"
                    fill={isAct ? 'var(--bg)' : 'var(--text)'}
                  >
                    {stg.step}
                  </text>
                  <text
                    y={idx % 2 === 0 ? 36 : -26}
                    textAnchor="middle"
                    className="font-mono text-[11px] font-medium select-none pointer-events-none transition-colors duration-150"
                    fill={isAct ? 'var(--text)' : 'var(--text-muted)'}
                  >
                    {stg.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
            <div className="w-44 h-44 rounded-full bg-[var(--surface-1)] border border-[var(--hairline-strong)] shadow-[var(--surface-shadow)] flex flex-col items-center justify-center text-center p-4 transition-all duration-300">
              <span className="font-mono text-[11px] text-[var(--accent)] font-semibold tracking-wider">
                {cur.step} / 0{stages.length}
              </span>
              <span className="font-mono text-3xl font-bold text-[var(--text)] mt-1.5 tabular-nums">
                {cur.metric}
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1.5 max-w-[130px] line-clamp-2">
                {cur.name}
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[var(--accent)] bg-[var(--surface-2)] border border-[var(--hairline)]">
                {cur.step} · {cur.name}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text)] tracking-[-0.01em]">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-[1.75]">
              {body}
            </p>
            <p className="font-mono text-xs text-[var(--accent)] pt-1">
              {cur.title} — {cur.detail}
            </p>
          </div>
        </div>

        {/* Core Stack Applied */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="pt-8 border-t border-[var(--hairline)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
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
        )}
      </ScrollDepthWrapper>
    </section>
  );
}
