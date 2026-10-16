'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface StackingCardProps {
  id: string;
  index: number;
  total: number;
  category?: string;
  cardNum?: string;
  maxWidth?: string;
  children: React.ReactNode;
}

export function StackingCard({
  id,
  index,
  total,
  category,
  cardNum,
  maxWidth = 'max-w-6xl',
  children,
}: StackingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this specific card section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  // Subtle, high-performance depth transformation
  const targetScale = isLast ? 1 : 0.94;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.75, 0.4]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(0px)', isLast ? 'blur(0px)' : 'blur(4px)']
  );

  // Cascading sticky top offset so upper obsidian/gold rims stay visible
  const topOffset = `calc(4.75rem + ${index * 14}px)`;

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative min-h-[105vh] w-full flex items-start justify-center pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8"
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale,
          opacity: isLast ? 1 : opacity,
          filter,
          top: topOffset,
        }}
        className={`sticky w-full ${maxWidth} mx-auto rounded-3xl bg-[#0e1017] border border-white/[0.09] border-t-amber-400/50 shadow-[0_30px_90px_rgba(0,0,0,0.92)] p-6 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-xl transition-all duration-300`}
      >
        {/* Ambient subtle gold light rim */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />

        {/* Card Header Telemetry Tag */}
        {(category || cardNum) && (
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08] text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className="font-bold tracking-widest text-amber-400 uppercase">
                {cardNum || `0${index + 1}`}
              </span>
              <span className="text-white/30">//</span>
              <span className="tracking-wider uppercase text-slate-300 font-semibold">
                {category || 'SECTION'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 tracking-widest uppercase">
              SLAB {index + 1} OF {total}
            </div>
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </motion.div>
    </section>
  );
}
