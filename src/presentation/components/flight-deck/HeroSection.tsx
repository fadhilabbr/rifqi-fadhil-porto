'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { ProfileDTO } from '@/application/dto/ProfileDTO';

interface HeroSectionProps {
  profile: ProfileDTO;
  mouseParallax?: { x: number; y: number };
  progress?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  mouseParallax = { x: 0, y: 0 },
  progress = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomLocked, setIsZoomLocked] = useState(false);

  // 3D Cockpit Gyro Tilt Angles + Cinematic Depth Zoom
  const isZoomActive = isHovered || isZoomLocked;
  const tiltMultiplier = isZoomActive ? 1.6 : 1.0;
  const tiltX = mouseParallax.y * -11 * tiltMultiplier; // Pitch angle
  const tiltY = mouseParallax.x * 14 * tiltMultiplier; // Roll angle

  // Scroll depth scale + interactive optical zoom
  const baseDepthScale = Math.max(0.88, 1 - progress * 0.45);
  const activeZoomScale = isZoomActive ? 1.1 : 1.0;
  const finalScale = baseDepthScale * activeZoomScale;
  const heroDepthY = progress * 35;

  return (
    <section className="min-h-[800px] pt-36 pb-16 grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-14 items-center">
      {/* Left Column: Headlines & Call to Actions */}
      <div className="flex flex-col gap-6.5">
        <span
          className="mono text-[12px] tracking-[0.14em] uppercase text-[#3B4252] animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both]"
          style={{ animationDelay: '0.1s' }}
        >
          {profile.title} &bull; {profile.university}
        </span>

        <h1
          className="m-0 font-serif font-normal text-[clamp(46px,7.4vw,98px)] leading-none tracking-[-0.03em] text-[#10141B] animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both]"
          style={{ animationDelay: '0.25s' }}
        >
          {profile.name}
        </h1>

        <p
          className="m-0 text-[17px] leading-[1.7] text-[#2B3342] max-w-[540px] animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both]"
          style={{ animationDelay: '0.4s' }}
        >
          {profile.bioSummary}
        </p>

        <div
          className="flex flex-wrap gap-3.5 pt-2 animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both]"
          style={{ animationDelay: '0.55s' }}
        >
          <a className="btn btn-ink" href="#s1">
            Lihat pekerjaan &darr;
          </a>
          <a className="btn btn-line" href="#s4">
            Hubungi saya
          </a>
        </div>
      </div>

      {/* Right Column: 3D Interactive Parallax Gyro & Dramatic Zoom Monogram Frame */}
      <figure className="m-0 justify-self-center w-full max-w-[380px] select-none">
        <div
          role="region"
          aria-label="Monogram Frame 3D Interaktif"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsZoomLocked((prev) => !prev)}
          className={`relative aspect-[4/5] bg-[#FBFAF7] border rounded-[3px] p-4 flex items-center justify-center transition-all duration-200 ease-out will-change-transform cursor-pointer ${
            isZoomActive
              ? 'border-[#2F5D8A] shadow-[0_24px_50px_rgba(47,93,138,0.25),0_0_20px_rgba(47,93,138,0.15)] ring-1 ring-[#2F5D8A]/50'
              : 'border-[#CFCBC0] shadow-lg'
          }`}
          style={{
            transform: `perspective(1000px) translateY(${heroDepthY}px) scale(${finalScale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Internal Canvas Area */}
          <div className="w-full h-full bg-[#EAE6DD] flex items-center justify-center overflow-hidden border border-[#CFCBC0]/60 relative">
            {/* Interactive Holographic Optical Aperture Grid (Animates on Zoom) */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center ${
                isZoomActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-[200px] h-[200px] rounded-full border border-dashed border-[#2F5D8A]/30 animate-spin"
                style={{ animationDuration: '14s' }}
              />
              <div className="absolute w-[140px] h-[140px] rounded-full border border-[#2F5D8A]/20" />
              <div className="absolute left-4 right-4 h-[1px] bg-[#2F5D8A]/15" />
              <div className="absolute top-4 bottom-4 w-[1px] bg-[#2F5D8A]/15" />
            </div>

            {profile.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                width={360}
                height={450}
                className="w-full h-full object-cover block"
              />
            ) : (
              <div
                className="flex flex-col items-center gap-2 transition-transform duration-150 ease-out z-10"
                style={{
                  transform: `translate3d(${mouseParallax.x * (isZoomActive ? 12 : 6)}px, ${
                    mouseParallax.y * (isZoomActive ? 12 : 6)
                  }px, ${isZoomActive ? '35px' : '20px'})`,
                }}
              >
                <span className="font-serif italic text-[88px] leading-none text-[#2F5D8A] select-none drop-shadow-md">
                  RF
                </span>
                <span className="mono text-[11px] tracking-[0.1em] uppercase text-[#4A5160] font-semibold">
                  [{profile.callsign}]
                </span>
              </div>
            )}

            {/* Quick Interactive Tooltip Badge inside Frame */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center mono text-[9px] text-[#4A5160] px-2 py-1 bg-[#F6F4EF]/90 backdrop-blur-xs rounded-[2px] border border-[#CFCBC0]/50 z-20">
              <span className="text-[#2F5D8A] font-bold">
                {isZoomActive ? '● ZOOM 3D AKTIF' : '○ HOVER / KLIK UNTUK ZOOM'}
              </span>
              <span>PITCH: {tiltX.toFixed(0)}&deg;</span>
            </div>
          </div>

          {/* Technical Corner Brackets with 3D Z-elevation depth */}
          <span
            aria-hidden="true"
            className={`absolute -left-1.5 -top-1.5 w-5 h-5 border-l-2 border-t-2 transition-colors ${
              isZoomActive ? 'border-[#2F5D8A]' : 'border-[#14181F]'
            }`}
            style={{ transform: `translateZ(${isZoomActive ? '26px' : '15px'})` }}
          />
          <span
            aria-hidden="true"
            className={`absolute -right-1.5 -top-1.5 w-5 h-5 border-r-2 border-t-2 transition-colors ${
              isZoomActive ? 'border-[#2F5D8A]' : 'border-[#14181F]'
            }`}
            style={{ transform: `translateZ(${isZoomActive ? '26px' : '15px'})` }}
          />
          <span
            aria-hidden="true"
            className={`absolute -left-1.5 -bottom-1.5 w-5 h-5 border-l-2 border-b-2 transition-colors ${
              isZoomActive ? 'border-[#2F5D8A]' : 'border-[#14181F]'
            }`}
            style={{ transform: `translateZ(${isZoomActive ? '26px' : '15px'})` }}
          />
          <span
            aria-hidden="true"
            className={`absolute -right-1.5 -bottom-1.5 w-5 h-5 border-r-2 border-b-2 transition-colors ${
              isZoomActive ? 'border-[#2F5D8A]' : 'border-[#14181F]'
            }`}
            style={{ transform: `translateZ(${isZoomActive ? '26px' : '15px'})` }}
          />
        </div>

        {/* Technical Figcaption */}
        <figcaption className="mono mt-3.5 text-[11px] tracking-[0.08em] uppercase text-[#2B3342] flex justify-between gap-3">
          <span>Fig. 00 &mdash; {profile.name}</span>
          <span>
            {profile.locationOrigin} &rarr; {profile.locationCurrent}
          </span>
        </figcaption>
      </figure>
    </section>
  );
};
