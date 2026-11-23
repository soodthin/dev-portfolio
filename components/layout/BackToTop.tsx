'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

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
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 no-print"
        >
          <button
            type="button"
            onClick={handleClick}
            className="btn-capsule"
            aria-label={label}
          >
            <span className="btn-capsule-content">
              <span style={{ fontSize: '18px', fontWeight: 700 }} className="leading-none select-none">
                ↑
              </span>
              <span className="cap-label">{label}</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
