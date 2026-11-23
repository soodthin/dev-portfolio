'use client';

import React, { useState, useRef } from 'react';
import { Copy, Check, Printer, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SaigonLiveClock } from '@/components/ui/SaigonLiveClock';

export function ContactSection() {
  const { data, t, lang } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const kineticGlideX = useTransform(scrollYProgress, [0, 1], [-32, 24]);

  const handleCopyEmail = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(data.profile.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
      }
    } catch {
      // Clipboard fallback ignored
    }
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
      className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent)] mb-5">
          {t.contact.eyebrow}
        </p>

        {/* Scroll-Kinetic Horizontal Glide on Localized Poster Headline */}
        <div className="overflow-hidden py-2 mb-12 md:mb-16">
          <motion.h2
            style={prefersReducedMotion ? undefined : { x: kineticGlideX }}
            className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.02em] text-[var(--text)] whitespace-nowrap uppercase select-none will-change-transform"
          >
            {posterHeadline}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Email with Sweeping Teal Underline + Copy & Print */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              {t.contact.subtitle && (
                <p className="text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
                  {t.contact.subtitle}
                </p>
              )}

              <div className="relative group inline-block max-w-full">
                <a
                  href={`mailto:${data.profile.email}`}
                  className="font-serif font-semibold text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-[var(--text)] hover:text-[var(--accent)] transition-colors break-all"
                >
                  {data.profile.email}
                </a>
                <span
                  aria-hidden="true"
                  className="block h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 bg-[var(--accent)] transition-transform duration-300 ease-out mt-2"
                />
              </div>
            </div>

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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] text-sm font-medium transition-colors cursor-pointer"
                >
                  <Printer size={15} strokeWidth={1.75} className="text-[var(--accent)]" />
                  <span>{t.contact.printResume}</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column (5 cols): Full-Width Hairline Social Rows & Saigon Live Clock */}
          <div className="lg:col-span-5 space-y-8 no-print">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] pb-3 border-b border-[var(--hairline)]">
                {t.contact.networkTitle}
              </h3>

              <div className="divide-y divide-[var(--hairline)] border-b border-[var(--hairline)]">
                {data.socials.map((soc) => {
                  const isExternal = soc.url.startsWith('http');
                  return (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between py-4 transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif font-semibold text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {soc.label}
                        </span>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {soc.handle}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[var(--text)] block">
                  {t.contact.saigonTime}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  Vietnam Standard Time (GMT+7)
                </span>
              </div>
              <SaigonLiveClock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
