import { Education, LanguageItem, SkillGroup } from '@/types/portfolio';

interface AboutProps {
  education: Education;
  languages: LanguageItem[];
  skillGroups: SkillGroup[];
}

export function About({ education, languages, skillGroups }: AboutProps) {
  return (
    <section id="about" className="py-14 sm:py-20 border-b border-[#1c274a]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">03 //</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          SKILLS & EDUCATION
        </h2>
        <div className="flex-1 border-b border-[#1c274a]" />
      </div>

      <div className="space-y-10">
        {/* Education & Languages Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Education Box */}
          <div className="md:col-span-8 rounded-2xl p-6 border border-[#202e58] bg-[#091024]/85 shadow-[0_8px_30px_rgba(6,10,20,0.4)]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="text-xs font-mono tracking-widest text-[#f8c076] uppercase">
                ACADEMIC CREDENTIAL
              </span>
              <span className="text-xs font-mono text-[#677cad]">
                [ {education.period} ]
              </span>
            </div>
            <h3 className="font-mono text-base font-bold text-[#f1edff] uppercase mb-0.5">
              {education.school}
            </h3>
            <div className="text-xs font-mono text-[#7ea2f8] mb-3">
              Degree: {education.major}
            </div>

            <div className="text-[11px] font-mono text-[#677cad] uppercase mb-2">
              Key Coursework:
            </div>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-[#1d294e] bg-[#0c142c] text-[#a9b9dc]"
                >
                  [ {course} ]
                </span>
              ))}
            </div>
          </div>

          {/* Languages & Working Focus Box */}
          <div className="md:col-span-4 rounded-2xl p-6 border border-[#202e58] bg-[#091024]/85 shadow-[0_8px_30px_rgba(6,10,20,0.4)] flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#f8c076] uppercase mb-3">
                COMMUNICATION
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                {languages.map((l) => (
                  <div key={l.language} className="flex items-center justify-between border-b border-[#162141] pb-2">
                    <span className="text-[#f1edff]">{l.language}</span>
                    <span className="text-[#7ea2f8] text-[11px] font-semibold">{l.proficiency.includes('Native') ? 'Native' : 'Professional'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#162141] text-[11px] font-mono text-[#677cad]">
              <div>FOCUS: <span className="text-[#d3cbff]">Full-Stack Systems & AI</span></div>
            </div>
          </div>
        </div>

        {/* Technical Skills Bento Matrix */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7ea2f8]">
            // TECHNICAL PROFICIENCY MATRIX
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl p-5 border border-[#202e58] bg-[#091024]/80 hover:border-[#384c85] transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#f8c076]">
                      [ {group.category} ]
                    </h4>
                  </div>
                  <p className="text-[11px] font-mono text-[#677cad] mb-4">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#162141]">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0d1633] border border-[#233362] text-[#d3cbff] hover:border-[#7ea2f8] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
