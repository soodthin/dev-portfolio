'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { getAssetPath } from '@/lib/asset';
import { GithubIcon } from '@/components/ui/Icons';
import { TechIcon } from '@/components/ui/TechIcons';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';
import type { ProjectImage } from '@/types/portfolio';

const EASE_GLIDE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Variant 05 — Full Width Orbital Horizon Arc Coverflow (60fps GPU glide)
 * Giữ cố định toàn bộ thẻ ảnh trong DOM và cập nhật transform liên tục để lướt mượt dọc cung chân trời.
 */
function computeArcStyle(effectiveOff: number) {
  const s = effectiveOff < 0 ? -1 : 1;
  const a = Math.abs(effectiveOff);

  if (a <= 1) {
    return {
      transform: `translate3d(${(effectiveOff * 29).toFixed(2)}%, ${(-10 + a * 24).toFixed(1)}px, ${(38 - a * 110).toFixed(1)}px) rotateY(${(-effectiveOff * 16).toFixed(2)}deg) rotateZ(${(effectiveOff * 2.5).toFixed(2)}deg) scale(${(1 - a * 0.14).toFixed(3)})`,
      opacity: Number((1 - a * 0.35).toFixed(3)),
      zIndex: a < 0.5 ? 30 : 22,
      interactive: true,
    };
  }
  if (a <= 2) {
    const k = a - 1;
    return {
      transform: `translate3d(${(s * (29 + k * 18)).toFixed(2)}%, ${(14 + k * 24).toFixed(1)}px, ${(-72 - k * 88).toFixed(1)}px) rotateY(${(-s * (16 + k * 8)).toFixed(2)}deg) rotateZ(${(s * (2.5 + k * 2.5)).toFixed(2)}deg) scale(${(0.86 - k * 0.14).toFixed(3)})`,
      opacity: Number((0.65 - k * 0.38).toFixed(3)),
      zIndex: k < 0.5 ? 18 : 10,
      interactive: true,
    };
  }
  const k = Math.min(1, a - 2);
  return {
    transform: `translate3d(${(s * (47 + k * 12)).toFixed(2)}%, ${(38 + k * 20).toFixed(1)}px, ${(-160 - k * 62).toFixed(1)}px) rotateY(${(-s * (24 + k * 6)).toFixed(2)}deg) rotateZ(${(s * (5 + k * 2)).toFixed(2)}deg) scale(${(0.72 - k * 0.12).toFixed(3)})`,
    opacity: Number(Math.max(0, 0.27 * (1 - k)).toFixed(3)),
    zIndex: 2,
    interactive: false,
  };
}

export function FlexiConnectShowcase({
  onOpenLightbox,
}: {
  onOpenLightbox?: (images: ProjectImage[], index: number, title: string) => void;
}) {
  const { data, lang } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const project = data.projects.find((p) => p.id === 'project-01') || data.projects[0];
  const images = project?.imagesList || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragRatio, setDragRatio] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef<number | null>(null);
  const skipClickRef = useRef(false);

  if (!project || images.length === 0) return null;
  const total = images.length;
  const cur = images[activeIndex];
  const step = (d: number) => setActiveIndex((prev) => (prev + d + total) % total);

  // Tọa độ chấm định vị trượt dọc cung chân trời Q(600, 12)
  const arcT = Math.max(
    0.06,
    Math.min(0.94, 0.08 + ((activeIndex - dragRatio * 0.5) / Math.max(1, total - 1)) * 0.84)
  );
  const mt = 1 - arcT;
  const dotX = mt * mt * 15 + 2 * mt * arcT * 600 + arcT * arcT * 1185;
  const dotY = mt * mt * 132 + 2 * mt * arcT * 12 + arcT * arcT * 132;

  const finishDrag = (clientX: number) => {
    if (startXRef.current === null) return;
    const dx = clientX - startXRef.current;
    startXRef.current = null;
    setIsDragging(false);
    setDragRatio(0);
    if (Math.abs(dx) >= 42) {
      skipClickRef.current = true;
      step(dx < 0 ? 1 : -1);
      window.setTimeout(() => {
        skipClickRef.current = false;
      }, 240);
    }
  };

  return (
    <ScrollDepthWrapper sectionId={project.id}>
      <article id={project.id} className="scroll-mt-24 w-full space-y-8 lg:space-y-10">
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[var(--accent)] font-semibold tracking-wider">
              {project.number} · {project.subtitle}
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={project.demoUrl || 'https://flexiconnectweb.onrender.com/'}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                title="FlexiConnect Web - Open Live System"
              >
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={24}
                  className="text-[var(--accent)] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                />
              </a>

              <a
                href="https://github.com/soodthin/FlexiConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--hairline-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--surface-1)] text-xs font-mono text-[var(--text)] transition-all cursor-pointer shadow-sm shrink-0"
                title="FlexiConnect Source Code on GitHub"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Description on Left & Core Tech Stack on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-1">
            <div className="lg:col-span-7">
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="lg:col-span-5 lg:border-l lg:border-[var(--hairline)] lg:pl-6">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)] hover:border-[var(--hairline-strong)] hover:text-[var(--text)] transition-colors"
                    >
                      <TechIcon name={tag} size={12} className="text-[var(--accent)]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sân khấu Orbital Horizon toàn màn hình + trượt mượt 60fps */}
        <div className="relative space-y-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 150"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-10 w-full h-32 opacity-70 overflow-visible"
          >
            <path
              d="M 15 132 Q 600 12 1185 132"
              fill="none"
              stroke="var(--hairline-strong)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <g
              style={{
                transform: `translate(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px)`,
                transition:
                  isDragging || prefersReducedMotion
                    ? 'none'
                    : 'transform 440ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <circle r="7.5" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.55" />
              <circle r="3" fill="var(--accent)" />
            </g>
          </svg>

          <div
            style={{ perspective: '1600px', touchAction: 'pan-y' }}
            onPointerDown={(e) => {
              startXRef.current = e.clientX;
              if (!prefersReducedMotion) setIsDragging(true);
            }}
            onPointerMove={(e) => {
              if (startXRef.current === null || prefersReducedMotion) return;
              const dx = e.clientX - startXRef.current;
              setDragRatio(Math.max(-0.85, Math.min(0.85, dx / 280)));
            }}
            onPointerUp={(e) => finishDrag(e.clientX)}
            onPointerLeave={(e) => {
              if (startXRef.current !== null) finishDrag(e.clientX);
            }}
            onPointerCancel={() => {
              startXRef.current = null;
              setIsDragging(false);
              setDragRatio(0);
            }}
            className="relative h-[300px] sm:h-[390px] md:h-[440px] lg:h-[470px] overflow-hidden select-none cursor-grab active:cursor-grabbing"
          >
            {images.map((img, idx) => {
              let off = idx - activeIndex;
              if (off > total / 2) off -= total;
              if (off < -total / 2) off += total;

              const st = computeArcStyle(off + dragRatio);
              const isFront = off === 0;

              return (
                <div
                  key={img.src}
                  onClick={() => {
                    if (skipClickRef.current) return;
                    if (isFront) onOpenLightbox?.(images, idx, project.title);
                    else setActiveIndex(idx);
                  }}
                  style={{
                    transform: st.transform,
                    opacity: st.opacity,
                    zIndex: st.zIndex,
                    pointerEvents: st.interactive ? 'auto' : 'none',
                    transition:
                      isDragging || prefersReducedMotion
                        ? 'border-color 180ms ease-out'
                        : 'transform 460ms cubic-bezier(0.22, 1, 0.36, 1), opacity 340ms ease-out, border-color 220ms ease-out',
                  }}
                  className={`absolute inset-0 m-auto w-[76%] sm:w-[68%] md:w-[62%] max-w-[640px] h-[82%] rounded-[14px] overflow-hidden border bg-[var(--surface-1)] cursor-pointer shadow-[var(--surface-shadow)] ${
                    isDragging ? 'will-change-transform' : ''
                  } ${
                    isFront ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/30' : 'border-[var(--hairline-strong)]'
                  }`}
                >
                  <Image
                    src={getAssetPath(img.src)}
                    alt={img.title}
                    fill
                    sizes="(max-width:1024px) 90vw, 1200px"
                    unoptimized
                    priority={idx === 0}
                    className="object-cover object-top select-none pointer-events-none"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-1.5 overflow-x-auto max-w-full scrollbar-none pt-2 py-1">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs whitespace-nowrap border cursor-pointer transition-all ${
                  i === activeIndex
                    ? 'border-[var(--accent)] bg-[var(--surface-1)] text-[var(--text)] shadow-sm font-semibold'
                    : 'border-[var(--hairline)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--hairline-strong)]'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
                {i === activeIndex ? ` · ${img.title}` : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 pt-5 border-t border-[var(--hairline)] items-start">
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: EASE_GLIDE }}
                className="space-y-2"
              >
                <span className="font-mono text-xs text-[var(--accent)] tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[var(--text)]">{cur.title}</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {lang === 'vi' ? cur.captionVi : cur.captionEn}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {project.metricsList && (
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metricsList.map((m, i) => (
                <div key={i} className="border-t border-[var(--hairline)] pt-3">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)] tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </ScrollDepthWrapper>
  );
}
