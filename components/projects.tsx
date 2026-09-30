'use client';

import { useState, useRef } from 'react';
import { Project } from '@/types/portfolio';

interface ProjectSlideProps {
  project: Project;
  slideNumber: string;
  totalProjects: number;
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
        aria-label="View all project tags"
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
          className="absolute left-0 top-full pt-2 z-50 w-72 sm:w-80 max-w-[calc(100vw-3rem)]"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className="p-3 rounded-xl border border-[#324982] bg-[#0c142b] shadow-[0_16px_40px_rgba(0,0,0,0.95)]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8cb0fd] mb-2 pb-1.5 border-b border-[#1f2f5c] flex items-center justify-between">
              <span>ALL TECHNOLOGIES ({tags.length})</span>
              <span className="text-[#f8c076] font-bold">[ STACK ]</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-[#2f4684] bg-[#132047] text-[#ddd7ff]"
                >
                  [ {tag} ]
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectSlide({ project, slideNumber, totalProjects }: ProjectSlideProps) {
  const mainUrl = project.demoUrl || project.githubUrl;

  return (
    <section id={`project-${project.number}`} className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-3">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">{slideNumber}</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          FEATURED PROJECT ({project.number}/{String(totalProjects).padStart(2, '0')})
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <article className="rounded-2xl p-4 sm:p-6 border border-[#283d78] bg-[#0d1633] shadow-[0_16px_45px_rgba(8,14,35,0.85)] space-y-3 sm:space-y-3.5">
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold tracking-widest text-[#f8c076] uppercase block">
            PROJ. {project.number} // PRODUCTION SYSTEM
          </span>

          <div className="relative inline-flex items-center gap-1.5 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-[#2b417e] bg-[#132047] text-[#8cb0fd]"
              >
                [ {tag} ]
              </span>
            ))}

            {project.tags.length > 3 && (
              <TechPopover tags={project.tags} />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3.5">
          <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-tight text-white shrink-0">
            {mainUrl ? (
              <a
                href={mainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f8c076] transition-colors inline-flex items-center gap-2 group"
              >
                <span>{project.title}</span>
                <span className="text-[#f8c076] text-xl font-normal group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-[#95abdc]">
            {project.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#c5d5f6] font-sans leading-relaxed">
          {project.description}
        </p>

        {project.keyHighlights && project.keyHighlights.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8cb0fd]">
              ARCHITECTURAL MODULES &amp; OUTCOMES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {project.keyHighlights.map((highlight, idx) => {
                const [heading, ...rest] = highlight.split(': ');
                const body = rest.join(': ');

                return (
                  <div
                    key={idx}
                    className="rounded-xl p-2.5 sm:p-3.5 border border-[#23376c] bg-[#121f45]/90 hover:border-[#3d58a3] transition-colors"
                  >
                    <div className="text-[#f8c076] font-mono text-xs font-bold mb-1">
                      - {body ? heading : 'FEATURE'}
                    </div>
                    <div className="text-[#c5d5f6] font-sans text-xs leading-relaxed">
                      {body || heading}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
