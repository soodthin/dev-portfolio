'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { portfolioData } from '@/data/portfolio-data';
import { Navbar } from '@/components/navbar';
import { SlideNav, SlideInfo } from '@/components/slide-nav';
import { Hero } from '@/components/hero';
import { Experience } from '@/components/experience';
import { ProjectSlide } from '@/components/projects';
import { SkillsSlide, EducationSlide } from '@/components/about';
import { Contact } from '@/components/contact';

const SLIDES: SlideInfo[] = [
  { id: 'summary', number: '01', title: 'SUMMARY' },
  { id: 'experience', number: '02', title: 'EXPERIENCE' },
  { id: 'project-01', number: '03', title: 'FlexiConnect', parentTitle: 'PROJECTS' },
  { id: 'project-02', number: '04', title: 'Food Delivery', parentTitle: 'PROJECTS' },
  { id: 'project-03', number: '05', title: 'Dev Portfolio', parentTitle: 'PROJECTS' },
  { id: 'skills', number: '06', title: 'SKILLS' },
  { id: 'education', number: '07', title: 'EDUCATION' },
  { id: 'contact', number: '08', title: 'CONTACT' },
];

export function SlideDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSlide = useCallback((index: number) => {
    if (index < 0 || index >= SLIDES.length) return;
    const target = slideRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55,
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        if (activeIndex === SLIDES.length - 1) {
          scrollToSlide(0);
        } else {
          scrollToSlide(activeIndex + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollToSlide(Math.max(activeIndex - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(SLIDES.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastLoopTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (activeIndex === SLIDES.length - 1 && e.deltaY > 25) {
        const now = Date.now();
        if (now - lastLoopTime > 700) {
          lastLoopTime = now;
          e.preventDefault();
          scrollToSlide(0);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, scrollToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let lastTouchLoop = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (activeIndex === SLIDES.length - 1 && diffY > 35) {
        const now = Date.now();
        if (now - lastTouchLoop > 700) {
          lastTouchLoop = now;
          scrollToSlide(0);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, scrollToSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-transparent">
      <Navbar activeIndex={activeIndex} onSelectSlide={scrollToSlide} />
      
      <SlideNav 
        slides={SLIDES}
        activeIndex={activeIndex}
        onSelectSlide={scrollToSlide}
      />

      <main
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-deck-container no-scrollbar scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        <div
          ref={(el) => { slideRefs.current[0] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <Hero profile={portfolioData.profile} />
        </div>

        <div
          ref={(el) => { slideRefs.current[1] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <Experience experiences={portfolioData.experiences} slideNumber="02" />
        </div>

        <div
          ref={(el) => { slideRefs.current[2] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <ProjectSlide 
            project={portfolioData.projects[0]} 
            slideNumber="03" 
            totalProjects={portfolioData.projects.length} 
          />
        </div>

        <div
          ref={(el) => { slideRefs.current[3] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <ProjectSlide 
            project={portfolioData.projects[1]} 
            slideNumber="04" 
            totalProjects={portfolioData.projects.length} 
          />
        </div>

        <div
          ref={(el) => { slideRefs.current[4] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <ProjectSlide 
            project={portfolioData.projects[2]} 
            slideNumber="05" 
            totalProjects={portfolioData.projects.length} 
          />
        </div>

        <div
          ref={(el) => { slideRefs.current[5] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <SkillsSlide skillGroups={portfolioData.skills} slideNumber="06" />
        </div>

        <div
          ref={(el) => { slideRefs.current[6] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <EducationSlide 
            education={portfolioData.education} 
            languages={portfolioData.languages} 
            slideNumber="07" 
          />
        </div>

        <div
          ref={(el) => { slideRefs.current[7] = el; }}
          className="snap-card h-screen w-full flex items-center justify-center px-4 sm:px-8 pt-16 pb-6 overflow-y-auto sm:overflow-hidden"
        >
          <Contact
            profile={portfolioData.profile}
            socials={portfolioData.socials}
            onSelectSlide={scrollToSlide}
          />
        </div>
      </main>
    </div>
  );
}
