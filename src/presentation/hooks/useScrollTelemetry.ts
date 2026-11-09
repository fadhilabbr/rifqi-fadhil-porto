'use client';

import { useState, useEffect } from 'react';
import { calculateAltitudeFromProgress } from '@/shared/utils/telemetry';

export interface ScrollTelemetry {
  progress: number;
  altitude: number;
  altitudeText: string;
  markerTop: string;
}

export function useScrollTelemetry(): ScrollTelemetry {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const de = document.documentElement;
        const maxScroll = Math.max(1, de.scrollHeight - window.innerHeight);
        const y = window.scrollY || de.scrollTop || 0;
        const p = Math.min(1, Math.max(0, y / maxScroll));
        setProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { altitudeMeters, formattedText } = calculateAltitudeFromProgress(progress);
  const markerTop = `${(progress * 100).toFixed(1)}%`;

  return {
    progress,
    altitude: altitudeMeters,
    altitudeText: formattedText,
    markerTop,
  };
}
