'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '@/components/providers/PortfolioProvider';
import { SkillCategory, SkillItem } from '@/types/portfolio';
import { ContextInspectorDock } from '@/components/ui/ContextInspectorDock';

export function CapabilitiesSection() {
  const { data, t } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories: (SkillCategory | 'All')[] = [
    'All',
    'Languages',
    'Frameworks & Platforms',
    'Databases',
    'Tools & DevOps',
    'AI-Assisted Engineering',
  ];

  // Title words for Staggered Word Wave Cascade
  const titleWords = t.capabilities.title.split(' ');

  // Filter skills based on selected category
  const displayedSkills = useMemo(() => {
    if (selectedCategory === 'All') {
      return data.skills.flatMap((group) => group.skills);
    }
    const foundGroup = data.skills.find((group) => group.category === selectedCategory);
    return foundGroup ? foundGroup.skills : [];
  }, [selectedCategory, data.skills]);

  const handleSkillClick = (skill: SkillItem) => {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setTimeout(() => {
          document.getElementById('skill-context-dock')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }
  };

  // Marquee keywords
  const marqueeKeywords1 = [
    'Java & Spring Boot',
    'FastAPI & Python',
    'TypeScript & React',
    'Next.js 16 SSG',
    'PostgreSQL & Redis',
    'Docker & CI/CD',
    'Atomic Transactions',
    'AI Agent Workflows',
  ];

  const marqueeKeywords2 = [
    'Financial Ledger Reconciliation',
    'Multi-Bank Statement OCR',
    'Zero-Slop Swiss Editorial',
    'RESTful API Architecture',
    'Stateless JWT & RBAC',
    'JUnit 5 & Mockito Coverage',
  ];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 border-b border-[var(--hairline)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Choreography: Staggered Word Wave Cascade */}
        <div className="mb-14 md:mb-18">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)] uppercase px-2 py-0.5 border border-[var(--hairline)] bg-[var(--surface-1)]">
              04
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              {t.capabilities.eyebrow}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1">
            {titleWords.map((word, idx) => (
              <div key={idx} className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: 40, rotate: 3, opacity: 0 }}
                  whileInView={{ y: 0, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--text)] font-bold tracking-tight inline-block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-muted)] mt-2 font-sans max-w-2xl"
          >
            {t.capabilities.subtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-[var(--hairline)] mt-6 origin-left w-full"
          />
        </div>

        {/* Dual-Track Kinetic Marquee */}
        <div className="mb-12 py-3 border-y border-[var(--hairline)] bg-[var(--surface-1)] overflow-hidden select-none space-y-2">
          {/* Track 1: Moves Left */}
          <div className="flex w-max animate-marquee gap-8 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {[...marqueeKeywords1, ...marqueeKeywords1].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[var(--accent)]">✦</span>
                <span className={i % 2 === 0 ? 'font-serif italic capitalize text-sm text-[var(--text)]' : ''}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Track 2: Moves Right */}
          <div className="flex w-max animate-marquee-reverse gap-8 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] opacity-80">
            {[...marqueeKeywords2, ...marqueeKeywords2].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[var(--accent)] font-bold">›</span>
                <span className={i % 2 === 1 ? 'font-serif italic capitalize text-sm text-[var(--text)]' : ''}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Pills (layoutId indicator) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                  isSelected
                    ? 'text-white border-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--hairline)] bg-[var(--surface-1)]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-[var(--accent)] -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span>
                  {cat === 'All'
                    ? t.capabilities.filterAll
                    : cat === 'Languages'
                    ? t.capabilities.filterLanguages
                    : cat === 'Frameworks & Platforms'
                    ? t.capabilities.filterFrameworks
                    : cat === 'Databases'
                    ? t.capabilities.filterDatabases
                    : cat === 'Tools & DevOps'
                    ? t.capabilities.filterTools
                    : t.capabilities.filterAi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedSkills.map((skill, idx) => {
            const isSelected = selectedSkill?.name === skill.name;
            const hasContext = skill.contexts && skill.contexts.length > 0;

            return (
              <motion.button
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                onClick={() => handleSkillClick(skill)}
                className={`p-3.5 text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[90px] relative group ${
                  isSelected
                    ? 'border-[var(--accent)] bg-[var(--surface-2)] shadow-md ring-1 ring-[var(--accent)]'
                    : 'border-[var(--hairline)] bg-[var(--surface-1)] hover:border-[var(--text-muted)] hover:bg-[var(--surface-2)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                      {skill.level || 'TECH'}
                    </span>
                    {hasContext && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" title="Has production context" />
                    )}
                  </div>
                  <h4 className="font-sans font-semibold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {skill.name}
                  </h4>
                </div>

                <div className="font-mono text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--hairline)] flex items-center justify-between">
                  <span>{hasContext ? `${skill.contexts?.length} contexts` : 'Standard'}</span>
                  <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Context Inspector Dock (Fixed Below Grid, ZERO Tooltip Cutoff on Mobile) */}
        <ContextInspectorDock
          selectedSkill={selectedSkill}
          onClear={() => setSelectedSkill(null)}
        />
      </div>
    </section>
  );
}
