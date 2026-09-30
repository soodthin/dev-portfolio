import { Education, LanguageItem, SkillGroup } from '@/types/portfolio';

interface SkillsSlideProps {
  skillGroups: SkillGroup[];
  slideNumber: string;
}

export function SkillsSlide({ skillGroups, slideNumber }: SkillsSlideProps) {
  return (
    <section id="skills" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-6">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">{slideNumber}</span>
        <h2 className="text-lg sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          Skills
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl p-4 sm:p-5 border border-[#283d78] bg-[#0f1938]/90 hover:border-[#4b66ae] transition-all duration-300 flex flex-col justify-between shadow-[0_12px_40px_rgba(10,18,42,0.5)]"
          >
            <div>
              <h3 className="font-mono text-sm font-bold tracking-wider text-[#f8c076] mb-1.5">
                {group.category}
              </h3>
              <p className="text-xs font-mono text-[#9fb2dd] mb-3 sm:mb-4 leading-relaxed">
                {group.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2.5 sm:pt-3 border-t border-[#213364]">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#132047] border border-[#2b417e] text-[#8cb0fd]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface EducationSlideProps {
  education: Education;
  languages: LanguageItem[];
  slideNumber: string;
}

export function EducationSlide({ education, languages, slideNumber }: EducationSlideProps) {
  return (
    <section id="education" className="w-full max-w-5xl my-auto flex flex-col justify-center py-2 sm:py-6">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">{slideNumber}</span>
        <h2 className="text-lg sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          Education
        </h2>
        <div className="flex-1 border-b border-[#213364]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">
        <div className="md:col-span-8 rounded-2xl p-4 sm:p-8 border border-[#283d78] bg-[#0f1938]/90 shadow-[0_12px_40px_rgba(10,18,42,0.5)] space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <span className="text-xs font-mono tracking-wider text-[#f8c076] font-semibold">
              Degree
            </span>
            <span className="text-xs font-mono text-[#8299cd]">
              {education.period}
            </span>
          </div>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-white uppercase">
            {education.school}
          </h3>
          <div className="text-sm font-mono text-[#8cb0fd]">
            Major: {education.major}
          </div>

          <div className="pt-2">
            <div className="text-xs font-mono text-[#8299cd] mb-2 font-semibold">
              Coursework:
            </div>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-[#2f4684] bg-[#14214a] text-[#c5d5f6]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 rounded-2xl p-6 sm:p-7 border border-[#283d78] bg-[#0f1938]/90 shadow-[0_12px_40px_rgba(10,18,42,0.5)] flex flex-col justify-center space-y-4">
          <div>
            <div className="text-xs font-mono tracking-wider text-[#f8c076] mb-3 font-semibold">
              Languages
            </div>
            <div className="space-y-3 text-xs sm:text-sm font-mono">
              {languages.map((l) => (
                <div key={l.language} className="flex items-center justify-between border-b border-[#213364] pb-2">
                  <span className="text-white">{l.language}</span>
                  <span className="text-[#8cb0fd] text-xs font-semibold">{l.proficiency.includes('Native') ? 'Native' : 'Professional'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
