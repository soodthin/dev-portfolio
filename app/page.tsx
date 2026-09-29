import { portfolioData } from '@/data/portfolio-data';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <Hero profile={portfolioData.profile} />
      <Experience experiences={portfolioData.experiences} />
      <Projects projects={portfolioData.projects} />
      <About 
        education={portfolioData.education}
        languages={portfolioData.languages}
        skillGroups={portfolioData.skills}
      />
      <Contact 
        profile={portfolioData.profile}
        socials={portfolioData.socials}
      />
    </div>
  );
}
