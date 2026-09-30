import { Profile, SocialLink } from '@/types/portfolio';

interface ContactProps {
  profile: Profile;
  socials: SocialLink[];
  onSelectSlide?: (index: number) => void;
}

export function Contact({ profile, socials, onSelectSlide }: ContactProps) {
  const handleNavClick = (e: React.MouseEvent, index: number) => {
    if (onSelectSlide) {
      e.preventDefault();
      onSelectSlide(index);
    }
  };

  return (
    <footer id="contact" className="w-full max-w-5xl mx-auto flex flex-col justify-center py-4 sm:py-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">08</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          CONTACT &amp; NETWORK
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl border border-[#283d78] bg-[#0f1938]/90 shadow-[0_12px_40px_rgba(10,18,42,0.6)]">
        <div className="md:col-span-4 space-y-2.5">
          <div className="font-mono text-base font-bold text-white uppercase tracking-wider">
            {profile.name}
          </div>
          <p className="text-xs font-mono text-[#8cb0fd]">
            {profile.title}
          </p>
          <p className="text-xs text-[#c5d5f6] font-sans leading-relaxed">
            Building reliable full-stack web and mobile systems from database architecture to modern user interfaces.
          </p>
          <div className="text-xs font-mono text-[#8299cd] pt-1">
            Location: <span className="text-[#c5d5f6]">{profile.location}</span>
          </div>
          <div className="pt-1.5 flex items-center gap-2 font-mono text-xs">
            <span className="text-[#8299cd]">EDITION:</span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold border border-[#f8c076]/40 bg-[#121c3b] text-[#f8c076]">
              v2.0 (REFINED)
            </span>
            <span className="text-[11px] text-[#55699b]">
              v1.0 (INITIAL)
            </span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2.5 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest">
            NAVIGATION
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href="#summary" 
                onClick={(e) => handleNavClick(e, 0)}
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                Summary
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                onClick={(e) => handleNavClick(e, 1)}
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, 2)}
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => handleNavClick(e, 5)}
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#education" 
                onClick={(e) => handleNavClick(e, 6)}
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                Education
              </a>
            </li>
            <li className="pt-1">
              <a 
                href="#summary" 
                onClick={(e) => handleNavClick(e, 0)}
                className="text-[#f8c076] hover:text-[#ddd7ff] transition-colors font-bold"
              >
                Top // Loop ↑
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2.5 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest">
            CONTACT
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href={`mailto:${profile.email}`} 
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors block break-all"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a 
                href={`tel:${profile.phone}`} 
                className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors block"
              >
                Tel: {profile.phone}
              </a>
            </li>
            <li className="text-[11px] text-[#8299cd] pt-1">
              Status: Open for Developer Roles
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-2.5 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest">
            CONNECT
          </div>
          <ul className="space-y-2 text-xs">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9fb2dd] hover:text-[#f8c076] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{social.label}</span>
                  <span className="text-[#8299cd] text-[11px]">({social.handle})</span>
                  <span className="text-[#f8c076]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#7a8ebc]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span>© {new Date().getFullYear()} Thai Do Thinh.</span>
          <span className="text-[#3b4f84]">/</span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#283e74] bg-[#0c142e] text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f8c076] animate-pulse" />
            <span className="text-[#f8c076] font-bold">VERSION 2.0</span>
            <span className="text-[#3b4f84]">|</span>
            <span className="text-[#889dcd]">v1.0 INITIAL</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span>Next.js &amp; TypeScript</span>
          <span className="text-[#3b4f84]">•</span>
          <span className="text-[#8cb0fd]">Hosted on GitHub Pages</span>
        </div>
      </div>
    </footer>
  );
}
