'use client';

import React from 'react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';

export function Footer() {
  const { data, t } = usePortfolio();

  return (
    <footer className="w-full border-t border-[var(--hairline)] bg-[var(--surface-1)] py-8 px-4 sm:px-6 lg:px-8 text-[var(--text-muted)] no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-[var(--text)] font-semibold tracking-wider uppercase">
            {data.profile.name}
          </span>
          <span className="mx-2 opacity-40">/</span>
          <span>© 2026 All Rights Reserved</span>
        </div>

        <div className="text-center md:text-right opacity-80 text-[11px] max-w-md">
          {t.contact.colophon}
        </div>
      </div>
    </footer>
  );
}
