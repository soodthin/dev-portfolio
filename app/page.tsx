'use client';

import React, { useState } from 'react';
import { PortfolioProvider } from '@/components/providers/PortfolioProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { MotionConfigProvider } from '@/components/motion/MotionConfigProvider';
import { GrainOverlay } from '@/components/motion/GrainOverlay';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { Header } from '@/components/layout/Header';
import { SectionTracker } from '@/components/layout/SectionTracker';
import { BackToTop } from '@/components/layout/BackToTop';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ProjectLightbox } from '@/components/ui/ProjectLightbox';
import { ProjectImage } from '@/types/portfolio';

import { HeroSection } from '@/components/sections/HeroSection';
import { WorkHistorySection } from '@/components/sections/WorkHistorySection';
import { SelectedWorksSection } from '@/components/sections/SelectedWorksSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';

function PortfolioApp() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: ProjectImage[];
    initialIndex: number;
    projectTitle: string;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
    projectTitle: '',
  });

  const handleOpenLightbox = (
    images: ProjectImage[],
    index: number,
    projectTitle: string
  ) => {
    setLightboxState({
      isOpen: true,
      images,
      initialIndex: index,
      projectTitle,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <GrainOverlay />
      <Header />
      <ScrollProgress />
      <SectionTracker />

      {/* overflow-x-clip preserves position: sticky inside WorkHistorySection */}
      <main className="relative z-10 w-full overflow-x-clip">
        <HeroSection />
        <WorkHistorySection />
        <SelectedWorksSection onOpenLightbox={handleOpenLightbox} />
        <CapabilitiesSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />

      <ProjectLightbox
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        images={lightboxState.images}
        initialIndex={lightboxState.initialIndex}
        projectTitle={lightboxState.projectTitle}
      />

      <CommandPalette />
    </div>
  );
}

export default function HomePage() {
  return (
    <PortfolioProvider>
      <SmoothScrollProvider>
        <MotionConfigProvider>
          <PortfolioApp />
        </MotionConfigProvider>
      </SmoothScrollProvider>
    </PortfolioProvider>
  );
}
