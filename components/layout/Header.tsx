'use client';

import React, { useState } from 'react';
import { Sun, Moon, Search, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';

const CHAPTER_MAP: Record<string, { number: string; labelEn: string; labelVi: string }> = {
  summary: { number: '01', labelEn: 'Summary', labelVi: 'Tổng quan' },
  experience: { number: '02', labelEn: 'BW Industrial', labelVi: 'BW Industrial' },
  works: { number: '03', labelEn: 'Selected Works', labelVi: 'Dự án' },
  skills: { number: '04', labelEn: 'Technical Matrix', labelVi: 'Ma trận Công nghệ' },
  education: { number: '05', labelEn: 'Education', labelVi: 'Học vấn' },
  contact: { number: '06', labelEn: 'Contact', labelVi: 'Liên hệ' },
};

export function Header() {
  const { data, lang, toggleLang, theme, toggleTheme, activeSection, setIsCommandOpen, t, showToast } =
    usePortfolio();
  const { scrollTo } = useSmoothScroll();
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        showToast(
          lang === 'vi'
            ? 'Đã sao chép liên kết hồ sơ vào bộ nhớ tạm'
            : 'Copied portfolio link to clipboard'
        );
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[var(--bg)]/95 border-b border-[var(--hairline)] transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Clean Brand Identity + Interactive Rolling Chapter Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('#summary')}
            className="group text-left cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="font-serif font-semibold text-lg sm:text-xl tracking-[-0.02em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {data.profile.name}
            </span>
          </button>

          <div className="hidden sm:inline-flex items-center overflow-hidden h-6">
            <AnimatePresence mode="wait" initial={false}>
              {activeSection === 'summary' ? (
                <motion.span
                  key="role"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xs text-[var(--text-muted)]"
                >
                  · {t.header.role}
                </motion.span>
              ) : (
                <motion.button
                  key={activeSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  className="inline-flex items-center gap-2 pl-3 border-l border-[var(--hairline)] text-xs text-left cursor-pointer group/pill"
                  title={lang === 'vi' ? 'Chuyển chương nhanh (⌘K)' : 'Quick chapter jump (⌘K)'}
                >
                  <span className="font-mono text-[11px] font-semibold text-[var(--accent)] tabular-nums">
                    {CHAPTER_MAP[activeSection]?.number || '01'}
                  </span>
                  <span className="text-[var(--text-muted)] group-hover/pill:text-[var(--text)] transition-colors">
                    {lang === 'vi'
                      ? CHAPTER_MAP[activeSection]?.labelVi
                      : CHAPTER_MAP[activeSection]?.labelEn}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={() => setIsCommandOpen(true)}
          className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text-muted)] hover:text-[var(--text)] text-xs transition-colors cursor-pointer"
          aria-label="Open Command Palette"
        >
          <Search size={13} strokeWidth={1.75} />
          <span>{t.header.cmdKPrompt}</span>
          <kbd className="font-mono px-1.5 py-0.5 text-[10px] rounded bg-[var(--surface-2)] border border-[var(--hairline)] text-[var(--text)] font-medium">
            ⌘K
          </kbd>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="md:hidden p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--hairline)] bg-[var(--surface-1)] cursor-pointer"
            aria-label="Open Search"
          >
            <Search size={15} strokeWidth={1.75} />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={t.header.langTooltip}
            className="px-3 py-1.5 rounded-full font-mono text-xs font-medium border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <span className={lang === 'en' ? 'text-[var(--accent)] font-semibold' : 'opacity-55'}>
              EN
            </span>
            <span className="opacity-30 mx-1">·</span>
            <span className={lang === 'vi' ? 'text-[var(--accent)] font-semibold' : 'opacity-55'}>
              VI
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? t.header.lightTooltip : t.header.darkTooltip}
            className="p-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={15} strokeWidth={1.75} />
            ) : (
              <Moon size={15} strokeWidth={1.75} />
            )}
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            title={copiedShare ? t.header.shareCopied : t.header.shareTooltip}
            className="p-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--hairline-strong)] text-[var(--text)] transition-colors hidden sm:inline-flex cursor-pointer"
            aria-label="Share portfolio"
          >
            {copiedShare ? (
              <Check size={15} strokeWidth={1.75} className="text-[var(--accent)]" />
            ) : (
              <Share2 size={15} strokeWidth={1.75} />
            )}
          </button>

          {/* Primary CTA (AAA contrast) */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-deep)] text-[var(--accent-cta-text)] hover:brightness-110 transition-all cursor-pointer"
            >
              {t.header.contactBtn}
            </button>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
