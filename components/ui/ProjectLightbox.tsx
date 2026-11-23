'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectImage } from '@/types/portfolio';
import { getAssetPath } from '@/lib/asset';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@/components/ui/Icons';

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProjectImage[];
  initialIndex?: number;
  projectTitle?: string;
}

export function ProjectLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  projectTitle = 'Project Showcase',
}: ProjectLightboxProps) {
  const { lang } = usePortfolio();
  const { stopScroll, startScroll } = useSmoothScroll();
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      stopScroll();
      document.body.style.overflow = 'hidden';
    } else {
      startScroll();
      document.body.style.overflow = '';
    }

    return () => {
      startScroll();
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex, stopScroll, startScroll]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const caption = lang === 'vi' ? currentImage?.captionVi : currentImage?.captionEn;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={projectTitle}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md text-[#F3F0E8] select-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--accent)] px-2 py-0.5 border border-white/15 bg-white/5">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <span className="font-serif text-lg tracking-tight text-white hidden sm:inline">
              {projectTitle}
            </span>
            <span className="font-sans text-xs text-white/50 hidden md:inline">
              — {currentImage?.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            aria-label="Close modal (Esc)"
          >
            <span>ESC</span>
            <XIcon size={14} />
          </button>
        </div>

        {/* Main Stage */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/15 transition-all hover:scale-105"
            aria-label="Previous screenshot (Left arrow)"
          >
            <ChevronLeftIcon size={22} />
          </button>

          {/* Current Image */}
          <div className="relative max-w-6xl max-h-[72vh] w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={getAssetPath(currentImage.src)}
                  alt={currentImage.title || 'Project screenshot'}
                  width={1440}
                  height={900}
                  unoptimized
                  className="max-w-full max-h-[68vh] object-contain border border-white/15 shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/15 transition-all hover:scale-105"
            aria-label="Next screenshot (Right arrow)"
          >
            <ChevronRightIcon size={22} />
          </button>
        </div>

        {/* Bottom Drawer: Caption & Thumbnails */}
        <div className="bg-black/80 border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="font-serif text-sm font-semibold text-white">
              {currentImage?.title}
            </h4>
            <p className="font-sans text-xs text-white/70 mt-0.5 leading-relaxed">
              {caption}
            </p>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-12 h-8 flex-shrink-0 border transition-all overflow-hidden ${
                  currentIndex === idx
                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/50 scale-105'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                aria-label={`Jump to screenshot ${idx + 1}`}
              >
                <Image
                  src={getAssetPath(img.src)}
                  alt={img.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
