'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Check, Printer, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { siGithub } from 'simple-icons';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SaigonLiveClock } from '@/components/ui/SaigonLiveClock';
import { ScrollDepthWrapper } from '@/components/motion/ScrollDepthWrapper';

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

function LinkedInIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}

function GitHubIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case 'linkedin':
      return <LinkedInIcon size={16} className="shrink-0" />;
    case 'github':
      return <GitHubIcon size={16} className="shrink-0" />;
    case 'email':
      return <Mail size={16} strokeWidth={1.75} className="shrink-0" />;
    case 'phone':
      return <Phone size={16} strokeWidth={1.75} className="shrink-0" />;
    default:
      return null;
  }
}

/**
 * ContactSection — Full-Width Deep Starfield Edition
 * Drop-in replacement for Next.js 16 static export (Obsidian + Teal, EN/VI, Dark/Light).
 * Features:
 * - Edge-to-edge full width and viewport height deep starfield canvas.
 * - 60FPS GPU-friendly Canvas 2D 3-layer Z-depth starfield with cursor parallax inertia.
 * - Ambient shooting stars + dual Teal meteor launch on email copy/click.
 * - Unified inline action & channel dock: Copy Email + Print Resume | LinkedIn + GitHub + Email + Phone.
 * - Live Ho Chi Minh City / GMT+7 clock in the top bar.
 */
export function ContactSection() {
  const { data, t, lang, theme, showToast } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Shared refs for the Canvas 2D animation loop (zero React re-renders on mousemove)
  const themeRef = useRef<'dark' | 'light'>(theme);
  const spawnMeteorRef = useRef<((fromX?: number, fromY?: number) => void) | null>(null);
  const redrawStaticRef = useRef<(() => void) | null>(null);
  const meteorTimersRef = useRef<number[]>([]);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    themeRef.current = theme;
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
  const kineticGlideX = useTransform(scrollYProgress, [0, 1], [-20, 16]);

  // Mount Full-Width Deep Starfield (3-Layer Z-Parallax & Meteors) Canvas 2D engine
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
    let time = 0;
    let nextMeteorAt = 1.6;

    const mouse = { tx: 0, ty: 0, active: false };
    let smoothNormX = 0;
    let smoothNormY = 0;

    let stars: DepthStar[] = [];
    let meteors: Meteor[] = [];

    const initStars = () => {
      const count = Math.min(160, Math.max(75, Math.floor((width * height) / 7500)));
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
      const baseRgb = isDark ? '226, 232, 240' : '13, 21, 29';
      const accentRgb = isDark ? '45, 212, 191' : '10, 108, 101';

      const hasTarget = mouse.active;
      const targetX = mouse.tx;
      const targetY = mouse.ty;

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
    const container = sectionRef.current;
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
      showToast(
        lang === 'vi'
          ? `Đã sao chép ${data.profile.email} vào bộ nhớ tạm`
          : `Copied ${data.profile.email} to clipboard`
      );
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Clipboard blocked in restricted contexts
    }
  };

  const handlePrintResume = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const posterHeadline =
    lang === 'vi' ? (
      <>
        SẴN SÀNG KIẾN TẠO <br className="hidden sm:inline" />
        ĐỘT PHÁ MỚI.
      </>
    ) : (
      <>
        READY TO ARCHITECT <br className="hidden sm:inline" />
        WHAT&apos;S NEXT.
      </>
    );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[var(--bg-alt)] chapter-divider-sheen min-h-[75vh] lg:min-h-[85vh] w-full flex flex-col justify-between pt-20 pb-16 md:pt-28 md:pb-24 border-t border-[var(--hairline)] overflow-x-clip"
    >
      {/* Full-Width Deep Starfield (3-Layer Z-Parallax & Meteors) Canvas Background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none no-print"
      />

      <ScrollDepthWrapper sectionId="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-12 md:gap-16">
        {/* Top Bar: Chapter Index & Live Ho Chi Minh City Clock */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--hairline)]">
          <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
            <span className="font-mono tabular-nums">06</span>
            <span className="opacity-40">·</span>
            <span>{t.contact.eyebrow}</span>
          </div>

          <div className="no-print">
            <SaigonLiveClock />
          </div>
        </div>

        {/* Center: Scroll-Kinetic Poster Headline & Unified Actions/Channels Row */}
        <div className="space-y-8 my-auto py-8">
          <div className="py-1">
            <motion.h2
              style={prefersReducedMotion ? undefined : { x: kineticGlideX }}
              className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] tracking-[-0.025em] text-[var(--text)] uppercase select-none will-change-transform leading-[1.06] text-balance max-w-5xl"
            >
              {posterHeadline}
            </motion.h2>
          </div>

          {t.contact.subtitle && (
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
              {t.contact.subtitle}
            </p>
          )}

          {/* Unified Horizontal Action Bar: Copy Email + Print Resume | LinkedIn + GitHub + Email + Phone */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-4 sm:pt-6 no-print">
            {/* Primary Action: Copy Email */}
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-[var(--accent)]/10 min-w-[144px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copiedEmail ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check size={16} strokeWidth={2.5} />
                      <span>{t.contact.emailCopied}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Copy size={16} strokeWidth={1.75} />
                      <span>{t.contact.copyEmail}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </MagneticButton>

            {/* Secondary Action: Print / Save Resume */}
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={handlePrintResume}
                title={t.contact.printHint}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)]/90 hover:border-[var(--hairline-strong)] text-[var(--text)] text-sm font-medium transition-colors cursor-pointer"
              >
                <Printer size={16} strokeWidth={1.75} className="text-[var(--accent)]" />
                <span>{t.contact.printResume}</span>
              </button>
            </MagneticButton>

            {/* Vertical Divider "|" with Generous Spacing */}
            <span
              className="hidden md:inline-block h-7 w-px bg-[var(--hairline-strong)] opacity-60 mx-2 lg:mx-3"
              aria-hidden="true"
            />

            {/* Direct Social Channels (LinkedIn, GitHub, Email, Phone) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
              {data.socials.map((soc) => {
                const isExternal = soc.url.startsWith('http');
                return (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)]/75 hover:bg-[var(--surface-2)] hover:border-[var(--accent)] text-[var(--text)] text-sm font-medium transition-all duration-200"
                    title={`${soc.label}: ${soc.handle}`}
                  >
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:scale-110 transition-all">
                      {getSocialIcon(soc.label)}
                    </span>
                    <span className="font-serif font-semibold text-sm group-hover:text-[var(--accent)] transition-colors">
                      {soc.label}
                    </span>
                    {isExternal && (
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.75}
                        className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollDepthWrapper>
    </section>
  );
}
