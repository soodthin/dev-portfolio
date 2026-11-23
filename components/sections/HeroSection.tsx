'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { getAssetPath } from '@/lib/asset';
import { RollingCounter } from '@/components/motion/RollingCounter';
import { MagneticButton } from '@/components/motion/MagneticButton';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const { data, t, lang } = usePortfolio();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle GPU-only scroll-out depth recede
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const roleHeadline =
    lang === 'vi'
      ? 'Kỹ sư Phần mềm & Tự động hóa FinTech'
      : 'Software Engineer & FinTech Automation';

  return (
    <section
      id="summary"
      ref={sectionRef}
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { scale: contentScale, opacity: contentOpacity, y: contentY }
        }
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        {/* Status Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-7 mb-10 border-b border-[var(--hairline)]">
          <div className="inline-flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="font-medium tracking-wide">{data.profile.statusText}</span>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
            {data.profile.location}
          </span>
        </div>

        {/* Main Hero Row: Balanced Height Between Headline+Lead and Circular Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2.5">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                  className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.025em] text-[var(--text)] leading-[1.03]"
                >
                  {data.profile.name}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
                  className="font-serif font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] text-[var(--accent)] leading-tight"
                >
                  {roleHeadline}
                </motion.p>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="max-w-2xl text-base sm:text-lg text-[var(--text)]/90 font-normal leading-relaxed"
            >
              {data.profile.roleDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE_OUT_EXPO }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <MagneticButton strength={0.2}>
                <button
                  onClick={() => scrollTo('#works')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-sm font-semibold transition-all cursor-pointer"
                >
                  <span>{t.hero.viewWork}</span>
                  <ArrowRight size={15} strokeWidth={2} />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>{t.hero.contactMe}</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Circular Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE_OUT_EXPO }}
            className="lg:col-span-4 flex justify-start lg:justify-end"
          >
            <div className="group p-1.5 rounded-full ring-1 ring-[var(--hairline)] hover:ring-[var(--hairline-strong)] bg-[var(--surface-1)] transition-all duration-300 ease-out">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden ring-1 ring-[var(--hairline)] bg-[var(--surface-2)]">
                <div className="relative w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                  <Image
                    src={getAssetPath(data.profile.avatarUrl)}
                    alt={data.profile.name}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                    priority
                    unoptimized
                    className="object-cover object-[50%_70%] scale-[1.2]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2-Column Editorial Bio Strip: Preserves 100% of aboutParagraphs without wall-of-text */}
        {data.profile.aboutParagraphs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: EASE_OUT_EXPO }}
            className="mt-14 pt-8 border-t border-[var(--hairline)] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12"
          >
            {data.profile.aboutParagraphs.map((para, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="font-mono text-xs tabular-nums text-[var(--accent)] pt-1 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{para}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Clean Horizontal divide-x Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-12 pt-10 border-t border-[var(--hairline)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--hairline)]">
            {data.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="py-5 lg:py-0 lg:px-7 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-2"
              >
                <div className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text)] tracking-tight tabular-nums">
                  <RollingCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--text)]">{metric.label}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
