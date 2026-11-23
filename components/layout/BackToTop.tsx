'use client';

import React, { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowUpIcon } from '@/components/ui/Icons';

export function BackToTop() {
  const { scrollTo } = useSmoothScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 no-print">
      <MagneticButton>
        <button
          onClick={() => scrollTo('#summary', { offset: 0 })}
          className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] border border-[var(--hairline)] shadow-lg font-mono text-xs uppercase tracking-wider transition-all hover:border-[var(--accent)] cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUpIcon size={14} className="text-[var(--accent)]" />
          <span className="hidden sm:inline">TOP</span>
        </button>
      </MagneticButton>
    </div>
  );
}
