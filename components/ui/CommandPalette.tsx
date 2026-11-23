'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Search, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface PaletteItem {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  group: string;
  action: () => void;
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const { lang, toggleLang, theme, toggleTheme, data, t } = usePortfolio();
  const { scrollTo } = useSmoothScroll();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const jumpTo = useCallback(
    (selector: string) => {
      onClose();
      setTimeout(() => {
        scrollTo(selector, { offset: -64 });
      }, 40);
    },
    [onClose, scrollTo]
  );

  const allItems: PaletteItem[] = useMemo(() => {
    const navItems: PaletteItem[] = [
      {
        id: 'nav-01',
        index: '01',
        title: lang === 'vi' ? 'Tổng quan & Chỉ số' : 'Summary & Impact Metrics',
        subtitle:
          lang === 'vi'
            ? 'Tiểu sử, định hướng kỹ thuật và chỉ số thực tế'
            : 'Background, engineering focus, and production metrics',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#summary'),
      },
      {
        id: 'nav-02',
        index: '02',
        title: lang === 'vi' ? 'Kinh nghiệm · BW Industrial' : 'Experience · BW Industrial Dev JSC',
        subtitle:
          lang === 'vi'
            ? 'Đường ống AI FinTech 5 giai đoạn & đối soát sao kê'
            : '5-stage reconciliation pipeline & multi-bank OCR parsing',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#experience'),
      },
      {
        id: 'nav-03',
        index: '03',
        title: lang === 'vi' ? 'Dự án Tiêu biểu' : 'Work Experience',
        subtitle: 'FlexiConnect Web · Saigon Savory App · Dev Portfolio Engine',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#works'),
      },
      {
        id: 'nav-04',
        index: '04',
        title: lang === 'vi' ? 'Ma trận Công nghệ' : 'Technical Matrix',
        subtitle: 'Java · Python · TypeScript · Spring Boot · FastAPI · Docker',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#skills'),
      },
      {
        id: 'nav-05',
        index: '05',
        title: lang === 'vi' ? 'Học vấn & Ngoại ngữ' : 'Education & Languages',
        subtitle:
          lang === 'vi'
            ? 'Đại học Mở TP.HCM · Môn học cốt lõi · Tiếng Việt & Tiếng Anh'
            : 'HCM City Open University · Core CS coursework · EN & VI',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#education'),
      },
      {
        id: 'nav-06',
        index: '06',
        title: lang === 'vi' ? 'Liên hệ Trực tiếp' : 'Direct Contact',
        subtitle:
          lang === 'vi'
            ? 'thinhthai963@gmail.com · In CV · Giờ TP. Hồ Chí Minh'
            : 'thinhthai963@gmail.com · Print Resume · Ho Chi Minh City Live Clock',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#contact'),
      },
    ];

    const projectItems: PaletteItem[] = data.projects.map((proj) => ({
      id: `proj-${proj.id}`,
      index: proj.number,
      title: proj.title,
      subtitle: proj.subtitle,
      group: t.commandPalette.projectsGroup,
      action: () => jumpTo(`#${proj.id}`),
    }));

    const socialItems: PaletteItem[] = data.socials.map((soc) => ({
      id: `social-${soc.label}`,
      title: soc.label,
      subtitle: soc.handle,
      group: t.commandPalette.contactGroup,
      action: () => {
        onClose();
        if (soc.url.startsWith('mailto:') || soc.url.startsWith('tel:')) {
          window.location.href = soc.url;
        } else {
          window.open(soc.url, '_blank', 'noopener,noreferrer');
        }
      },
    }));

    const systemItems: PaletteItem[] = [
      {
        id: 'sys-theme',
        title: t.commandPalette.toggleTheme,
        subtitle: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        group: t.commandPalette.systemGroup,
        action: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: 'sys-lang',
        title: t.commandPalette.switchLang,
        subtitle: lang === 'en' ? 'Chuyển nội dung sang Tiếng Việt' : 'Switch content to English',
        group: t.commandPalette.systemGroup,
        action: () => {
          toggleLang();
          onClose();
        },
      },
    ];

    return [...navItems, ...projectItems, ...socialItems, ...systemItems];
  }, [lang, theme, data, t, jumpTo, toggleTheme, toggleLang, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  const safeSelectedIndex = Math.min(selectedIndex, Math.max(0, filteredItems.length - 1));
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selectedEl = list.querySelector<HTMLElement>('[data-selected="true"]');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [safeSelectedIndex]);

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[safeSelectedIndex];
      item?.action();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface-1)] border border-[var(--hairline)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownInList}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--hairline)] bg-[var(--surface-2)]">
          <Search size={17} strokeWidth={1.75} className="text-[var(--text-muted)] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={t.commandPalette.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base font-sans text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors ml-2 cursor-pointer"
            aria-label="Close"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          data-lenis-prevent
          className="flex-1 overflow-y-auto max-h-[50vh] sm:max-h-[55vh] p-2 pr-3 space-y-0.5 overscroll-contain custom-scrollbar"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--text-muted)]">
              {t.commandPalette.noResults}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = safeSelectedIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-selected={isSelected ? 'true' : undefined}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-left transition-colors border ${
                    isSelected
                      ? 'bg-[var(--surface-2)] border-[var(--hairline-strong)] text-[var(--text)]'
                      : 'border-transparent hover:bg-[var(--surface-2)] text-[var(--text-muted)]'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden mr-2">
                    {item.index ? (
                      <span className="font-mono text-xs tabular-nums text-[var(--accent)] w-6 shrink-0">
                        {item.index}
                      </span>
                    ) : item.id === 'sys-theme' ? (
                      <span className="w-6 flex items-center justify-center shrink-0 text-[var(--accent)]">
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                      </span>
                    ) : (
                      <span className="w-6 flex items-center justify-center shrink-0 text-[var(--text-muted)]">
                        ·
                      </span>
                    )}

                    <div className="overflow-hidden">
                      <div className="font-sans text-sm font-medium text-[var(--text)] truncate">
                        {item.title}
                      </div>
                      <div className="font-sans text-xs text-[var(--text-muted)] truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-[11px] font-medium text-[var(--text-muted)] px-2 py-0.5 rounded-full border border-[var(--hairline)] bg-[var(--surface-1)]">
                      {item.group}
                    </span>
                    {isSelected && <ArrowRight size={14} className="text-[var(--accent)]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 border-t border-[var(--hairline)] bg-[var(--surface-2)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span>{t.commandPalette.navigateHint}</span>
            <span>{t.commandPalette.selectHint}</span>
            <span>{t.commandPalette.escHint}</span>
          </div>
          <div>Thai Do Thinh · 2026 · v3.0</div>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette() {
  const { isCommandOpen, setIsCommandOpen } = usePortfolio();
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    if (isCommandOpen) {
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
  }, [isCommandOpen, stopScroll, startScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(!isCommandOpen);
      } else if (e.key === 'Escape' && isCommandOpen) {
        e.preventDefault();
        setIsCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, setIsCommandOpen]);

  if (!isCommandOpen) return null;

  return <CommandPaletteDialog onClose={() => setIsCommandOpen(false)} />;
}
