'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  className = 'mb-14 md:mb-20',
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // GPU-only scroll parallax & hairline draw
  const watermarkY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const ruleScale = useTransform(scrollYProgress, [0, 0.35], [0.18, 1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Subtle scroll-linked watermark chapter numeral */}
      <motion.span
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: watermarkY }}
        className="pointer-events-none select-none hidden md:block absolute -top-10 -left-3 font-serif font-bold text-[8.5rem] leading-none tracking-tighter text-[var(--text)]/[0.04] will-change-transform"
      >
        {index}
      </motion.span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end pb-7">
        {/* Left: Chapter Index + Eyebrow + Display Title */}
        <div className="lg:col-span-7 space-y-3">
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

        {/* Right: Bottom-aligned Subtitle */}
        {subtitle && (
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
        )}
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
