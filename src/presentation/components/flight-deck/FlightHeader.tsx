'use client';

import React, { useState } from 'react';
import { MobileCockpitNav } from '@/presentation/components/shared/MobileCockpitNav';

interface FlightHeaderProps {
  name: string;
  timeText: string;
  altitudeText: string;
}

export const FlightHeader: React.FC<FlightHeaderProps> = ({
  name,
  timeText,
  altitudeText,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F4EF]/95 backdrop-blur-[6px] border-b border-[#CFCBC0]">
        <div className="max-w-[1240px] mx-auto px-6 py-2 flex flex-wrap gap-x-7 gap-y-1 items-center justify-between">
          {/* Name / Brand */}
          <a
            href="#atas"
            className="text-inherit no-underline min-h-[44px] flex items-center gap-2.5 font-serif text-[20px] font-medium tracking-[-0.01em] hover:text-[#2F5D8A] transition-colors"
          >
            {name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-x-6 text-[14px] font-medium">
            <a className="nl min-h-[44px] flex items-center" href="#s1">
              Proyek
            </a>
            <a className="nl min-h-[44px] flex items-center" href="#s2">
              Kompetensi
            </a>
            <a className="nl min-h-[44px] flex items-center" href="#s3">
              Pengalaman
            </a>
            <a className="nl min-h-[44px] flex items-center" href="#s4">
              Kontak
            </a>
          </nav>

          {/* Right Controls: Telemetry HUD + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <div className="mono flex gap-4 text-[12px] tracking-[0.05em] text-[#4A5160]">
              <span className="hidden sm:inline">MLG {timeText} WIB</span>
              <span>{altitudeText}</span>
            </div>

            {/* Mobile Nav Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Buka navigasi kokpit"
              className="md:hidden mono text-[12px] border border-[#14181F] rounded-[2px] px-2.5 py-1 text-[#14181F] hover:bg-[#14181F] hover:text-[#F6F4EF] transition-colors"
            >
              [MENU]
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Cockpit Navigation Drawer */}
      <MobileCockpitNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        timeText={timeText}
        altitudeText={altitudeText}
      />
    </>
  );
};
