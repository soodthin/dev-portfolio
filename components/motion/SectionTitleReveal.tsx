'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SectionTitleRevealProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sectionNumber: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitleReveal({
  eyebrow,
  title,
  subtitle,
  sectionNumber,
  align = 'left',
  className = '',
}: SectionTitleRevealProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'} ${className}`}>
      {/* Eyebrow & Monospace Section Index */}
      <div className={`flex items-center gap-3 mb-3 ${isCenter ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
          {sectionNumber}
        </span>
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {eyebrow}
          </span>
        )}
      </div>

      {/* Masked Title Rise */}
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--text)] leading-[1.1]"
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle with subtle fade-up */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Hairline Architectural Rule Draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[1px] bg-[var(--hairline)] mt-6 origin-left ${isCenter ? 'mx-auto max-w-md' : 'w-full'}`}
      />
    </div>
  );
}
