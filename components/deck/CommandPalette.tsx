'use client';

import React, { useState, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import {
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  Code2,
  Terminal,
  Mail,
  Phone,
  FileText,
  X,
} from 'lucide-react';
import { playClickSound } from '@/lib/sound';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  lang?: 'en' | 'vi';
  language?: 'en' | 'vi';
  locale?: 'en' | 'vi';
}

interface ActionItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  keywords?: string;
  icon: React.ElementType;
  action: () => void;
}

function subscribeLang(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getLangSnapshot(): 'en' | 'vi' {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('soodfolio_lang');
  if (saved === 'vi' || saved === 'en') return saved;
  if (typeof document !== 'undefined' && document.documentElement.lang === 'vi') return 'vi';
  return 'en';
}

function getLangServerSnapshot(): 'en' | 'vi' {
  return 'en';
}

function CommandPaletteModal({
  onClose,
  onNavigate,
  activeLang,
}: {
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  activeLang: 'en' | 'vi';
}) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isVi = activeLang === 'vi';

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(
    () => ({
      nav: isVi ? 'ĐIỀU HƯỚNG' : 'NAVIGATION',
      projects: isVi ? 'DỰ ÁN' : 'PROJECTS',
      contact: isVi ? 'LIÊN HỆ & LIÊN KẾT' : 'CONTACT & LINKS',
    }),
    [isVi]
  );

  const actions: ActionItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-summary',
        category: categories.nav,
        title: isVi ? '01 / Tổng quan & Tuyên ngôn' : '01 / Summary & Manifesto',
        subtitle: isVi ? 'Giới thiệu bản thân, tiểu sử, chỉ số năng lực' : 'Hero statement, bio, quick metrics',
        keywords: 'summary manifesto intro bio metrics tong quan gioi thieu tieu su chi so',
        icon: Terminal,
        action: () => {
          onNavigate('summary');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        category: categories.nav,
        title: isVi ? '02 / Kinh nghiệm làm việc' : '02 / Work Experience',
        subtitle: isVi ? 'Kỹ thuật fintech & thành tựu tại BW Industrial' : 'BW Industrial fintech engineering & achievements',
        keywords: 'experience work history fintech bw industrial thanh tuu kinh nghiem lich su lam viec',
        icon: Briefcase,
        action: () => {
          onNavigate('experience');
          onClose();
        },
      },
      {
        id: 'nav-skills',
        category: categories.nav,
        title: isVi ? '06 / Năng lực kỹ thuật' : '06 / Technical Capabilities',
        subtitle: isVi ? 'Ngôn ngữ, framework, cơ sở dữ liệu và công cụ AI' : 'Languages, frameworks, databases, and AI tooling',
        keywords: 'skills capabilities tech stack tools ky nang nang luc cong nghe framework database ai',
        icon: Code2,
        action: () => {
          onNavigate('skills');
          onClose();
        },
      },
      {
        id: 'nav-education',
        category: categories.nav,
        title: isVi ? '07 / Nền tảng học vấn & Ngôn ngữ' : '07 / Academic Foundation & Languages',
        subtitle: isVi ? 'Bằng KHMT Trường ĐH Mở TP.HCM & trình độ ngoại ngữ' : 'HCMCOU CS degree & language proficiencies',
        keywords: 'education academic university hcmcou degree languages hoc van bang cap dai hoc mo ngon ngu',
        icon: FileText,
        action: () => {
          onNavigate('education');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        category: categories.nav,
        title: isVi ? '08 / Liên hệ trực tiếp & Mạng xã hội' : '08 / Direct Contact & Network',
        subtitle: isVi ? 'Đồng hồ Sài Gòn, sao chép email, mạng xã hội' : 'Saigon live clock, copy email, socials',
        keywords: 'contact network saigon email phone socials lien he truc tiep mang xa hoi',
        icon: Mail,
        action: () => {
          onNavigate('contact');
          onClose();
        },
      },

      // Projects
      {
        id: 'proj-flexiconnect',
        category: categories.projects,
        title: 'FlexiConnect Web',
        subtitle: isVi ? 'Nền tảng tuyển dụng việc làm Spring Boot + ReactJS' : 'Spring Boot + ReactJS Job Portal Platform',
        keywords: 'project 01 flexiconnect recruitment job portal spring boot react du an tuyen dung',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-01');
          onClose();
        },
      },
      {
        id: 'proj-restaurant',
        category: categories.projects,
        title: isVi ? 'Ứng dụng Đặt món & Nhà hàng' : 'Food Delivery & Restaurant App',
        subtitle: isVi ? 'Hệ sinh thái di động React Native + Django REST' : 'React Native + Django REST mobile ecosystem',
        keywords: 'project 02 restaurant food delivery react native django rest dat mon an du an',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-02');
          onClose();
        },
      },
      {
        id: 'proj-portfolio',
        category: categories.projects,
        title: 'Dev Portfolio Engine',
        subtitle: isVi ? 'Kiến trúc typography tĩnh Next.js 16 SSG' : 'Next.js 16 SSG Typographic architecture',
        keywords: 'project 03 portfolio dev nextjs typescript ssg typography soodfolio du an',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-03');
          onClose();
        },
      },

      // Contact & Links
      {
        id: 'contact-copy-email',
        category: categories.contact,
        title: copiedEmail
          ? isVi
            ? 'Đã sao chép: thinhthai963@gmail.com'
            : 'Copied: thinhthai963@gmail.com'
          : isVi
            ? 'Sao chép Email: thinhthai963@gmail.com'
            : 'Copy Email: thinhthai963@gmail.com',
        subtitle: copiedEmail
          ? isVi
            ? 'Đã lưu địa chỉ vào bộ nhớ tạm!'
            : 'Email copied to clipboard successfully!'
          : isVi
            ? 'Sao chép địa chỉ email vào bộ nhớ tạm'
            : 'Copy email address to clipboard',
        keywords: 'email mail copy thinhthai963 sao chep hop thu',
        icon: copiedEmail ? Check : Copy,
        action: () => {
          try {
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
              navigator.clipboard.writeText('thinhthai963@gmail.com');
            }
          } catch {}
          setCopiedEmail(true);
          playClickSound();
          setTimeout(() => {
            setCopiedEmail(false);
            onClose();
          }, 850);
        },
      },
      {
        id: 'contact-github',
        category: categories.contact,
        title: isVi ? 'Mở Hồ sơ GitHub' : 'Open GitHub Profile',
        subtitle: 'github.com/soodthin',
        keywords: 'github code repository open source soodthin git',
        icon: GithubIcon,
        action: () => {
          window.open('https://github.com/soodthin', '_blank');
          onClose();
        },
      },
      {
        id: 'contact-linkedin',
        category: categories.contact,
        title: isVi ? 'Mở Hồ sơ LinkedIn' : 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/thinhthai',
        keywords: 'linkedin network cv profile thinhthai',
        icon: LinkedinIcon,
        action: () => {
          window.open('https://linkedin.com/in/thinhthai', '_blank');
          onClose();
        },
      },
      {
        id: 'contact-phone',
        category: categories.contact,
        title: isVi ? 'Gọi: 0869922096' : 'Call: 0869922096',
        subtitle: isVi ? 'Đường dây điện thoại / Zalo trực tiếp' : 'Direct telephone & Zalo line',
        keywords: 'phone tel call zalo dien thoai 0869922096',
        icon: Phone,
        action: () => {
          window.location.href = 'tel:0869922096';
          onClose();
        },
      },
    ],
    [categories, isVi, copiedEmail, onNavigate, onClose]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase().trim();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
        (a.keywords && a.keywords.toLowerCase().includes(q))
    );
  }, [actions, query]);

  const safeSelectedIdx = filtered.length > 0 ? Math.min(selectedIdx, filtered.length - 1) : 0;

  // Keyboard navigation inside palette (safely guarded against division by zero / NaN)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filtered.length === 0) return;
        setSelectedIdx((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filtered.length === 0) return;
        setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered.length > 0 && filtered[safeSelectedIdx]) {
          filtered[safeSelectedIdx].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filtered, safeSelectedIdx, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#10131c]">
          <Search className="h-4 w-4 text-[#0d9488] dark:text-[#2dd4bf] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder={
              isVi
                ? 'Nhập lệnh hoặc chuyển đến mục... (Nhấn Esc để đóng)'
                : 'Type a command or jump to section... (Press Esc to close)'
            }
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIdx(0);
              }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label={isVi ? 'Xóa tìm kiếm' : 'Clear search'}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-300/80 dark:border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-slate-500 dark:text-slate-400">
              {isVi ? 'Không tìm thấy lệnh phù hợp.' : 'No matching commands found.'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = safeSelectedIdx === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#0d9488] text-white dark:bg-[#2dd4bf] dark:text-[#080d12] shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white dark:bg-black/15 dark:text-[#080d12]'
                          : 'bg-[#0d9488]/10 text-[#0d9488] dark:bg-[#2dd4bf]/10 dark:text-[#2dd4bf]'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-xs sm:text-sm font-mono font-medium truncate ${
                          isSelected
                            ? 'text-white dark:text-[#080d12] font-semibold'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected
                              ? 'text-white/80 dark:text-[#080d12]/80'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                    <span
                      className={`${
                        isSelected
                          ? 'text-white/75 dark:text-[#080d12]/75 font-medium'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`h-3.5 w-3.5 ${
                        isSelected
                          ? 'text-white dark:text-[#080d12]'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#08090d] border-t border-slate-200 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>{isVi ? '↑↓ Điều hướng' : '↑↓ Navigate'}</span>
            <span>{isVi ? '↵ Chọn' : '↵ Select'}</span>
            <span>{isVi ? 'ESC Đóng' : 'ESC Close'}</span>
          </div>
          <div className="text-[#0d9488] dark:text-[#2dd4bf]/90 font-semibold tracking-wide">
            THAI DO THINH // 2026
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  lang,
  language,
  locale,
}: CommandPaletteProps) {
  const syncedLang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);
  const activeLang = lang || language || locale || syncedLang;

  if (!isOpen) return null;

  return (
    <CommandPaletteModal
      onClose={onClose}
      onNavigate={onNavigate}
      activeLang={activeLang}
    />
  );
}
