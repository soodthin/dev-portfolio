'use client';

import React, { useState, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { ProjectImage } from '@/types/portfolio';
import { getAssetPath } from '@/lib/asset';
import { GithubIcon } from '@/components/ui/Icons';
import { SpotlightSurface } from '@/components/ui/SpotlightSurface';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechIcon } from '@/components/ui/TechIcons';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia('(min-width: 768px)');
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => false
  );
}

function parseHighlight(raw: string): { title: string; body: string } {
  const colonIdx = raw.indexOf(':');
  if (colonIdx === -1) {
    return { title: raw.slice(0, 32), body: raw };
  }
  return {
    title: raw.slice(0, colonIdx).trim(),
    body: raw.slice(colonIdx + 1).trim(),
  };
}

/**
 * Emphasizes numeric metrics & @annotations inside technical descriptions for rapid scanning.
 */
function renderScannableCopy(text: string): React.ReactNode {
  const parts = text.split(/(@\w+|\b\d+(?:[.,–-]\d+)*(?:\+|%|fps)?\b)/g);
  return parts.map((part, idx) => {
    if (/^(@\w+|\d+(?:[.,–-]\d+)*(?:\+|%|fps)?)$/.test(part)) {
      return (
        <span key={idx} className="font-mono text-[13px] font-semibold text-[var(--text)]">
          {part}
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

interface HighlightExplorerProps {
  highlights: string[];
  layoutIdPrefix: string;
  sectionLabel: string;
}

/**
 * Displays ALL project highlights cleanly via interactive pill tabs + animated detail surface.
 * Uses GPU-only transform & opacity transitions — zero content omitted, zero vertical text wall.
 */
function HighlightExplorer({
  highlights,
  layoutIdPrefix,
  sectionLabel,
}: HighlightExplorerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const parsed = highlights.map(parseHighlight);
  const safeIdx = Math.min(activeIdx, Math.max(0, parsed.length - 1));
  const current = parsed[safeIdx];

  if (!current) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {sectionLabel}
        </span>
        <span className="font-mono text-xs tabular-nums text-[var(--accent)]">
          {String(safeIdx + 1).padStart(2, '0')} / {String(parsed.length).padStart(2, '0')}
        </span>
      </div>

      {/* Interactive Pill Tabs */}
      <div role="tablist" aria-label={sectionLabel} className="flex flex-wrap gap-1.5">
        {parsed.map((item, idx) => {
          const isActive = idx === safeIdx;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIdx(idx)}
              className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'text-[var(--text)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--hairline)] bg-[var(--surface-1)]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`${layoutIdPrefix}-active-tab`}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0 rounded-full bg-[var(--accent-wash)] border border-[var(--hairline-strong)] -z-10"
                />
              )}
              <span className="font-mono text-[10px] tabular-nums text-[var(--accent)] mr-1.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Highlight Detail Panel with strictly fixed height to prevent layout shifts */}
      <SpotlightSurface className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] p-5 h-[200px] sm:h-[175px] lg:h-[170px] overflow-hidden flex flex-col justify-start shadow-[var(--surface-shadow)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="space-y-1.5"
          >
            <h4 className="font-serif font-semibold text-lg text-[var(--text)]">
              {current.title}
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {renderScannableCopy(current.body)}
            </p>
          </motion.div>
        </AnimatePresence>
      </SpotlightSurface>
    </div>
  );
}

interface SelectedWorksSectionProps {
  onOpenLightbox: (images: ProjectImage[], index: number, title: string) => void;
}

export function SelectedWorksSection({ onOpenLightbox }: SelectedWorksSectionProps) {
  const { data, t, lang } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const [proj1, proj2, proj3] = data.projects;

  // Project 01: Directional slide gallery state
  const [[p1Index, p1Direction], setP1Slide] = useState<[number, number]>([0, 1]);
  const p1Images = proj1?.imagesList || [];
  const p1Current = p1Images[p1Index];

  const paginateP1 = (nextIndex: number, direction: number) => {
    if (p1Images.length === 0) return;
    const wrapped = (nextIndex + p1Images.length) % p1Images.length;
    setP1Slide([wrapped, direction]);
  };

  // Project 01: Scroll-driven perspective rotateX (8deg -> 0deg) & scale (0.96 -> 1) on desktop
  const p1StageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p1Progress } = useScroll({
    target: p1StageRef,
    offset: ['start end', 'center center'],
  });
  const p1RotateX = useTransform(p1Progress, [0, 1], [8, 0]);
  const p1Scale = useTransform(p1Progress, [0, 1], [0.96, 1]);

  // Project 02: Scroll-driven 3-Phone Fan-Out on desktop
  const p2StageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p2Progress } = useScroll({
    target: p2StageRef,
    offset: ['start end', 'center center'],
  });
  const leftPhoneRotate = useTransform(p2Progress, [0, 1], [0, -7]);
  const leftPhoneX = useTransform(p2Progress, [0, 1], [16, -10]);
  const centerPhoneY = useTransform(p2Progress, [0, 1], [16, -14]);
  const rightPhoneRotate = useTransform(p2Progress, [0, 1], [0, 7]);
  const rightPhoneX = useTransform(p2Progress, [0, 1], [-16, 10]);

  const p2Images = proj2?.imagesList || [];

  // Project 03: layoutId hover indicator
  const [hoveredArchIndex, setHoveredArchIndex] = useState<number>(0);

  return (
    <section
      id="works"
      className="relative bg-[var(--bg)] chapter-divider-sheen py-12 md:py-16 lg:py-14 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollDepthWrapper sectionId="works">
          <SectionHeading
            index="03"
            eyebrow={t.works.eyebrow}
            title={t.works.title}
            subtitle={t.works.subtitle}
            className="mb-8 md:mb-10 lg:mb-12"
          />
        </ScrollDepthWrapper>

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* ================================================================= */}
          {/* PROJECT 01: FlexiConnect Web                                      */}
          {/* ================================================================= */}
          {proj1 && (
            <ScrollDepthWrapper sectionId={proj1.id}>
              <article id={proj1.id} className="scroll-mt-24 space-y-5 lg:space-y-6">
              {/* Full-Width Project Header Bar */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 lg:pb-5 border-b border-[var(--hairline)]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                      {proj1.number}
                    </span>
                    <span>·</span>
                    <span>{proj1.subtitle}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {proj1.demoUrl ? (
                      <a
                        href={proj1.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                      >
                        <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {proj1.title}
                        </h3>
                        <ExternalLink
                          size={20}
                          className="text-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                        />
                      </a>
                    ) : (
                      <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)]">
                        {proj1.title}
                      </h3>
                    )}

                    {proj1.githubUrl && (
                      <MagneticButton strength={0.2}>
                        <a
                          href={proj1.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-2)] text-[var(--text)] text-xs font-medium transition-colors"
                        >
                          <GithubIcon size={13} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
                    {proj1.description}
                  </p>
                </div>

                {/* Tech Stack in header replacing old action buttons */}
                <div className="flex flex-wrap items-center gap-1.5 lg:justify-end max-w-xl shrink-0">
                  {proj1.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                    >
                      <TechIcon name={tag} size={12} className="text-[var(--accent)]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Balanced 12-Col Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left (5 cols): Metrics + Interactive All-Highlights Switcher + Tech Stack */}
                <div className="lg:col-span-5 space-y-5 lg:space-y-6">
                  {proj1.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-px rounded-xl overflow-hidden border border-[var(--hairline)] bg-[var(--hairline)] shadow-[var(--surface-shadow)]">
                      {proj1.metricsList.map((m, i) => (
                        <div key={i} className="bg-[var(--surface-1)] px-3 py-2 sm:py-2.5">
                          <div className="font-mono text-xl font-bold tabular-nums text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <HighlightExplorer
                    highlights={proj1.keyHighlights}
                    layoutIdPrefix="proj1"
                    sectionLabel={t.works.architectureTitle}
                  />
                </div>

                {/* Right (7 cols): Perspective Browser Stage + Synced Caption + Thumbnails */}
                <div
                  ref={p1StageRef}
                  className="lg:col-span-7 space-y-2.5"
                  style={isDesktop && !prefersReducedMotion ? { perspective: '1200px' } : undefined}
                >
                  <motion.div
                    style={
                      isDesktop && !prefersReducedMotion
                        ? { rotateX: p1RotateX, scale: p1Scale, transformOrigin: 'center bottom' }
                        : undefined
                    }
                    className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] overflow-hidden shadow-[var(--surface-shadow)] will-change-transform"
                  >
                    {/* Browser Chrome */}
                    <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--hairline)] bg-[var(--surface-2)]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)] truncate mx-3">
                        {p1Current?.title}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)] shrink-0">
                        {String(p1Index + 1).padStart(2, '0')} /{' '}
                        {String(p1Images.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Directional Slide Viewport */}
                    <div className="relative aspect-[16/9.5] bg-[var(--bg)] overflow-hidden group">
                      <AnimatePresence initial={false} custom={p1Direction} mode="wait">
                        <motion.div
                          key={p1Index}
                          custom={p1Direction}
                          initial={{ opacity: 0, x: p1Direction > 0 ? 36 : -36 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: p1Direction > 0 ? -36 : 36 }}
                          transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                          onClick={() => onOpenLightbox(p1Images, p1Index, proj1.title)}
                          className="relative w-full h-full cursor-pointer"
                        >
                          {p1Current && (
                            <Image
                              src={getAssetPath(p1Current.src)}
                              alt={p1Current.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 680px"
                              unoptimized
                              className="object-cover object-top"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <button
                        type="button"
                        onClick={() => paginateP1(p1Index - 1, -1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/15 transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => paginateP1(p1Index + 1, 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/15 transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Live Synced Caption Strip */}
                    {p1Current && (
                      <div className="px-4 py-3 border-t border-[var(--hairline)] bg-[var(--surface-1)]">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={p1Index}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-[var(--text-muted)] leading-relaxed"
                          >
                            <span className="text-[var(--text)] font-medium mr-1.5">
                              {p1Current.title}:
                            </span>
                            {lang === 'vi' ? p1Current.captionVi : p1Current.captionEn}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>

                  {/* Thumbnail Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {p1Images.map((img, idx) => {
                      const isCurrent = idx === p1Index;
                      return (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => paginateP1(idx, idx > p1Index ? 1 : -1)}
                          aria-label={img.title}
                          className={`relative w-16 h-10 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-[var(--accent)] opacity-100'
                              : 'border-[var(--hairline)] opacity-50 hover:opacity-90'
                          }`}
                        >
                          <Image
                            src={getAssetPath(img.src)}
                            alt={img.title}
                            fill
                            sizes="64px"
                            unoptimized
                            className="object-cover object-top"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          </ScrollDepthWrapper>
          )}

          {/* ================================================================= */}
          {/* PROJECT 02: Saigon Savory App (Media Left, Text Right)            */}
          {/* ================================================================= */}
          {proj2 && (
            <ScrollDepthWrapper sectionId={proj2.id}>
              <article
                id={proj2.id}
                ref={p2StageRef}
                className="scroll-mt-24 pt-8 lg:pt-10 border-t border-[var(--hairline)] space-y-5 lg:space-y-6"
              >
              {/* Full-Width Project Header Bar */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 lg:pb-5 border-b border-[var(--hairline)]">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                      {proj2.number}
                    </span>
                    <span>·</span>
                    <span>{proj2.subtitle}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {proj2.demoUrl ? (
                      <a
                        href={proj2.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                      >
                        <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {proj2.title}
                        </h3>
                        <ExternalLink
                          size={20}
                          className="text-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                        />
                      </a>
                    ) : (
                      <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)]">
                        {proj2.title}
                      </h3>
                    )}

                    {proj2.githubUrl && (
                      <MagneticButton strength={0.2}>
                        <a
                          href={proj2.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-2)] text-[var(--text)] text-xs font-medium transition-colors"
                        >
                          <GithubIcon size={13} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
                    {proj2.description}
                  </p>
                </div>

                {/* Tech Stack in header replacing old action buttons */}
                <div className="flex flex-wrap items-center gap-1.5 lg:justify-end max-w-xl shrink-0">
                  {proj2.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                    >
                      <TechIcon name={tag} size={12} className="text-[var(--accent)]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (6 cols): 3-Phone Fan-Out on Desktop, Horizontal Snap Carousel on Mobile */}
                <div className="lg:col-span-6">
                  {isDesktop ? (
                    <div className="relative flex items-center justify-center py-6">
                      {p2Images[0] && (
                        <motion.button
                          type="button"
                          onClick={() => onOpenLightbox(p2Images, 0, proj2.title)}
                          style={
                            prefersReducedMotion
                              ? undefined
                              : { rotate: leftPhoneRotate, x: leftPhoneX }
                          }
                          whileHover={prefersReducedMotion ? undefined : { y: -12, scale: 1.03 }}
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className="relative w-44 xl:w-48 aspect-[9/19] rounded-[1.75rem] p-1.5 border border-[var(--hairline)] hover:border-[var(--hairline-strong)] bg-[var(--surface-1)] shadow-2xl z-10 hover:z-30 cursor-pointer will-change-transform"
                          aria-label={p2Images[0].title}
                        >
                          <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black">
                            <Image
                              src={getAssetPath(p2Images[0].src)}
                              alt={p2Images[0].title}
                              fill
                              sizes="192px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </motion.button>
                      )}

                      {p2Images[1] && (
                        <motion.button
                          type="button"
                          onClick={() => onOpenLightbox(p2Images, 1, proj2.title)}
                          style={prefersReducedMotion ? undefined : { y: centerPhoneY }}
                          whileHover={prefersReducedMotion ? undefined : { y: -22, scale: 1.04 }}
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className="relative w-48 xl:w-52 aspect-[9/19] rounded-[1.75rem] p-1.5 border border-[var(--hairline-strong)] bg-[var(--surface-1)] shadow-2xl -ml-8 z-20 hover:z-30 cursor-pointer will-change-transform"
                          aria-label={p2Images[1].title}
                        >
                          <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black">
                            <Image
                              src={getAssetPath(p2Images[1].src)}
                              alt={p2Images[1].title}
                              fill
                              sizes="208px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </motion.button>
                      )}

                      {p2Images[2] && (
                        <motion.button
                          type="button"
                          onClick={() => onOpenLightbox(p2Images, 2, proj2.title)}
                          style={
                            prefersReducedMotion
                              ? undefined
                              : { rotate: rightPhoneRotate, x: rightPhoneX }
                          }
                          whileHover={prefersReducedMotion ? undefined : { y: -12, scale: 1.03 }}
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className="relative w-44 xl:w-48 aspect-[9/19] rounded-[1.75rem] p-1.5 border border-[var(--hairline)] hover:border-[var(--hairline-strong)] bg-[var(--surface-1)] shadow-2xl -ml-8 z-10 hover:z-30 cursor-pointer will-change-transform"
                          aria-label={p2Images[2].title}
                        >
                          <div className="relative w-full h-full rounded-[1.35rem] overflow-hidden bg-black">
                            <Image
                              src={getAssetPath(p2Images[2].src)}
                              alt={p2Images[2].title}
                              fill
                              sizes="192px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </motion.button>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 no-scrollbar">
                      {p2Images.map((img, idx) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => onOpenLightbox(p2Images, idx, proj2.title)}
                          className="snap-center shrink-0 w-52 aspect-[9/19] rounded-3xl p-1.5 border border-[var(--hairline)] bg-[var(--surface-1)] shadow-lg cursor-pointer"
                          aria-label={img.title}
                        >
                          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                            <Image
                              src={getAssetPath(img.src)}
                              alt={img.title}
                              fill
                              sizes="208px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right (6 cols): Metrics + Interactive Highlights + Tech Stack */}
                <div className="lg:col-span-6 space-y-7">
                  {proj2.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-[var(--hairline)] bg-[var(--hairline)] shadow-[var(--surface-shadow)]">
                      {proj2.metricsList.map((m, i) => (
                        <div key={i} className="bg-[var(--surface-1)] px-4 py-3.5">
                          <div className="font-mono text-xl font-bold tabular-nums text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <HighlightExplorer
                    highlights={proj2.keyHighlights}
                    layoutIdPrefix="proj2"
                    sectionLabel={t.works.architectureTitle}
                  />
                </div>
              </div>
            </article>
          </ScrollDepthWrapper>
          )}

          {/* ================================================================= */}
          {/* PROJECT 03: Dev Portfolio Engine (Open Horizontal Strip, No Nest) */}
          {/* ================================================================= */}
          {proj3 && (
            <ScrollDepthWrapper sectionId={proj3.id}>
              <article id={proj3.id} className="scroll-mt-24 pt-8 lg:pt-10 border-t border-[var(--hairline)]">
                <SpotlightSurface className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-5 sm:p-7 lg:p-8 shadow-[var(--surface-shadow)]">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 lg:pb-5 border-b border-[var(--hairline)]">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
                      <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                        {proj3.number}
                      </span>
                      <span>·</span>
                      <span>{proj3.subtitle}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {proj3.demoUrl ? (
                        <a
                          href={proj3.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                        >
                          <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                            {proj3.title}
                          </h3>
                          <ExternalLink
                            size={20}
                            className="text-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                          />
                        </a>
                      ) : (
                        <h3 className="font-serif font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] tracking-[-0.02em] text-[var(--text)]">
                          {proj3.title}
                        </h3>
                      )}

                      {proj3.githubUrl && (
                        <MagneticButton strength={0.2}>
                          <a
                            href={proj3.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-2)] text-[var(--text)] text-xs font-medium transition-colors"
                          >
                            <GithubIcon size={13} />
                            <span>{t.works.sourceCodeBtn}</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-xl">
                      {proj3.description}
                    </p>
                  </div>

                  {/* Tech Stack in header replacing old action buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 lg:justify-end max-w-xl shrink-0">
                    {proj3.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                      >
                        <TechIcon name={tag} size={12} className="text-[var(--accent)]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Honest Technical Specs Horizontal Strip */}
                {proj3.metricsList && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[var(--hairline)] py-6 border-b border-[var(--hairline)]">
                    {proj3.metricsList.map((m, idx) => (
                      <div key={idx} className="py-2 sm:py-0 sm:px-5 first:sm:pl-0 last:sm:pr-0">
                        <div className="font-mono text-base sm:text-lg font-semibold text-[var(--accent)]">
                          {m.value}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Open Architecture Rows with Bold Split Titles & layoutId Indicator */}
                <div className="divide-y divide-[var(--hairline)] mt-2">
                  {proj3.keyHighlights.map((hl, idx) => {
                    const isHovered = hoveredArchIndex === idx;
                    const { title, body } = parseHighlight(hl);
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredArchIndex(idx)}
                        className="relative py-4 pl-5 pr-2 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 transition-colors"
                      >
                        {isHovered && (
                          <motion.span
                            layoutId="proj3ArchIndicator"
                            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[var(--accent)]"
                          />
                        )}
                        <div className="flex items-baseline gap-3 sm:w-64 shrink-0">
                          <span className="font-mono text-xs tabular-nums text-[var(--accent)]">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-semibold text-[var(--text)]">{title}</span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                          {body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </SpotlightSurface>
            </article>
          </ScrollDepthWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
