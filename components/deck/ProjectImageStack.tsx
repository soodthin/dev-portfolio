'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
} from 'lucide-react';

interface ProjectImageStackProps {
  images: string[];
  title: string;
  captions?: string[];
  isMobile?: boolean;
}

export function ProjectImageStack({
  images,
  title,
  captions,
  isMobile = false,
}: ProjectImageStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = images?.length || 0;

  // Handle keyboard events when Lightbox modal is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, total]);

  if (!images || total === 0) {
    return (
      <div className="w-full max-w-md h-48 rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02] flex items-center justify-center text-slate-400 font-mono text-xs">
        <span>NO PREVIEW ASSETS AVAILABLE</span>
      </div>
    );
  }

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const currentImage = images[activeIndex];
  const nextImageSrc = images[(activeIndex + 1) % total];
  const thirdImageSrc = images[(activeIndex + 2) % total];

  return (
    <>
      {/* ===================================================================== */}
      {/* COMPACT PREVIEW IMAGE STACK (REDUCED WIDTH & HEIGHT)                 */}
      {/* ===================================================================== */}
      <div className="w-full max-w-[500px]">
        <div className="relative pt-7 group/stack select-none">

          {/* 3rd Layer (Furthest back - visible if >= 3 images) */}
          {total >= 3 && (
            <div
              onClick={openLightbox}
              className="absolute top-7 left-6 right-6 h-10 rounded-xl border border-slate-300/80 dark:border-white/10 bg-slate-200/90 dark:bg-[#0d131a] shadow-sm transform transition-all duration-300 group-hover/stack:-top-1 cursor-pointer overflow-hidden opacity-70"
              title="Click to zoom in"
            >
              <div className="w-full h-full relative opacity-20">
                <Image
                  src={thirdImageSrc}
                  alt=""
                  fill
                  className="object-cover object-top blur-[1px]"
                  sizes="400px"
                />
              </div>
            </div>
          )}

          {/* 2nd Layer (Middle card - visible if >= 2 images) */}
          {total >= 2 && (
            <div
              onClick={openLightbox}
              className="absolute top-10 left-3 right-3 h-10 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100/95 dark:bg-[#0d131a] shadow-md transform transition-all duration-300 group-hover/stack:top-2 cursor-pointer overflow-hidden z-10"
              title="Click to zoom in"
            >
              <div className="w-full h-full relative opacity-30">
                <Image
                  src={nextImageSrc}
                  alt=""
                  fill
                  className="object-cover object-top blur-[0.5px]"
                  sizes="450px"
                />
              </div>
            </div>
          )}

          {/* 1st Layer: FRONT ACTIVE CARD (COMPACT HEIGHT & WIDTH) */}
          <div
            onClick={openLightbox}
            className="relative z-20 w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-300 dark:border-white/20 bg-slate-900 shadow-lg dark:shadow-xl cursor-pointer group/card"
            title="Click to zoom in"
          >
            {/* Ambient blurred backdrop for portrait mobile screenshots */}
            {isMobile && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentImage}
                  alt=""
                  fill
                  className="object-cover blur-md opacity-35 scale-110"
                  sizes="500px"
                />
              </div>
            )}

            <Image
              src={currentImage}
              alt={`${title} screenshot ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              className={
                isMobile
                  ? 'object-contain p-2 transition-transform duration-500 group-hover/card:scale-[1.02]'
                  : 'object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.02]'
              }
              sizes="500px"
            />

            {/* Top Floating Badge */}
            <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%]">
              <div className="px-2.5 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] flex items-center gap-1.5 shadow-sm truncate">
                <span className="h-1.5 w-1.5 rounded-full bg-[#14b8a6] dark:bg-[#2dd4bf] shrink-0" />
                <span className="font-bold shrink-0">SCREEN {String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/40 shrink-0">/</span>
                <span className="text-white/70 shrink-0">{String(total).padStart(2, '0')}</span>
                {captions?.[activeIndex] && (
                  <>
                    <span className="text-white/40 shrink-0">·</span>
                    <span className="text-[#2dd4bf] truncate font-sans text-[10px] sm:text-[11px] font-medium">
                      {captions[activeIndex]}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Hover Zoom Prompt */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs backdrop-blur-[1px]">
              <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 flex items-center gap-2 shadow-lg scale-95 group-hover/card:scale-100 transition-transform">
                <ZoomIn className="h-4 w-4 text-[#2dd4bf]" />
                <span>Click to Expand</span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between text-[11px] font-mono text-white/90 z-10">
              <span className="text-[10px] text-white/70 truncate max-w-[220px]">
                {captions?.[activeIndex] || title}
              </span>

              {/* Prev / Next Controls */}
              {total > 1 && (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="p-1 rounded bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                    title="Previous"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] px-1 text-[#14b8a6] dark:text-[#2dd4bf] font-bold">
                    {activeIndex + 1}/{total}
                  </span>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="p-1 rounded bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                    title="Next"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* LIGHTBOX FULLSCREEN ZOOM MODAL ("ẤN VÔ MỚI PHÓNG TO RA")              */}
      {/* ===================================================================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Modal Header */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-3 text-white font-mono text-xs sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-bold text-sm sm:text-base uppercase text-white">
                {title}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-[#2dd4bf] font-bold">
                SCREEN {String(activeIndex + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
              </span>
              {captions?.[activeIndex] && (
                <>
                  <span className="text-white/40 hidden sm:inline">·</span>
                  <span className="text-slate-300 font-sans text-xs sm:text-sm font-normal hidden sm:inline">
                    {captions[activeIndex]}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentImage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs"
                title="Open raw image"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Raw File</span>
              </a>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Large Expanded Image Stage */}
          <div
            className="relative w-full max-w-5xl aspect-[16/10] max-h-[80vh] rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isMobile && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentImage}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-20 scale-125"
                  sizes="1200px"
                />
              </div>
            )}
            <Image
              src={currentImage}
              alt={`${title} screenshot ${activeIndex + 1}`}
              fill
              priority
              className="object-contain p-2"
              sizes="1200px"
            />

            {/* Floating Navigation Controls inside Lightbox */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
                  title="Previous image (Arrow Left)"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
                  title="Next image (Arrow Right)"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Mobile screen caption prompt if screen is small */}
          {captions?.[activeIndex] && (
            <div className="sm:hidden text-center text-xs text-slate-300 pt-2 font-sans">
              {captions[activeIndex]}
            </div>
          )}

          {/* Lightbox Footer with Thumbnails */}
          {total > 1 && (
            <div
              className="flex items-center gap-2 pt-4 overflow-x-auto max-w-full pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                  }}
                  className={`relative w-16 h-10 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'border-[#2dd4bf] ring-2 ring-[#2dd4bf]/50 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className={isMobile ? 'object-contain bg-slate-900 p-0.5' : 'object-cover'}
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
