export type Locale = 'en' | 'vi';

export type SkillCategory =
  | 'All'
  | 'Languages'
  | 'Frameworks & Platforms'
  | 'Databases'
  | 'Tools & DevOps'
  | 'AI-Assisted Engineering';

export interface SkillContext {
  type: 'exp' | 'project' | 'edu' | 'tool';
  label: string;
}

export interface SkillItem {
  name: string;
  tag?: string;
  level?: string;
  contexts?: SkillContext[];
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}

export interface ProjectImage {
  src: string;
  captionEn: string;
  captionVi: string;
  title: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
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
  imagesList?: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  keyHighlights: string[];
  metricsList?: ProjectMetric[];
  architectureNotes?: string[];
}

export interface PipelineStage {
  step: string;
  name: string;
  title: string;
  description: string;
  detail: string;
  metric?: string;
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
  pipelineStages?: PipelineStage[];
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  gpa?: string;
  status?: string;
  coursework: string[];
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  levelPercent: number;
  description: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
}

export interface MetricItem {
  value: number;
  suffix?: string;
  label: string;
  description: string;
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
  metrics: MetricItem[];
  education: Education;
  languages: LanguageItem[];
  skills: SkillGroup[];
  projects: Project[];
  experiences: Experience[];
  socials: SocialLink[];
}
