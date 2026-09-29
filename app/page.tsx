import { portfolioData } from '@/data/portfolio-data';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero: Circular Avatar, Bio & Quick Highlights */}
      <Hero profile={portfolioData.profile} />

      {/* 2. Enterprise Work Experience (BW Industrial) */}
      <Experience experiences={portfolioData.experiences} />

      {/* 3. Featured Software Projects */}
      <Projects projects={portfolioData.projects} />

      {/* 4. Skills, Education & Languages Bento Matrix */}
      <About 
        education={portfolioData.education}
        languages={portfolioData.languages}
        skillGroups={portfolioData.skills}
      />

      {/* 5. Direct Inquiries & Contact Channels */}
      <Contact 
        profile={portfolioData.profile}
        socials={portfolioData.socials}
      />
    </div>
  );
}
