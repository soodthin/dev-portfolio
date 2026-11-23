'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Check, Printer, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SaigonLiveClock } from '@/components/ui/SaigonLiveClock';

interface DepthStar {
  x: number;
  y: number;
  layer: 0 | 1 | 2;
  r: number;
  speed: number;
  phase: number;
  tealTint: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
}

/**
 * ContactSection — Deep Starfield Edition
 * Drop-in replacement for Next.js 16 static export (Obsidian + Teal, EN/VI, Dark/Light).
 * Features:
 * - 60FPS GPU-friendly Canvas 2D 3-layer Z-depth starfield with smooth cursor parallax inertia.
 * - Rare ambient 1px shooting stars + dual Teal meteor launch when clicking/copying email.
 * - Automatic IntersectionObserver pause when scrolled out of view & ResizeObserver scaling.
 * - Respects prefers-reduced-motion (renders static starfield and redraws on theme switch).
 */
export function ContactSection() {
  const { data, t, lang, theme } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Refs shared with the Canvas 2D loop (zero React re-renders on mousemove)
  const themeRef = useRef<'dark' | 'light'>(theme);
  const lockTargetRef = useRef<{ x: number; y: number } | null>(null);
  const spawnMeteorRef = useRef<((fromX?: number, fromY?: number) => void) | null>(null);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const meteorTimersRef = useRef<number[]>([]);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    // Immediately refresh static starfield palette when reduced motion is enabled
    if (prefersReducedMotion) {
      redrawStaticRef.current?.();
    }
  }, [theme, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      meteorTimersRef.current.forEach((id) => window.clearTimeout(id));
      meteorTimersRef.current = [];
    };
  }, []);

  // Scroll-kinetic horizontal glide on localized poster headline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const kineticGlideX = useTransform(scrollYProgress, [0, 1], [-32, 24]);

  // Mount Deep Starfield (3-Layer Z-Parallax & Meteors) Canvas 2D engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = stageRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let isInView = true;
    let time = 0;
    let nextMeteorAt = 1.6;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    let smoothNormX = 0;
    let smoothNormY = 0;

    let stars: DepthStar[] = [];
    let meteors: Meteor[] = [];

    const initStars = () => {
      const count = Math.min(115, Math.max(60, Math.floor((width * height) / 6200)));
      stars = Array.from({ length: count }, () => {
        const layer: 0 | 1 | 2 = Math.random() < 0.55 ? 0 : Math.random() < 0.78 ? 1 : 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          layer,
          r: layer === 0 ? 0.65 : layer === 1 ? 1.05 : 1.55,
          speed: layer === 0 ? 0.04 : layer === 1 ? 0.09 : 0.16,
          phase: Math.random() * Math.PI * 2,
          tealTint: layer === 2 && Math.random() < 0.5,
        };
      });
      meteors = [];
    };

    const spawnMeteor = (fromX?: number, fromY?: number) => {
      if (prefersReducedMotion || width === 0 || height === 0) return;
      const startX = typeof fromX === 'number' ? fromX : width * (0.35 + Math.random() * 0.6);
      const startY = typeof fromY === 'number' ? fromY : height * (0.05 + Math.random() * 0.35);
      // Calm diagonal trajectory downward-left
      const angle = Math.PI * (0.76 + Math.random() * 0.12);
      const speed = 7.5 + Math.random() * 3.5;

      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 75 + Math.random() * 55,
        life: 1,
      });
    };

    spawnMeteorRef.current = spawnMeteor;

    const parallaxStrength: readonly [number, number, number] = [6, 16, 32];

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const baseRgb = isDark ? '226, 232, 240' : '15, 23, 42';
      const accentRgb = isDark ? '45, 212, 191' : '13, 148, 136';

      const lock = lockTargetRef.current;
      const hasTarget = Boolean(lock || mouse.active);
      const targetX = lock ? lock.x : mouse.tx;
      const targetY = lock ? lock.y : mouse.ty;

      const targetNormX = hasTarget && width > 0 ? (targetX / width - 0.5) * 2 : 0;
      const targetNormY = hasTarget && height > 0 ? (targetY / height - 0.5) * 2 : 0;

      // Velvety inertia eases smoothly back to center when cursor leaves
      smoothNormX += (targetNormX - smoothNormX) * 0.06;
      smoothNormY += (targetNormY - smoothNormY) * 0.06;

      // Render 3 Z-depth parallax star layers
      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];

        if (!prefersReducedMotion) {
          st.x -= st.speed;
          if (st.x < -40) st.x = width + 40;
        }

        const p = parallaxStrength[st.layer];
        const px = st.x - smoothNormX * p;
        const py = st.y - smoothNormY * p;
        const tw = 0.5 + Math.sin(time * (1 + st.layer * 0.5) + st.phase) * 0.5;
        const baseAlpha = st.layer === 0 ? 0.16 : st.layer === 1 ? 0.32 : 0.55;
        const alpha = baseAlpha * (0.65 + tw * 0.35);

        ctx.beginPath();
        ctx.arc(px, py, st.r, 0, Math.PI * 2);
        ctx.fillStyle = st.tealTint
          ? `rgba(${accentRgb}, ${Math.min(0.95, alpha * 1.25)})`
          : `rgba(${baseRgb}, ${alpha})`;
        ctx.fill();
      }

      // Rare ambient shooting stars
      if (!prefersReducedMotion && time > nextMeteorAt) {
        spawnMeteor();
        nextMeteorAt = time + 3.2 + Math.random() * 3.8;
      }

      // Advance & draw active 1px shooting stars
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.022;

        if (m.life <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const norm = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / norm) * m.len;
        const tailY = m.y - (m.vy / norm) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${accentRgb}, ${m.life * 0.9})`);
        grad.addColorStop(0.35, `rgba(${baseRgb}, ${m.life * 0.35})`);
        grad.addColorStop(1, `rgba(${baseRgb}, 0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${m.life})`;
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

    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    const tick = () => {
      if (!isInView) {
        rafId = null;
        return;
      }
      drawFrame();
      time += 0.016;
      rafId = requestAnimationFrame(tick);
    };

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
      spawnMeteorRef.current = null;
      redrawStaticRef.current = null;
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion]);

  const triggerMeteorBurst = useCallback((clientX: number, clientY: number) => {
    const container = stageRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    spawnMeteorRef.current?.(relX + 90, Math.max(20, relY - 70));
    const timerId = window.setTimeout(() => {
      spawnMeteorRef.current?.(relX + 160, Math.max(12, relY - 110));
    }, 140);
    meteorTimersRef.current.push(timerId);
  }, []);

  const handleCopyEmail = async (e?: React.MouseEvent) => {
    if (e) {
      triggerMeteorBurst(e.clientX, e.clientY);
    }
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
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Clipboard blocked in restricted contexts
    }
  };

  const handleEmailHover = (e: React.MouseEvent<HTMLElement>) => {
    const container = stageRef.current;
    if (!container) return;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const wrapRect = container.getBoundingClientRect();
    lockTargetRef.current = {
      x: targetRect.left - wrapRect.left + targetRect.width * 0.4,
      y: targetRect.top - wrapRect.top + targetRect.height / 2,
    };
  };

  const handlePrintResume = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const posterHeadline = lang === 'vi' ? 'CÙNG XÂY DỰNG NHÉ.' : "LET'S BUILD TOGETHER.";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={stageRef}
          className="relative rounded-3xl border border-[var(--hairline)] bg-[var(--surface-1)]/40 p-6 sm:p-10 lg:p-14 overflow-hidden"
        >
          {/* Deep Starfield (3-Layer Z-Parallax & Meteors) Canvas Background */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none no-print"
          />

          <div className="relative z-10 space-y-12">
            {/* Top Index & Live Saigon Clock */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                <span className="font-mono tabular-nums">06</span>
                <span className="opacity-40">·</span>
                <span>{t.contact.eyebrow}</span>
              </div>

              <div className="no-print">
                <SaigonLiveClock />
              </div>
            </div>

            {/* Scroll-Kinetic Poster Headline */}
            <div className="space-y-5">
              <div className="overflow-hidden py-1">
                <motion.h2
                  style={prefersReducedMotion ? undefined : { x: kineticGlideX }}
                  className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-[-0.025em] text-[var(--text)] whitespace-nowrap uppercase select-none will-change-transform"
                >
                  {posterHeadline}
                </motion.h2>
              </div>

              {t.contact.subtitle && (
                <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
                  {t.contact.subtitle}
                </p>
              )}

              {/* Monumental Email with Sweeping Teal Underline */}
              <div className="pt-2">
                <div
                  onMouseEnter={handleEmailHover}
                  onMouseLeave={() => {
                    lockTargetRef.current = null;
                  }}
                  className="relative group inline-block max-w-full"
                >
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-left font-serif font-semibold text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-[var(--text)] hover:text-[var(--accent)] transition-colors break-all cursor-pointer"
                  >
                    {data.profile.email}
                  </button>
                  <span
                    aria-hidden="true"
                    className="block h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[var(--accent)] transition-transform duration-300 ease-out mt-2"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 no-print">
                <MagneticButton strength={0.2}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-sm font-semibold transition-all cursor-pointer min-w-[136px]"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedEmail ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Check size={15} strokeWidth={2} />
                          <span>{t.contact.emailCopied}</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Copy size={15} strokeWidth={1.75} />
                          <span>{t.contact.copyEmail}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <button
                    type="button"
                    onClick={handlePrintResume}
                    title={t.contact.printHint}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)]/90 hover:border-[var(--hairline-strong)] text-[var(--text)] text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Printer size={15} strokeWidth={1.75} className="text-[var(--accent)]" />
                    <span>{t.contact.printResume}</span>
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Clean Single-Row Social Channels */}
            <div className="pt-8 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-6 no-print">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {data.socials.map((soc) => {
                  const isExternal = soc.url.startsWith('http');
                  return (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-baseline gap-2 transition-colors"
                    >
                      <span className="font-serif font-semibold text-base sm:text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {soc.label}
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
                        {soc.handle}
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.75}
                        className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform self-center"
                      />
                    </a>
                  );
                })}
              </div>

              <span className="text-xs text-[var(--text-muted)] font-mono">
                {t.contact.saigonTime} · GMT+7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
