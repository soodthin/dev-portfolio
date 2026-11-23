'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ScrollDepthWrapperProps {
  children: React.ReactNode;
  className?: string;
  stickySafe?: boolean;
  sectionId?: string;
}

/**
 * ScrollDepthWrapper
 * GPU-composited viewport depth & focus framing.
 * - Normal mode: maps scroll progress to gentle [0.985, 1, 1, 0.96] scale, [0.62, 1, 1, 0.45] opacity, [14, 0, 0, 18] Y recede.
 * - Sticky-safe mode (for WorkHistorySection): animates ONLY opacity, never applying transform so CSS sticky top-24 remains 100% functional.
 */
export function ScrollDepthWrapper({
  children,
  className = '',
  stickySafe = false,
  sectionId,
}: ScrollDepthWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Normal mode transforms
  const scale = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [0.985, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0.62, 1, 1, 0.45]);
  const y = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [14, 0, 0, 18]);

  if (prefersReducedMotion) {
    return (
      <div id={sectionId ? `depth-${sectionId}` : undefined} className={className}>
        {children}
      </div>
    );
  }

  if (stickySafe) {
    return (
      <motion.div
        ref={containerRef}
        id={sectionId ? `depth-${sectionId}` : undefined}
        style={{ opacity }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      id={sectionId ? `depth-${sectionId}` : undefined}
      style={{
        scale,
        opacity,
        y,
        transformOrigin: 'center center',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
