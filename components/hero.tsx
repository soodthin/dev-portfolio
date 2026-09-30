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
    <section id="summary" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 sm:gap-8 lg:gap-14">
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="relative p-2 sm:p-2.5">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#34467c] animate-pulse" />
            
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f8c076]" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f8c076]" />

            <div className="p-1.5 sm:p-2.5 rounded-full border-2 border-[#22305c] bg-[#0c142e] shadow-[0_0_45px_rgba(20,30,65,0.75)]">
              <div className="relative w-32 h-32 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border border-[#52448a] bg-[#080d1f]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/50 via-transparent to-transparent pointer-events-none z-10" />
                
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

        <div className="space-y-3 sm:space-y-4 text-center lg:text-left flex-1">
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-2xl sm:text-5xl font-mono font-bold tracking-tight text-white uppercase">
              {profile.name}
            </h1>
            <p className="text-xs sm:text-xl font-mono text-[#8cb0fd]">
              {profile.title}
            </p>
          </div>

          <p className="text-xs sm:text-base text-[#c5d5f6] leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
            {profile.roleDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1 sm:pt-2 text-left font-mono">
            <div className="rounded-xl p-3 border border-[#2b3f78] bg-[#101b3b]/90 hover:border-[#4b66ae] transition-colors shadow-sm">
              <div className="text-[10px] text-[#7a90c5] uppercase tracking-wider">PRODUCTS</div>
              <div className="text-xs font-bold text-[#f8c076] mt-0.5">3+ DEPLOYED</div>
            </div>
            <div className="rounded-xl p-3 border border-[#2b3f78] bg-[#101b3b]/90 hover:border-[#4b66ae] transition-colors shadow-sm">
              <div className="text-[10px] text-[#7a90c5] uppercase tracking-wider">EXPERIENCE</div>
              <div className="text-xs font-bold text-[#ddd7ff] mt-0.5">BW INDUSTRIAL</div>
            </div>
            <div className="rounded-xl p-3 border border-[#2b3f78] bg-[#101b3b]/90 hover:border-[#4b66ae] transition-colors shadow-sm">
              <div className="text-[10px] text-[#7a90c5] uppercase tracking-wider">WORKFLOW</div>
              <div className="text-xs font-bold text-[#8cb0fd] mt-0.5">AI-ASSISTED</div>
            </div>
            <div className="rounded-xl p-3 border border-[#2b3f78] bg-[#101b3b]/90 hover:border-[#4b66ae] transition-colors shadow-sm">
              <div className="text-[10px] text-[#7a90c5] uppercase tracking-wider">EDUCATION</div>
              <div className="text-xs font-bold text-white mt-0.5">CS @ HCMCOU</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
