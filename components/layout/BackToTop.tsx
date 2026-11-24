'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

export function BackToTop() {
  const { scrollTo } = useSmoothScroll();
  const { lang } = usePortfolio();
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > 400);
      setPct(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    scrollTo('#summary', { offset: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const label = lang === 'vi' ? 'ĐẦU TRANG' : 'TOP';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-5 sm:right-6 z-40 no-print"
        >
          <button
            type="button"
            onClick={handleClick}
            aria-label={label}
            className="group inline-flex flex-col items-center gap-2 p-2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer transition-colors duration-200"
          >
            <ArrowUp
              size={13}
              strokeWidth={2.2}
              className="transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:text-[var(--accent)]"
            />
            {/* Sợi tóc đo tiến độ co rút nhẹ về phía mũi tên khi hover */}
            <span className="relative w-[1.5px] h-14 group-hover:h-9 bg-[var(--hairline-strong)] overflow-hidden transition-[height] duration-200 ease-out">
              <span
                className="absolute top-0 left-0 w-full bg-[var(--accent)] transition-[height] duration-150 ease-out"
                style={{ height: `${pct}%` }}
              />
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase select-none"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {label}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
