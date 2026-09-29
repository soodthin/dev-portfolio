import { Profile } from '@/types/portfolio';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const basePath = process.env.NODE_ENV === 'production' ? '/dev-portfolio' : '';
  const avatarSrc = profile.avatarUrl.startsWith('http') || profile.avatarUrl.startsWith('data:')
    ? profile.avatarUrl
    : `${basePath}${profile.avatarUrl}`;

  return (
    <section className="py-12 sm:py-16 border-b border-[#1c274a]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
        {/* Avatar Profile - Circular Frame with Layered Vector Rings */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="relative p-2.5">
            {/* Outer Circular Ring with Crosshairs */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#34467c] animate-pulse" />
            
            {/* Crosshair compass tick marks */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f8c076]" />

            {/* Middle decorative ring */}
            <div className="p-2 rounded-full border-2 border-[#22305c] bg-[#0c142e] shadow-[0_0_40px_rgba(20,30,65,0.7)]">
              {/* Inner Circular Avatar */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-[#52448a] bg-[#080d1f]">
                {/* Subtle twilight gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/50 via-transparent to-transparent pointer-events-none z-10" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                src={avatarSrc}
                alt={profile.name}
                className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.98] scale-[1.4]"
                style={{ objectPosition: '50% 72%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-4 text-center lg:text-left flex-1">
          {/* Name & Title */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#f1edff] uppercase">
              {profile.name}
            </h1>
            <p className="text-base sm:text-xl font-mono text-[#7ea2f8]">
              {profile.title}
            </p>
          </div>

          {/* Bio from CV */}
          <p className="text-sm sm:text-base text-[#a9b9dc] leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
            {profile.roleDescription}
          </p>

          {/* Quick Bento Stats Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left font-mono">
            <div className="rounded-xl p-3 border border-[#202e58] bg-[#0c142b]/85 hover:border-[#3d508e] transition-colors shadow-sm">
              <div className="text-[10px] text-[#6276a6] uppercase tracking-wider">PRODUCTS</div>
              <div className="text-xs font-bold text-[#f8c076] mt-0.5">3+ DEPLOYED</div>
            </div>
            <div className="rounded-xl p-3 border border-[#202e58] bg-[#0c142b]/85 hover:border-[#3d508e] transition-colors shadow-sm">
              <div className="text-[10px] text-[#6276a6] uppercase tracking-wider">EXPERIENCE</div>
              <div className="text-xs font-bold text-[#d3cbff] mt-0.5">BW INDUSTRIAL</div>
            </div>
            <div className="rounded-xl p-3 border border-[#202e58] bg-[#0c142b]/85 hover:border-[#3d508e] transition-colors shadow-sm">
              <div className="text-[10px] text-[#6276a6] uppercase tracking-wider">WORKFLOW</div>
              <div className="text-xs font-bold text-[#7ea2f8] mt-0.5">AI-ASSISTED</div>
            </div>
            <div className="rounded-xl p-3 border border-[#202e58] bg-[#0c142b]/85 hover:border-[#3d508e] transition-colors shadow-sm">
              <div className="text-[10px] text-[#6276a6] uppercase tracking-wider">EDUCATION</div>
              <div className="text-xs font-bold text-[#f1edff] mt-0.5">CS @ HCMCOU</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
