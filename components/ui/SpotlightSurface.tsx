'use client';

import React, { useRef, useCallback } from 'react';

interface SpotlightSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle cursor-following Teal sheen.
 * Updates CSS custom properties directly on the DOM node (zero React re-renders)
 * and renders strictly on hover-capable devices via @media (hover: hover).
 */
export function SpotlightSurface({
  children,
  className = '',
  onMouseMove,
  ...props
}: SpotlightSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--y', `${e.clientY - rect.top}px`);
      }
      onMouseMove?.(e);
    },
    [onMouseMove]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-surface relative overflow-hidden ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="spotlight-layer absolute inset-0 z-0" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
