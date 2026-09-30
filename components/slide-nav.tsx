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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerWake = () => {
    setIsAwake(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsAwake(false);
    }, 1800);
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

  const shouldBeBright = isAwake || isHovered;

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
      className={`hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-3 pointer-events-auto transition-all duration-500 ${
        shouldBeBright ? 'opacity-100' : 'opacity-20 hover:opacity-100'
      }`}
    >
      <div className="flex flex-col items-end gap-3 bg-[#070b18]/90 backdrop-blur-md p-2.5 rounded-2xl border border-[#1b2649] shadow-[0_8px_30px_rgba(6,10,20,0.6)] transition-all duration-500">
        {overviewSlide && (
          <button
            type="button"
            onClick={() => onSelectSlide(0)}
            aria-label={`Jump to slide ${overviewSlide.number}: ${overviewSlide.title}`}
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            <div
              className={`hidden md:inline-block font-mono transition-all duration-200 text-right ${
                activeIndex === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full border text-[11px] ${
                  activeIndex === 0
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a]'
                }`}
              >
                {overviewSlide.number} {overviewSlide.title}
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
              className={`hidden md:inline-block font-mono transition-all duration-200 text-right ${
                activeIndex === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full border text-[11px] ${
                  activeIndex === 1
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a]'
                }`}
              >
                {experienceSlide.number} {experienceSlide.title}
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

        <div className={`relative group/project flex items-center justify-end transition-all duration-500 ease-out ${
          isAnyProjectActive ? 'my-5 sm:my-6' : 'my-0'
        }`}>
          <div
            className={`absolute right-6 top-1/2 -translate-y-1/2 flex items-center transition-all duration-400 ease-out ${
              isAnyProjectActive
                ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
                : 'opacity-0 translate-x-3 scale-95 pointer-events-none group-hover/project:opacity-100 group-hover/project:translate-x-0 group-hover/project:scale-100 group-hover/project:pointer-events-auto'
            }`}
          >
            <div className="relative w-8 h-[76px] flex items-center justify-center mr-1">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 32 76"
                fill="none"
              >
                <path
                  d="M 28 4 C 10 4, 8 16, 8 20 L 8 56 C 8 62, 10 72, 28 72"
                  stroke={isAnyProjectActive ? '#f8c076' : '#3f5ea5'}
                  strokeWidth="1.5"
                  fill="none"
                  strokeOpacity={isAnyProjectActive ? 0.8 : 0.4}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col justify-between py-2 items-start pl-0.5">
                {projectSlides.map((subSlide) => {
                  const isSubActive = activeIndex === subSlide.globalIndex;

                  return (
                    <button
                      key={subSlide.id}
                      type="button"
                      onClick={() => onSelectSlide(subSlide.globalIndex)}
                      aria-label={`Jump to sub-project ${subSlide.number}: ${subSlide.title}`}
                      className="group/sub flex items-center justify-end focus:outline-none h-4 w-full"
                    >
                      <div
                        className={`hidden md:inline-block font-mono transition-all duration-200 text-right absolute right-12 sm:right-14 ${
                          isSubActive ? 'opacity-100' : 'opacity-0 group-hover/sub:opacity-100'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border whitespace-nowrap leading-tight ${
                            isSubActive
                              ? 'bg-[#15234c] border-[#f8c076]/60 shadow-[0_0_12px_rgba(248,192,118,0.25)]'
                              : 'bg-[#0c142b] border-[#1c274a]'
                          }`}
                        >
                          <span className="text-[7.5px] uppercase tracking-wider text-[#7ea2f8] font-semibold">
                            PROJECTS ❯
                          </span>
                          <span
                            className={`text-[10px] ${
                              isSubActive ? 'font-bold text-[#f8c076]' : 'text-[#96a7d1]'
                            }`}
                          >
                            {subSlide.number} {subSlide.title}
                          </span>
                        </div>
                      </div>

                      <div className="w-4 flex items-center justify-center">
                        <div
                          className={`transition-all duration-300 rounded-full ${
                            isSubActive
                              ? 'w-2 h-2 bg-[#f8c076] ring-3 ring-[#f8c076]/45'
                              : 'w-1.5 h-1.5 bg-[#253562] hover:bg-[#8cb0fd] hover:scale-125'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectSlide(firstProjectIndex)}
            aria-label="Jump to Projects section"
            className="group flex items-center justify-end gap-2.5 focus:outline-none"
          >
            {!isAnyProjectActive && (
              <div className="hidden md:inline-block font-mono transition-all duration-200 text-right opacity-0 group-hover:opacity-100">
                <span className="inline-block px-2.5 py-1 rounded-full border text-[11px] text-[#768ab9] bg-[#0c142b] border-[#1c274a]">
                  PROJECTS
                </span>
              </div>
            )}

            <div className="w-4 h-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-full ${
                  isAnyProjectActive
                    ? 'w-3 h-3 bg-[#f8c076] ring-4 ring-[#f8c076]/25'
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
              className={`hidden md:inline-block font-mono transition-all duration-200 text-right ${
                activeIndex === skillsIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full border text-[11px] ${
                  activeIndex === skillsIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a]'
                }`}
              >
                {skillsSlide.number} {skillsSlide.title}
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
              className={`hidden md:inline-block font-mono transition-all duration-200 text-right ${
                activeIndex === educationIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full border text-[11px] ${
                  activeIndex === educationIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a]'
                }`}
              >
                {educationSlide.number} {educationSlide.title}
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
              className={`hidden md:inline-block font-mono transition-all duration-200 text-right ${
                activeIndex === contactIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full border text-[11px] ${
                  activeIndex === contactIndex
                    ? 'font-bold text-[#f8c076] bg-[#121c3b] border-[#f8c076]/40'
                    : 'text-[#768ab9] bg-[#0c142b] border-[#1c274a]'
                }`}
              >
                {contactSlide.number} {contactSlide.title}
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
      </div>

      <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md bg-[#090f23]/60 border border-[#172344] text-[9px] font-mono text-[#5b6f9f]">
        <span>↑</span>
        <span>/</span>
        <span>↓</span>
      </div>
    </aside>
  );
}
