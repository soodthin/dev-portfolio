export type SkillCategory = 
  | 'Languages' 
  | 'Frameworks & Platforms' 
  | 'Databases' 
  | 'Tools & DevOps' 
  | 'AI-Assisted Engineering';

export interface SkillItem {
  name: string;
  tag?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  keyHighlights: string[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  projectTitle?: string;
  projectUrl?: string;
  teamSize?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  school: string;
  major: string;
  period: string;
  coursework: string[];
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  roleDescription: string;
  statusText: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  avatarUrl: string;
  aboutParagraphs: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface PortfolioData {
  profile: Profile;
  education: Education;
  languages: LanguageItem[];
  skills: SkillGroup[];
  projects: Project[];
  experiences: Experience[];
  socials: SocialLink[];
}
