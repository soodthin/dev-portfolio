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

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Radial alpha mask oval mềm mại hòa biên mượt vào nền [var(--bg)], mở rộng không gian và triệt tiêu hoàn toàn góc vuông
const SOFT_EDGE_MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage:
    'radial-gradient(ellipse 49% 49% at 50% 45%, #000 64%, rgba(0, 0, 0, 0.45) 86%, transparent 100%)',
  maskImage:
    'radial-gradient(ellipse 49% 49% at 50% 45%, #000 64%, rgba(0, 0, 0, 0.45) 86%, transparent 100%)',
};

const LOUPE_RADIUS_PX = 66;

function FramelessOrbitEclipseAvatar({
  avatarSrc,
  name,
  reducedMotion,
  isDark,
}: {
  avatarSrc: string;
  name: string;
  reducedMotion: boolean;
  isDark: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const focusLayerRef = useRef<HTMLDivElement>(null);
  const radiusTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (radiusTimerRef.current !== null) window.clearTimeout(radiusTimerRef.current);
    };
  }, []);

  const updateAperture = (clientX: number, clientY: number, animateRadius: boolean) => {
    if (reducedMotion) return;
    const stage = stageRef.current;
    const focusLayer = focusLayerRef.current;
    if (!stage || !focusLayer) return;

    const rect = stage.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    if (animateRadius) {
      focusLayer.style.transition = 'clip-path 180ms ease-out';
      if (radiusTimerRef.current !== null) window.clearTimeout(radiusTimerRef.current);
      radiusTimerRef.current = window.setTimeout(() => {
        if (focusLayerRef.current) focusLayerRef.current.style.transition = 'none';
      }, 200);
    }

    stage.style.setProperty('--lx', `${x.toFixed(1)}px`);
    stage.style.setProperty('--ly', `${y.toFixed(1)}px`);
    stage.style.setProperty('--lr', `${LOUPE_RADIUS_PX}px`);
    stage.style.setProperty('--lo', '1');
  };

  const closeAperture = () => {
    const stage = stageRef.current;
    const focusLayer = focusLayerRef.current;
    if (!stage || !focusLayer) return;

    if (radiusTimerRef.current !== null) window.clearTimeout(radiusTimerRef.current);
    focusLayer.style.transition = 'clip-path 180ms ease-out';
    stage.style.setProperty('--lr', '0px');
    stage.style.setProperty('--lo', '0');
  };

  const initialVars = {
    '--lx': '50%',
    '--ly': '45%',
    '--lr': '0px',
    '--lo': '0',
    ...(isDark
      ? {}
      : {
          boxShadow:
            '0 24px 60px -12px rgba(13, 21, 29, 0.12), 0 2px 6px rgba(13, 21, 29, 0.04)',
        }),
  } as React.CSSProperties;

  return (
    <div
      ref={stageRef}
      style={initialVars}
      onMouseEnter={(e) => updateAperture(e.clientX, e.clientY, true)}
      onMouseMove={(e) => updateAperture(e.clientX, e.clientY, false)}
      onMouseLeave={closeAperture}
      onTouchStart={(e) => {
        if (e.touches[0]) updateAperture(e.touches[0].clientX, e.touches[0].clientY, true);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) updateAperture(e.touches[0].clientX, e.touches[0].clientY, false);
      }}
      onTouchEnd={closeAperture}
      className={`relative z-10 w-[280px] h-[300px] sm:w-[330px] sm:h-[345px] md:w-[370px] md:h-[370px] lg:w-[390px] lg:h-[380px] rounded-full cursor-default select-none transition-shadow duration-200 ${
        isDark
          ? 'overflow-visible bg-transparent border-0'
          : 'overflow-hidden bg-transparent border-0'
      }`}
    >
      {/* 1. Lớp chân dung gốc: Dark Mode hòa biên mềm, Light Mode sắc nét chuẩn khung oval */}
      <div
        style={isDark ? SOFT_EDGE_MASK_STYLE : undefined}
        className={`relative w-full h-full rounded-full overflow-hidden pointer-events-none ${
          reducedMotion
            ? ''
            : isDark
            ? 'brightness-[0.86] saturate-[0.92] transition-[filter] duration-150 ease-out'
            : 'brightness-[0.98] saturate-[1.0] transition-[filter] duration-150 ease-out'
        }`}
      >
        <Image
          src={avatarSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 390px"
          priority
          unoptimized
          className="w-full h-full object-cover object-[50%_78%] scale-[1.14] origin-[50%_72%]"
        />
      </div>

      {/* 2. Lớp trong khẩu độ: Lấy nét sáng & phóng nhẹ 1.04x đúng tâm con trỏ */}
      {!reducedMotion && (
        <div
          ref={focusLayerRef}
          aria-hidden="true"
          style={{
            clipPath: 'circle(var(--lr) at var(--lx) var(--ly))',
            willChange: 'clip-path',
          }}
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
        >
          <div
            style={{
              ...(isDark ? SOFT_EDGE_MASK_STYLE : {}),
              transformOrigin: 'var(--lx) var(--ly)',
              transform: 'scale(1.04)',
            }}
            className="relative w-full h-full rounded-full brightness-[1.06] saturate-[1.06] contrast-[1.04]"
          >
            <Image
              src={avatarSrc}
              alt=""
              fill
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 390px"
              unoptimized
              className="w-full h-full object-cover object-[50%_78%] scale-[1.14] origin-[50%_72%]"
            />
          </div>
        </div>
      )}

      {/* 3. Vành kính lúp trong suốt quang học */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          style={{
            left: 'var(--lx)',
            top: 'var(--ly)',
            width: 'calc(var(--lr) * 2)',
            height: 'calc(var(--lr) * 2)',
            opacity: 'var(--lo)',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top, width, height, opacity',
            boxShadow: isDark
              ? '0 10px 32px -6px rgba(0, 0, 0, 0.55), inset 0 1.5px 2px rgba(255, 255, 255, 0.35), inset 0 -1.5px 2px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.15)'
              : '0 8px 24px -4px rgba(13, 21, 29, 0.22), inset 0 1.5px 2px rgba(255, 255, 255, 0.85), inset 0 -1.5px 2px rgba(13, 21, 29, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7)',
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.18)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.65)',
          }}
          className="pointer-events-none absolute z-20 rounded-full transition-[width,height,opacity] duration-150 ease-out overflow-hidden"
        >
          {/* Vệt phản quang ánh sáng tự nhiên trên mặt kính cong */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 45%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 50%)',
            }}
          />
        </div>
      )}

      {/* 4. Hòa tan mép dưới vào nền trang (chỉ dùng cho Dark Mode để hòa vào nền obsidian) */}
      {isDark && (
        <div
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to top, var(--bg) 14%, transparent 56%)',
          }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 rounded-b-full"
        />
      )}
    </div>
  );
}

export function HeroSection() {
  const { data, t, lang, theme, showToast } = usePortfolio();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const [bioOpen, setBioOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<number | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 24]);

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
  const readStoryLabel = lang === 'vi' ? 'Tiểu sử' : 'Background';

  return (
    <section
      id="summary"
      ref={sectionRef}
      className="relative bg-[var(--bg)] min-h-[92vh] lg:min-h-[calc(100svh-4rem)] flex flex-col justify-start pt-16 sm:pt-20 pb-16 md:pb-20 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform w-full"
      >
        <div className="flex flex-col items-center pt-2 pb-6">
          <FramelessOrbitEclipseAvatar
            avatarSrc={getAssetPath(data.profile.avatarUrl)}
            name={data.profile.name}
            reducedMotion={Boolean(prefersReducedMotion)}
            isDark={isDark}
          />

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            style={{
              textShadow: isDark
                ? '0 4px 24px rgba(0, 0, 0, 0.72), 0 1px 3px rgba(0, 0, 0, 0.85)'
                : '0 0 1.5px rgba(255, 255, 255, 1), 0 2px 8px rgba(255, 255, 255, 0.95), 0 8px 24px rgba(234, 239, 244, 0.9)',
            }}
            className="relative z-30 -mt-[52px] sm:-mt-[70px] md:-mt-[82px] lg:-mt-[92px] text-center font-serif font-bold text-[40px] sm:text-[64px] md:text-[80px] lg:text-[86px] leading-[0.98] tracking-[-0.03em] px-2 text-[var(--text)] select-none"
          >
            {data.profile.name}
          </motion.h1>

          <div className="w-full h-px mt-6 bg-[var(--hairline)]" role="separator" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
            className="mt-4 sm:mt-5 text-center text-base sm:text-xl font-medium tracking-[-0.01em] text-[var(--text-muted)]"
          >
            {roleHeadline}
          </motion.p>
        </div>

        {/* ================================================================= */}
        {/* 2. EDITORIAL STATEMENT & ACTIONS (FULL WIDTH)                     */}
        {/* ================================================================= */}
        <div className="py-10 sm:py-12 border-t border-[var(--hairline)] w-full">
          <p className="text-base sm:text-lg lg:text-[19px] text-[var(--text-muted)] leading-[1.75] w-full">
            {lang === 'vi' ? (
              <>
                Kỹ sư Khoa học Máy tính năm cuối chuyên sâu về{' '}
                <strong className="font-semibold text-[var(--text)]">hệ thống full-stack</strong>,{' '}
                <strong className="font-semibold text-[var(--text)]">đường ống tự động hóa tài chính</strong> và{' '}
                <strong className="font-semibold text-[var(--text)]">backend RESTful chịu tải cao</strong>.
                Thành thạo Java, Python, TypeScript, Spring Boot, FastAPI và React.
              </>
            ) : (
              <>
                Final-year Computer Science engineer specializing in{' '}
                <strong className="font-semibold text-[var(--text)]">full-stack systems</strong>,{' '}
                <strong className="font-semibold text-[var(--text)]">automated financial pipelines</strong>, and{' '}
                <strong className="font-semibold text-[var(--text)]">high-concurrency RESTful backends</strong>.
                Experienced with Java, Python, TypeScript, Spring Boot, FastAPI, and React.
              </>
            )}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 pt-1 no-print">
            <MagneticButton strength={0.18}>
              <button
                type="button"
                onClick={() => scrollTo('#experience', { offset: -64 })}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-md bg-[var(--text)] text-[var(--bg)] hover:opacity-90 text-sm font-semibold transition-opacity duration-150 cursor-pointer"
              >
                <span>{lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience'}</span>
                <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </MagneticButton>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] underline decoration-transparent hover:decoration-current underline-offset-4 transition-colors duration-150 cursor-pointer"
              title={lang === 'vi' ? 'Sao chép email' : 'Copy email address'}
            >
              <span>{data.profile.email}</span>
              {copiedEmail && (
                <span className="inline-flex items-center gap-1 text-[var(--accent)] font-mono text-xs">
                  <Check size={13} strokeWidth={2} />
                  <span>({t.contact.emailCopied})</span>
                </span>
              )}
            </button>

            {data.profile.aboutParagraphs.length > 0 && (
              <button
                type="button"
                onClick={() => setBioOpen((prev) => !prev)}
                aria-expanded={bioOpen}
                className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer"
              >
                <span>{readStoryLabel}</span>
                <span aria-hidden="true" className="font-mono">{bioOpen ? '−' : '+'}</span>
              </button>
            )}
          </div>

          {/* Expandable Background Story */}
          <AnimatePresence initial={false}>
            {bioOpen && data.profile.aboutParagraphs.length > 0 && (
              <motion.div
                key="bio-expandable-wrapper"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: {
                      duration: prefersReducedMotion ? 0 : 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: {
                      duration: prefersReducedMotion ? 0 : 0.28,
                      delay: prefersReducedMotion ? 0 : 0.04,
                      ease: 'easeOut',
                    },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      duration: prefersReducedMotion ? 0 : 0.32,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: {
                      duration: prefersReducedMotion ? 0 : 0.2,
                      ease: 'easeOut',
                    },
                  },
                }}
                className="overflow-hidden"
              >
                <div className="pt-8">
                  <div className="pt-6 border-t border-[var(--hairline)] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                    {data.profile.aboutParagraphs.map((para, idx) => (
                      <p key={idx} className="text-sm text-[var(--text-muted)] leading-[1.75]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================================= */}
        {/* 3. KEY METRICS STRIP (SWISS GRID)                                 */}
        {/* ================================================================= */}
        <div
          aria-label="Key metrics"
          className="border-t border-[var(--hairline)] py-10 sm:py-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {data.metrics.map((item, index) => {
              const targetSection = index < 2 ? '#experience' : '#works';
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollTo(targetSection, { offset: -64 })}
                  className={`text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${
                    index > 0 ? 'md:border-l md:pl-8 border-[var(--hairline)]' : ''
                  } ${
                    index % 2 === 1 ? 'border-l pl-6 md:pl-8 border-[var(--hairline)]' : 'pr-4'
                  }`}
                >
                  <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    <RollingCounter value={item.value} suffix={item.suffix} />
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
