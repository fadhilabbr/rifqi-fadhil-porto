'use client';

import React from 'react';

interface FlightFooterProps {
  name: string;
  year?: number | string;
  isNight?: boolean;
}

export const FlightFooter: React.FC<FlightFooterProps> = ({
  name,
  year = '2026',
  isNight = false,
}) => {
  return (
    <footer className="mt-14 pb-8 flex flex-wrap gap-x-6 gap-y-3 justify-between items-center transition-colors">
      <span
        className={`mono text-[12px] tracking-[0.06em] uppercase rounded-[3px] py-2 px-3.5 transition-colors border ${
          isNight
            ? 'bg-[#121622]/90 border-white/20 text-[#F8FAFC]'
            : 'bg-[#F6F4EF] border-[#CFCBC0] text-[#14181F]'
        }`}
        style={{ color: isNight ? '#F8FAFC' : '#14181F' }}
      >
        &copy; {year} {name.toUpperCase()}
      </span>
      <a
        href="#atas"
        className={`mono text-[12px] tracking-[0.06em] uppercase rounded-[3px] px-3.5 min-h-[44px] inline-flex items-center no-underline transition-colors border ${
          isNight
            ? 'bg-[#121622]/90 border-white/20 text-[#F8FAFC] hover:border-sky-400 hover:text-sky-300'
            : 'bg-[#F6F4EF] border-[#CFCBC0] text-[#14181F] hover:border-[#14181F]'
        }`}
        style={{ color: isNight ? '#F8FAFC' : '#14181F' }}
      >
        KEMBALI KE ATAS &uarr;
      </a>
    </footer>
  );
};
