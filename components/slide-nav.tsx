'use client';

import { useState, useEffect, useRef } from 'react';

export interface SlideInfo {
  id: string;
  number: string;
  title: string;
  parentTitle?: string;
}

interface SlideNavProps {
  slides: SlideInfo[];
  activeIndex: number;
  onSelectSlide: (index: number) => void;
}

export function SlideNav({ slides, activeIndex, onSelectSlide }: SlideNavProps) {
  const [isAwake, setIsAwake] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerWake = () => {
    setIsAwake(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsAwake(false);
    }, 2400);
  };

  useEffect(() => {
    triggerWake();
  }, [activeIndex]);

  useEffect(() => {
    const handleActivity = () => {
      triggerWake();
    };

    window.addEventListener('wheel', handleActivity, { passive: true });
    window.addEventListener('touchmove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('wheel', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const isExpanded = isPinnedOpen || isHovered || isAwake;

  const projectSlides = slides
    .map((s, idx) => ({ ...s, globalIndex: idx }))
    .filter((s) => s.parentTitle === 'PROJECTS');

  const firstProjectIndex = projectSlides.length > 0 ? projectSlides[0].globalIndex : -1;
  const lastProjectIndex = projectSlides.length > 0 ? projectSlides[projectSlides.length - 1].globalIndex : -1;
  const isAnyProjectActive = activeIndex >= firstProjectIndex && activeIndex <= lastProjectIndex;

  const overviewSlide = slides[0];
  const experienceSlide = slides[1];
  const skillsSlide = slides.find((s) => s.id === 'skills');
  const educationSlide = slides.find((s) => s.id === 'education');
  const contactSlide = slides.find((s) => s.id === 'contact');

  const skillsIndex = skillsSlide ? slides.findIndex((s) => s.id === 'skills') : 5;
  const educationIndex = educationSlide ? slides.findIndex((s) => s.id === 'education') : 6;
  const contactIndex = contactSlide ? slides.findIndex((s) => s.id === 'contact') : 7;

  return (
    <aside 
      aria-label="Slide navigation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 items-center pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExpanded ? '-translate-x-4' : 'translate-x-full'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          if (isExpanded) {
            setIsPinnedOpen(false);
            setIsAwake(false);
            setIsHovered(false);
          } else {
            setIsPinnedOpen(true);
          }
        }}
        aria-label={isExpanded ? 'Collapse slide navigation' : 'Expand slide navigation'}
        aria-expanded={isExpanded}
        className="absolute right-full top-1/2 -translate-y-1/2 focus:outline-none group/tab cursor-pointer"
      >
        <svg
          width="22"
          height="124"
          viewBox="0 0 22 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[-6px_0_16px_rgba(4,7,17,0.7)] transition-all duration-300"
        >
          <path
            d="M 22 1 L 3 18 L 3 106 L 22 123 Z"
            fill="#070b18"
            fillOpacity="0.95"
            stroke="#233463"
            strokeWidth="1.5"
            className="transition-colors duration-300 group-hover/tab:stroke-[#f8c076] group-hover/tab:fill-[#0c142b]"
          />
          <line
            x1="3"
            y1="36"
            x2="3"
            y2="88"
            stroke="#f8c076"
            strokeWidth="2"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${
              isExpanded ? 'opacity-40' : 'opacity-100'
            }`}
          />
          {isExpanded ? (
            <path
              d="M 9 57 L 15 62 L 9 67"
              stroke="#c5d5f6"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300 group-hover/tab:stroke-[#f8c076]"
            />
          ) : (
            <path
              d="M 14 57 L 8 62 L 14 67"
              stroke="#c5d5f6"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300 group-hover/tab:stroke-[#f8c076]"
            />
          )}
        </svg>
      </button>

      <div className="flex flex-col items-end gap-3 bg-[#070b18]/95 backdrop-blur-md p-2.5 rounded-2xl border border-[#1b2649] shadow-[0_12px_36px_rgba(6,10,20,0.7)]">
        {overviewSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(0)}
            aria-label={`Jump to slide ${overviewSlide.number}: ${overviewSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block transition-all duration-200 text-right ${
                activeIndex === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans ${
                  activeIndex === 0
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]'
                }`}
              >
                <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">{overviewSlide.number}</span>
                {overviewSlide.title}
              </span>
            </div>

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === 0
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/20'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        )}

        {experienceSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(1)}
            aria-label={`Jump to slide ${experienceSlide.number}: ${experienceSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block transition-all duration-200 text-right ${
                activeIndex === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans ${
                  activeIndex === 1
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]'
                }`}
              >
                <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">{experienceSlide.number}</span>
                {experienceSlide.title}
              </span>
            </div>

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === 1
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/20'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        )}

        <div
          className={`relative flex items-center justify-end ${
            isAnyProjectActive
              ? 'my-1 h-[72px] transition-all duration-200 ease-out'
              : 'my-0 h-4 transition-all duration-150 ease-in'
          }`}
        >
          <div
            className={`flex flex-col justify-between h-[72px] items-end ${
              isAnyProjectActive
                ? 'max-w-[200px] opacity-100 pointer-events-auto mr-1 transition-all duration-200 ease-out'
                : 'max-w-0 opacity-0 pointer-events-none mr-0 overflow-hidden transition-all duration-120 ease-in'
            }`}
          >
            {projectSlides.map((subSlide) => {
              const isSubActive = activeIndex === subSlide.globalIndex;
              const isSubHovered = hoveredSubIndex === subSlide.globalIndex;

              return (
                <button
                  key={subSlide.id}
                  type="button"
                  onClick={() => onSelectSlide(subSlide.globalIndex)}
                  onMouseEnter={() => setHoveredSubIndex(subSlide.globalIndex)}
                  onMouseLeave={() => setHoveredSubIndex(null)}
                  aria-label={`Jump to project ${subSlide.number}: ${subSlide.title}`}
                  className="group/sub flex items-center justify-end focus:outline-none h-5"
                >
                  <div
                    className={`transition-all duration-200 text-right whitespace-nowrap ${
                      isSubActive || isSubHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-2'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-sans transition-all duration-200 shadow-sm ${
                        isSubActive
                          ? 'font-medium text-[#f8c076] bg-[#121c3b] border-[#f8c076]/50 shadow-[0_0_10px_rgba(248,192,118,0.3)]'
                          : 'text-[#8ba0cc] bg-[#0c142b]/95 border-[#1c274a] hover:text-[#c5d5f6]'
                      }`}
                    >
                      <span className="font-mono mr-1 text-[9px] text-[#7ea2f8]">{subSlide.number}</span>
                      {subSlide.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={`relative ${
              isAnyProjectActive
                ? 'w-7 h-[72px] opacity-100 pointer-events-auto transition-all duration-200 ease-out'
                : 'w-0 h-4 opacity-0 pointer-events-none overflow-hidden transition-all duration-120 ease-in'
            }`}
          >
            <svg
              className={`w-full h-full pointer-events-none overflow-visible transition-opacity duration-150 ${
                isAnyProjectActive ? 'opacity-100' : 'opacity-0'
              }`}
              viewBox="0 0 28 72"
              fill="none"
            >
              <defs>
                <linearGradient id="treeBranchGrad" x1="28" y1="36" x2="4" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f8c076" stopOpacity="0.4" />
                  <stop offset="35%" stopColor="#f8c076" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f8c076" stopOpacity="1" />
                </linearGradient>
              </defs>

              <path
                d="M 28 36 L 18 36"
                stroke="url(#treeBranchGrad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="12"
                style={{
                  strokeDashoffset: isAnyProjectActive ? 0 : 12,
                  transition: `stroke-dashoffset ${isAnyProjectActive ? '140ms ease-out 20ms' : '0ms'}`,
                }}
              />

              <path
                d="M 18 36 C 13 36, 8 22, 4 10"
                stroke="url(#treeBranchGrad)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="30"
                style={{
                  strokeDashoffset: isAnyProjectActive ? 0 : 30,
                  transition: `stroke-dashoffset ${isAnyProjectActive ? '180ms ease-out 100ms' : '0ms'}`,
                }}
              />

              <path
                d="M 18 36 L 4 36"
                stroke="url(#treeBranchGrad)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="16"
                style={{
                  strokeDashoffset: isAnyProjectActive ? 0 : 16,
                  transition: `stroke-dashoffset ${isAnyProjectActive ? '150ms ease-out 80ms' : '0ms'}`,
                }}
              />

              <path
                d="M 18 36 C 13 36, 8 50, 4 62"
                stroke="url(#treeBranchGrad)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="30"
                style={{
                  strokeDashoffset: isAnyProjectActive ? 0 : 30,
                  transition: `stroke-dashoffset ${isAnyProjectActive ? '180ms ease-out 100ms' : '0ms'}`,
                }}
              />
            </svg>

            {projectSlides.map((subSlide, idx) => {
              const isSubActive = activeIndex === subSlide.globalIndex;
              const isSubHovered = hoveredSubIndex === subSlide.globalIndex;
              const topPos = idx === 0 ? 'top-[10px]' : idx === 1 ? 'top-[36px]' : 'top-[62px]';
              const popDelay = idx === 0 ? '220ms' : idx === 1 ? '180ms' : '230ms';

              return (
                <button
                  key={subSlide.id}
                  type="button"
                  onClick={() => onSelectSlide(subSlide.globalIndex)}
                  onMouseEnter={() => setHoveredSubIndex(subSlide.globalIndex)}
                  onMouseLeave={() => setHoveredSubIndex(null)}
                  aria-label={`Jump to project ${subSlide.number}: ${subSlide.title}`}
                  className={`absolute left-[4px] -translate-x-1/2 -translate-y-1/2 ${topPos} w-4 h-4 flex items-center justify-center focus:outline-none z-10`}
                >
                  <div
                    style={{
                      transform: isAnyProjectActive ? (isSubHovered ? 'scale(1.25)' : 'scale(1)') : 'scale(0)',
                      opacity: isAnyProjectActive ? 1 : 0,
                      transition: `transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1) ${isAnyProjectActive ? popDelay : '0ms'}, opacity 120ms ease`,
                    }}
                    className={`rounded-full transition-colors duration-150 ${
                      isSubActive
                        ? 'w-2 h-2 bg-[#f8c076] ring-3 ring-[#f8c076]/40 shadow-[0_0_8px_rgba(248,192,118,0.7)]'
                        : isSubHovered
                        ? 'w-1.5 h-1.5 bg-[#7ea2f8] ring-2 ring-[#7ea2f8]/40'
                        : 'w-1.5 h-1.5 bg-[#253562]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onSelectSlide(firstProjectIndex)}
            aria-label="Jump to Projects section"
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            {!isAnyProjectActive && (
              <div className="hidden md:inline-block transition-all duration-200 text-right opacity-0 group-hover:opacity-100">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]">
                  <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">03-05</span>
                  PROJECTS
                </span>
              </div>
            )}

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-200 rounded-full ${
                  isAnyProjectActive
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/30 shadow-[0_0_12px_rgba(248,192,118,0.4)]'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        </div>

        {skillsSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(skillsIndex)}
            aria-label={`Jump to slide ${skillsSlide.number}: ${skillsSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block transition-all duration-200 text-right ${
                activeIndex === skillsIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans ${
                  activeIndex === skillsIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]'
                }`}
              >
                <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">{skillsSlide.number}</span>
                {skillsSlide.title}
              </span>
            </div>

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === skillsIndex
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/20'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        )}

        {educationSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(educationIndex)}
            aria-label={`Jump to slide ${educationSlide.number}: ${educationSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block transition-all duration-200 text-right ${
                activeIndex === educationIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans ${
                  activeIndex === educationIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]'
                }`}
              >
                <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">{educationSlide.number}</span>
                {educationSlide.title}
              </span>
            </div>

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === educationIndex
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/20'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        )}

        {contactSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(contactIndex)}
            aria-label={`Jump to slide ${contactSlide.number}: ${contactSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block transition-all duration-200 text-right ${
                activeIndex === contactIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-sans ${
                  activeIndex === contactIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a] group-hover:text-[#c5d5f6]'
                }`}
              >
                <span className="font-mono mr-1.5 text-[10px] text-[#7ea2f8]">{contactSlide.number}</span>
                {contactSlide.title}
              </span>
            </div>

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === contactIndex
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/20'
                    : 'w-2.5 h-2.5 bg-[#263765] group-hover:bg-[#7ea2f8] group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        )}

        <div className="hidden lg:flex items-center self-center gap-1 px-2 py-0.5 rounded-md bg-[#090f23]/60 border border-[#172344] text-[9px] font-mono text-[#5b6f9f] mt-1">
          <span>↑</span>
          <span>/</span>
          <span>↓</span>
        </div>
      </div>
    </aside>
  );
}
