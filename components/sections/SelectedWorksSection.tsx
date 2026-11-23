'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { ProjectImage } from '@/types/portfolio';
import { getAssetPath } from '@/lib/asset';
import { GithubIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@/components/ui/Icons';
import { MagneticButton } from '@/components/motion/MagneticButton';

interface SelectedWorksSectionProps {
  onOpenLightbox: (images: ProjectImage[], index: number, title: string) => void;
}

export function SelectedWorksSection({ onOpenLightbox }: SelectedWorksSectionProps) {
  const { data, t } = usePortfolio();
  const projects = data.projects;

  const proj1 = projects[0]; // FlexiConnect
  const proj2 = projects[1]; // Saigon Savory
  const proj3 = projects[2]; // Dev Portfolio Engine

  // State for Project 01 screenshot slider
  const [p1ImageIndex, setP1ImageIndex] = useState<number>(0);
  const p1Images = proj1?.imagesList || [];

  const handleP1Next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (p1Images.length === 0) return;
    setP1ImageIndex((prev) => (prev + 1) % p1Images.length);
  };

  const handleP1Prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (p1Images.length === 0) return;
    setP1ImageIndex((prev) => (prev - 1 + p1Images.length) % p1Images.length);
  };

  // Scroll parallax for Project 02 mobile staggered screens
  const p2ContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p2ScrollProgress } = useScroll({
    target: p2ContainerRef,
    offset: ['start end', 'end start'],
  });
  const p2ParallaxUp = useTransform(p2ScrollProgress, [0, 1], [30, -30]);
  const p2ParallaxDown = useTransform(p2ScrollProgress, [0, 1], [-20, 20]);

  const p2Images = proj2?.imagesList || [];

  return (
    <section
      id="works"
      className="relative py-24 md:py-32 border-b border-[var(--hairline)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Choreography: Split-Flap Mechanical Numeral Roll + Clip-Path Horizontal Wipe */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
              03
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              {t.works.eyebrow}
            </span>
          </div>

          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--text)] font-bold tracking-tight"
            >
              {t.works.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-muted)] mt-2 font-sans max-w-2xl"
          >
            {t.works.subtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-[var(--hairline)] mt-6 origin-left w-full"
          />
        </div>

        {/* 3 Projects Displayed in Vertical Stack (NO Hidden Tabs) */}
        <div className="space-y-24 md:space-y-36">
          {/* ========================================================================= */}
          {/* PROJECT 01: FlexiConnect Web (Desktop Editorial Wide Split) */}
          {/* ========================================================================= */}
          {proj1 && (
            <div id={proj1.id} className="scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (6 cols): Specifications, Metrics, Links */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
                      PROJECT 01
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      Enterprise Spring Boot & React
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text)]">
                    {proj1.title}
                  </h3>

                  <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
                    {proj1.description}
                  </p>

                  {/* Architectural Metrics Grid */}
                  {proj1.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                      {proj1.metricsList.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 border border-[var(--hairline)] bg-[var(--surface-1)] text-center"
                        >
                          <div className="font-mono text-xl font-bold text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Highlights */}
                  <div className="space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      {"// "}{t.works.architectureTitle}
                    </h4>
                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-[var(--text-muted)]">
                      {proj1.keyHighlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[var(--accent)] font-mono text-xs mt-0.5 shrink-0">›</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj1.tags.map((tItem, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] px-2.5 py-1 border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {proj1.githubUrl && (
                      <MagneticButton>
                        <a
                          href={proj1.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] font-mono text-xs uppercase tracking-wider font-medium transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}

                    <button
                      onClick={() => onOpenLightbox(p1Images, p1ImageIndex, proj1.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <SearchIcon size={13} />
                      <span>{t.works.viewGallery} ({p1Images.length})</span>
                    </button>
                  </div>
                </div>

                {/* Right (6 cols): Desktop Browser Mockup with AnimatePresence image switcher */}
                <div className="lg:col-span-6">
                  <div
                    onClick={() => onOpenLightbox(p1Images, p1ImageIndex, proj1.title)}
                    className="border border-[var(--hairline)] bg-[var(--surface-1)] shadow-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[var(--accent)]"
                  >
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)] bg-[var(--surface-2)] select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/30" />
                      </div>

                      <div className="flex-1 mx-4 max-w-xs px-3 py-1 bg-[var(--surface-1)] border border-[var(--hairline)] text-center font-mono text-[10px] text-[var(--text-muted)] truncate">
                        https://flexiconnect.render.com/jobs
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)]">
                        <span>{p1ImageIndex + 1}</span>
                        <span>/</span>
                        <span>{p1Images.length}</span>
                      </div>
                    </div>

                    {/* Image Viewport */}
                    <div className="relative aspect-[16/10] bg-[var(--surface-1)] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={p1ImageIndex}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          {p1Images[p1ImageIndex] && (
                            <Image
                              src={getAssetPath(p1Images[p1ImageIndex].src)}
                              alt={p1Images[p1ImageIndex].title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 600px"
                              unoptimized
                              className="object-cover object-top group-hover:scale-102 transition-transform duration-500 ease-out"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Slider Navigation Buttons */}
                      <button
                        onClick={handleP1Prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeftIcon size={16} />
                      </button>

                      <button
                        onClick={handleP1Next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                        aria-label="Next screenshot"
                      >
                        <ChevronRightIcon size={16} />
                      </button>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-2 left-2 right-2 p-2.5 bg-black/70 backdrop-blur-sm border border-white/10 text-white font-mono text-[11px] truncate flex items-center justify-between">
                        <span className="truncate">{p1Images[p1ImageIndex]?.title}</span>
                        <span className="text-[var(--accent)] shrink-0 ml-2">Click to expand</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PROJECT 02: Saigon Savory App (Mobile Showcase Stage) */}
          {/* ========================================================================= */}
          {proj2 && (
            <div id={proj2.id} ref={p2ContainerRef} className="scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (6 cols): 2-3 Vertical Phone Screens with Counter-Parallax */}
                <div
                  onClick={() => onOpenLightbox(p2Images, 0, proj2.title)}
                  className="lg:col-span-6 relative flex justify-center items-center py-6 cursor-pointer group"
                >
                  {/* Phone Screen 1 (Back Left) */}
                  {p2Images[0] && (
                    <motion.div
                      style={{ y: p2ParallaxDown }}
                      className="relative w-44 sm:w-52 aspect-[9/19] rounded-2xl p-1.5 border-2 border-[var(--hairline)] bg-[var(--surface-1)] shadow-2xl -rotate-6 z-10 transition-transform duration-500 group-hover:-translate-x-3 group-hover:-rotate-8"
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                        <Image
                          src={getAssetPath(p2Images[0].src)}
                          alt={p2Images[0].title}
                          fill
                          sizes="200px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Phone Screen 2 (Front Center) */}
                  {p2Images[1] && (
                    <motion.div
                      style={{ y: p2ParallaxUp }}
                      className="relative w-48 sm:w-56 aspect-[9/19] rounded-2xl p-1.5 border-2 border-[var(--hairline)] bg-[var(--surface-1)] shadow-2xl z-20 -ml-12 sm:-ml-16 transition-transform duration-500 group-hover:scale-105"
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                        <Image
                          src={getAssetPath(p2Images[1].src)}
                          alt={p2Images[1].title}
                          fill
                          sizes="220px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Phone Screen 3 (Back Right) */}
                  {p2Images[2] && (
                    <motion.div
                      style={{ y: p2ParallaxDown }}
                      className="relative w-44 sm:w-52 aspect-[9/19] rounded-2xl p-1.5 border-2 border-[var(--hairline)] bg-[var(--surface-1)] shadow-2xl rotate-6 z-10 -ml-12 sm:-ml-16 transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-8"
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                        <Image
                          src={getAssetPath(p2Images[2].src)}
                          alt={p2Images[2].title}
                          fill
                          sizes="200px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right (6 cols): Specifications & Details */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
                      PROJECT 02
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      Mobile React Native & Django REST
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text)]">
                    {proj2.title}
                  </h3>

                  <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed">
                    {proj2.description}
                  </p>

                  {/* Metrics Grid */}
                  {proj2.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                      {proj2.metricsList.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 border border-[var(--hairline)] bg-[var(--surface-1)] text-center"
                        >
                          <div className="font-mono text-xl font-bold text-[var(--text)]">
                            {m.value}
                          </div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Highlights */}
                  <div className="space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      {"// "}{t.works.architectureTitle}
                    </h4>
                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-[var(--text-muted)]">
                      {proj2.keyHighlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[var(--accent)] font-mono text-xs mt-0.5 shrink-0">›</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj2.tags.map((tItem, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] px-2.5 py-1 border border-[var(--hairline)] bg-[var(--surface-1)] text-[var(--text-muted)]"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {proj2.githubUrl && (
                      <MagneticButton>
                        <a
                          href={proj2.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] font-mono text-xs uppercase tracking-wider font-medium transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>{t.works.sourceCodeBtn}</span>
                        </a>
                      </MagneticButton>
                    )}

                    <button
                      onClick={() => onOpenLightbox(p2Images, 0, proj2.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <SearchIcon size={13} />
                      <span>{t.works.viewGallery} ({p2Images.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PROJECT 03: Dev Portfolio Engine (Architectural Blueprint Spread) */}
          {/* ========================================================================= */}
          {proj3 && (
            <div id={proj3.id} className="scroll-mt-24">
              <div className="p-8 sm:p-12 border border-[var(--hairline)] bg-[var(--surface-1)] shadow-xl relative overflow-hidden">
                {/* Background Blueprint Grid Hairline Accents */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[var(--text-muted)] opacity-60">
                  SYSTEM BLUEPRINT // ZERO-SLOP SSG
                </div>

                <div className="max-w-4xl space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-2)]">
                      PROJECT 03
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      Next.js 16 SSG & Swiss Typography
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
                    {proj3.title}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                    {proj3.description}
                  </p>

                  {/* Honest Metrics Grid */}
                  {proj3.metricsList && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3">
                      {proj3.metricsList.map((m, i) => (
                        <div
                          key={i}
                          className="p-4 border border-[var(--hairline)] bg-[var(--surface-2)]"
                        >
                          <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--accent)]">
                            {m.value}
                          </div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {proj3.keyHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-[var(--hairline)] bg-[var(--surface-2)] font-sans text-xs sm:text-sm text-[var(--text-muted)] flex items-start gap-2.5"
                      >
                        <span className="text-[var(--accent)] font-mono text-xs font-bold shrink-0">
                          0{idx + 1}
                        </span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags & Action CTAs */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--hairline)]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj3.tags.map((tItem, i) => (
                        <span
                          key={i}
                          className="font-mono text-[11px] px-2.5 py-1 border border-[var(--hairline)] bg-[var(--surface-2)] text-[var(--text-muted)]"
                        >
                          {tItem}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {proj3.githubUrl && (
                        <MagneticButton>
                          <a
                            href={proj3.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white hover:brightness-110 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                          >
                            <GithubIcon size={14} />
                            <span>{t.works.sourceCodeBtn}</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
