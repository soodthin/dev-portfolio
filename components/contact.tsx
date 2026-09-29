import { Profile, SocialLink } from '@/types/portfolio';

interface ContactProps {
  profile: Profile;
  socials: SocialLink[];
}

export function Contact({ profile, socials }: ContactProps) {
  return (
    <footer id="contact" className="pt-16 pb-12 border-t border-[#1c274a] mt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#141f3d]">
        <div className="md:col-span-4 space-y-3">
          <div className="font-mono text-base font-bold text-[#f1edff] uppercase tracking-wider">
            {profile.name}
          </div>
          <p className="text-xs font-mono text-[#7ea2f8]">
            {profile.title}
          </p>
          <p className="text-xs text-[#8e9fc7] font-sans leading-relaxed max-w-sm">
            Building reliable full-stack web and mobile systems from database architecture to modern user interfaces.
          </p>
          <div className="text-xs font-mono text-[#677cad]">
            Location: <span className="text-[#a9b9dc]">{profile.location}</span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-3 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest">
            NAVIGATION
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#experience" className="text-[#96a7d1] hover:text-[#f8c076] transition-colors">
                Experience
              </a>
            </li>
            <li>
              <a href="#projects" className="text-[#96a7d1] hover:text-[#f8c076] transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="text-[#96a7d1] hover:text-[#f8c076] transition-colors">
                Skills & Education
              </a>
            </li>
            <li>
              <a href="#" className="text-[#6276a6] hover:text-[#d3cbff] transition-colors">
                Back to Top ↑
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3 font-mono">
          <div className="text-xs font-bold text-[#f8c076] uppercase tracking-widest">
            CONTACT
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href={`mailto:${profile.email}`} 
                className="text-[#96a7d1] hover:text-[#f8c076] transition-colors block break-all"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a 
                href={`tel:${profile.phone}`} 
                className="text-[#96a7d1] hover:text-[#f8c076] transition-colors block"
              >
                Tel: {profile.phone}
              </a>
            </li>
            <li className="text-[11px] text-[#6276a6] pt-1">
              Status: Open for Developer Roles
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3 font-mono">
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
                  className="text-[#96a7d1] hover:text-[#f8c076] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{social.label}</span>
                  <span className="text-[#6276a6] text-[11px]">({social.handle})</span>
                  <span className="text-[#f8c076]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5b6f9f]">
        <div>
          © {new Date().getFullYear()} Thai Do Thinh. All rights reserved.
        </div>
        <div>
          Next.js & TypeScript • Hosted on GitHub Pages
        </div>
      </div>
    </footer>
  );
}
