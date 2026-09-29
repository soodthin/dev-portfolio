'use client';

import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS & BIO', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c274a] bg-[#070b18]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="font-mono text-xs sm:text-sm tracking-widest font-bold text-[#f1edff] uppercase hover:text-[#7ea2f8] transition-colors"
        >
          THAI DO THINH <span className="text-[#6479a8] font-normal">// SOODTHIN</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-mono tracking-wider">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg text-[#96a7d1] hover:text-[#f8c076] hover:bg-[#131d3d]/50 transition-colors uppercase"
            >
              [ {item.label} ]
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c274a] bg-[#090e1f] px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <a
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-mono tracking-wider text-[#a9b9dc] hover:text-[#f8c076] py-1 uppercase"
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
