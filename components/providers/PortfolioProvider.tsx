'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Locale, PortfolioData } from '@/types/portfolio';
import { portfolioData } from '@/data/portfolio-data';
import { translations, Translations } from '@/lib/i18n';

interface PortfolioContextValue {
  lang: Locale;
  setLang: (lang: Locale) => void;
  toggleLang: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  data: PortfolioData;
  t: Translations;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('summary');
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  // Initialize theme and lang from document / localStorage after mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('soodfolio-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        const isDark = document.documentElement.classList.contains('dark');
        setThemeState(isDark ? 'dark' : 'light');
      }

      const savedLang = localStorage.getItem('soodfolio-lang');
      if (savedLang === 'en' || savedLang === 'vi') {
        setLangState(savedLang);
      }
    } catch {
      // Ignore localStorage access failures in restricted environments
    }
  }, []);

  const setLang = useCallback((newLang: Locale) => {
    setLangState(newLang);
    try {
      localStorage.setItem('soodfolio-lang', newLang);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'vi' : 'en';
      try {
        localStorage.setItem('soodfolio-lang', next);
      } catch {}
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('soodfolio-theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
      } catch {}
      return next;
    });
  }, []);

  const currentData = useMemo(() => portfolioData[lang], [lang]);
  const currentTranslations = useMemo(() => translations[lang], [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      toggleTheme,
      activeSection,
      setActiveSection,
      isCommandOpen,
      setIsCommandOpen,
      data: currentData,
      t: currentTranslations,
    }),
    [
      lang,
      setLang,
      toggleLang,
      theme,
      toggleTheme,
      activeSection,
      isCommandOpen,
      currentData,
      currentTranslations,
    ]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
