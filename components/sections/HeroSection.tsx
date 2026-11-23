'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { getAssetPath } from '@/lib/asset';
import { RollingCounter } from '@/components/motion/RollingCounter';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRightIcon } from '@/components/ui/Icons';

export function HeroSection() {
  const { data, t, lang } = usePortfolio();
  const { scrollTo } = useSmoothScroll();

  // Mouse 3D tilt physics for editorial portrait
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 20,
    stiffness: 120,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 20,
    stiffness: 120,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll parallax for portrait
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Staggered title lines for Curtain Split-Line Masked Rise
  const titleLine1 = data.profile.name.toUpperCase();
  const titleLine2 = lang === 'vi' ? 'Kỹ sư Phần mềm &' : 'Software Engineer &';
  const titleLine3 = lang === 'vi' ? 'Tự động hóa FinTech' : 'FinTech Automation';

  return (
    <section
      id="summary"
      ref={containerRef}
      className="relative min-h-[92vh] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[var(--hairline)] flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Editorial Eyebrow & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--hairline)]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
              01
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Calm Status Indicator (Anti-AI-Slop: No neon ping) */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="tracking-wide">{data.profile.statusText}</span>
          </div>
        </div>

        {/* Main Swiss Magazine Cover Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Curtain Split-Line Masked Rise + Manifesto (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Title Choreography: Curtain Split-Line Rise */}
            <div className="space-y-1 mb-8">
              {/* Line 1: Name */}
              <div className="overflow-hidden py-0.5">
                <motion.h1
                  initial={{ y: '110%', rotate: 1.5, opacity: 0 }}
                  animate={{ y: '0%', rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[var(--text)] leading-[0.95]"
                >
                  {titleLine1}
                </motion.h1>
              </div>

              {/* Line 2: Role Blend (Sans + Newsreader Italic) */}
              <div className="overflow-hidden py-1">
                <motion.div
                  initial={{ y: '110%', rotate: 1.5, opacity: 0 }}
                  animate={{ y: '0%', rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[var(--text)] leading-tight"
                >
                  <span className="font-sans font-semibold text-[var(--text)]">{titleLine2} </span>
                  <span className="font-serif italic font-normal text-[var(--accent)]">
                    {titleLine3}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Sub-headline & Bio Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 max-w-2xl text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8"
            >
              <p className="font-sans text-[var(--text)] font-medium text-lg sm:text-xl leading-snug">
                {data.profile.roleDescription}
              </p>
              {data.profile.aboutParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton>
                <button
                  onClick={() => scrollTo('#works')}
                  className="flex items-center gap-2.5 px-6 py-3 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <span>{t.hero.viewWork}</span>
                  <ArrowRightIcon size={14} />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="flex items-center gap-2 px-6 py-3 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] font-mono text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  <span>{t.hero.contactMe}</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                y: portraitParallaxY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] p-3 border border-[var(--hairline)] bg-[var(--surface-1)] shadow-2xl transition-shadow duration-300 group"
            >
              {/* Inner Frame */}
              <div className="relative w-full h-full overflow-hidden border border-[var(--hairline)] bg-[var(--surface-2)]">
                <Image
                  src={getAssetPath(data.profile.avatarUrl)}
                  alt={data.profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                  priority
                  unoptimized
                  className="object-cover object-center filter grayscale-[15%] contrast-[105%] group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay at base for editorial typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Frame Monogram & Location Caption */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 font-mono text-[11px] pointer-events-none">
                  <span className="tracking-widest uppercase font-semibold">SAIGON // VN</span>
                  <span className="opacity-75">10.8231° N, 106.6297° E</span>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[var(--accent)]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[var(--accent)]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[var(--accent)]" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[var(--accent)]" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Asymmetric Impact Strip (Odometer Counter) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 pt-8 border-t border-[var(--hairline)]"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
              {"// "}{t.hero.metricsCaption}
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              Audited Production Data
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {data.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--accent)] transition-colors flex flex-col justify-between"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-[var(--text)] tracking-tight mb-2">
                  <RollingCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-xs sm:text-sm text-[var(--text)] mb-1">
                    {metric.label}
                  </h4>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
