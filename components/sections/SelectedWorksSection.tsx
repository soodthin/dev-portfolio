'use client';

import React, { useState, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { ProjectImage } from '@/types/portfolio';
import { getAssetPath } from '@/lib/asset';
import { GithubIcon } from '@/components/ui/Icons';
import { SpotlightSurface } from '@/components/ui/SpotlightSurface';
import { MagneticButton } from '@/components/motion/MagneticButton';

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

interface SelectedWorksSectionProps {
  onOpenLightbox: (images: ProjectImage[], index: number, title: string) => void;
}

export function SelectedWorksSection({ onOpenLightbox }: SelectedWorksSectionProps) {
  const { data, t } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const [proj1, proj2, proj3] = data.projects;

  // Project 01: Directional slide gallery state
  const [[p1Index, p1Direction], setP1Slide] = useState<[number, number]>([0, 1]);
  const p1Images = proj1?.imagesList || [];

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
      className="relative py-24 md:py-36 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Clean Masked Wipe-Up Heading */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent)] mb-3">
            {t.works.eyebrow}
          </p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className="font-serif font-semibold text-3xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-[var(--text)] leading-[1.08]"
            >
              {t.works.title}
            </motion.h2>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {t.works.subtitle}
          </p>
        </div>

        <div className="space-y-28 md:space-y-36">
          {/* ================================================================= */}
          {/* PROJECT 01: FlexiConnect Web                                      */}
          {/* ================================================================= */}
          {proj1 && (
            <article id={proj1.id} className="scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left: Specs */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                      {proj1.number}
                    </span>
                    <span>·</span>
                    <span>Spring Boot · React</span>
                  </div>

                  <h3 className="font-serif font-semibold text-3xl sm:text-4xl tracking-[-0.02em] text-[var(--text)]">
                    {proj1.title}
                  </h3>

                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    {proj1.description}
                  </p>

                  {/* Open Horizontal Metrics Strip */}
                  {proj1.metricsList && (
                    <div className="grid grid-cols-4 divide-x divide-[var(--hairline)] py-4 border-y border-[var(--hairline)]">
                      {proj1.metricsList.map((m, i) => (
                        <div key={i} className="px-3 first:pl-0 last:pr-0">
                          <div className="font-mono text-lg sm:text-xl font-bold tabular-nums text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Architecture Highlights */}
                  <ul className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                    {proj1.keyHighlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj1.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {proj1.githubUrl && (
                      <MagneticButton strength={0.2}>
                        <a
                          href={proj1.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] text-xs font-medium transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}

                    <button
                      type="button"
                      onClick={() => onOpenLightbox(p1Images, p1Index, proj1.title)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Maximize2 size={13} strokeWidth={2} />
                      <span>
                        {t.works.viewGallery} ({p1Images.length})
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right: Perspective Browser Stage + Directional Gallery + Thumbnails */}
                <div
                  ref={p1StageRef}
                  className="lg:col-span-7 space-y-3"
                  style={isDesktop && !prefersReducedMotion ? { perspective: '1200px' } : undefined}
                >
                  <motion.div
                    style={
                      isDesktop && !prefersReducedMotion
                        ? { rotateX: p1RotateX, scale: p1Scale, transformOrigin: 'center bottom' }
                        : undefined
                    }
                    className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] overflow-hidden shadow-xl will-change-transform"
                  >
                    {/* Browser Chrome */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)] bg-[var(--surface-2)]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)] truncate mx-3">
                        {p1Images[p1Index]?.title}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)] shrink-0">
                        {String(p1Index + 1).padStart(2, '0')} / {String(p1Images.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Directional Slide Viewport */}
                    <div className="relative aspect-[16/10] bg-[var(--bg)] overflow-hidden group">
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
                          {p1Images[p1Index] && (
                            <Image
                              src={getAssetPath(p1Images[p1Index].src)}
                              alt={p1Images[p1Index].title}
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
          )}

          {/* ================================================================= */}
          {/* PROJECT 02: Saigon Savory App (Media Left, Text Right)            */}
          {/* ================================================================= */}
          {proj2 && (
            <article id={proj2.id} ref={p2StageRef} className="scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left: 3-Phone Fan-Out on Desktop, Horizontal Snap Carousel on Mobile */}
                <div className="lg:col-span-6">
                  {isDesktop ? (
                    <div className="relative flex items-center justify-center py-8">
                      {/* Phone 0 (Left Fan) */}
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

                      {/* Phone 1 (Center Elevated) */}
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

                      {/* Phone 2 (Right Fan) */}
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
                    /* Mobile Touch Snap Carousel */
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

                {/* Right: Specs */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                      {proj2.number}
                    </span>
                    <span>·</span>
                    <span>React Native · Django REST</span>
                  </div>

                  <h3 className="font-serif font-semibold text-3xl sm:text-4xl tracking-[-0.02em] text-[var(--text)]">
                    {proj2.title}
                  </h3>

                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    {proj2.description}
                  </p>

                  {proj2.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--hairline)] py-4 border-y border-[var(--hairline)]">
                      {proj2.metricsList.map((m, i) => (
                        <div key={i} className="py-2 sm:py-0 sm:px-3 first:sm:pl-0 last:sm:pr-0">
                          <div className="font-mono text-lg sm:text-xl font-bold tabular-nums text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                    {proj2.keyHighlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj2.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {proj2.githubUrl && (
                      <MagneticButton strength={0.2}>
                        <a
                          href={proj2.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] text-xs font-medium transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}

                    <button
                      type="button"
                      onClick={() => onOpenLightbox(p2Images, 0, proj2.title)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Maximize2 size={13} strokeWidth={2} />
                      <span>
                        {t.works.viewGallery} ({p2Images.length})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* ================================================================= */}
          {/* PROJECT 03: Dev Portfolio Engine (Open Horizontal Strip, No Nest) */}
          {/* ================================================================= */}
          {proj3 && (
            <article id={proj3.id} className="scroll-mt-24 pt-12 border-t border-[var(--hairline)]">
              <SpotlightSurface className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-1)] p-6 sm:p-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--hairline)]">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="font-mono tabular-nums font-semibold text-[var(--accent)]">
                        {proj3.number}
                      </span>
                      <span>·</span>
                      <span>Next.js 16 · Static Export</span>
                    </div>

                    <h3 className="font-serif font-semibold text-3xl sm:text-4xl tracking-[-0.02em] text-[var(--text)]">
                      {proj3.title}
                    </h3>

                    <p className="text-base text-[var(--text-muted)] leading-relaxed">
                      {proj3.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {proj3.demoUrl && (
                      <a
                        href={proj3.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-2)] hover:border-[var(--hairline-strong)] text-[var(--text)] text-xs font-medium transition-colors"
                      >
                        <span>{t.works.liveDemoBtn}</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {proj3.githubUrl && (
                      <MagneticButton strength={0.2}>
                        <a
                          href={proj3.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-xs font-semibold transition-all"
                        >
                          <GithubIcon size={14} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}
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

                {/* Open Architecture Rows with layoutId Hover Hairline */}
                <div className="divide-y divide-[var(--hairline)] mt-2">
                  {proj3.keyHighlights.map((hl, idx) => {
                    const isHovered = hoveredArchIndex === idx;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredArchIndex(idx)}
                        className="relative py-4 pl-5 pr-2 flex items-start gap-4 transition-colors"
                      >
                        {isHovered && (
                          <motion.span
                            layoutId="proj3ArchIndicator"
                            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[var(--accent)]"
                          />
                        )}
                        <span className="font-mono text-xs tabular-nums text-[var(--accent)] pt-0.5 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{hl}</p>
                      </div>
                    );
                  })}
                </div>
              </SpotlightSurface>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
