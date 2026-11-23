'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import {
  CopyIcon,
  CheckIcon,
  PrinterIcon,
} from '@/components/ui/Icons';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { SaigonLiveClock } from '@/components/ui/SaigonLiveClock';

export function ContactSection() {
  const { data, t, lang } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll-linked kinetic drift for monumental poster headline
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const kineticDriftX = useTransform(scrollYProgress, [0, 1], [-40, 20]);

  const handleCopyEmail = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(data.profile.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const handlePrintResume = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const posterHeadline = lang === 'vi' ? "LET'S BUILD TOGETHER." : "LET'S BUILD TOGETHER.";

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
            06
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {t.contact.eyebrow}
          </span>
        </div>

        {/* Title Choreography: Scroll-Linked Kinetic Drift */}
        <div className="overflow-hidden py-2 mb-12 md:mb-16">
          <motion.h2
            style={{ x: kineticDriftX }}
            className="font-serif font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-[var(--text)] whitespace-nowrap uppercase opacity-90 select-none"
          >
            {posterHeadline}
          </motion.h2>
        </div>

        {/* Main Swiss Poster Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Massive Email, Copy Button & Print Resume */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                {"// "}{t.contact.subtitle}
              </p>

              {/* Massive Email Display with Sweeping Kinetic Underline */}
              <div className="relative group inline-block max-w-full">
                <a
                  href={`mailto:${data.profile.email}`}
                  className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[var(--text)] tracking-tight hover:text-[var(--accent)] transition-colors break-all"
                >
                  {data.profile.email}
                </a>
                <span className="block h-[2px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full mt-2" />
              </div>
            </div>

            {/* Action Buttons: Copy Email & Print Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-2 no-print">
              {/* Copy Email Button with AnimatePresence morph */}
              <MagneticButton>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md cursor-pointer min-w-[170px] justify-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedEmail ? (
                      <motion.div
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <CheckIcon size={15} />
                        <span>{t.contact.emailCopied}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <CopyIcon size={15} />
                        <span>{t.contact.copyEmail}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </MagneticButton>

              {/* Print / Save Resume CTA */}
              <MagneticButton>
                <button
                  onClick={handlePrintResume}
                  title={t.contact.printHint}
                  className="flex items-center gap-2.5 px-6 py-3.5 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] font-mono text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                >
                  <PrinterIcon size={15} className="text-[var(--accent)]" />
                  <span>{t.contact.printResume}</span>
                </button>
              </MagneticButton>
            </div>

            {/* Print Notice Hint */}
            <p className="font-mono text-[11px] text-[var(--text-muted)] no-print">
              › {t.contact.printHint}
            </p>
          </div>

          {/* Right Column (5 cols): Social Links Index List & Saigon Live Clock */}
          <div className="lg:col-span-5 space-y-8 no-print">
            {/* Social Index List */}
            <div className="border border-[var(--hairline)] bg-[var(--surface-1)] p-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold pb-3 border-b border-[var(--hairline)] mb-2">
                {"// "}{t.contact.networkTitle}
              </h4>

              <div className="divide-y divide-[var(--hairline)]">
                {data.socials.map((soc, idx) => {
                  const isExternal = soc.url.startsWith('http');
                  return (
                    <a
                      key={idx}
                      href={soc.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between py-3.5 px-2 hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {soc.label}
                        </span>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {soc.handle}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
                        ↗
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Saigon Live Clock Box */}
            <div className="p-5 border border-[var(--hairline)] bg-[var(--surface-1)] flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold block">
                  {t.contact.saigonTime}
                </span>
                <span className="font-sans text-xs text-[var(--text-muted)]">
                  Vietnam Standard Time (UTC+07:00)
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
