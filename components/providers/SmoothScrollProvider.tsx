'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
  scrollTo: () => {},
});

const SNAP_ANCHORS: { selector: string; offset: number }[] = [
  { selector: '#summary', offset: 0 },
  { selector: '#experience', offset: -64 },
  { selector: '#works', offset: -64 },
  { selector: '#project-01', offset: -84 },
  { selector: '#project-02', offset: -84 },
  { selector: '#project-03', offset: -84 },
  { selector: '#skills', offset: -64 },
  { selector: '#education', offset: -64 },
  { selector: '#contact', offset: -64 },
];

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const isSnappingRef = useRef<boolean>(false);
  const isProgrammaticRef = useRef<boolean>(false);
  const snapTimerRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect OS level prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Instant user interrupt: On user interaction, abort any pending snap immediately
    const interruptSnap = () => {
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
        snapTimerRef.current = null;
      }
      isSnappingRef.current = false;
    };

    const handleUserKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
        interruptSnap();
      }
    };

    window.addEventListener('wheel', interruptSnap, { passive: true });
    window.addEventListener('touchstart', interruptSnap, { passive: true });
    window.addEventListener('keydown', handleUserKey, { passive: true });

    // Idle Detection & Soft Magnetic Snap listener
    const onScroll = () => {
      if (isProgrammaticRef.current || isSnappingRef.current) return;

      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
      }

      const isDesktopPointer =
        window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
      if (!isDesktopPointer) return;

      snapTimerRef.current = window.setTimeout(() => {
        snapTimerRef.current = null;

        // Verify idle velocity
        if (Math.abs(lenis.velocity) >= 0.08) return;

        // Abort if modal is open (body overflow hidden)
        if (typeof document !== 'undefined' && document.body.style.overflow === 'hidden') return;

        // Never fight the footer (within 80px of bottom)
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;
        if (scrollY + windowH >= docH - 80) return;

        // Find closest anchor within capture zone (4px < Math.abs(diff) <= 120px)
        let closestTargetY: number | null = null;
        let minDiff = Infinity;

        for (const anchor of SNAP_ANCHORS) {
          const el = document.querySelector(anchor.selector);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const targetY = rect.top + scrollY + anchor.offset;
          const diff = targetY - scrollY;
          const absDiff = Math.abs(diff);

          if (absDiff > 4 && absDiff <= 120 && absDiff < minDiff) {
            minDiff = absDiff;
            closestTargetY = targetY;
          }
        }

        if (closestTargetY !== null) {
          isSnappingRef.current = true;
          lenis.scrollTo(closestTargetY, {
            duration: 0.55,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            onComplete: () => {
              isSnappingRef.current = false;
            },
          });

          // Fallback guard to ensure snapping flag releases
          window.setTimeout(() => {
            isSnappingRef.current = false;
          }, 700);
        }
      }, 180);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('wheel', interruptSnap);
      window.removeEventListener('touchstart', interruptSnap);
      window.removeEventListener('keydown', handleUserKey);
      if (snapTimerRef.current !== null) window.clearTimeout(snapTimerRef.current);
      if (programmaticTimerRef.current !== null) window.clearTimeout(programmaticTimerRef.current);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => {
      isProgrammaticRef.current = true;
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
        snapTimerRef.current = null;
      }
      isSnappingRef.current = false;

      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
      }
      const cooldownMs = (options?.duration ? options.duration * 1000 : 1200) + 150;
      programmaticTimerRef.current = window.setTimeout(() => {
        isProgrammaticRef.current = false;
      }, cooldownMs);

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else {
        if (typeof target === 'string') {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: 'smooth' });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        stopScroll,
        startScroll,
        scrollTo,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}
