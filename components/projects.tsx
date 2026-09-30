'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
            <div className="text-[10px] font-mono tracking-wider text-[#8cb0fd] mb-2 pb-1.5 border-b border-[#1f2f5c] flex items-center justify-between">
              <span>All Technologies ({tags.length})</span>
              <span className="text-[#f8c076] font-semibold">Stack</span>
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

function ScreenshotLightbox({
  screenshots,
  activeIndex,
  onClose,
}: {
  screenshots: string[];
  activeIndex: number;
  onClose: () => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(activeIndex);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') setCurrentIdx((i) => (i > 0 ? i - 1 : screenshots.length - 1));
      if (e.key === 'ArrowRight') setCurrentIdx((i) => (i < screenshots.length - 1 ? i + 1 : 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose, screenshots.length]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-250 ${
        isVisible ? 'bg-black/90 backdrop-blur-md' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-xl transition-all cursor-pointer z-10"
      >
        ✕
      </button>

      {screenshots.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((i) => (i > 0 ? i - 1 : screenshots.length - 1));
            }}
            aria-label="Previous screenshot"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-lg transition-all cursor-pointer z-10"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx((i) => (i < screenshots.length - 1 ? i + 1 : 0));
            }}
            aria-label="Next screenshot"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-lg transition-all cursor-pointer z-10"
          >
            ›
          </button>
        </>
      )}

      <div
        className={`relative max-w-[90vw] max-h-[85vh] transition-all duration-250 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={screenshots[currentIdx]}
          alt={`Screenshot ${currentIdx + 1}`}
          width={1200}
          height={800}
          className="rounded-xl object-contain max-h-[85vh] w-auto shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          priority
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentIdx
                  ? 'bg-[#f8c076] ring-2 ring-[#f8c076]/40 scale-125'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`View screenshot ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenshotGalleryModal({
  screenshots,
  projectTitle,
}: {
  screenshots: string[];
  projectTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || lightboxIdx !== null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, lightboxIdx]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 rounded-lg border border-[#304886] bg-[#14234d] text-[#8cb0fd] hover:border-[#f8c076] hover:text-[#f8c076] transition-all font-semibold inline-flex items-center gap-1.5 cursor-pointer"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <span>Preview</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0c142e] border border-[#2d427b] rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1f2f5c] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#f8c076]" />
                <h4 className="text-sm sm:text-base font-sans font-bold uppercase tracking-wider text-white">
                  {projectTitle} — Screenshots
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono border border-[#2b417e] bg-[#132047] text-[#8cb0fd]">
                  {screenshots.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-[#2b3e75] bg-[#14224c] hover:bg-[#1e326b] hover:text-white text-[#8cb0fd] flex items-center justify-center transition-all cursor-pointer text-sm"
                aria-label="Close preview gallery"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto pr-1">
              {screenshots.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative rounded-xl overflow-hidden border border-[#243970] hover:border-[#f8c076] transition-all duration-300 cursor-pointer bg-[#080f24] text-left focus:outline-none"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${projectTitle} screenshot ${idx + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#080e22]/80 backdrop-blur-sm border border-[#2b417e] text-[10px] font-mono text-[#8cb0fd]">
                      #{idx + 1}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 opacity-90 group-hover:opacity-100 transition-all">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0c142e]/90 backdrop-blur-md border border-[#324b88] group-hover:border-[#f8c076] text-[11px] font-mono text-[#f8c076] transition-colors">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                        </svg>
                        <span>Expand</span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f2f5c] flex items-center justify-between text-[11px] font-mono text-[#5b6f9f] shrink-0">
              <span>Click any image to expand fullscreen</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {lightboxIdx !== null && (
        <ScreenshotLightbox
          screenshots={screenshots}
          activeIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

export function ProjectSlide({ project, slideNumber, totalProjects }: ProjectSlideProps) {
  const mainUrl = project.demoUrl || project.githubUrl;

  return (
    <section id={`project-${project.number}`} className="w-full max-w-5xl my-auto flex flex-col justify-center py-4 sm:py-6">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">{slideNumber}</span>
        <h2 className="text-xl sm:text-2xl font-sans font-bold uppercase tracking-wider text-[#f1edff]">
          FEATURED PROJECT ({project.number}/{String(totalProjects).padStart(2, '0')})
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="rounded-3xl p-5 sm:p-7 lg:p-8 border border-[#233566]/60 bg-gradient-to-b from-[#0f1736]/70 via-[#0c142e]/50 to-[#080d20]/60 backdrop-blur-md shadow-[0_20px_50px_rgba(5,10,25,0.65)] space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div className="relative inline-flex items-center gap-1.5 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-[#2b417e] bg-[#132047]/80 text-[#8cb0fd]"
              >
                [ {tag} ]
              </span>
            ))}

            {project.tags.length > 3 && (
              <TechPopover tags={project.tags} />
            )}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg border border-[#f8c076]/60 bg-[#f8c076]/10 text-[#f8c076] hover:bg-[#f8c076] hover:text-[#060a14] transition-all font-semibold inline-flex items-center gap-1.5"
              >
                <span>Live Demo</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg border border-[#304886] bg-[#14234d] text-[#8cb0fd] hover:border-[#8cb0fd] hover:text-white transition-all font-semibold inline-flex items-center gap-1.5"
              >
                <span>GitHub Repo</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {project.screenshots && project.screenshots.length > 0 && (
              <ScreenshotGalleryModal
                screenshots={project.screenshots}
                projectTitle={project.title}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3.5">
          <h3 className="text-2xl sm:text-3xl font-sans font-bold uppercase tracking-tight text-white shrink-0">
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

          <p className="text-xs sm:text-sm font-sans text-[#95abdc]">
            {project.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#c5d5f6] font-sans leading-relaxed max-w-4xl">
          {project.description}
        </p>

        {project.keyHighlights && project.keyHighlights.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono tracking-wider text-[#8cb0fd] font-semibold uppercase">
                What I Built
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#213364] to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {project.keyHighlights.map((highlight, idx) => {
                const [heading, ...rest] = highlight.split(': ');
                const body = rest.join(': ');

                return (
                  <div
                    key={idx}
                    className="group relative pl-4 pr-3 py-2 sm:py-2.5 border-l-2 border-[#2b417e] hover:border-[#f8c076] bg-[#111c3d]/40 hover:bg-[#16244f]/60 rounded-r-xl transition-all duration-300"
                  >
                    <div className="text-[#f8c076] font-mono text-xs font-bold mb-1 tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
                      {body ? heading : 'FEATURE'}
                    </div>
                    <p className="text-[#c5d5f6] font-sans text-xs leading-relaxed group-hover:text-[#e2edff] transition-colors">
                      {body || heading}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

