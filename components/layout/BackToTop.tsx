'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

/**
 * BackToTop — Modern Liquid Glass Capsule Edition
 * Compact 42px height, frosted glass backdrop blur, specular glass rim light,
 * and smooth liquid sheen sweep on hover.
 */
export function BackToTop() {
  const { scrollTo } = useSmoothScroll();
  const { lang } = usePortfolio();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      scrollTo('#summary', { offset: 0 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const label = lang === 'vi' ? 'LÊN ĐẦU TRANG' : 'BACK TO TOP';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 14 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 no-print"
        >
          <button
            type="button"
            onClick={handleClick}
            className="group relative inline-flex items-center justify-center h-[42px] w-[42px] hover:w-[142px] rounded-full p-0 overflow-hidden cursor-pointer transition-[width,box-shadow,border-color] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-xl bg-[var(--surface-1)]/80 dark:bg-[#0c131a]/85 border border-[var(--hairline-strong)] hover:border-[var(--accent)] shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_28px_-4px_rgba(45,212,191,0.35),inset_0_1px_1px_rgba(255,255,255,0.22)]"
            aria-label={label}
          >
            {/* Liquid Glass Ambient Gradient */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-[var(--accent)]/[0.06] pointer-events-none"
            />

            {/* Liquid Glass Sheen Sweep on Hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
            />

            {/* Content: Arrow Icon + Expandable Label */}
            <span className="relative z-10 flex items-center justify-center whitespace-nowrap text-[var(--accent)] px-3">
              <ArrowUp
                size={16}
                strokeWidth={2.25}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="max-w-0 opacity-0 overflow-hidden ml-0 group-hover:max-w-[92px] group-hover:opacity-100 group-hover:ml-2 font-mono text-[11px] font-bold tracking-wider text-[var(--text)] group-hover:text-[var(--accent)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] select-none">
                {label}
              </span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
