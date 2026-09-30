'use client';

import { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  slideIndex: number;
  matches?: (index: number) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Summary', slideIndex: 0, matches: (idx) => idx === 0 },
  { label: 'Experience', slideIndex: 1, matches: (idx) => idx === 1 },
  { label: 'Projects', slideIndex: 2, matches: (idx) => idx >= 2 && idx <= 4 },
  { label: 'Skills', slideIndex: 5, matches: (idx) => idx === 5 },
  { label: 'Education', slideIndex: 6, matches: (idx) => idx === 6 },
  { label: 'Contact', slideIndex: 7, matches: (idx) => idx === 7 },
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

  const activeNavIdx = NAV_ITEMS.findIndex((item) =>
    item.matches ? item.matches(activeIndex) : activeIndex === item.slideIndex
  );

  useEffect(() => {
    const updatePosition = () => {
      const currentEl = itemRefs.current[activeNavIdx];
      const navEl = navRef.current;
      if (currentEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const itemRect = currentEl.getBoundingClientRect();
        setIndicator({
          left: itemRect.left - navRect.left - (navEl.clientLeft || 0),
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
          className="group flex items-center gap-2.5 font-mono text-sm sm:text-base tracking-wider font-bold text-white uppercase transition-colors shrink-0"
        >
          <span className="group-hover:text-[#f8c076] transition-colors">THAI DO THINH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#f8c076] animate-pulse" />
          <span className="text-[#7e99cc] font-medium tracking-normal lowercase group-hover:text-[#8cb0fd] transition-colors">soodthin</span>
        </a>

        <nav 
          ref={navRef}
          className="relative hidden md:flex items-center gap-1 font-sans p-1 rounded-full bg-[#0a1024]/90 border border-[#1e2e5c] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] shrink-0"
        >
          {indicator.ready && (
            <div
              className="absolute left-0 top-1 bottom-1 rounded-full bg-[#15234d] border border-[#f8c076]/45 shadow-[0_0_12px_rgba(248,192,118,0.18)] pointer-events-none transition-[transform,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,width]"
              style={{
                transform: `translate3d(${indicator.left}px, 0, 0)`,
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
                className={`relative z-10 inline-flex items-center justify-center px-4 lg:px-4.5 py-1.5 rounded-full text-[13px] lg:text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#f8c076] drop-shadow-[0_0_8px_rgba(248,192,118,0.4)]'
                    : 'text-[#8cb0fd] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <span className="font-mono text-xs text-[#f8c076] font-bold px-2.5 py-1 rounded-full border border-[#233564] bg-[#0c142b]">
            {String(activeIndex + 1).padStart(2, '0')}/08
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono border border-[#2d3e70] bg-[#0c142b] text-[#d3cbff] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c274a] bg-[#090e1f]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.slideIndex}>
              <a
                href="#"
                onClick={(e) => handleNavClick(e, item.slideIndex)}
                className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                  (item.matches ? item.matches(activeIndex) : activeIndex === item.slideIndex)
                    ? 'text-[#f8c076] bg-[#14224a] font-medium border border-[#f8c076]/40'
                    : 'text-[#a9b9dc] hover:text-[#f8c076] hover:bg-[#121c3b]/50'
                }`}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
