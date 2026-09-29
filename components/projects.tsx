import { Project } from '@/types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-14 sm:py-20 border-b border-[#1c274a]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs text-[#f8c076] tracking-wider">02 //</span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-wider text-[#f1edff]">
          FEATURED PROJECTS
        </h2>
        <div className="flex-1 border-b border-[#1c274a]" />
      </div>

      <div className="space-y-10">
        {projects.map((project) => {
          const mainUrl = project.demoUrl || project.githubUrl;

          return (
            <article
              key={project.id}
              className="rounded-2xl p-6 sm:p-8 border border-[#202e58] bg-[#091024]/85 hover:border-[#384c85] transition-all duration-300 shadow-[0_8px_30px_rgba(6,10,20,0.5)] hover:shadow-[0_12px_40px_rgba(20,30,65,0.4)]"
            >
              {/* Top Index & Tags */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1c274a] mb-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#f8c076]">
                    PROJ. {project.number} // RELEASE
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-0.5 rounded-full text-[11px] font-mono border border-[#243463] bg-[#0e1736] text-[#7ea2f8]"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 mb-4">
                <h3 className="text-xl sm:text-2xl font-mono font-bold uppercase tracking-tight text-[#f1edff]">
                  {mainUrl ? (
                    <a
                      href={mainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#f8c076] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{project.title}</span>
                      <span className="text-[#f8c076] text-lg font-normal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        ↗
                      </span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#768ab9]">
                  {project.subtitle}
                </p>
              </div>

              {/* Overview */}
              <p className="text-sm sm:text-base text-[#a9b9dc] font-sans leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Structured Engineering Modules */}
              {project.keyHighlights && project.keyHighlights.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#d3cbff]">
                    // SYSTEM HIGHLIGHTS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.keyHighlights.map((highlight, idx) => {
                      const [heading, ...rest] = highlight.split(': ');
                      const body = rest.join(': ');

                      return (
                        <div
                          key={idx}
                          className="rounded-xl p-3.5 border border-[#1a2547] bg-[#0b132c]/70 hover:border-[#2f3f72] transition-colors text-xs font-mono"
                        >
                          <div className="text-[#f8c076] font-bold mb-1">
                            - {body ? heading : 'FEATURE'}
                          </div>
                          <div className="text-[#96a8d2] font-sans text-xs leading-normal">
                            {body || heading}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
