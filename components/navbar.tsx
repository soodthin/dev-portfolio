'use client';

import { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  slideIndex: number;
  matches?: (index: number) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'SUMMARY', slideIndex: 0, matches: (idx) => idx === 0 },
  { label: 'EXPERIENCE', slideIndex: 1, matches: (idx) => idx === 1 },
  { label: 'PROJECTS', slideIndex: 2, matches: (idx) => idx >= 2 && idx <= 4 },
  { label: 'SKILLS', slideIndex: 5, matches: (idx) => idx === 5 },
  { label: 'EDUCATION', slideIndex: 6, matches: (idx) => idx === 6 },
  { label: 'CONTACT', slideIndex: 7, matches: (idx) => idx === 7 },
];

interface NavbarProps {
  activeIndex?: number;
  onSelectSlide?: (index: number) => void;
}

export function Navbar({ activeIndex = 0, onSelectSlide }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prevActiveNavRef = useRef(0);
  const [isLeaping, setIsLeaping] = useState(false);

  const activeNavIdx = NAV_ITEMS.findIndex((item) =>
    item.matches ? item.matches(activeIndex) : activeIndex === item.slideIndex
  );

  useEffect(() => {
    if (prevActiveNavRef.current === NAV_ITEMS.length - 1 && activeNavIdx === 0) {
      setIsLeaping(true);
      const timer = setTimeout(() => setIsLeaping(false), 550);
      return () => clearTimeout(timer);
    } else {
      setIsLeaping(false);
    }
    prevActiveNavRef.current = activeNavIdx;
  }, [activeNavIdx]);

  useEffect(() => {
    const updatePosition = () => {
      const currentEl = itemRefs.current[activeNavIdx];
      const navEl = navRef.current;
      if (currentEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const itemRect = currentEl.getBoundingClientRect();
        setIndicator({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
          ready: true,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeNavIdx]);

  const handleNavClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onSelectSlide) {
      onSelectSlide(index);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-[#1c274a] bg-[#070b18]/85 backdrop-blur-md transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6 lg:gap-10">
        <a 
          href="#summary" 
          onClick={(e) => handleNavClick(e, 0)}
          className="font-mono text-xs sm:text-sm tracking-widest font-bold text-[#f1edff] uppercase hover:text-[#7ea2f8] transition-colors shrink-0"
        >
          THAI DO THINH <span className="text-[#6479a8] font-normal">// SOODTHIN</span>
        </a>

        <nav 
          ref={navRef}
          className="relative hidden md:flex items-center gap-1 lg:gap-1.5 text-[11px] lg:text-xs font-mono tracking-wider p-1 rounded-xl bg-[#090e21]/70 border border-[#1d2b56]/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] shrink-0"
        >
          {indicator.ready && (
            <div
              className={`absolute top-1 bottom-1 rounded-lg bg-[#14224a] border border-[#f8c076]/60 shadow-[0_0_16px_rgba(248,192,118,0.25)] pointer-events-none transition-all ${
                isLeaping 
                  ? 'duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] scale-105' 
                  : 'duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'
              }`}
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
              }}
            />
          )}

          {NAV_ITEMS.map((item, idx) => {
            const isActive = idx === activeNavIdx;

            return (
              <a
                key={item.slideIndex}
                ref={(el) => { itemRefs.current[idx] = el; }}
                href="#"
                onClick={(e) => handleNavClick(e, item.slideIndex)}
                className={`relative z-10 px-2.5 lg:px-3 py-1.5 rounded-lg transition-colors duration-200 uppercase ${
                  isActive
                    ? 'text-[#f8c076] font-bold drop-shadow-[0_0_8px_rgba(248,192,118,0.4)]'
                    : 'text-[#96a7d1] hover:text-[#f8c076]'
                }`}
              >
                [ {item.label} ]
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase border border-[#2d3e70] bg-[#0c142b] text-[#d3cbff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c274a] bg-[#090e1f] px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <div key={item.slideIndex}>
              <a
                href="#"
                onClick={(e) => handleNavClick(e, item.slideIndex)}
                className={`block text-xs font-mono tracking-wider py-1 uppercase ${
                  (item.matches ? item.matches(activeIndex) : activeIndex === item.slideIndex)
                    ? 'text-[#f8c076] font-bold'
                    : 'text-[#a9b9dc]'
                }`}
              >
                [ {item.label} ]
              </a>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
