'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ProjectImageStack } from '@/components/deck/ProjectImageStack';
import { Locale, translations } from '@/lib/i18n';
import {
  playSlideSwitchSound,
  toggleMuteSound,
  getMuteState,
  playClickSound,
} from '@/lib/sound';
import {
  Volume2,
  VolumeX,
  Share2,
  Maximize2,
  Minimize2,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  Sun,
  Moon,
  Globe,
  ArrowUp,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Layers,
  Calendar,
  Briefcase,
  Clock,
  Building2,
  ShieldCheck,
  Terminal,
  FileText,
  Phone,
  Sparkles,
  Award,
  Coffee,
  GitPullRequest,
  GitCommit,
  Zap,
  Database,
} from 'lucide-react';


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





// Live Saigon Clock Component (GMT+7)
function SaigonLiveClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>{timeStr || '12:00:00'} (GMT+7) · Ho Chi Minh City</span>
    </div>
  );
}

interface VerticalStackDeckProps {
  data?: any;
}

// Context Mapping for Skill section hover tooltips
const SKILL_CONTEXTS: Record<string, { type: 'exp' | 'project' | 'edu' | 'tool'; label: string }[]> = {
  JavaScript: [
    { type: 'project', label: 'FlexiConnect Web' },
    { type: 'project', label: 'Food Delivery & Restaurant App' },
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  TypeScript: [
    { type: 'exp', label: 'BW Industrial Dev JSC' },
    { type: 'project', label: 'Dev Portfolio Engine' },
  ],
  Java: [
    { type: 'project', label: 'FlexiConnect Web (Spring Boot)' },
  ],
  Python: [
    { type: 'exp', label: 'BW Industrial Dev JSC (FastAPI)' },
    { type: 'project', label: 'Food Delivery App (Django)' },
  ],
  'C++': [
    { type: 'edu', label: 'HCMCOU CS Fundamentals' },
  ],
  ReactJS: [
    { type: 'project', label: 'FlexiConnect Web' },
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  'Next.js': [
    { type: 'project', label: 'Dev Portfolio Engine' },
  ],
  'Spring Boot': [
    { type: 'project', label: 'FlexiConnect Web' },
  ],
  FastAPI: [
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  Django: [
    { type: 'project', label: 'Food Delivery & Restaurant App' },
  ],
  'Tailwind CSS': [
    { type: 'project', label: 'FlexiConnect Web' },
    { type: 'project', label: 'Dev Portfolio Engine' },
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  'RESTful API': [
    { type: 'project', label: 'FlexiConnect Web' },
    { type: 'project', label: 'Food Delivery App' },
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  PostgreSQL: [
    { type: 'exp', label: 'BW Industrial Dev JSC' },
    { type: 'project', label: 'Food Delivery & Restaurant App' },
  ],
  MySQL: [
    { type: 'project', label: 'FlexiConnect Web' },
  ],
  Redis: [
    { type: 'exp', label: 'BW Industrial Dev JSC' },
  ],
  Git: [
    { type: 'exp', label: 'BW Industrial Dev JSC' },
    { type: 'project', label: 'All Production Repositories' },
  ],
  'GitHub Actions': [
    { type: 'project', label: 'Dev Portfolio Engine (CI/CD)' },
  ],
  Postman: [
    { type: 'exp', label: 'BW Industrial Dev JSC (API Testing)' },
    { type: 'project', label: 'FlexiConnect Web' },
  ],
  Render: [
    { type: 'project', label: 'FlexiConnect Web (Cloud Host)' },
  ],
  'Claude Code': [
    { type: 'tool', label: 'AI Architecture & Workflows' },
  ],
  Codex: [
    { type: 'tool', label: 'AI Pair Programming' },
  ],
  'Antigravity (IDE)': [
    { type: 'tool', label: 'SoodFolio Platform Development' },
  ],
  'Prompt Engineering': [
    { type: 'exp', label: 'BWID Bank Statement OCR Fallback' },
  ],
  'Code Verification': [
    { type: 'exp', label: 'BWID Release Quality Control' },
  ],
};

function SkillWithContext({ name }: { name: string }) {
  const contexts = SKILL_CONTEXTS[name] || [];
  return (
    <span className="relative group/skill inline-block cursor-pointer">
      <span className="hover:text-[#92400e] dark:hover:text-[#c5a073] underline decoration-dotted decoration-slate-400/50 hover:decoration-[#92400e] dark:hover:decoration-[#c5a073] underline-offset-4 transition-colors">
        {name}
      </span>
      {contexts.length > 0 && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/skill:flex flex-col gap-1 z-30 px-3 py-2 rounded-xl bg-slate-950/95 dark:bg-[#0c1020]/95 border border-slate-700/70 dark:border-white/15 text-xs font-mono shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 text-left">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            APPLIED IN
          </span>
          {contexts.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5 text-slate-200">
              <span className="text-[#92400e] dark:text-[#c5a073] text-[10px] font-bold">
                [{c.type === 'exp' ? 'EXP' : c.type === 'project' ? 'PROJECT' : 'USAGE'}]
              </span>
              <span className="font-medium">{c.label}</span>
            </span>
          ))}
        </span>
      )}
    </span>
  );
}

export function VerticalStackDeck({ data }: VerticalStackDeckProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Floating Back to Top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScrollToTop = useCallback(() => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lang, setLang] = useState<Locale>('en');

  // Load language preference from localStorage (Default: English)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('soodfolio_lang') as Locale | null;
      if (savedLang === 'vi' || savedLang === 'en') {
        setLang(savedLang);
      }
    }
  }, []);

  const toggleLanguage = () => {
    playClickSound();
    const nextLang = lang === 'en' ? 'vi' : 'en';
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('soodfolio_lang', nextLang);
    }
  };

  const t = translations[lang];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Initialize theme and sound preferences from localStorage
  useEffect(() => {
    setIsMuted(getMuteState());

    const savedTheme = localStorage.getItem('soodfolio-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    playClickSound();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('soodfolio-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  // Flow with 8 distinct slides: Summary -> Exp -> Proj 1 -> Proj 2 -> Proj 3 -> Skills -> Education -> Contact
  const navItems = useMemo(
    () => [
      { id: 'summary', number: '01', label: t.nav.summary },
      { id: 'experience', number: '02', label: t.nav.experience },
      { id: 'project-01', number: '03', label: lang === 'vi' ? 'DỰ ÁN: FLEXICONNECT' : 'PROJ: FLEXICONNECT' },
      { id: 'project-02', number: '04', label: lang === 'vi' ? 'DỰ ÁN: RESTAURANT' : 'PROJ: RESTAURANT' },
      { id: 'project-03', number: '05', label: lang === 'vi' ? 'DỰ ÁN: PORTFOLIO' : 'PROJ: PORTFOLIO' },
      { id: 'skills', number: '06', label: t.nav.skills },
      { id: 'education', number: '07', label: lang === 'vi' ? 'HỌC VẤN & NGÔN NGỮ' : 'EDUCATION & LANGS' },
      { id: 'contact', number: '08', label: t.nav.contact },
    ],
    [t.nav, lang]
  );

  const scrollToSection = useCallback((id: string) => {
    playClickSound();
    const targetId = id === 'works' ? 'project-01' : id === 'trajectory' ? 'experience' : id;
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Global Keyboard Shortcuts: Numbers 1-8 for Quick Slide Jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key >= '1' && e.key <= '8' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const idx = parseInt(e.key, 10) - 1;
        const targetSections = [
          'summary',
          'experience',
          'project-01',
          'project-02',
          'project-03',
          'skills',
          'education',
          'contact',
        ];
        if (targetSections[idx]) {
          e.preventDefault();
          scrollToSection(targetSections[idx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToSection]);

  // High-performance scroll tracking via IntersectionObserver (zero layout thrashing)
  useEffect(() => {
    const handleScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(scrollY > 400);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();

    const sectionIds = [
      'summary',
      'experience',
      'project-01',
      'project-02',
      'project-03',
      'skills',
      'education',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveIdx(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollState);
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const toggleSound = () => {
    const muted = toggleMuteSound();
    setIsMuted(muted);
    if (!muted) playClickSound();
  };

  const toggleFullscreen = () => {
    playClickSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const shareDeck = () => {
    playClickSound();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const copyEmail = () => {
    playClickSound();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('thinhthai963@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const directEmail = 'thinhthai963@gmail.com';
  const userAvatar = data?.profile?.avatarUrl || data?.avatarUrl || '/images/avatar.jpg';
  const userTitle = data?.profile?.name || data?.title || 'THAI DO THINH';
  const userTagline = data?.profile?.title || data?.tagline || 'Software Engineer // Full-Stack Developer';
  const userBio = data?.profile?.roleDescription || data?.bio || t.hero.bio;

  // Multi-image collections for Project Image Stacks (Ngan xep hinh)
  const project1Images = ['/images/flexiconnect1.png', '/images/flexiconnect2.png'];
  const project2Images = ['/images/restaurant1.png', '/images/restaurant2.png'];

  return (
    <main className="relative min-h-screen bg-[#f4f1ea] dark:bg-[#0d0e12] text-slate-800 dark:text-slate-100 selection:bg-[#c5a073]/30 selection:text-white font-sans antialiased transition-colors duration-200">

      {/* Architectural Grid Background (Quiet Luxury Vignette & Soft Ambient Lighting) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Light Mode Grid: Warm Paper Hairlines with Organic Vignette */}
        <div
          className="absolute inset-0 dark:hidden [mask-image:radial-gradient(ellipse_80%_65%_at_50%_25%,black_45%,transparent_92%)]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(60, 50, 40, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(60, 50, 40, 0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Dark Mode Grid: Champagne Gold Hairlines with Organic Vignette Mask */}
        <div
          className="absolute inset-0 hidden dark:block [mask-image:radial-gradient(ellipse_80%_65%_at_50%_25%,black_40%,transparent_92%)]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(197, 160, 115, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 160, 115, 0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient Top Champagne Gold Halo (Soft Studio Lighting for Quiet Luxury) */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[560px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 16%, rgba(197, 160, 115, 0.07) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* EDITORIAL FLOATING HEADER                                                 */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-12 py-3.5 flex items-center justify-between backdrop-blur-md bg-[#f4f1ea]/90 dark:bg-[#0d0e12]/85 border-b border-[#d6cfbe] dark:border-white/[0.07] shadow-[0_1px_8px_rgba(60,50,40,0.04)] transition-colors duration-200">
        {/* Left: Identity Logo */}
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#92400e] dark:bg-[#c5a073] shadow-[0_0_8px_rgba(197,160,115,0.7)]" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-950 dark:text-white font-bold">
            {userTitle}
          </span>
          <span className="hidden sm:inline-block text-slate-400 dark:text-slate-600 font-mono text-xs">/</span>
          <span className="hidden sm:inline-block font-mono text-xs text-slate-700 dark:text-slate-400 font-medium tracking-wide">
            {t.header.role}
          </span>
        </div>

        {/* Right: Action Controls (Theme, Sound, Fullscreen, Contact) */}
        <div className="flex items-center gap-2">

          {/* Language Toggle (EN / VI) */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-mono text-xs font-bold"
            title={t.header.langTooltip}
          >
            <Globe className="h-3.5 w-3.5 text-[#92400e] dark:text-[#c5a073]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            title={theme === 'dark' ? t.header.lightTooltip : t.header.darkTooltip}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#c5a073]" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Share Deck URL */}
          <button
            type="button"
            onClick={shareDeck}
            className="p-2 rounded-lg bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            title={t.header.shareTooltip}
          >
            {copiedShare ? (
              <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-lg bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            title={isMuted ? t.header.soundOnTooltip : t.header.soundOffTooltip}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073]" />
            )}
          </button>

          {/* Fullscreen Toggle (Hidden on mobile phones) */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-lg bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073]" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="ml-1 px-4 py-1.5 rounded-lg bg-[#92400e] dark:bg-[#c5a073] hover:bg-[#78350f] dark:hover:bg-[#d8b488] text-white dark:text-[#0d0e12] font-semibold text-xs font-mono tracking-wider transition-all cursor-pointer active:scale-95 shadow-[0_2px_12px_rgba(197,160,115,0.25)]"
          >
            {t.header.contactBtn}
          </button>
        </div>
      </header>

      {/* Top Depth Edge Fade (Subtle dissolution at top edge to create depth without obscuring cards) */}
      <div 
        className="fixed top-[57px] left-0 right-0 h-16 pointer-events-none z-30 bg-gradient-to-b from-[#f4f1ea] dark:from-[#0d0e12] via-[#f4f1ea]/60 dark:via-[#0d0e12]/60 to-transparent [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]" 
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* FLOATING RIGHT SECTION TRACKER (AUTO-DIMS WHEN IDLE)                      */}
      {/* ========================================================================= */}
      <aside 
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-end gap-3 transition-opacity duration-300 ease-out ${
          isScrolling ? 'opacity-90' : 'opacity-60 hover:opacity-100'
        }`}
      >
        {navItems.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center gap-2 cursor-pointer py-1 text-right transition-all"
            >
              <span
                className={`font-mono text-[10px] tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[#92400e] dark:text-[#c5a073] font-bold opacity-100 translate-x-0'
                    : 'text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {item.number} · {item.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-2 h-2 bg-[#92400e] dark:bg-[#c5a073] shadow-[0_0_8px_rgba(197,160,115,0.7)]'
                    : 'w-1.5 h-1.5 bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400 dark:group-hover:bg-white/50'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Main Content Container - Expanded Full Width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 pt-28 pb-20 space-y-32">
        {/* ======================================================================= */}
        {/* SECTION 01: HERO (MASSIVE TYPOGRAPHY & OVERLAPPING PORTRAIT)           */}
        {/* ======================================================================= */}
        <section
          id="summary"
          className="w-full max-w-[1280px] mx-auto space-y-10 pt-4 pb-4"
          style={{ paddingInline: 'clamp(20px, 5vw, 72px)' }}
        >
          {/* Eyebrow Status Ribbon */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#92400e] dark:bg-[#c5a073] shadow-[0_0_6px_rgba(197,160,115,0.5)]" />
              {t.hero.available}
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-700 dark:text-slate-400">{t.hero.location}</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-700 dark:text-slate-400">{t.hero.school}</span>
          </div>

          {/* Top Row: [ Name 2 lines + Title line ] [ Circular Avatar ] */}
          <div className="grid grid-cols-1 min-[820px]:grid-cols-[1fr_260px] lg:min-[820px]:grid-cols-[1fr_280px] gap-8 lg:gap-12 items-center">
            {/* Left Column: Name (2 lines: THAI DO / THINH) & Title Line */}
            <div className="min-w-0 space-y-3 sm:space-y-4">
              <h1
                className="font-black uppercase tracking-tight text-slate-950 dark:text-white leading-[0.88] select-none"
                style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.75rem)' }}
              >
                <span className="block">THAI DO</span>
                <span className="block">THINH</span>
              </h1>

              {/* Title Line */}
              <p className="text-sm sm:text-base lg:text-lg font-mono text-[#92400e] dark:text-[#c5a073] font-semibold tracking-wide uppercase pt-1">
                {lang === 'vi' ? t.hero.tagline : userTagline.replace(/\s*\/\/\s*/g, ' · ')}
              </p>
            </div>

            {/* Right Column: Circular Avatar */}
            <div className="flex justify-center min-[820px]:justify-end items-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 aspect-square overflow-hidden rounded-full bg-[#ede8dd] dark:bg-[#121318] ring-1 ring-[#92400e]/25 dark:ring-[#c5a073]/35 border-2 border-[#d6cfbe] dark:border-white/10 shadow-[0_0_35px_rgba(197,160,115,0.08)]">
                <img
                  src={userAvatar}
                  alt={userTitle}
                  className="w-full h-full object-cover scale-[1.25] transition-transform duration-500 hover:scale-[1.32]"
                  style={{ objectPosition: '50% 72%' }}
                />
              </div>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="pt-2">
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-300 leading-relaxed font-sans w-full">
              {lang === 'vi' ? t.hero.bio : userBio}
            </p>
          </div>

          {/* 4 Quick Stat Metric Cards */}
          <div className="border-t border-[#d6cfbe] dark:border-white/10 pt-6 sm:pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat 1 */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121318]/60 border border-[#d6cfbe]/80 dark:border-white/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-slate-950 dark:text-white tracking-tight tabular-nums">
                10+
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-400 mt-1 font-sans">
                {t.hero.stat1Label}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121318]/60 border border-[#d6cfbe]/80 dark:border-white/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-slate-950 dark:text-white tracking-tight tabular-nums">
                1d → 2h
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-400 mt-1 font-sans">
                {t.hero.stat2Label}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121318]/60 border border-[#d6cfbe]/80 dark:border-white/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-slate-950 dark:text-white tracking-tight tabular-nums">
                75%
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-400 mt-1 font-sans">
                {t.hero.stat3Label}
              </span>
            </div>

            {/* Stat 4 */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121318]/60 border border-[#d6cfbe]/80 dark:border-white/10 flex flex-col justify-between">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 tracking-tight tabular-nums">
                100%
              </span>
              <span className="text-xs text-slate-700 dark:text-slate-400 mt-1 font-sans">
                {lang === 'vi' ? 'Bảo mật doanh nghiệp & CI/CD' : 'Production Security & CI/CD'}
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 02: EXPERIENCE (MINIMALIST WORK HISTORY & EDUCATION)           */}
        {/* ======================================================================= */}
        {/* ======================================================================= */}
        {/* SECTION 02: EXPERIENCE (MINIMALIST WORK HISTORY & EDUCATION)           */}
        {/* ======================================================================= */}
        <section id="experience" className="space-y-10 pt-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
            <div>
              <span className="text-[#92400e] dark:text-[#c5a073] font-mono text-xs tracking-wider uppercase block mb-1 font-bold">
                {t.experience.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
                {t.experience.title}
              </h2>
            </div>
          </div>

          {/* Career Lifecycle Timeline Track */}
          <div className="relative pl-7 sm:pl-10 lg:pl-12 space-y-10 sm:space-y-12">
            {/* Continuous Vertical Career Lifecycle Spine */}
            <div 
              className="absolute left-[11px] sm:left-[15px] lg:left-[19px] top-3 bottom-6 w-[2px] bg-gradient-to-b from-[#92400e] dark:from-[#c5a073] via-[#92400e]/40 dark:via-[#c5a073]/40 to-slate-300 dark:to-white/10 pointer-events-none" 
              aria-hidden="true"
            />

            {/* CAREER MILESTONE 01: Corporate Engineering Experience */}
            <div className="relative space-y-3">
              {/* Timeline Node Marker 01 */}
              <div className="absolute -left-[26px] sm:-left-[34px] lg:-left-[38px] top-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-5 h-5 rounded-full bg-[#fbfaf7] dark:bg-[#121318] border-2 border-[#92400e] dark:border-[#c5a073] flex items-center justify-center shadow-[0_0_10px_rgba(197,160,115,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
                </div>
              </div>

              {/* Milestone Header */}
              <div className="flex items-center gap-2 font-mono text-xs text-[#92400e] dark:text-[#c5a073] font-bold">
                <span>01</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span>{t.experience.tag1}</span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal">{t.experience.period1}</span>
              </div>

              {/* Minimalist Corporate Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-[#d6cfbe] dark:border-white/[0.07] bg-white/95 dark:bg-[#121318]/90 dark:backdrop-blur-sm space-y-6 shadow-[0_2px_12px_rgba(60,50,40,0.06)] dark:shadow-xl">
            {/* Header: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073] border border-[#92400e]/20 dark:border-[#c5a073]/25">
                  <Building2 className="h-3 w-3" />
                  <span>BW INDUSTRIAL DEVELOPMENT JSC</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight pt-1">
                  {t.experience.role1}
                </h3>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                  <span>{t.experience.location1}</span>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="px-3 py-1 rounded-lg bg-[#ede8dd] dark:bg-white/5 border border-[#d6cfbe] dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold">
                  Oct 2025 — Apr 2026
                </span>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1 font-semibold">
                  {t.experience.badge1}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {t.experience.desc1}
            </p>

            {/* 4 Clean High-Signal Engineering Accomplishments */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-mono font-bold text-[#92400e] dark:text-[#c5a073] uppercase tracking-wider">
                {t.experience.deliverablesHeader}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white font-mono text-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0" />
                    <span>Bank Statement Parsing (10+ Banks)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Built FastAPI REST parsers for Vietcombank, Techcombank, BIDV, ACB, MBBank, with Gemini OCR fallback for scanned receipts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white font-mono text-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0" />
                    <span>Cash Report Automation (1 Day → 2 Hrs)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Engineered session-based reconciliation matching multi-file cash reports based on finance rule feedback, cutting processing time by 75%.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white font-mono text-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0" />
                    <span>Enterprise SSO & Session Tracking</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Implemented domain-locked Google OAuth2 SSO, JWT access tokens with device session tracking via Redis, and granular RBAC.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white font-mono text-xs">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0" />
                    <span>SSE Real-time Tracker & AI Telemetry</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    Built React UI with SSE progress tracking for long-running batch jobs, centralized logging, and internal AI cost usage tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2 border-t border-[#d6cfbe] dark:border-white/10 flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">TECH STACK:</span>
              {['FastAPI', 'Python', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Google OAuth2', 'SSE', 'Gemini AI'].map((t) => (
                <span key={t} className="px-2.5 py-0.5 rounded-md bg-[#ede8dd] dark:bg-white/5 border border-[#d6cfbe] dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

        {/* ======================================================================= */}
        {/* SECTION 03: PROJECTS (SELECTED WORKS - CONTENT LEFT, STACK RIGHT)       */}
        {/* ======================================================================= */}
        <section id="works" className="space-y-16 pt-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
            <div>
              <span className="text-[#92400e] dark:text-[#c5a073] font-mono text-xs tracking-wider uppercase block mb-1 font-bold">
                {t.works.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
                {t.works.title}
              </h2>
            </div>
          </div>

          {/* Sequential Project Stack with Interconnected Pipeline Spine */}
          <div className="relative pl-7 sm:pl-10 lg:pl-12 space-y-24 sm:space-y-32">
            {/* Continuous Vertical Architecture Spine */}
            <div 
              className="absolute left-[11px] sm:left-[15px] lg:left-[19px] top-2 bottom-8 w-[2px] bg-gradient-to-b from-[#92400e] dark:from-[#c5a073] via-[#92400e]/40 dark:via-[#c5a073]/40 to-slate-300 dark:to-white/10 pointer-events-none" 
              aria-hidden="true"
            />

            {/* PROJECT 01: FlexiConnect Web */}
            <div 
              id="project-01" 
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Spine Node Marker 01 */}
              <div className="absolute -left-[26px] sm:-left-[34px] lg:-left-[38px] top-12 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-5 h-5 rounded-full bg-[#fbfaf7] dark:bg-[#121318] border-2 border-[#92400e] dark:border-[#c5a073] flex items-center justify-center shadow-[0_0_10px_rgba(197,160,115,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
                </div>
              </div>
              {/* LEFT: Content */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5 h-full">
                <div className="flex items-center gap-2 font-mono text-xs text-[#92400e] dark:text-[#c5a073] font-bold">
                  <span>01</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span>{t.works.p1Tag}</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">2025</span>
                </div>

                <div className="space-y-1">
                  {/* DIRECT LINK ON PROJECT TITLE */}
                  <a
                    href="https://github.com/soodthin/FlexiConnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title inline-flex items-center gap-2.5 text-2xl sm:text-4xl font-black text-slate-950 dark:text-white uppercase hover:text-[#92400e] dark:hover:text-[#c5a073] transition-colors"
                  >
                    <span>FlexiConnect Web</span>
                    <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 text-[#92400e] dark:text-[#c5a073] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-transform" />
                  </a>
                  <div className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                    {t.works.p1Role}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                  {t.works.p1Desc}
                </p>

                {/* Exactly 3 Key Highlights */}
                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">{t.works.p1H1Title}</strong> {t.works.p1H1Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">{t.works.p1H2Title}</strong> {t.works.p1H2Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">{t.works.p1H3Title}</strong> {t.works.p1H3Text}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Tech Stack & Image Stack */}
              <div className="lg:col-span-5 flex flex-col justify-between items-start h-full space-y-4">
                <div className="w-full space-y-3">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-400">
                    <strong className="text-slate-950 dark:text-white font-bold uppercase tracking-wider block mb-1">{t.works.techStackLabel}</strong>
                    <span>Spring Boot · ReactJS · Vite · Tailwind CSS · MySQL · Spring Security · JWT · Render</span>
                  </div>
                  <ProjectImageStack
                    images={project1Images}
                    title="FlexiConnect Web"
                  />
                </div>
              </div>
            </div>

            {/* PROJECT 02: Food Delivery & Restaurant App */}
            <div 
              id="project-02" 
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Spine Node Marker 02 */}
              <div className="absolute -left-[26px] sm:-left-[34px] lg:-left-[38px] top-12 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-5 h-5 rounded-full bg-[#fbfaf7] dark:bg-[#121318] border-2 border-[#92400e] dark:border-[#c5a073] flex items-center justify-center shadow-[0_0_10px_rgba(197,160,115,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
                </div>
              </div>
              {/* LEFT: Content */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5 h-full">
                <div className="flex items-center gap-2 font-mono text-xs text-[#92400e] dark:text-[#c5a073] font-bold">
                  <span>02</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span>{t.works.p2Tag}</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">2025</span>
                </div>

                <div className="space-y-1">
                  {/* DIRECT LINK ON PROJECT TITLE */}
                  <a
                    href="https://github.com/soodthin/T-Restaurant-App"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/title inline-flex items-center gap-2.5 text-2xl sm:text-4xl font-black text-slate-950 dark:text-white uppercase hover:text-[#92400e] dark:hover:text-[#c5a073] transition-colors"
                  >
                    <span>Food Delivery & Restaurant App</span>
                    <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 text-[#92400e] dark:text-[#c5a073] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-transform" />
                  </a>
                  <div className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                    {t.works.p2Role}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                  {t.works.p2Desc}
                </p>

                {/* Exactly 3 Key Highlights */}
                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">Django REST Framework:</strong> Built complete REST APIs covering dynamic menus, table reservations, order lifecycle, and customer reviews.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">{t.works.p2H2Title}</strong> {t.works.p2H2Text}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">React Native & Expo:</strong> Built mobile interfaces with dual-role flows for customers and chefs, plus real-time in-app chat via Firebase.</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Tech Stack & Image Stack */}
              <div className="lg:col-span-5 flex flex-col justify-between items-start h-full space-y-4">
                <div className="w-full space-y-3">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-400">
                    <strong className="text-slate-950 dark:text-white font-bold uppercase tracking-wider block mb-1">{t.works.techStackLabel}</strong>
                    <span>React Native · Expo · Django REST · MoMo · Stripe · Firebase · PostgreSQL</span>
                  </div>
                  <ProjectImageStack
                    images={project2Images}
                    title="Food Delivery & Restaurant App"
                  />
                </div>
              </div>
            </div>

            {/* PROJECT 03: Dev Portfolio Engine */}
            <div 
              id="project-03" 
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Spine Node Marker 03 */}
              <div className="absolute -left-[26px] sm:-left-[34px] lg:-left-[38px] top-12 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-5 h-5 rounded-full bg-[#fbfaf7] dark:bg-[#121318] border-2 border-[#92400e] dark:border-[#c5a073] flex items-center justify-center shadow-[0_0_10px_rgba(197,160,115,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
                </div>
              </div>
              {/* LEFT: Content */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5 h-full">
                <div className="flex items-center gap-2 font-mono text-xs text-[#92400e] dark:text-[#c5a073] font-bold">
                  <span>03</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span>TYPOGRAPHIC STATIC ENGINE</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">2026</span>
                </div>

                <div className="space-y-1">
                  {/* DIRECT LINK ON PROJECT TITLE */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://soodthin.github.io/dev-portfolio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title inline-flex items-center gap-2.5 text-2xl sm:text-4xl font-black text-slate-950 dark:text-white uppercase hover:text-[#92400e] dark:hover:text-[#c5a073] transition-colors"
                    >
                      <span>Dev Portfolio Engine</span>
                      <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7 text-[#92400e] dark:text-[#c5a073] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-transform" />
                    </a>
                    <a
                      href="https://github.com/soodthin/dev-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium border border-slate-300 dark:border-white/15 bg-[#ede8dd] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <Code2 className="h-3.5 w-3.5 text-[#92400e] dark:text-[#c5a073]" />
                      <span>Source Code</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="text-sm sm:text-base font-mono text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                    Creator & Frontend Architect · Next.js 16 + TypeScript
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                  {t.works.p3Desc}
                </p>

                {/* Exactly 3 Key Highlights */}
                <div className="space-y-2 pt-1 font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">100% Static Export (SSG):</strong> Automated GitHub Actions pipeline building static assets with sub-50ms TTFB worldwide.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">Pure 2D Typographic Design:</strong> Flat-layered vector design system with zero icon or emoji dependencies.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#92400e] dark:text-[#c5a073] shrink-0 mt-0.5" />
                    <span><strong className="text-slate-950 dark:text-white">Strict TypeScript Safety:</strong> End-to-end typed data contracts ensuring resilience across all component hierarchies.</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Live Site Notice & Specs Card */}
              <div className="lg:col-span-5 flex flex-col justify-between items-start h-full space-y-6">
                <div className="w-full space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073] border border-[#92400e]/20 dark:border-[#c5a073]/25">
                      <span className="w-2 h-2 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
                      <span>{t.works.p3LiveBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span>⚡ 100/100 Lighthouse</span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-700 dark:text-slate-400">
                    <strong className="text-slate-950 dark:text-white font-bold uppercase tracking-wider block mb-1">{t.works.techStackLabel}</strong>
                    <span>Next.js 16 · TypeScript · Tailwind CSS v4 · GitHub Pages · GitHub Actions CI/CD</span>
                  </div>

                  <div className="p-4 rounded-xl border border-[#d6cfbe] dark:border-white/10 bg-[#fbfaf7] dark:bg-white/[0.02] space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hosting:</span>
                      <span className="text-slate-950 dark:text-white font-semibold">GitHub Pages Edge CDN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deployment:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Automated CI/CD Pipeline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type Coverage:</span>
                      <span className="text-[#92400e] dark:text-[#c5a073] font-semibold">100% Strict TypeScript</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 04: CAPABILITIES (WITH AMBIENT WATERMARK TECH SILHOUETTES)      */}
        {/* ======================================================================= */}
        <section id="skills" className="relative space-y-8 pt-6 overflow-hidden">
          {/* Subtle Ambient Watermark SVGs in Background */}
          
          {/* Section Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
            <span className="text-[#92400e] dark:text-[#c5a073] font-mono text-xs tracking-wider uppercase font-bold">
              TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase text-left sm:text-right">
              Skills & Tooling
            </h2>
          </div>

          {/* Categorized Flowing Rows with Ambient Depth */}
          <div className="relative z-10 space-y-6 font-mono text-sm">
            {/* Row 1: Languages */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-[#d6cfbe] dark:border-white/10 items-baseline backdrop-blur-[1px]">
              <div className="md:col-span-3 text-[#92400e] dark:text-[#c5a073] font-bold uppercase text-xs tracking-wider flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Code2 className="h-3.5 w-3.5" />
                </div>
                <span>LANGUAGES</span>
              </div>
              <div className="md:col-span-9 text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed flex flex-wrap items-center gap-y-2">
                {['JavaScript', 'TypeScript', 'Java', 'Python', 'C++'].map((skill, idx) => (
                  <React.Fragment key={skill}>
                    {idx > 0 && <span className="text-slate-400 dark:text-slate-600 px-1.5 select-none">·</span>}
                    <SkillWithContext name={skill} />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Row 2: Frameworks */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-[#d6cfbe] dark:border-white/10 items-baseline backdrop-blur-[1px]">
              <div className="md:col-span-3 text-[#92400e] dark:text-[#c5a073] font-bold uppercase text-xs tracking-wider flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <span>FRAMEWORKS & LIBS</span>
              </div>
              <div className="md:col-span-9 text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed flex flex-wrap items-center gap-y-2">
                {['ReactJS', 'Next.js', 'Spring Boot', 'FastAPI', 'Django', 'Tailwind CSS', 'RESTful API'].map((skill, idx) => (
                  <React.Fragment key={skill}>
                    {idx > 0 && <span className="text-slate-400 dark:text-slate-600 px-1.5 select-none">·</span>}
                    <SkillWithContext name={skill} />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Row 3: Data & Cloud DevOps */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-[#d6cfbe] dark:border-white/10 items-baseline backdrop-blur-[1px]">
              <div className="md:col-span-3 text-[#92400e] dark:text-[#c5a073] font-bold uppercase text-xs tracking-wider flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Database className="h-3.5 w-3.5" />
                </div>
                <span>DATA & DEVOPS</span>
              </div>
              <div className="md:col-span-9 text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed flex flex-wrap items-center gap-y-2">
                {['PostgreSQL', 'MySQL', 'Redis', 'Git', 'GitHub Actions', 'Postman', 'Render'].map((skill, idx) => (
                  <React.Fragment key={skill}>
                    {idx > 0 && <span className="text-slate-400 dark:text-slate-600 px-1.5 select-none">·</span>}
                    <SkillWithContext name={skill} />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Row 4: AI Engineering */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 border-b border-[#d6cfbe] dark:border-white/10 items-baseline backdrop-blur-[1px]">
              <div className="md:col-span-3 text-[#92400e] dark:text-[#c5a073] font-bold uppercase text-xs tracking-wider flex items-center gap-2.5">
                <div className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span>AI TOOLING</span>
              </div>
              <div className="md:col-span-9 text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-relaxed flex flex-wrap items-center gap-y-2">
                {['Claude Code', 'Codex', 'Antigravity (IDE)', 'Prompt Engineering', 'Code Verification'].map((skill, idx) => (
                  <React.Fragment key={skill}>
                    {idx > 0 && <span className="text-slate-400 dark:text-slate-600 px-1.5 select-none">·</span>}
                    <SkillWithContext name={skill} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 07: EDUCATION & LANGUAGES (SLIDE 07)                            */}
        {/* ======================================================================= */}
        <section id="education" className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
            <div>
              <span className="text-[#92400e] dark:text-[#c5a073] font-mono text-xs tracking-wider uppercase block mb-1 font-bold">
                07 // {lang === 'vi' ? 'HỌC VẤN & NGÔN NGỮ' : 'ACADEMIC FOUNDATION & LANGUAGES'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase font-sans">
                {lang === 'vi' ? 'Nền tảng học thuật' : 'Academic Foundation'}
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              HCMCOU · OCT 2022 — PRESENT
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Degree & Coursework Card */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-[#d6cfbe] dark:border-white/[0.08] bg-white/95 dark:bg-[#121318]/90 dark:backdrop-blur-sm space-y-6 shadow-[0_2px_12px_rgba(60,50,40,0.06)] dark:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#d6cfbe] dark:border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073] border border-[#92400e]/20 dark:border-[#c5a073]/25">
                    <Award className="h-3 w-3" />
                    <span>HO CHI MINH CITY OPEN UNIVERSITY (HCMCOU)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight pt-1">
                    {t.experience.eduDegree}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {t.experience.eduSchool} · {t.experience.eduStatus}
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="px-3 py-1 rounded-lg bg-[#ede8dd] dark:bg-white/5 border border-[#d6cfbe] dark:border-white/10 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold">
                    Oct 2022 — Present
                  </span>
                </div>
              </div>

              {/* Core Coursework Grid */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#92400e] dark:text-[#c5a073] uppercase tracking-wider">
                  {t.experience.eduCourseworkLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  {[
                    'Software Engineering',
                    'Web System Development',
                    'Object-Oriented Programming (OOP)',
                    'Data Structures & Algorithms',
                    'Modern Programming Technologies',
                    'Database Management Systems',
                    'Cloud Computing',
                  ].map((course) => (
                    <div
                      key={course}
                      className="p-3 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 flex items-center gap-2.5 text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#92400e] dark:text-[#c5a073] shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-[#d6cfbe] dark:border-white/[0.08] bg-white/95 dark:bg-[#121318]/90 dark:backdrop-blur-sm flex flex-col justify-between space-y-6 shadow-[0_2px_12px_rgba(60,50,40,0.06)] dark:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#92400e] dark:text-[#c5a073] uppercase tracking-wider">
                  <Globe className="h-4 w-4" />
                  <span>{lang === 'vi' ? 'NGÔN NGỮ GIAO TIẾP' : 'LANGUAGES'}</span>
                </div>

                <div className="space-y-3 font-mono">
                  <div className="p-3.5 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {lang === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                        NATIVE
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {lang === 'vi' ? 'Tiếng mẹ đẻ' : 'Native proficiency'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fbfaf7] dark:bg-white/[0.02] border border-[#d6cfbe]/80 dark:border-white/10 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {lang === 'vi' ? 'Tiếng Anh' : 'English'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073] border border-[#92400e]/20 font-bold">
                        PROFESSIONAL
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {lang === 'vi' ? 'Làm việc & đọc tài liệu kỹ thuật chuyên sâu' : 'Professional working proficiency'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#d6cfbe]/60 dark:border-white/5 bg-[#ede8dd]/50 dark:bg-white/[0.01] text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="text-[#92400e] dark:text-[#c5a073] font-bold block mb-1">
                  // READINESS
                </span>
                <span>
                  {lang === 'vi'
                    ? 'Sẵn sàng gia nhập các dự án phát triển quy chuẩn quốc tế và môi trường đa văn hóa.'
                    : 'Ready for international engineering standards and multi-timezone teamwork.'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 08: CONTACT (SLIDE 08)                                          */}
        {/* ======================================================================= */}
        <section id="contact" className="space-y-10 pt-6 pb-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#d6cfbe] dark:border-white/10">
            <div>
              <span className="text-[#92400e] dark:text-[#c5a073] font-mono text-xs tracking-wider uppercase block mb-1 font-bold">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
                Let's Build Together.
              </h2>
            </div>
            {/* Live Clock & Response Commitment */}
            <div className="flex flex-wrap items-center gap-4">
              <SaigonLiveClock />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.contact.responseBadge}</span>
              </div>
            </div>
          </div>

          {/* Giant Copyable Email */}
          <div className="py-6 space-y-4">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t.contact.copyPrompt}
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={copyEmail}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyEmail(); }}
              className="group inline-flex items-center gap-3 sm:gap-6 cursor-pointer select-none"
              title="Click to copy email address"
            >
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-slate-950 dark:text-white group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] transition-colors break-all">
                thinhthai963@gmail.com
              </span>
              <div className="p-3 rounded-2xl bg-[#ede8dd] dark:bg-white/5 border border-[#d6cfbe] dark:border-white/10 group-hover:border-[#92400e]/50 group-hover:bg-[#92400e]/10 dark:group-hover:bg-[#c5a073]/10 text-slate-500 group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] transition-all shrink-0">
                <Copy className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            {copiedEmail && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-in fade-in duration-200 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>{t.contact.copiedToast}</span>
              </div>
            )}
          </div>

          {/* Quick Actions & Contact Channels (Clean Unboxed Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#d6cfbe] dark:border-white/10 font-mono text-xs">
            {/* Phone */}
            <a
              href="tel:0869922096"
              className="p-4 rounded-xl border border-[#d6cfbe] dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-[#92400e]/40 hover:bg-[#fbfaf7] dark:hover:bg-white/5 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073]">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">{t.contact.phoneLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#92400e] dark:group-hover:text-[#c5a073]">
                  (+84) 869 922 096
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/soodthin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[#d6cfbe] dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-[#92400e]/40 hover:bg-[#fbfaf7] dark:hover:bg-white/5 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073]">
                <GithubIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">{t.contact.githubLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] flex items-center gap-1">
                  github.com/soodthin
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thinh-thai-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[#d6cfbe] dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-[#92400e]/40 hover:bg-[#fbfaf7] dark:hover:bg-white/5 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-[#92400e]/10 dark:bg-[#c5a073]/12 text-[#92400e] dark:text-[#c5a073]">
                <LinkedinIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">{t.contact.linkedinLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] flex items-center gap-1">
                  thinh-thai-dev
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </a>

            {/* Resume / Curriculum Vitae */}
            <a
              href="https://soodthin.github.io/dev-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[#92400e]/30 dark:border-[#c5a073]/30 bg-[#92400e]/5 dark:bg-[#c5a073]/5 hover:bg-[#92400e]/10 dark:hover:bg-[#c5a073]/10 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-[#92400e]/20 dark:bg-[#c5a073]/20 text-[#92400e] dark:text-[#c5a073]">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#92400e] dark:text-[#c5a073] block uppercase font-bold">{t.contact.cvLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] flex items-center gap-1">
                  {t.contact.cvAction}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 pb-8 border-t border-[#d6cfbe] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2.5">
            <span>© 2026 THAI DO THINH. POWERED BY SOODFOLIO PLATFORM.</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#92400e]/30 dark:border-[#c5a073]/40 bg-[#92400e]/10 dark:bg-[#c5a073]/10 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#92400e] dark:bg-[#c5a073] animate-pulse" />
              <span className="text-[#92400e] dark:text-[#c5a073] font-bold">VERSION 3.0</span>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <span className="text-slate-500 dark:text-slate-400">LIVE DEMO DECK</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Next.js 16 &amp; TypeScript</span>
            <span>•</span>
            <span className="text-[#92400e] dark:text-[#c5a073]">Hosted on GitHub Pages</span>
          </div>
        </footer>
      </div>
      {/* Floating Back to Top Button (Bottom-Right) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={t.contact.backToTop}
        title={t.contact.backToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#fbfaf7]/90 dark:bg-[#121318]/90 backdrop-blur-md border border-[#d6cfbe] dark:border-white/10 shadow-lg hover:shadow-xl text-slate-700 dark:text-slate-200 hover:text-[#92400e] dark:hover:text-[#c5a073] hover:border-[#92400e]/40 transition-all duration-300 cursor-pointer group active:scale-95 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 text-slate-700 dark:text-slate-200 group-hover:text-[#92400e] dark:group-hover:text-[#c5a073] dark:group-hover:text-[#c5a073]" />
      </button>
    </main>
  );
}
