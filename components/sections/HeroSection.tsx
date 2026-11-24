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

/**
 * 3D Orbital Ellipses Canvas Effect split across 2 layers:
 * - Back Canvas (z < 0): orbital segments & satellites moving behind the circular avatar.
 * - Front Canvas (z >= 0): orbital segments & satellites cutting across in front of the avatar.
 */
function OrbitalEllipses3D({
  isDark,
  pointerOffset,
}: {
  isDark: boolean;
  pointerOffset: { x: number; y: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef(pointerOffset);

  useEffect(() => {
    pointerRef.current = pointerOffset;
  }, [pointerOffset]);

  useEffect(() => {
    const container = containerRef.current;
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!container || !backCanvas || !frontCanvas) return;

    const backCtx = backCanvas.getContext('2d');
    const frontCtx = frontCanvas.getContext('2d');
    if (!backCtx || !frontCtx) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let time = 0;
    let smoothX = 0;
    let smoothY = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isInView = true;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.round(rect.width * dpr);
      const nextH = Math.round(rect.height * dpr);
      if (backCanvas.width !== nextW || backCanvas.height !== nextH) {
        backCanvas.width = nextW;
        backCanvas.height = nextH;
        frontCanvas.width = nextW;
        frontCanvas.height = nextH;
      }
      width = rect.width;
      height = rect.height;
    };

    // 3D coordinate rotation: X -> Y -> Z order
    const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number, rz = 0) => {
      const cy1 = Math.cos(rx);
      const sy1 = Math.sin(rx);
      const y1 = y * cy1 - z * sy1;
      const z1 = y * sy1 + z * cy1;

      const cx2 = Math.cos(ry);
      const sx2 = Math.sin(ry);
      const x2 = x * cx2 + z1 * sx2;
      const z2 = -x * sx2 + z1 * cx2;

      if (!rz) return { x: x2, y: y1, z: z2 };

      const cz3 = Math.cos(rz);
      const sz3 = Math.sin(rz);
      return {
        x: x2 * cz3 - y1 * sz3,
        y: x2 * sz3 + y1 * cz3,
        z: z2,
      };
    };

    const rgbBase = isDark ? '243, 244, 246' : '17, 19, 24';
    const rgbAccent = isDark ? '45, 212, 191' : '10, 108, 101';

    const renderFrame = () => {
      syncSize();
      if (!width || !height) {
        if (!reducedMotion && isInView) rafId = requestAnimationFrame(renderFrame);
        return;
      }

      // Smooth pointer tilt interpolation
      smoothX += (pointerRef.current.x - smoothX) * 0.065;
      smoothY += (pointerRef.current.y - smoothY) * 0.065;

      backCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frontCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backCtx.clearRect(0, 0, width, height);
      frontCtx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.35;
      const fov = baseR * 5.2;

      // 3D to 2D perspective projection
      const project = (p: { x: number; y: number; z: number }) => {
        const scale = fov / Math.max(40, fov - p.z);
        return {
          x: cx + p.x * scale,
          y: cy + p.y * scale,
          z: p.z,
          scale,
        };
      };

      const drawDepthSegment = (
        p1: { x: number; y: number; z: number },
        p2: { x: number; y: number; z: number },
        maxR: number,
        minAlpha: number,
        maxAlpha: number,
        minWidth: number,
        maxWidth: number,
        isTeal = false
      ) => {
        const midZ = (p1.z + p2.z) * 0.5;
        const depthNorm = Math.max(0, Math.min(1, (midZ + maxR) / (maxR * 2)));
        const ctx = midZ >= 0 ? frontCtx : backCtx;
        const alpha = minAlpha + depthNorm * (maxAlpha - minAlpha);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = isTeal
          ? `rgba(${rgbAccent}, ${(alpha * 1.15).toFixed(3)})`
          : `rgba(${rgbBase}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = minWidth + depthNorm * (maxWidth - minWidth);
        ctx.stroke();
      };

      const drawDepthNode = (
        proj: { x: number; y: number; z: number; scale: number },
        maxR: number,
        radius: number,
        minAlpha = 0.35,
        maxAlpha = 0.98,
        isTeal = false
      ) => {
        const depthNorm = Math.max(0, Math.min(1, (proj.z + maxR) / (maxR * 2)));
        const ctx = proj.z >= 0 ? frontCtx : backCtx;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, radius * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = isTeal
          ? `rgba(${rgbAccent}, ${(minAlpha + depthNorm * (maxAlpha - minAlpha)).toFixed(3)})`
          : `rgba(${rgbBase}, ${(minAlpha + depthNorm * (maxAlpha - minAlpha)).toFixed(3)})`;
        ctx.fill();
      };

      // Configuration of the 3 3D elliptical orbits
      const orbits = [
        {
          rxR: baseR * 1.56,
          ryR: baseR * 1.12,
          rx: 1.16 + Math.sin(time * 0.4) * 0.08 + smoothY * 0.36,
          ry: time * 0.18 + smoothX * 0.45,
          rz: -0.22,
          satSpeed: 0.95,
          satOffset: 0.4,
          maxA: 0.68,
          isTeal: true,
        },
        {
          rxR: baseR * 1.48,
          ryR: baseR * 1.06,
          rx: -1.04 + Math.cos(time * 0.34) * 0.09 + smoothY * 0.32,
          ry: -time * 0.14 + 0.7 + smoothX * 0.38,
          rz: 0.36,
          satSpeed: -0.72,
          satOffset: 2.6,
          maxA: 0.48,
          isTeal: false,
        },
        {
          rxR: baseR * 1.32,
          ryR: baseR * 1.32,
          rx: 0.52 + smoothY * 0.28,
          ry: time * 0.1 + 1.4 + smoothX * 0.35,
          rz: -0.68,
          satSpeed: 0.56,
          satOffset: 4.5,
          maxA: 0.34,
          isTeal: false,
        },
      ];

      const segments = 90;

      orbits.forEach((orb, oIdx) => {
        const maxR = Math.max(orb.rxR, orb.ryR);
        const pts: Array<{ x: number; y: number; z: number; scale: number }> = [];

        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const rot = rotatePoint(
            Math.cos(a) * orb.rxR,
            Math.sin(a) * orb.ryR,
            0,
            orb.rx,
            orb.ry,
            orb.rz
          );
          pts.push(project(rot));
        }

        for (let i = 0; i < segments; i++) {
          drawDepthSegment(
            pts[i],
            pts[i + 1],
            maxR,
            0.06,
            orb.maxA,
            0.5,
            oIdx === 0 ? 1.35 : 0.95,
            orb.isTeal
          );
        }

        // Satellite & light tail trail
        const headAngle = time * orb.satSpeed + orb.satOffset;
        const tailSteps = 14;
        const tailSpan = 0.46;
        const dir = orb.satSpeed >= 0 ? 1 : -1;

        let prevP: { x: number; y: number; z: number; scale: number } | null = null;
        for (let s = 0; s <= tailSteps; s++) {
          const frac = s / tailSteps;
          const a = headAngle - dir * frac * tailSpan;
          const curP = project(
            rotatePoint(
              Math.cos(a) * orb.rxR,
              Math.sin(a) * orb.ryR,
              0,
              orb.rx,
              orb.ry,
              orb.rz
            )
          );

          if (prevP) {
            const fade = Math.pow(1 - frac, 1.8);
            const midZ = (prevP.z + curP.z) * 0.5;
            const depthNorm = Math.max(0, Math.min(1, (midZ + maxR) / (maxR * 2)));
            const ctx = midZ >= 0 ? frontCtx : backCtx;
            ctx.beginPath();
            ctx.moveTo(prevP.x, prevP.y);
            ctx.lineTo(curP.x, curP.y);
            ctx.strokeStyle = orb.isTeal
              ? `rgba(${rgbAccent}, ${(fade * (0.22 + depthNorm * 0.72) * 1.15).toFixed(3)})`
              : `rgba(${rgbBase}, ${(fade * (0.22 + depthNorm * 0.72)).toFixed(3)})`;
            ctx.lineWidth = (0.7 + fade * 1.45) * curP.scale;
            ctx.stroke();
          }

          if (s === 0) {
            drawDepthNode(curP, maxR, 2.8, 0.35, 0.98, orb.isTeal);
          }
          prevP = curP;
        }
      });

      if (!reducedMotion && isInView) {
        time += 0.016;
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const handleResize = () => {
      if (reducedMotion) renderFrame();
    };

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
        if (isInView && !reducedMotion && !rafId) {
          rafId = requestAnimationFrame(renderFrame);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    window.addEventListener('resize', handleResize);
    renderFrame();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDark]);

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas ref={backCanvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <canvas ref={frontCanvasRef} className="absolute inset-0 z-20 w-full h-full" />
    </div>
  );
}

export function HeroSection() {
  const { data, t, lang, theme, showToast } = usePortfolio();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const [bioOpen, setBioOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const avatarStageRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  const isDark = theme === 'dark';

  // Clean up clipboard feedback timer
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

  const handleStagePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = avatarStageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    });
  };

  const handleStagePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
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
      className="relative bg-[var(--bg)] min-h-[92vh] lg:min-h-[calc(100svh-4rem)] flex flex-col justify-start pt-20 sm:pt-24 pb-16 md:pb-20 border-b border-[var(--hairline)] overflow-x-clip"
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform w-full"
      >
        {/* ================================================================= */}
        {/* 1. ORBITAL 3D AVATAR + INTEGRATED DISPLAY NAME                    */}
        {/* ================================================================= */}
        <div
          ref={avatarStageRef}
          onMouseMove={handleStagePointerMove}
          onMouseLeave={handleStagePointerLeave}
          className="flex flex-col items-center overflow-x-clip pt-2 pb-6"
        >
          {/* Orbital Avatar Stage with Dual Canvas */}
          <div className="relative z-10 flex items-center justify-center w-full h-[310px] sm:h-[370px] md:h-[410px] max-w-[620px]">
            <OrbitalEllipses3D isDark={isDark} pointerOffset={pointerOffset} />

            {/* Static Sharp Circular Avatar Frame (No hover blur, no scale distortion) */}
            <div
              style={{
                boxShadow: isDark
                  ? '0 22px 50px -16px rgba(0, 0, 0, 0.85)'
                  : '0 22px 44px -18px rgba(17, 19, 24, 0.18)',
              }}
              className="relative z-10 w-[220px] h-[220px] sm:w-[264px] sm:h-[264px] md:w-[294px] md:h-[294px] rounded-full overflow-hidden border border-[var(--hairline-strong)] bg-[var(--surface-1)] select-none pointer-events-none"
            >
              {/* Avatar Image — Razor-sharp static framing */}
              <div className="relative w-full h-full">
                <Image
                  src={getAssetPath(data.profile.avatarUrl)}
                  alt={data.profile.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                  priority
                  unoptimized
                  className="w-full h-full object-cover object-[50%_80%] scale-[1.18] origin-[50%_72%]"
                />
              </div>

              {/* Bottom Gradient Fade blending with the background surface */}
              <div
                aria-hidden="true"
                style={{
                  background: 'linear-gradient(to top, var(--bg) 8%, transparent 52%)',
                }}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
              />

              {/* Inner Specular Rim Light */}
              <div
                aria-hidden="true"
                style={{
                  boxShadow: isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.22)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                className="pointer-events-none absolute inset-0 rounded-full"
              />
            </div>
          </div>

          {/* 2. Display Name Overlapping the Avatar Base for Depth Effect */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            style={{
              textShadow: isDark
                ? '0 4px 24px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.9)'
                : '0 4px 20px rgba(234, 239, 244, 0.9), 0 1px 3px rgba(255, 255, 255, 0.8)',
            }}
            className="relative z-30 -mt-[68px] sm:-mt-[90px] md:-mt-[110px] lg:-mt-[120px] text-center font-serif font-bold text-[40px] sm:text-[64px] md:text-[80px] lg:text-[86px] leading-[0.98] tracking-[-0.03em] px-2 text-[var(--text)] select-none"
          >
            {data.profile.name}
          </motion.h1>

          {/* 3. Hairline Divider */}
          <div
            className="w-full h-px mt-6 bg-[var(--hairline)]"
            role="separator"
          />

          {/* 4. Centered Role Headline */}
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
