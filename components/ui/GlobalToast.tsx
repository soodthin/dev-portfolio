'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

/**
 * GlobalToast — Linear / Raycast Style Micro-Feedback
 * Drops a sleek, rounded obsidian pill at the bottom center of the screen
 * with 60FPS spring motion and crisp typography.
 */
export function GlobalToast() {
  const { toast } = usePortfolio();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 440,
              damping: 28,
              mass: 0.8,
            }}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-1)]/95 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] text-xs sm:text-sm font-medium text-[var(--text)] tracking-tight will-change-transform"
          >
            <span
              className="flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] shrink-0"
              aria-hidden="true"
            >
              <Check size={11} strokeWidth={2.5} />
            </span>
            <span className="font-mono text-xs text-[var(--text)]">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
