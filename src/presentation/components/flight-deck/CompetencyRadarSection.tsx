'use client';

import React, { useState } from 'react';
import type { CompetencyRadarDTO } from '@/application/dto/CompetencyRadarDTO';
import { RadarGame } from './RadarGame';
import { ParallaxSectionWatermark } from './ParallaxSectionWatermark';

interface CompetencyRadarSectionProps {
  competencies: readonly CompetencyRadarDTO[];
  progress?: number;
}

export const CompetencyRadarSection: React.FC<CompetencyRadarSectionProps> = ({
  competencies,
  progress = 0,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isGameMode, setIsGameMode] = useState<boolean>(false);

  const activeCompetency = competencies.find((c) => c.id === activeId) ?? null;

  return (
    <section id="s2" className="panel reveal mt-14 p-9 sm:p-10 relative overflow-hidden">
      {/* Parallax Depth Zoom Watermark */}
      <ParallaxSectionWatermark
        number="02"
        label="RADAR & TELEMETRY"
        targetProgress={0.48}
        currentProgress={progress}
      />

      {/* Section Header */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 items-baseline justify-between pb-5.5 mb-8 border-b border-[#14181F]">
        <h2 className="m-0 font-serif font-normal text-[clamp(30px,4vw,44px)] tracking-[-0.02em]">
          <span className="mono text-[13px] tracking-[0.1em] mr-3.5 text-[#4A5160]">
            02
          </span>
          Kompetensi
        </h2>

        {/* Tactical Controls & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {activeCompetency && !isGameMode && (
            <span className="mono text-[11px] uppercase tracking-[0.08em] bg-amber-500/10 border border-amber-600/40 text-amber-800 px-2 py-0.5 rounded-[2px] animate-pulse">
              [TARGET LOCK: {activeCompetency.category.toUpperCase()} &bull; AZ {activeCompetency.blip.azimuthDegrees}&deg; &bull; RNG {activeCompetency.blip.rangeKilometers}KM]
            </span>
          )}

          {/* Interactive Game Switcher Button */}
          <button
            type="button"
            onClick={() => setIsGameMode((prev) => !prev)}
            className={`mono text-[12px] font-semibold tracking-wider px-3.5 py-1.5 rounded-[3px] border transition-all cursor-pointer flex items-center gap-2 ${
              isGameMode
                ? 'bg-[#14181F] text-white border-[#14181F] hover:bg-[#2B3342] shadow-[0_2px_8px_rgba(20,24,31,0.25)]'
                : 'bg-[#2F5D8A] text-white border-[#2F5D8A] hover:bg-[#1E3F60] shadow-[0_2px_8px_rgba(47,93,138,0.25)]'
            }`}
            style={{ color: '#FFFFFF' }}
            aria-label="Alihkan mode permainan radar"
          >
            <span style={{ color: '#FFFFFF' }} className="text-white font-semibold">
              {isGameMode ? '📊 KEMBALI KE INSPEKSI' : '🕹️ MAIN RADAR GAME'}
            </span>
          </button>
        </div>
      </div>

      {/* Conditional View: Radar Mini-Game VS Standard Telemetry Inspection */}
      {isGameMode ? (
        <RadarGame
          competencies={competencies}
          onExitGame={() => setIsGameMode(false)}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-11 items-center">
          {/* Animated Radar Screen */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-[min(100%,340px)] aspect-square rounded-full border border-[#14181F] overflow-hidden bg-[#F6F4EF] shadow-inner"
              aria-label="Radar instrumen pemindaian kompetensi"
            >
              {/* Concentric Grid Rings */}
              <div className="absolute inset-[16.6%] rounded-full border border-[#14181F]/35" />
              <div className="absolute inset-[33.3%] rounded-full border border-[#14181F]/35" />
              <div className="absolute inset-[66.6%] rounded-full border border-[#14181F]/20" />

              {/* Crosshairs & Azimuth Axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#14181F]/30" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#14181F]/30" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 mono text-[9px] text-[#4A5160] pointer-events-none select-none">
                <span>270&deg;</span>
                <span>090&deg;</span>
              </div>
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1 mono text-[9px] text-[#4A5160] pointer-events-none select-none items-center">
                <span>000&deg;</span>
                <span>180&deg;</span>
              </div>

              {/* Sweeping Radar Beam */}
              <div
                className="sweep absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(20,24,31,0) 0deg, rgba(20,24,31,0) 300deg, rgba(20,24,31,.12) 359deg, rgba(20,24,31,.6) 360deg)',
                }}
              />

              {/* Interactive Radar Blips */}
              {competencies.map((comp) => {
                const isLocked = activeId === comp.id;
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setActiveId(isLocked ? null : comp.id)}
                    onMouseEnter={() => setActiveId(comp.id)}
                    onMouseLeave={() => setActiveId(null)}
                    className="absolute z-20 focus:outline-none -m-3 p-3 cursor-pointer group"
                    style={{ left: comp.blip.left, top: comp.blip.top }}
                    aria-label={`Target radar: ${comp.category}`}
                  >
                    <span
                      className={`blip absolute w-3 h-3 -m-1.5 block transition-transform ${
                        isLocked ? 'scale-150 ring-2 ring-[#14181F]' : ''
                      }`}
                      style={{
                        backgroundColor: comp.colorToken,
                        animationDelay: comp.blip.delay || '0s',
                      }}
                    />
                    {/* Reticle Target Ring on Active */}
                    {isLocked && (
                      <span
                        className="absolute -inset-2 border-2 border-dashed border-[#14181F] rounded-full animate-spin pointer-events-none"
                        style={{ animationDuration: '4s' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Telemetry Status Bar below radar */}
            <div className="mono text-[11px] text-[#4A5160] mt-3 flex flex-wrap justify-center gap-4">
              <span>SWEEP: 360&deg; CONTINUOUS</span>
              <span>BLIPS: {competencies.length} ACQUIRED</span>
              <button
                type="button"
                onClick={() => setIsGameMode(true)}
                className="text-[#2F5D8A] font-semibold hover:underline cursor-pointer"
              >
                [Uji Target di Mini-Game &rarr;]
              </button>
            </div>
          </div>

          {/* Competencies Breakdown List */}
          <div className="flex flex-col">
            {competencies.map((comp, idx) => {
              const isLast = idx === competencies.length - 1;
              const isLocked = activeId === comp.id;
              return (
                <div
                  key={comp.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveId(isLocked ? null : comp.id)}
                  onMouseEnter={() => setActiveId(comp.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className={`grid grid-cols-[12px_minmax(0,1fr)] gap-3.5 py-4 border-t border-[#CFCBC0] cursor-pointer transition-colors ${
                    isLast ? 'border-b' : ''
                  } ${isLocked ? 'bg-[#EAE6DD]/50 -mx-3 px-3 rounded' : ''}`}
                >
                  <span
                    className="w-2.5 h-2.5 mt-1.5 block shrink-0 rounded-full transition-transform"
                    style={{
                      backgroundColor: comp.colorToken,
                      transform: isLocked ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif font-medium text-[20px] text-[#14181F]">
                        {comp.category}
                      </span>
                      <span className="mono text-[10px] uppercase tracking-[0.06em] bg-[#FBFAF7] border border-[#CFCBC0] px-1.5 py-0.5 rounded text-[#4A5160]">
                        {comp.proficiencyLevel}
                      </span>
                    </div>
                    <div className="text-[15px] leading-[1.6] text-[#2B3342] mt-0.5">
                      {comp.skillsFormatted}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
