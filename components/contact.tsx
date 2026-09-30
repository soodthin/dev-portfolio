import { Profile, SocialLink } from '@/types/portfolio';

interface ContactProps {
  profile: Profile;
  socials: SocialLink[];
  onSelectSlide?: (index: number) => void;
}

function getSocialIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes('linkedin')) {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z"/>
      </svg>
    );
  }
  if (normalized.includes('github')) {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    );
  }
  if (normalized.includes('email') || normalized.includes('mail')) {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    );
  }
  if (normalized.includes('phone') || normalized.includes('tel')) {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    );
  }
  return null;
}

export function Contact({ profile, socials, onSelectSlide }: ContactProps) {
  const handleNavClick = (e: React.MouseEvent, index: number) => {
    if (onSelectSlide) {
      e.preventDefault();
      onSelectSlide(index);
    }
  };

  return (
    <footer id="contact" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">08</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          CONTACT &amp; NETWORK
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 p-4 sm:p-8 rounded-2xl border border-[#283d78] bg-[#0f1938]/90 shadow-[0_12px_40px_rgba(10,18,42,0.6)]">
        <div className="md:col-span-4 space-y-2.5">
          <div className="font-sans text-base font-bold text-white uppercase tracking-wider">
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
            {socials.map((social) => {
              const isExternal = social.url.startsWith('http');
              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group text-[#9fb2dd] hover:text-[#f8c076] transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#132047] border border-[#263a6f] group-hover:border-[#f8c076]/50 group-hover:bg-[#1a2b5e] flex items-center justify-center text-[#8cb0fd] group-hover:text-[#f8c076] transition-all shrink-0">
                      {getSocialIcon(social.label)}
                    </span>
                    <span className="font-sans font-medium text-white group-hover:text-[#f8c076] transition-colors">
                      {social.label}
                    </span>
                    <span className="text-[#f8c076] text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
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
