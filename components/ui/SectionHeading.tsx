'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  rightElement,
  className = 'mb-14 md:mb-20',
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // GPU-only scroll hairline draw
  const ruleScale = useTransform(scrollYProgress, [0, 0.35], [0.18, 1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end pb-5 sm:pb-6">
        {/* Left: Chapter Index + Eyebrow + Display Title */}
        <div className={rightElement ? 'lg:col-span-5 xl:col-span-4 space-y-3' : 'lg:col-span-7 space-y-3'}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tabular-nums font-semibold text-[var(--accent)]">
              {index}
            </span>
            <span className="h-px w-6 bg-[var(--hairline-strong)]" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {eyebrow}
            </span>
          </div>

          <div className="overflow-hidden py-0.5">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className="font-serif font-semibold text-3xl sm:text-5xl md:text-[3.5rem] tracking-[-0.025em] text-[var(--text)] leading-[1.06]"
            >
              {title}
            </motion.h2>
          </div>
        </div>

        {/* Right: Custom Element (e.g. Filters) or Subtitle */}
        {rightElement ? (
          <div className="lg:col-span-7 xl:col-span-8 lg:flex lg:justify-end pb-1">
            {rightElement}
          </div>
        ) : subtitle ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 lg:text-right"
          >
            <div className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed lg:ml-auto lg:max-w-md">
              {subtitle}
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* Scroll-linked GPU hairline divider */}
      <div className="relative h-px w-full bg-[var(--hairline)] overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? { scaleX: 1 } : { scaleX: ruleScale }}
          className="h-full w-full origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--hairline-strong)] to-transparent will-change-transform"
        />
      </div>
    </div>
  );
}
