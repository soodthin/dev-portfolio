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
      className="scroll-mt-16 sm:scroll-mt-20 relative bg-[var(--bg-alt)] chapter-divider-sheen py-14 sm:py-16 md:py-20 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <ScrollDepthWrapper
        stickySafe
        sectionId="experience"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[var(--accent)] font-semibold tracking-wider">
                02 · {experience.company}
              </span>
              <span className="text-[var(--hairline-strong)]">·</span>
              <span className="text-[var(--text-muted)]">
                {experience.period}
              </span>
              <span className="text-[var(--hairline-strong)]">·</span>
              <span className="text-[var(--text-muted)]">
                {experience.location} · {experience.teamSize}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={experience.projectUrl || 'https://bwid-automation.onrender.com/'}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                title="Finance Data Processing Web - Open Live System"
              >
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] transition-colors">
                  Finance Data Processing Web
                </h2>
                <ArrowUpRight
                  size={24}
                  className="text-[var(--accent)] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                />
              </a>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)] text-xs font-mono text-[var(--text)] shadow-sm shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>{experience.role}</span>
              </span>
            </div>
          </div>

          {/* Description on Left & Core Stack on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-1">
            <div className="lg:col-span-7">
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {experience.description}
              </p>
            </div>

            {experience.technologies && experience.technologies.length > 0 && (
              <div className="lg:col-span-5 lg:border-l lg:border-[var(--hairline)] lg:pl-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-2)]"
                    >
                      <TechIcon name={tech} size={12} className="text-[var(--accent)]" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none flex justify-center">
          <svg viewBox="0 0 1040 270" className="w-full max-w-[900px] h-auto overflow-visible select-none">
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
                    className="font-mono text-[11px] font-bold select-none pointer-events-none"
                    fill={isAct ? 'var(--bg)' : 'var(--text)'}
                  >
                    {stg.step}
                  </text>
                  <text
                    y={idx % 2 === 0 ? 38 : -26}
                    textAnchor="middle"
                    stroke="var(--bg)"
                    strokeWidth="3.5"
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                    className={`font-sans text-xs sm:text-[13px] select-none pointer-events-none transition-all duration-150 ${
                      isAct
                        ? 'font-bold fill-[var(--text)]'
                        : 'font-medium fill-[var(--text)] opacity-90 group-hover:opacity-100 group-hover:fill-[var(--accent)]'
                    }`}
                  >
                    {stg.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pt-1 min-h-[175px] sm:min-h-[165px]">
          <div className="w-full sm:w-60 lg:w-56 shrink-0 flex items-center justify-center lg:justify-start">
            <div className="w-full rounded-2xl bg-[var(--surface-1)] border border-[var(--hairline-strong)] shadow-[var(--surface-shadow)] flex flex-col items-center justify-center text-center px-6 py-5 transition-all duration-300">
              <span className="font-mono text-[11px] text-[var(--accent)] font-semibold tracking-wider">
                {cur.step} / 0{stages.length}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)] mt-1.5 tabular-nums tracking-tight">
                {cur.metric}
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1 text-center leading-snug">
                {cur.name}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-[var(--accent)] bg-[var(--surface-2)] border border-[var(--hairline)]">
                {cur.step} · {cur.name}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-[-0.01em]">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {body}
            </p>
            <p className="font-mono text-xs text-[var(--accent)] pt-0.5">
              {cur.title} — {cur.detail}
            </p>
          </div>
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
