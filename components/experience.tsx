'use client';

import { useState, useRef } from 'react';
import { Experience as ExperienceType } from '@/types/portfolio';

interface ExperienceProps {
  experiences: ExperienceType[];
  slideNumber?: string;
}

function TechPopover({ tags }: { tags: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <button
        type="button"
        aria-label="View all technologies"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-2.5 py-0.5 rounded-full text-xs font-mono border transition-all cursor-pointer font-bold inline-flex items-center ${
          isOpen
            ? 'border-[#f8c076] bg-[#f8c076] text-[#060a14]'
            : 'border-[#f8c076]/50 bg-[#172552] text-[#f8c076] hover:bg-[#f8c076] hover:text-[#060a14]'
        }`}
      >
        [ ... ]
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full pt-2 z-50 w-72 sm:w-80 max-w-[calc(100vw-3rem)]"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className="p-3 rounded-xl border border-[#324982] bg-[#0c142b] shadow-[0_16px_40px_rgba(0,0,0,0.95)]">
            <div className="text-[10px] font-mono tracking-wider text-[#8cb0fd] mb-2 pb-1.5 border-b border-[#1f2f5c] flex items-center justify-between">
              <span>All Technologies ({tags.length})</span>
              <span className="text-[#f8c076] font-semibold">Full Stack</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-[#2f4684] bg-[#132047] text-[#ddd7ff]"
                >
                  [ {tech} ]
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Experience({ experiences, slideNumber = "02" }: ExperienceProps) {
  const [activeCard, setActiveCard] = useState<0 | 1>(0);
  const exp = experiences[0];

  if (!exp) return null;

  const partOneHighlights = exp.highlights.slice(0, 3);
  const partTwoHighlights = exp.highlights.slice(3, 6);

  return (
    <section id="experience" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#f8c076] tracking-wider">{slideNumber}</span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
            WORK EXPERIENCE
          </h2>
          <div className="w-12 border-b border-[#213364]" />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveCard(0)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs ${
              activeCard === 0
                ? 'bg-[#f8c076] text-[#060a14] font-bold shadow-[0_0_15px_rgba(248,192,118,0.35)]'
                : 'bg-[#121f45] text-[#8299cd] hover:text-white border border-[#283d78]'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveCard(1)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer text-xs ${
              activeCard === 1
                ? 'bg-[#f8c076] text-[#060a14] font-bold shadow-[0_0_15px_rgba(248,192,118,0.35)]'
                : 'bg-[#121f45] text-[#8299cd] hover:text-white border border-[#283d78]'
            }`}
          >
            Details
          </button>
        </div>
      </div>

      <div className="relative w-full h-[540px] sm:h-[495px]">
        <div
          className={`absolute inset-0 rounded-2xl border border-[#283d78] bg-[#0d1633] transition-all duration-500 ease-out flex flex-row overflow-hidden ${
            activeCard === 0
              ? 'z-20 scale-100 translate-x-0 opacity-100 shadow-[0_18px_50px_rgba(8,14,35,0.9)] pointer-events-auto'
              : 'z-10 scale-[0.96] -translate-x-6 opacity-30 hover:opacity-60 cursor-pointer shadow-none pointer-events-auto'
          }`}
          onClick={() => {
            if (activeCard === 1) setActiveCard(0);
          }}
        >
          <div className="flex-1 p-3.5 sm:p-7 flex flex-col justify-between overflow-y-auto sm:overflow-hidden no-scrollbar">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                <div>
                  <span className="text-xs font-mono tracking-wider text-[#f8c076] font-semibold">
                    Internship
                  </span>
                  <h3 className="text-lg sm:text-2xl font-mono font-bold text-white mt-0.5">
                    {exp.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-sans text-[#8cb0fd] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="sm:text-right font-mono text-xs space-y-1">
                  <div className="inline-block px-3 py-0.5 rounded-full border border-[#344d8b] bg-[#121d3e] text-[#ddd7ff]">
                    {exp.period}
                  </div>
                  <div className="text-[#8299cd] font-sans hidden sm:block">{exp.location}</div>
                </div>
              </div>

              <div className="border-b border-[#213364]" />

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {exp.projectTitle && (
                  <div className="inline-block px-2.5 py-0.5 rounded-lg bg-[#15234c] border border-[#2f4684] text-xs font-mono text-[#ddd7ff]">
                    PROJECT:{' '}
                    {exp.projectUrl ? (
                      <a
                        href={exp.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f8c076] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>{exp.projectTitle}</span>
                        <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      <span className="text-[#f8c076] font-bold">{exp.projectTitle}</span>
                    )}
                  </div>
                )}

                {exp.teamSize && (
                  <div className="inline-block px-2.5 py-0.5 rounded-lg bg-[#15234c] border border-[#2f4684] text-xs font-mono text-[#8cb0fd]">
                    Team Size: <span className="text-[#f8c076] font-bold">{exp.teamSize}</span>
                  </div>
                )}

                {exp.technologies && (
                  <div className="relative inline-flex items-center gap-1.5 flex-wrap">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-[#2b417e] bg-[#132047] text-[#8cb0fd]"
                      >
                        [ {tech} ]
                      </span>
                    ))}

                    {exp.technologies.length > 3 && (
                      <TechPopover tags={exp.technologies} />
                    )}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#c5d5f6] font-sans leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2 sm:space-y-2.5 pt-1">
                <div className="text-xs font-mono tracking-wider text-[#8cb0fd] font-semibold">
                  Responsibilities:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {partOneHighlights.map((item, hIdx) => {
                    const [label, ...rest] = item.split(': ');
                    const detail = rest.join(': ');

                    return (
                      <div
                        key={hIdx}
                        className="rounded-xl p-3 sm:p-5 border border-[#23376c] bg-[#121f45]/90 flex flex-col justify-between hover:border-[#385296] transition-colors min-h-0 sm:min-h-[140px]"
                      >
                        <span className="font-mono text-xs font-bold text-[#f8c076] mb-1 sm:mb-2">
                          [{String(hIdx + 1).padStart(2, '0')}] {detail ? label : ''}
                        </span>
                        <span className="text-xs text-[#c5d5f6] font-sans leading-relaxed">
                          {detail || label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCard(1);
            }}
            aria-label="Open next card"
            className="group/strip w-9 sm:w-12 border-l border-[#23366c] bg-[#0f193d] hover:bg-[#18295c] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[-4px_0_20px_rgba(0,0,0,0.35)] shrink-0"
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-[#f8c076] transition-all duration-300 group-hover/strip:translate-x-1 group-hover/strip:scale-115 drop-shadow-[0_0_8px_rgba(248,192,118,0.5)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="14 6 20 12 14 18" />
            </svg>
          </button>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl border border-[#2f4684] bg-[#0e183a] transition-all duration-500 ease-out flex flex-row overflow-hidden ${
            activeCard === 1
              ? 'z-30 scale-100 translate-x-0 opacity-100 shadow-[0_22px_55px_rgba(8,14,35,0.95)] pointer-events-auto'
              : 'z-10 scale-[0.96] translate-x-6 opacity-30 hover:opacity-60 cursor-pointer shadow-none pointer-events-auto'
          }`}
          onClick={() => {
            if (activeCard === 0) setActiveCard(1);
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCard(0);
            }}
            aria-label="Return to previous card"
            className="group/strip w-9 sm:w-12 border-r border-[#23366c] bg-[#0f193d] hover:bg-[#18295c] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[4px_0_20px_rgba(0,0,0,0.35)] shrink-0"
          >
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-[#8cb0fd] transition-all duration-300 group-hover/strip:-translate-x-1 group-hover/strip:scale-115 drop-shadow-[0_0_8px_rgba(140,176,253,0.5)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="20" y1="12" x2="4" y2="12" />
              <polyline points="10 6 4 12 10 18" />
            </svg>
          </button>

          <div className="flex-1 p-3.5 sm:p-7 flex flex-col justify-between overflow-y-auto sm:overflow-hidden no-scrollbar">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                <div>
                  <span className="text-xs font-mono tracking-wider text-[#f8c076] font-semibold">
                    Continued
                  </span>
                  <h3 className="text-lg sm:text-2xl font-mono font-bold text-white mt-0.5">
                    Frontend &amp; Operations
                  </h3>
                  <div className="text-xs sm:text-sm font-sans text-[#8cb0fd] mt-0.5">
                    {exp.projectUrl ? (
                      <a
                        href={exp.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#f8c076] transition-colors hover:underline inline-flex items-center gap-1 font-mono"
                      >
                        <span>{exp.projectTitle}</span>
                        <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      exp.projectTitle
                    )}{' '}
                    • {exp.company}
                    {exp.teamSize && (
                      <span className="text-[#f8c076] font-mono"> • Team: {exp.teamSize}</span>
                    )}
                  </div>
                </div>

                <div className="sm:text-right font-mono text-xs">
                  <span className="px-3 py-0.5 rounded-full border border-[#344d8b] bg-[#121d3e] text-[#ddd7ff]">
                    02 / 02
                  </span>
                </div>
              </div>

              <div className="border-b border-[#213364]" />

              <div className="space-y-2 sm:space-y-2.5">
                <div className="text-xs font-mono tracking-wider text-[#8cb0fd] font-semibold">
                  Frontend, Reliability &amp; Docs:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {partTwoHighlights.map((item, hIdx) => {
                    const [label, ...rest] = item.split(': ');
                    const detail = rest.join(': ');

                    return (
                      <div
                        key={hIdx}
                        className="rounded-xl p-3 sm:p-5 border border-[#23376c] bg-[#121f45]/90 flex flex-col justify-between hover:border-[#385296] transition-colors min-h-0 sm:min-h-[140px]"
                      >
                        <div>
                          <span className="font-mono text-xs font-bold text-[#f8c076] block mb-1 sm:mb-2">
                            [{String(hIdx + 4).padStart(2, '0')}] {detail ? label : ''}
                          </span>
                          <span className="text-xs text-[#c5d5f6] font-sans leading-relaxed">
                            {detail || label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl border border-[#213364] bg-[#121c3b]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs font-mono">
                <span className="text-[#8cb0fd] tracking-wider text-[11px] sm:text-xs font-semibold">Impact:</span>
                <span className="text-[#f8c076] font-sans font-semibold text-xs sm:text-sm">Report turnaround time cut from 1 day to 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
