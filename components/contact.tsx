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

export function Contact({ profile, socials }: ContactProps) {
  return (
    <footer id="contact" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">08</span>
        <h2 className="text-xl sm:text-2xl font-sans font-bold uppercase tracking-wider text-[#f1edff]">
          CONTACT &amp; NETWORK
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-5 sm:p-8 rounded-2xl border border-[#283d78] bg-[#0f1938]/90 shadow-[0_12px_40px_rgba(10,18,42,0.6)]">
        <div className="space-y-3 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest flex items-center gap-2">
            <span>CONTACT</span>
            <div className="flex-1 border-b border-[#213364]" />
          </div>
          <ul className="space-y-3 text-xs">
            <li>
              <a 
                href={`mailto:${profile.email}`} 
                className="group flex items-center gap-2.5 text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                <span className="w-6 h-6 rounded-md bg-[#132047] border border-[#263a6f] group-hover:border-[#f8c076]/50 group-hover:bg-[#1a2b5e] flex items-center justify-center text-[#8cb0fd] group-hover:text-[#f8c076] transition-all shrink-0">
                  {getSocialIcon('email')}
                </span>
                <span className="font-sans font-medium text-white group-hover:text-[#f8c076]">{profile.email}</span>
              </a>
            </li>
            <li>
              <a 
                href={`tel:${profile.phone}`} 
                className="group flex items-center gap-2.5 text-[#9fb2dd] hover:text-[#f8c076] transition-colors"
              >
                <span className="w-6 h-6 rounded-md bg-[#132047] border border-[#263a6f] group-hover:border-[#f8c076]/50 group-hover:bg-[#1a2b5e] flex items-center justify-center text-[#8cb0fd] group-hover:text-[#f8c076] transition-all shrink-0">
                  {getSocialIcon('phone')}
                </span>
                <span className="font-sans font-medium text-white group-hover:text-[#f8c076]">{profile.phone}</span>
              </a>
            </li>
            <li className="pt-1.5 flex items-center gap-2 text-xs text-[#8299cd]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: Open for Developer Roles</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest flex items-center gap-2">
            <span>CONNECT</span>
            <div className="flex-1 border-b border-[#213364]" />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {socials.map((social) => {
              const isExternal = social.url.startsWith('http');
              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group p-2.5 rounded-xl border border-[#263a6f] bg-[#121f45]/70 hover:border-[#f8c076]/60 hover:bg-[#162756] transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#132047] border border-[#263a6f] group-hover:border-[#f8c076]/50 group-hover:bg-[#1a2b5e] flex items-center justify-center text-[#8cb0fd] group-hover:text-[#f8c076] transition-all shrink-0">
                        {getSocialIcon(social.label)}
                      </span>
                      <span className="font-sans font-medium text-white group-hover:text-[#f8c076] transition-colors">
                        {social.label}
                      </span>
                    </div>
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
            <span className="text-[#f8c076] font-bold">VERSION 2.1</span>
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
