'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { MagneticButton } from '@/components/motion/MagneticButton';
import {
  SunIcon,
  MoonIcon,
  SearchIcon,
  ShareIcon,
  CheckIcon,
} from '@/components/ui/Icons';

export function Header() {
  const {
    lang,
    toggleLang,
    theme,
    toggleTheme,
    setIsCommandOpen,
    t,
  } = usePortfolio();

  const { scrollTo } = useSmoothScroll();
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--hairline)] transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Monogram / Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('#summary')}
            className="flex items-center gap-2 group text-left cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="font-serif font-bold text-lg tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              THAI DO THINH
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] px-1.5 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)] hidden sm:inline">
              CS // SENIOR
            </span>
          </button>
        </div>

        {/* Center: Command Palette Trigger (⌘K) */}
        <button
          onClick={() => setIsCommandOpen(true)}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] text-xs font-mono transition-all cursor-pointer"
          aria-label="Open Command Palette"
        >
          <SearchIcon size={13} />
          <span>{t.header.cmdKPrompt}</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--surface-2)] border border-[var(--hairline)] text-[var(--text)] font-semibold rounded">
            ⌘K
          </kbd>
        </button>

        {/* Right: Actions (Cmd+K mobile, Lang, Theme, Share, Contact CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search button */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--hairline)] bg-[var(--surface-1)]"
            aria-label="Open Search"
          >
            <SearchIcon size={15} />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={t.header.langTooltip}
            className="px-2.5 py-1.5 font-mono text-xs font-medium border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] transition-colors"
            aria-label="Toggle language"
          >
            <span className={lang === 'en' ? 'text-[var(--accent)] font-bold' : 'opacity-60'}>
              EN
            </span>
            <span className="opacity-30 mx-1">/</span>
            <span className={lang === 'vi' ? 'text-[var(--accent)] font-bold' : 'opacity-60'}>
              VI
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? t.header.lightTooltip : t.header.darkTooltip}
            className="p-2 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon size={15} /> : <MoonIcon size={15} />}
          </button>

          {/* Share Link Button */}
          <button
            onClick={handleShare}
            title={copiedShare ? t.header.shareCopied : t.header.shareTooltip}
            className="p-2 border border-[var(--hairline)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text)] transition-colors hidden sm:inline-flex"
            aria-label="Share portfolio"
          >
            {copiedShare ? (
              <CheckIcon size={15} className="text-[var(--accent)]" />
            ) : (
              <ShareIcon size={15} />
            )}
          </button>

          {/* Contact CTA */}
          <MagneticButton>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider bg-[var(--accent)] text-white hover:brightness-110 font-medium transition-all shadow-sm"
            >
              {t.header.contactBtn}
            </button>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
