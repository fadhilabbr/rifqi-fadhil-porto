'use client';

import React from 'react';
import type { PortfolioOverviewDTO } from '@/application/dto/PortfolioOverviewDTO';
import { useScrollTelemetry } from '@/presentation/hooks/useScrollTelemetry';
import { useWibClock } from '@/presentation/hooks/useWibClock';
import { useMouseParallax } from '@/presentation/hooks/useMouseParallax';
import { SkyBackground } from './SkyBackground';
import { FlightHeader } from './FlightHeader';
import { AltitudeRuler } from './AltitudeRuler';
import { HeroSection } from './HeroSection';
import { ProjectsSection } from './ProjectsSection';
import { CompetencyRadarSection } from './CompetencyRadarSection';
import { ExperienceSection } from './ExperienceSection';
import { ContactSection } from './ContactSection';
import { FlightFooter } from './FlightFooter';

interface FlightDeckViewProps {
  initialData: PortfolioOverviewDTO;
}

export const FlightDeckView: React.FC<FlightDeckViewProps> = ({ initialData }) => {
  const { progress, altitudeText, markerTop } = useScrollTelemetry();
  const timeText = useWibClock();
  const mouseParallax = useMouseParallax();
  const { profile, projects, competencies, experiences } = initialData;
  const isNight = progress > 0.6;

  return (
    <div className="relative w-full text-[#14181F] overflow-x-clip">
      {/* 1. Dynamic Day-to-Night Background & Patrolling Drone with Parallax */}
      <SkyBackground progress={progress} mouseParallax={mouseParallax} />

      {/* 2. Flight Header with Clock and Live Altitude */}
      <FlightHeader
        name={profile.name}
        timeText={timeText}
        altitudeText={altitudeText}
      />

      {/* 3. Altitude Ruler on the Right Side (Interactive Scrubber) */}
      <AltitudeRuler markerTop={markerTop} />

      {/* 4. Main Portfolio Flight Deck Content */}
      <main
        id="atas"
        className="relative z-[2] max-w-[1160px] mx-auto px-7 pb-18 box-border"
      >
        <HeroSection
          profile={profile}
          mouseParallax={mouseParallax}
          progress={progress}
        />
        <ProjectsSection projects={projects} progress={progress} />
        <CompetencyRadarSection competencies={competencies} progress={progress} />
        <ExperienceSection experiences={experiences} isNight={isNight} progress={progress} />
        <ContactSection profile={profile} isNight={isNight} progress={progress} />
        <FlightFooter name={profile.name} isNight={isNight} />
      </main>
    </div>
  );
};
