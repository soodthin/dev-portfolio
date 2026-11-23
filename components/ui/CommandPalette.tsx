'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { SearchIcon, XIcon, ArrowRightIcon, SunIcon, MoonIcon } from '@/components/ui/Icons';

interface PaletteItem {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  group: string;
  action: () => void;
  icon?: string;
}

export function CommandPalette() {
  const {
    isCommandOpen,
    setIsCommandOpen,
    lang,
    toggleLang,
    theme,
    toggleTheme,
    data,
    t,
  } = usePortfolio();

  const { stopScroll, startScroll, scrollTo } = useSmoothScroll();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Manage Lenis scroll state & body overflow when palette toggles
  useEffect(() => {
    if (isCommandOpen) {
      stopScroll();
      document.body.style.overflow = 'hidden';
      setQuery('');
      setSelectedIndex(0);
    } else {
      startScroll();
      document.body.style.overflow = '';
    }

    return () => {
      startScroll();
      document.body.style.overflow = '';
    };
  }, [isCommandOpen, stopScroll, startScroll]);

  // Global hotkeys: Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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

  const jumpTo = useCallback(
    (selector: string) => {
      setIsCommandOpen(false);
      setTimeout(() => {
        scrollTo(selector, { offset: -60 });
      }, 50);
    },
    [setIsCommandOpen, scrollTo]
  );

  // Synchronized items list dynamically resolved from portfolioData & translations
  const allItems: PaletteItem[] = useMemo(() => {
    const navItems: PaletteItem[] = [
      {
        id: 'nav-01',
        index: '01',
        title: lang === 'vi' ? 'Tổng quan & Tuyên ngôn Kỹ thuật' : 'Executive Summary & Manifesto',
        subtitle: lang === 'vi' ? 'Tiểu sử, định hướng kỹ thuật và các chỉ số tác động' : 'Core background, metrics, and software engineering impact',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#summary'),
      },
      {
        id: 'nav-02',
        index: '02',
        title: lang === 'vi' ? 'Lịch sử Làm việc (BW Industrial)' : 'Work History (BW Industrial Dev JSC)',
        subtitle: lang === 'vi' ? 'Đường ống AI FinTech 5 giai đoạn & bóc tách sao kê' : '5-Stage FinTech AI Pipeline & automated multi-bank statement parsing',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#experience'),
      },
      {
        id: 'nav-03',
        index: '03',
        title: lang === 'vi' ? 'Dự án Tiêu biểu (3 Hệ thống Shipped)' : 'Selected Works (3 Shipped Systems)',
        subtitle: lang === 'vi' ? 'FlexiConnect Web, Saigon Savory App, Dev Portfolio Engine' : 'FlexiConnect Web, Saigon Savory App, Dev Portfolio Engine',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#works'),
      },
      {
        id: 'nav-04',
        index: '04',
        title: lang === 'vi' ? 'Năng lực Kỹ thuật & Công nghệ' : 'Technical Capabilities & Stack',
        subtitle: lang === 'vi' ? 'Java, Python, TypeScript, Spring Boot, FastAPI, Docker' : 'Java, Python, TypeScript, Spring Boot, FastAPI, Docker',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#skills'),
      },
      {
        id: 'nav-05',
        index: '05',
        title: lang === 'vi' ? 'Nền tảng Học vấn & Ngoại ngữ' : 'Academic Foundation & Languages',
        subtitle: lang === 'vi' ? 'Đại học Mở TP.HCM, môn học chuyên sâu, Tiếng Việt & Tiếng Anh' : 'HCM City Open University, core CS coursework, EN & VI proficiencies',
        group: t.commandPalette.navigationGroup,
        action: () => jumpTo('#education'),
      },
      {
        id: 'nav-06',
        index: '06',
        title: lang === 'vi' ? 'Liên hệ Trực tiếp & Mạng lưới' : 'Direct Contact & Network',
        subtitle: lang === 'vi' ? 'Sao chép email thinhthai963@gmail.com, in CV, đồng hồ Sài Gòn' : 'Email copy thinhthai963@gmail.com, print CV, Saigon live time',
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
        setIsCommandOpen(false);
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
        subtitle: theme === 'dark' ? 'Switch to Light Editorial mode' : 'Switch to Dark Editorial mode',
        group: t.commandPalette.systemGroup,
        action: () => {
          toggleTheme();
          setIsCommandOpen(false);
        },
      },
      {
        id: 'sys-lang',
        title: t.commandPalette.switchLang,
        subtitle: lang === 'en' ? 'Chuyển toàn bộ nội dung sang Tiếng Việt' : 'Switch all content to English',
        group: t.commandPalette.systemGroup,
        action: () => {
          toggleLang();
          setIsCommandOpen(false);
        },
      },
    ];

    return [...navItems, ...projectItems, ...socialItems, ...systemItems];
  }, [lang, theme, data, t, jumpTo, toggleTheme, toggleLang, setIsCommandOpen]);

  // Filter items by query
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

  // Keyboard navigation within list
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
      const item = filteredItems[selectedIndex];
      if (item) {
        item.action();
      }
    }
  };

  if (!isCommandOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setIsCommandOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-[var(--surface-1)] border border-[var(--hairline)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownInList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[var(--hairline)] bg-[var(--surface-2)]">
          <SearchIcon size={18} className="text-[var(--text-muted)] mr-3 flex-shrink-0" />
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
            onClick={() => setIsCommandOpen(false)}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors ml-2"
            aria-label="Close"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[var(--text-muted)]">
              {t.commandPalette.noResults}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 cursor-pointer text-left transition-colors border ${
                    isSelected
                      ? 'bg-[var(--surface-2)] border-[var(--accent)] text-[var(--text)]'
                      : 'border-transparent hover:bg-[var(--surface-2)] text-[var(--text-muted)]'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden mr-2">
                    {item.index ? (
                      <span className="font-mono text-xs text-[var(--accent)] px-1.5 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)] flex-shrink-0">
                        {item.index}
                      </span>
                    ) : item.id === 'sys-theme' ? (
                      <span className="p-1 flex-shrink-0 text-[var(--accent)]">
                        {theme === 'dark' ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--hairline)] flex-shrink-0" />
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

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)] px-1.5 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
                      {item.group}
                    </span>
                    {isSelected && <ArrowRightIcon size={14} className="text-[var(--accent)]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2 border-t border-[var(--hairline)] bg-[var(--surface-2)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>{t.commandPalette.navigateHint}</span>
            <span>{t.commandPalette.selectHint}</span>
            <span>{t.commandPalette.escHint}</span>
          </div>
          <div className="tracking-wider">
            THAI DO THINH // 2026
          </div>
        </div>
      </div>
    </div>
  );
}
