'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FLIGHT_NAV_SECTIONS } from '@/shared/constants/flight-deck';

interface AltitudeRulerProps {
  markerTop: string;
}

const CHECKPOINTS = [
  { id: 'atas', altitude: 1200, label: '1200m', topPercent: 0 },
  ...FLIGHT_NAV_SECTIONS.map((sec) => ({
    id: sec.id,
    altitude: sec.checkpointAltitude,
    label: sec.checkpointAltitude === 0 ? '0m TD' : `${sec.checkpointAltitude}m`,
    topPercent: ((1200 - sec.checkpointAltitude) / 1200) * 100,
  })),
];

export const AltitudeRuler: React.FC<AltitudeRulerProps> = ({ markerTop }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Helper to scroll based on cursor/touch Y position relative to ruler track
  const scrollToClientY = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, relativeY / rect.height));

    const de = document.documentElement;
    const maxScroll = Math.max(1, de.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: ratio * maxScroll,
      behavior: isDragging ? 'auto' : 'smooth',
    });
  }, [isDragging]);

  // Click on track to jump
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    scrollToClientY(e.clientY);
  };

  // Dragging interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    scrollToClientY(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      scrollToClientY(e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      scrollToClientY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        scrollToClientY(e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, scrollToClientY]);

  // Descent formula: At top (0%) altitude is 1200m; at bottom (100%) altitude is 0m
  const percentNum = parseFloat(markerTop) || 0;
  const currentAltMeters = Math.max(0, Math.round((1 - percentNum / 100) * 1200));

  return (
    <aside
      className="alt-hud fixed right-2 sm:right-4 top-20 bottom-10 w-16 z-50 select-none mix-blend-difference text-white"
      aria-label="Penggaris altimeter & scrollbar kustom (Descent Mode)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clickable & Draggable Ruler Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={`relative w-full h-full cursor-pointer transition-colors duration-200 ${
          isDragging ? 'cursor-grabbing' : 'cursor-pointer'
        } ${isHovered ? 'bg-white/[0.04]' : ''} rounded-sm`}
        title="Klik atau geser untuk navigasi ketinggian pendaratan (Descent Scrubber)"
      >
        {/* Track Guideline Line */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/70" />

        {/* Elevation Ruler Tick Scale */}
        <div
          className="absolute right-[1px] top-0 bottom-0 w-3 pointer-events-none opacity-85"
          style={{
            background:
              'repeating-linear-gradient(180deg, #fff 0 1px, transparent 1px 14px)',
          }}
        />

        {/* Checkpoint Station Anchors */}
        {CHECKPOINTS.map((cp) => (
          <a
            key={cp.id}
            href={`#${cp.id}`}
            style={{ top: `${cp.topPercent}%` }}
            className="group absolute right-0 -translate-y-1/2 flex items-center gap-1.5 pr-0.5 py-1 focus:outline-none z-10"
            title={`Lompat ke stasiun ${cp.label}`}
            aria-label={`Ketinggian ${cp.label}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Elevation Numeric Label */}
            <span
              className={`mono text-[9px] transition-opacity duration-150 bg-black/80 px-1 py-0.5 rounded text-white mr-1 pointer-events-none ${
                isHovered || isDragging ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {cp.label}
            </span>
            {/* Checkpoint Dot */}
            <span className="w-2.5 h-2.5 rounded-full border border-white bg-[#0E131D] group-hover:bg-white transition-colors" />
          </a>
        ))}

        {/* Moving Needle Thumb with Live Altitude Readout */}
        <div
          className={`absolute right-0 w-14 h-0 transition-[top] ${
            isDragging ? 'duration-0' : 'duration-75'
          } ease-out z-20`}
          style={{ top: markerTop }}
        >
          {/* Live Dragging Tooltip */}
          <div
            className={`absolute right-4 -top-3.5 mono text-[10px] font-medium tracking-wider bg-black/90 border border-white/40 px-1.5 py-0.5 rounded text-white whitespace-nowrap transition-opacity pointer-events-none ${
              isHovered || isDragging ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {currentAltMeters === 0 ? 'TOUCHDOWN 0000m' : `ALT ${String(currentAltMeters).padStart(4, '0')}m`}
          </div>

          {/* Pointer Triangle Needle */}
          <div
            className={`absolute right-0 -top-2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[12px] transition-transform ${
              isDragging ? 'scale-125 border-r-amber-400' : 'border-r-white'
            }`}
          />
        </div>
      </div>
    </aside>
  );
};
