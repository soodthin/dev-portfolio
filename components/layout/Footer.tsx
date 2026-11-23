'use client';

import React from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

export function Footer() {
  const { data, t } = usePortfolio();

  return (
    <footer className="w-full border-t border-[var(--hairline)] bg-[var(--surface-1)] py-8 px-4 sm:px-6 lg:px-8 text-[var(--text-muted)] no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text)] font-medium">{data.profile.name}</span>
          <span className="opacity-40">·</span>
          <span className="font-mono tabular-nums">© 2026</span>
        </div>

        <div className="text-center md:text-right text-[var(--text-muted)]">
          {t.contact.colophon}
        </div>
      </div>
    </footer>
  );
}
