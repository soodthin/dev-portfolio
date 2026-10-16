'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  Layers,
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


interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface ActionItem {
  id: string;
  category: 'NAVIGATION' | 'PROJECTS' | 'CONTACT & LINKS';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIdx(0);
      setQuery('');
    }
  }, [isOpen]);

  const actions: ActionItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-summary',
        category: 'NAVIGATION',
        title: '01 / Summary & Manifesto',
        subtitle: 'Hero statement, bio, quick metrics',
        icon: Terminal,
        action: () => onNavigate('summary'),
      },
      {
        id: 'nav-experience',
        category: 'NAVIGATION',
        title: '02 / Work Experience',
        subtitle: 'BW Industrial fintech engineering & achievements',
        icon: Briefcase,
        action: () => onNavigate('experience'),
      },
      {
        id: 'nav-skills',
        category: 'NAVIGATION',
        title: '06 / Technical Capabilities',
        subtitle: 'Languages, frameworks, databases, and AI tooling',
        icon: Code2,
        action: () => onNavigate('skills'),
      },
      {
        id: 'nav-education',
        category: 'NAVIGATION',
        title: '07 / Academic Foundation & Languages',
        subtitle: 'HCMCOU CS degree & language proficiencies',
        icon: FileText,
        action: () => onNavigate('education'),
      },
      {
        id: 'nav-contact',
        category: 'NAVIGATION',
        title: '08 / Direct Contact & Network',
        subtitle: 'Saigon live clock, copy email, socials',
        icon: Mail,
        action: () => onNavigate('contact'),
      },

      // Projects
      {
        id: 'proj-flexiconnect',
        category: 'PROJECTS',
        title: 'FlexiConnect Web',
        subtitle: 'Spring Boot + ReactJS Job Portal Platform',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-01');
        },
      },
      {
        id: 'proj-restaurant',
        category: 'PROJECTS',
        title: 'Food Delivery & Restaurant App',
        subtitle: 'React Native + Django REST mobile ecosystem',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-02');
        },
      },
      {
        id: 'proj-portfolio',
        category: 'PROJECTS',
        title: 'Dev Portfolio Engine',
        subtitle: 'Next.js 16 SSG Typographic architecture',
        icon: ExternalLink,
        action: () => {
          onNavigate('project-03');
        },
      },

      // Contact & Links
      {
        id: 'contact-copy-email',
        category: 'CONTACT & LINKS',
        title: 'Copy Email: thinhthai963@gmail.com',
        subtitle: 'Copy email address to clipboard',
        icon: Copy,
        action: () => {
          navigator.clipboard.writeText('thinhthai963@gmail.com');
          setCopiedEmail(true);
          playClickSound();
          setTimeout(() => setCopiedEmail(false), 2000);
        },
      },
      {
        id: 'contact-github',
        category: 'CONTACT & LINKS',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/soodthin',
        icon: GithubIcon,
        action: () => {
          window.open('https://github.com/soodthin', '_blank');
        },
      },
      {
        id: 'contact-linkedin',
        category: 'CONTACT & LINKS',
        title: 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/thinhthai',
        icon: LinkedinIcon,
        action: () => {
          window.open('https://linkedin.com/in/thinhthai', '_blank');
        },
      },
      {
        id: 'contact-phone',
        category: 'CONTACT & LINKS',
        title: 'Call: 0869922096',
        subtitle: 'Direct telephone line',
        icon: Phone,
        action: () => {
          window.location.href = 'tel:0869922096';
        },
      },
    ],
    [onNavigate]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(q))
    );
  }, [actions, query]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) {
          filtered[selectedIdx].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIdx, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c0e14] border border-white/15 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#10131c]">
          <Search className="h-4 w-4 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder="Type a command or jump to section... (Press Esc to close)"
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-400 text-black' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-black/10 text-black' : 'bg-white/5 text-amber-400'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-xs sm:text-sm font-mono font-medium truncate ${
                          isSelected ? 'text-black' : 'text-slate-100'
                        }`}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-black/70' : 'text-slate-400'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                    <span className={`${isSelected ? 'text-black/60' : 'text-slate-500'}`}>
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`h-3.5 w-3.5 ${isSelected ? 'text-black' : 'text-slate-500'}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#08090d] border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="text-amber-400/80">THAI DO THINH // 2026</div>
        </div>
      </div>
    </div>
  );
}
