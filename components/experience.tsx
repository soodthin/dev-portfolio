import { Experience as ExperienceType } from '@/types/portfolio';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-14 sm:py-20 border-b border-[#1c274a]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">01 //</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          WORK EXPERIENCE
        </h2>
        <div className="flex-1 border-b border-[#1c274a]" />
      </div>

      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 sm:p-8 border border-[#202e58] bg-[#091024]/85 shadow-[0_8px_30px_rgba(6,10,20,0.5)] hover:border-[#384c85] transition-all duration-300"
          >
            {/* Top Bar: Period & Company */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1c274a] mb-5">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#f8c076] uppercase">
                  ENTERPRISE INTERNSHIP
                </span>
                <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase text-[#f1edff] mt-0.5">
                  {exp.role}
                </h3>
                <div className="text-sm font-mono text-[#7ea2f8] mt-0.5">
                  {exp.company}
                </div>
              </div>

              <div className="sm:text-right font-mono text-xs space-y-1">
                <div className="inline-block px-3 py-1 rounded-full border border-[#2d3e70] bg-[#0d1630] text-[#d3cbff]">
                  [ {exp.period} ]
                </div>
                <div className="text-[#6479a8]">{exp.location}</div>
              </div>
            </div>

            {/* Project Subheading & Tech Stack placed right below */}
            <div className="mb-5 space-y-2.5">
              {exp.projectTitle && (
                <div className="inline-block px-3 py-1 rounded-lg bg-[#131d3d] border border-[#293c72] text-xs font-mono text-[#d3cbff]">
                  PROJECT: <span className="text-[#f8c076] font-bold">{exp.projectTitle}</span>
                </div>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-[#6479a8] mr-1">STACK:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-[#243463] bg-[#101938] text-[#7ea2f8]"
                    >
                      [ {tech} ]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* General Description */}
            <p className="text-sm sm:text-base text-[#a9b9dc] font-sans leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Structured Engineering Modules Grid */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#7ea2f8]">
                // KEY ARCHITECTURAL RESPONSIBILITIES & OUTCOMES:
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {exp.highlights.map((item, hIdx) => {
                  const [label, ...rest] = item.split(': ');
                  const detail = rest.join(': ');

                  return (
                    <div
                      key={hIdx}
                      className="rounded-xl p-3.5 border border-[#1b2649] bg-[#0c142b]/70 hover:border-[#2f3f72] transition-colors flex flex-col sm:flex-row sm:items-start gap-2"
                    >
                      <span className="font-mono text-xs font-bold text-[#f8c076] shrink-0 sm:w-52">
                        [{String(hIdx + 1).padStart(2, '0')}] {detail ? label : ''}
                      </span>
                      <span className="text-xs sm:text-sm text-[#a9b9dc] font-sans leading-relaxed flex-1">
                        {detail || label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
