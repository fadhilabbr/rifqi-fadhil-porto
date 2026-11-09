'use client';

import React from 'react';
import type { ExperienceDTO } from '@/application/dto/ExperienceDTO';
import { ParallaxSectionWatermark } from './ParallaxSectionWatermark';

interface ExperienceSectionProps {
  experiences: readonly ExperienceDTO[];
  isNight?: boolean;
  progress?: number;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isNight = false,
  progress = 0,
}) => {
  return (
    <section
      id="s3"
      className={`panel reveal mt-14 p-9 sm:p-10 pb-6 transition-colors duration-500 relative overflow-hidden ${
        isNight ? 'panel-night' : ''
      }`}
    >
      {/* Parallax Depth Zoom Watermark */}
      <ParallaxSectionWatermark
        number="03"
        label="FLIGHT LOGS"
        targetProgress={0.72}
        currentProgress={progress}
      />

      {/* Section Header */}
      <div
        className={`flex flex-wrap gap-x-6 gap-y-2 items-baseline justify-between pb-5.5 mb-1.5 border-b transition-colors ${
          isNight ? 'border-white/20' : 'border-[#14181F]'
        }`}
      >
        <h2
          className={`m-0 font-serif font-normal text-[clamp(30px,4vw,44px)] tracking-[-0.02em] transition-colors ${
            isNight ? 'text-[#F8FAFC]' : 'text-[#14181F]'
          }`}
        >
          <span
            className={`mono text-[13px] tracking-[0.1em] mr-3.5 transition-colors ${
              isNight ? 'text-sky-300 font-semibold' : 'text-[#4A5160]'
            }`}
          >
            03
          </span>
          Pengalaman &amp; pendidikan
        </h2>
        <span
          className={`mono text-[11px] tracking-[0.08em] uppercase transition-colors ${
            isNight ? 'text-slate-400' : 'text-[#4A5160]'
          }`}
        >
          LOG OPERASIONAL
        </span>
      </div>

      {/* Timeline Rows */}
      {experiences.map((exp, index) => {
        const isFirst = index === 0;
        return (
          <div
            key={exp.id}
            className={`flight-row ${isFirst ? 'border-t-0' : ''}`}
          >
            <span
              className={`mono text-[13px] pt-0.5 transition-colors font-medium ${
                isNight ? 'text-sky-300/90' : 'text-[#4A5160]'
              }`}
            >
              {exp.period}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className={`font-serif font-medium text-[22px] transition-colors ${
                  isNight ? 'text-[#F8FAFC]' : 'text-[#14181F]'
                }`}
              >
                {exp.title}
              </span>
              <span
                className={`text-[15px] font-medium transition-colors ${
                  isNight ? 'text-slate-300' : 'text-[#4A5160]'
                }`}
              >
                {exp.organization} &bull; {exp.location}
              </span>
              <p
                className={`text-[15px] leading-[1.65] mt-1.5 m-0 transition-colors ${
                  isNight ? 'text-slate-200' : 'text-[#2B3342]'
                }`}
              >
                {exp.description}
              </p>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul
                  className={`mt-2 ml-4 list-disc text-[13px] space-y-1 transition-colors ${
                    isNight ? 'text-slate-300 marker:text-sky-400' : 'text-[#4A5160]'
                  }`}
                >
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};
