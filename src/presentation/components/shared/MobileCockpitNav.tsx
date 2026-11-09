'use client';

import React from 'react';
import { Drawer } from '@/presentation/components/ui/Drawer';
import { FLIGHT_NAV_SECTIONS } from '@/shared/constants/flight-deck';

export interface MobileCockpitNavProps {
  isOpen: boolean;
  onClose: () => void;
  timeText: string;
  altitudeText: string;
}

export const MobileCockpitNav: React.FC<MobileCockpitNavProps> = ({
  isOpen,
  onClose,
  timeText,
  altitudeText,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" className="max-w-[320px]">
      <div className="flex flex-col h-full justify-between">
        {/* Header Drawer */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#14181F]">
            <div>
              <span className="mono text-[10px] tracking-[0.14em] uppercase text-[#4A5160] block">
                FLIGHT CONTROL
              </span>
              <span className="font-serif font-medium text-[19px]">
                Navigasi Kokpit
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup navigasi"
              className="mono text-[12px] border border-[#14181F] rounded-[2px] px-2 py-1 text-[#14181F] hover:bg-[#14181F] hover:text-[#F6F4EF]"
            >
              [TUTUP]
            </button>
          </div>

          {/* Telemetry Indicator */}
          <div className="bg-[#FBFAF7] border border-[#CFCBC0] rounded-[3px] p-3 mb-6 mono text-[12px] text-[#4A5160] flex justify-between">
            <span>MLG {timeText} WIB</span>
            <span className="font-medium text-[#14181F]">{altitudeText}</span>
          </div>

          {/* Navigation Stations */}
          <nav className="flex flex-col gap-2">
            {FLIGHT_NAV_SECTIONS.map((sec, idx) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={onClose}
                className="group flex flex-col p-3 rounded-[3px] border border-transparent hover:border-[#CFCBC0] hover:bg-[#FBFAF7] transition-all no-underline"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] text-[#4A5160] group-hover:text-[#2F5D8A]">
                    STASIUN 0{idx + 1}
                  </span>
                  <span className="mono text-[10px] bg-[#EAE6DD] px-1.5 py-0.5 rounded text-[#4A5160]">
                    {sec.checkpointAltitude} m
                  </span>
                </div>
                <span className="font-serif font-medium text-[20px] text-[#14181F] group-hover:text-[#2F5D8A] transition-colors mt-0.5">
                  {sec.label}
                </span>
                <span className="text-[12px] text-[#4A5160] mt-0.5">
                  {sec.description}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer info in Drawer */}
        <div className="pt-4 border-t border-[#CFCBC0] text-center mono text-[11px] text-[#4A5160]">
          FLIGHT DECK &bull; RF-2026
        </div>
      </div>
    </Drawer>
  );
};
