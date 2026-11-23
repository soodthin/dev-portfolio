'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { getAssetPath } from '@/lib/asset';
import { RollingCounter } from '@/components/motion/RollingCounter';
import { MagneticButton } from '@/components/motion/MagneticButton';

interface SkyStar {
  x: number;
  y: number;
  r: number;
  depth: number;
  teal: boolean;
  alpha: number;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * HeroSection — Open Horizon Edition
 * Drop-in replacement for Next.js 16 static export (Obsidian + Teal, EN/VI, Dark/Light).
 * Features:
 * - Unboxed open layout with strict design tokens (no rounded cards, no glassmorphism, no eyebrows).
 * - Chamfered portrait aligned precisely to the bottom of the CTA row.
 * - Ultra-subtle sky starfield canvas synced to ContactSection Deep Starfield (auto-paused off-screen).
 * - Progressive disclosure for full background paragraphs & clean 4-metric strip without subscripts.
 */
export function HeroSection() {
  const { data, t, lang, theme, showToast } = usePortfolio();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const [bioOpen, setBioOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<'dark' | 'light'>(theme);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  // Keep canvas palette in sync with Dark/Light mode
  useEffect(() => {
    themeRef.current = theme;
    if (prefersReducedMotion) {
      redrawStaticRef.current?.();
    }
  }, [theme, prefersReducedMotion]);

  // Clean up clipboard feedback timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  // Subtle GPU-only scroll-out depth recede
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  // Ultra-subtle upper sky starfield tying Hero softly to Contact Deep Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let isInView = true;
    let stars: SkyStar[] = [];

    let targetNormX = 0;
    let targetNormY = 0;
    let smoothNormX = 0;
    let smoothNormY = 0;

    const initStars = () => {
      const count = Math.min(48, Math.max(24, Math.floor((width * height) / 24000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.65,
        r: Math.random() < 0.75 ? 0.8 : 1.3,
        depth: Math.random() < 0.6 ? 6 : 16,
        teal: Math.random() < 0.25,
        alpha: 0.14 + Math.random() * 0.28,
      }));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === 'dark';
      const baseRgb = isDark ? '226, 232, 240' : '15, 23, 42';
      const accentRgb = isDark ? '45, 212, 191' : '13, 148, 136';

      smoothNormX += (targetNormX - smoothNormX) * 0.05;
      smoothNormY += (targetNormY - smoothNormY) * 0.05;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const px = s.x - smoothNormX * s.depth;
        const py = s.y - smoothNormY * s.depth;
        // Fade softly toward lower half so typography remains unobstructed
        const fade = Math.max(0, 1 - py / Math.max(1, height * 0.72));

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.teal
          ? `rgba(${accentRgb}, ${s.alpha * fade * 1.2})`
          : `rgba(${baseRgb}, ${s.alpha * fade})`;
        ctx.fill();
      }
    };

    redrawStaticRef.current = drawFrame;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onMouseLeave = () => {
      targetNormX = 0;
      targetNormY = 0;
    };

    const tick = () => {
      if (!isInView) {
        rafId = null;
        return;
      }
      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    resize();

    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
        if (isInView && !prefersReducedMotion && rafId === null) {
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      redrawStaticRef.current = null;
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion]);

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.profile.email);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = data.profile.email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopiedEmail(true);
      showToast(
        lang === 'vi'
          ? `Đã sao chép ${data.profile.email} vào bộ nhớ tạm`
          : `Copied ${data.profile.email} to clipboard`
      );
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard access unavailable
    }
  };

  const roleHeadline =
    lang === 'vi'
      ? 'Kỹ sư Phần mềm & Tự động hóa FinTech'
      : 'Software Engineer & FinTech Automation';

  const readStoryLabel = lang === 'vi' ? 'Đọc thêm quá trình làm việc' : 'Read full background';
  const hideStoryLabel = lang === 'vi' ? 'Thu gọn' : 'Collapse background';

  return (
    <section
      id="summary"
      ref={sectionRef}
      className="relative bg-[var(--bg)] min-h-[92vh] lg:min-h-[calc(100svh-4rem)] flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-20 border-b border-[var(--hairline)] overflow-x-clip"
    >
      {/* Subtle Starfield Echo */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none no-print"
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        {/* Upper Open Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (8 cols): Display Scale + Statement + Actions */}
          <div className="lg:col-span-8 space-y-7">
            <div className="space-y-3">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="font-serif font-bold text-4xl sm:text-6xl lg:text-[5rem] tracking-[-0.025em] leading-[1.0] text-[var(--text)]"
                >
                  {data.profile.name}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
                  className="font-serif font-semibold text-2xl sm:text-3xl lg:text-[2.2rem] tracking-[-0.02em] text-[var(--accent)] leading-tight"
                >
                  {roleHeadline}
                </motion.p>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
              className="max-w-xl text-base sm:text-[17px] text-[var(--text-muted)] leading-[1.68]"
            >
              {data.profile.roleDescription}
            </motion.p>

            {/* Primary CTA + Direct Email Copy + Progressive Background Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1 no-print"
            >
              <MagneticButton strength={0.18}>
                <button
                  type="button"
                  onClick={() => scrollTo('#works', { offset: -64 })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-sm font-semibold transition-all duration-150 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <span>{t.hero.viewWork}</span>
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </button>
              </MagneticButton>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                aria-label={`Copy email ${data.profile.email}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copiedEmail ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-1.5 text-[var(--accent)] font-mono text-xs"
                    >
                      <Check size={14} strokeWidth={2} aria-hidden="true" />
                      <span>{t.contact.emailCopied}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {data.profile.email}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[var(--accent)] transition-transform duration-200 ease-out"
                />
              </button>

              {data.profile.aboutParagraphs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setBioOpen((prev) => !prev)}
                  aria-expanded={bioOpen}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  {bioOpen ? `${hideStoryLabel} −` : `${readStoryLabel} +`}
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column (4 cols): Chamfered Portrait Aligned with Left Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
            className="lg:col-span-4 flex flex-col lg:items-end lg:pt-1"
          >
            <div
              className="group relative w-64 sm:w-72 lg:w-[280px] xl:w-[295px] h-[295px] sm:h-[315px] lg:h-[322px] overflow-hidden bg-[var(--surface-2)] shadow-xl"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)',
              }}
            >
              <div className="relative w-full h-full scale-[1.16] origin-[50%_62%] transition-transform duration-300 ease-out group-hover:scale-[1.20]">
                <Image
                  src={getAssetPath(data.profile.avatarUrl)}
                  alt={data.profile.name}
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                  priority
                  unoptimized
                  className="object-cover object-[50%_85%]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Expandable Background (Spans all 12 cols, fully utilizing the space below the avatar) */}
        <AnimatePresence initial={false}>
          {bioOpen && data.profile.aboutParagraphs.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.42, ease: EASE_OUT },
                  opacity: { duration: 0.28, delay: 0.08, ease: 'easeOut' },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.32, ease: EASE_OUT },
                  opacity: { duration: 0.18, ease: 'easeIn' },
                },
              }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-8 border-t border-[var(--hairline)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
                {/* Left (8 cols): Two Detailed Narrative Paragraphs */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                  {data.profile.aboutParagraphs.map((para, idx) => (
                    <p key={idx} className="text-sm text-[var(--text-muted)] leading-[1.75]">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Right (4 cols): Utilizing the space directly beneath the avatar */}
                <div className="lg:col-span-4 space-y-5 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[var(--hairline)] pt-6 lg:pt-0">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] block mb-1">
                      {lang === 'vi' ? 'Học vấn & Đào tạo' : 'Academic Foundation'}
                    </span>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {data.education.degree}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {data.education.school}
                    </p>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] mt-1 opacity-70">
                      {data.education.period}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--hairline)]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] block mb-2">
                      {lang === 'vi' ? 'Trọng tâm kỹ thuật' : 'Core Focus & Stack'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'FastAPI',
                        'Spring Boot',
                        'FinTech Automation',
                        'AI OCR Pipelines',
                        'PostgreSQL',
                        'Redis',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--hairline)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Open Typographic Metrics Strip (Clean Figures Only — Zero Subscripts) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="mt-14 md:mt-16 pt-8 border-t border-[var(--hairline)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {data.metrics.map((metric, idx) => {
              const targetSection = idx < 2 ? '#experience' : '#works';
              return (
                <button
                  key={metric.label}
                  type="button"
                  onClick={() => scrollTo(targetSection, { offset: -64 })}
                  className="group text-left pb-2 border-b border-transparent hover:border-[var(--accent)] transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-semibold tabular-nums text-[var(--text)] tracking-tight">
                    <RollingCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-150 ease-out mt-1.5">
                    {metric.label}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
