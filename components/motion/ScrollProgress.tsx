'use client';

import React from 'react';
import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-[1.5px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-[var(--accent)] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
