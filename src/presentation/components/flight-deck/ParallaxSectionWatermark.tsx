'use client';

import React from 'react';

interface ParallaxSectionWatermarkProps {
  number: string;
  label: string;
  targetProgress: number; // e.g. 0.25 for S1, 0.5 for S2, 0.72 for S3, 0.92 for S4
  currentProgress: number;
}

export const ParallaxSectionWatermark: React.FC<ParallaxSectionWatermarkProps> = ({
  number,
  label,
  targetProgress,
  currentProgress,
}) => {
  // Calculate relative distance from viewport focus
  const diff = currentProgress - targetProgress;
  const focusIntensity = Math.max(0, 1 - Math.abs(diff) * 3); // 1 when directly centered, 0 when far

  // Dynamic Parallax Zoom & Elevation
  const zoomScale = 0.82 + focusIntensity * 0.42; // Scales up from 0.82x to 1.24x as user scrolls past!
  const parallaxY = diff * 90; // Slower parallax drift relative to section card

  // Check if watermark is in night flight zone (Sections 03 & 04)
  const isNight = targetProgress >= 0.6;
  const opacity = isNight
    ? 0.05 + focusIntensity * 0.08
    : 0.03 + focusIntensity * 0.05;

  return (
    <div
      aria-hidden="true"
      className="absolute right-2 -top-14 sm:-top-20 -z-10 pointer-events-none select-none overflow-hidden transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translateY(${parallaxY}px) scale(${zoomScale})`,
        transformOrigin: '90% 40%',
        opacity,
      }}
    >
      <div className="flex flex-col items-end leading-none">
        <span
          className={`mono text-[110px] sm:text-[180px] md:text-[240px] font-black tracking-tighter drop-shadow-sm transition-colors ${
            isNight ? 'text-sky-200' : 'text-[#14181F]'
          }`}
        >
          {number}
        </span>
        <span
          className={`mono text-[12px] sm:text-[16px] md:text-[20px] font-bold tracking-[0.25em] -mt-6 sm:-mt-10 uppercase transition-colors ${
            isNight ? 'text-sky-200/90' : 'text-[#14181F]'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
