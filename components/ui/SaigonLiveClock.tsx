'use client';

import React, { useEffect, useState } from 'react';

interface SaigonLiveClockProps {
  className?: string;
  showDate?: boolean;
}

export function SaigonLiveClock({ className = '', showDate = false }: SaigonLiveClockProps) {
  const [timeStr, setTimeStr] = useState<string>('00:00:00');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Ho_Chi_Minh (UTC+7)
      const formattedTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);

      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(now);

      setTimeStr(formattedTime);
      setDateStr(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] ${className}`}>
      {/* Calm solid status dot, strictly no animate-ping or animate-pulse */}
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      <span className="tracking-wider uppercase">Ho Chi Minh City / GMT+7</span>
      <span className="text-[var(--text)] font-semibold tabular-nums tracking-widest">{timeStr}</span>
      {showDate && <span className="opacity-60 hidden sm:inline">({dateStr})</span>}
    </div>
  );
}
