'use client';

import React from 'react';
import type { ProfileDTO } from '@/application/dto/ProfileDTO';
import { useCopyClipboard } from '@/presentation/hooks/useCopyClipboard';
import { ParallaxSectionWatermark } from './ParallaxSectionWatermark';

interface ContactSectionProps {
  profile: ProfileDTO;
  isNight?: boolean;
  progress?: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  isNight = false,
  progress = 0,
}) => {
  const { copied, copy } = useCopyClipboard();

  const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    'Halo Rifqi, dari portofolio Flight Deck'
  )}`;

  return (
    <section
      id="s4"
      className={`panel reveal mt-14 p-9 sm:p-11 pb-10 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-14 gap-y-10 transition-colors duration-500 relative overflow-hidden ${
        isNight ? 'panel-night' : ''
      }`}
    >
      {/* Parallax Depth Zoom Watermark */}
      <ParallaxSectionWatermark
        number="04"
        label="COMM DISPATCH"
        targetProgress={0.92}
        currentProgress={progress}
      />

      {/* Left Column: CTA, Mail Actions & Social Links */}
      <div className="flex flex-col gap-5.5">
        <span
          className={`mono text-[13px] tracking-[0.1em] transition-colors ${
            isNight ? 'text-sky-300 font-semibold' : 'text-[#4A5160]'
          }`}
        >
          04 &bull; KONTAK // {profile.frequencyCode}
        </span>

        <h2
          className={`m-0 font-serif font-normal text-[clamp(36px,5vw,58px)] leading-[1.04] tracking-[-0.025em] text-balance transition-colors ${
            isNight ? 'text-[#F8FAFC]' : 'text-[#14181F]'
          }`}
        >
          Mari berdiskusi tentang kolaborasi.
        </h2>

        <div className="flex flex-wrap gap-3 items-center pt-2">
          <a className="btn btn-ink" href={mailHref}>
            {profile.email}
          </a>
          <button
            className="btn btn-line"
            type="button"
            onClick={() => copy(profile.email)}
          >
            {copied ? 'Email tersalin ✓' : 'Salin email'}
          </button>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] font-medium pt-2">
          {profile.links.map((link) => (
            <a
              key={link.label}
              className={`ul min-h-[44px] inline-flex items-center transition-colors ${
                isNight
                  ? 'text-[#F8FAFC] hover:text-sky-300'
                  : 'text-[#14181F] hover:text-[#2F5D8A]'
              }`}
              style={{ color: isNight ? '#F8FAFC' : '#14181F' }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Right Column: Bio Telemetry DL */}
      <dl
        className={`m-0 grid grid-cols-[minmax(90px,140px)_minmax(0,1fr)] border-t self-center transition-colors ${
          isNight ? 'border-white/20' : 'border-[#14181F]'
        }`}
      >
        <dt
          className={`mono text-[12px] tracking-[0.06em] uppercase py-3.5 border-b transition-colors ${
            isNight ? 'text-slate-400 border-white/10' : 'text-[#4A5160] border-[#CFCBC0]'
          }`}
        >
          Nama
        </dt>
        <dd
          className={`m-0 py-3.5 border-b text-[15px] font-medium transition-colors ${
            isNight ? 'text-[#F8FAFC] border-white/10' : 'text-[#14181F] border-[#CFCBC0]'
          }`}
        >
          {profile.name}
        </dd>

        <dt
          className={`mono text-[12px] tracking-[0.06em] uppercase py-3.5 border-b transition-colors ${
            isNight ? 'text-slate-400 border-white/10' : 'text-[#4A5160] border-[#CFCBC0]'
          }`}
        >
          Studi
        </dt>
        <dd
          className={`m-0 py-3.5 border-b text-[15px] font-medium transition-colors ${
            isNight ? 'text-[#F8FAFC] border-white/10' : 'text-[#14181F] border-[#CFCBC0]'
          }`}
        >
          {profile.studyProgram}
        </dd>

        <dt
          className={`mono text-[12px] tracking-[0.06em] uppercase py-3.5 border-b transition-colors ${
            isNight ? 'text-slate-400 border-white/10' : 'text-[#4A5160] border-[#CFCBC0]'
          }`}
        >
          Kampus
        </dt>
        <dd
          className={`m-0 py-3.5 border-b text-[15px] font-medium transition-colors ${
            isNight ? 'text-[#F8FAFC] border-white/10' : 'text-[#14181F] border-[#CFCBC0]'
          }`}
        >
          {profile.university} ({profile.faculty})
        </dd>

        <dt
          className={`mono text-[12px] tracking-[0.06em] uppercase py-3.5 border-b transition-colors ${
            isNight ? 'text-slate-400 border-white/10' : 'text-[#4A5160] border-[#CFCBC0]'
          }`}
        >
          Asal
        </dt>
        <dd
          className={`m-0 py-3.5 border-b text-[15px] font-medium transition-colors ${
            isNight ? 'text-[#F8FAFC] border-white/10' : 'text-[#14181F] border-[#CFCBC0]'
          }`}
        >
          {profile.locationOrigin}
        </dd>

        <dt
          className={`mono text-[12px] tracking-[0.06em] uppercase py-3.5 border-b transition-colors ${
            isNight ? 'text-slate-400 border-white/10' : 'text-[#4A5160] border-[#CFCBC0]'
          }`}
        >
          Rute
        </dt>
        <dd
          className={`m-0 py-3.5 border-b text-[15px] font-medium transition-colors ${
            isNight ? 'text-[#F8FAFC] border-white/10' : 'text-[#14181F] border-[#CFCBC0]'
          }`}
        >
          {profile.locationOrigin} &rarr; {profile.locationCurrent}
        </dd>
      </dl>
    </section>
  );
};
