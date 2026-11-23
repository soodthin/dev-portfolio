'use client';

import React from 'react';
import type { SimpleIcon } from 'simple-icons';
import {
  siOpenjdk,
  siPython,
  siTypescript,
  siJavascript,
  siFastapi,
  siSpringboot,
  siDjango,
  siReact,
  siNextdotjs,
  siExpo,
  siSpringsecurity,
  siSpring,
  siTailwindcss,
  siPostgresql,
  siMysql,
  siRedis,
  siFirebase,
  siDocker,
  siGit,
  siGithubactions,
  siJunit5,
  siPostman,
  siRender,
  siClaude,
  siGithub,
} from 'simple-icons';
import { Database, FlaskConical, Terminal } from 'lucide-react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

const SIMPLE_ICON_MAP: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  FastAPI: siFastapi,
  'Spring Boot': siSpringboot,
  'Django REST Framework': siDjango,
  ReactJS: siReact,
  React: siReact,
  'Next.js': siNextdotjs,
  'React Native (Expo)': siExpo,
  'Spring Security': siSpringsecurity,
  'Spring Data JPA': siSpring,
  'Tailwind CSS': siTailwindcss,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Redis: siRedis,
  Firebase: siFirebase,
  Docker: siDocker,
  Git: siGit,
  'GitHub Actions': siGithubactions,
  'JUnit 5': siJunit5,
  Postman: siPostman,
  Render: siRender,
  'Claude Code': siClaude,
  GitHub: siGithub,
};

/**
 * Clean 1.5px-stroke conceptual icons — strictly for the 4 non-brand engineering concepts.
 */
function ConceptualIcon({ name, size = 15, className = '' }: TechIconProps) {
  switch (name) {
    case 'RESTful API':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 8h11" />
          <path d="m12 5 3 3-3 3" />
          <path d="M20 16H9" />
          <path d="m12 13-3 3 3 3" />
        </svg>
      );

    case 'Antigravity (IDE)':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 4 4.5 19.5h3.2l1.6-3.5h5.4l1.6 3.5h3.2L12 4Z" />
          <path d="M9.8 13.2h4.4" />
        </svg>
      );

    case 'Prompt Engineering':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="m5 8 4 4-4 4" />
          <path d="M11 16h5" />
          <path d="M18 5v4" />
          <path d="M16 7h4" />
        </svg>
      );

    case 'Code Verification':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    default:
      return null;
  }
}

export function TechIcon({ name, size = 15, className = '' }: TechIconProps) {
  const brandIcon = SIMPLE_ICON_MAP[name];
  if (brandIcon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <path d={brandIcon.path} />
      </svg>
    );
  }

  // Non-brand standards or libraries absent from simple-icons (via lucide-react, 1.5px stroke)
  if (name === 'SQL') {
    return <Database size={size} strokeWidth={1.5} className={`shrink-0 ${className}`} aria-hidden="true" />;
  }
  if (name === 'Mockito') {
    return <FlaskConical size={size} strokeWidth={1.5} className={`shrink-0 ${className}`} aria-hidden="true" />;
  }
  if (name === 'Codex') {
    return <Terminal size={size} strokeWidth={1.5} className={`shrink-0 ${className}`} aria-hidden="true" />;
  }

  return <ConceptualIcon name={name} size={size} className={`shrink-0 ${className}`} />;
}
