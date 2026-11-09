'use client';

import React from 'react';

interface SkyBackgroundProps {
  progress: number;
  mouseParallax?: { x: number; y: number };
}

// Color stops for RGB interpolation matching descent stages (1200m -> 0m)
interface ColorStop {
  p: number;
  r: number;
  g: number;
  b: number;
}

const SKY_COLOR_STOPS: ColorStop[] = [
  { p: 0.0, r: 142, g: 175, b: 201 }, // 1200m: High Cruise Clear Sky (#8EAFC9)
  { p: 0.28, r: 214, g: 204, b: 192 }, // 860m: Cloud Layer Approach (#D6CCC0)
  { p: 0.55, r: 197, g: 149, b: 126 }, // 540m: Sunset Golden Approach (#C5957E)
  { p: 0.76, r: 53, g: 65, b: 91 }, // 280m: Twilight Final Approach (#35415B)
  { p: 1.0, r: 10, g: 14, b: 23 }, // 0m: Ground Night Touchdown (#0A0E17)
];

const FAR_MOUNTAIN_STOPS: ColorStop[] = [
  { p: 0.0, r: 156, g: 181, b: 203 },
  { p: 0.28, r: 196, g: 183, b: 169 },
  { p: 0.55, r: 165, g: 139, b: 126 },
  { p: 0.76, r: 44, g: 53, b: 73 },
  { p: 1.0, r: 11, g: 16, b: 25 },
];

const NEAR_MOUNTAIN_STOPS: ColorStop[] = [
  { p: 0.0, r: 130, g: 158, b: 183 },
  { p: 0.28, r: 175, g: 160, b: 146 },
  { p: 0.55, r: 126, g: 99, b: 88 },
  { p: 0.76, r: 31, g: 39, b: 55 },
  { p: 1.0, r: 7, g: 11, b: 18 },
];

function interpolateStops(stops: ColorStop[], p: number): string {
  const clamped = Math.max(0, Math.min(1, p));
  let start = stops[0];
  let end = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (clamped >= stops[i].p && clamped <= stops[i + 1].p) {
      start = stops[i];
      end = stops[i + 1];
      break;
    }
  }

  const range = end.p - start.p;
  const factor = range === 0 ? 0 : (clamped - start.p) / range;
  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

export const SkyBackground: React.FC<SkyBackgroundProps> = ({
  progress,
  mouseParallax = { x: 0, y: 0 },
}) => {
  const dynamicSky = interpolateStops(SKY_COLOR_STOPS, progress);
  const dynamicFar = interpolateStops(FAR_MOUNTAIN_STOPS, progress);
  const dynamicNear = interpolateStops(NEAR_MOUNTAIN_STOPS, progress);

  const isNight = progress > 0.65;
  const isNearGround = progress > 0.82; // Altitude < 215m

  // 1. CINEMATIC MOUNTAIN DOLLY-ZOOM (Scale + Elevation Parallax)
  // Mountains zoom forward and expand horizontally as the viewer descends to ground level
  const farTranslateY = (1 - progress) * 60 + mouseParallax.y * 6;
  const farScaleY = 0.8 + progress * 0.38;
  const farScaleX = 1 + progress * 0.16;

  const nearTranslateY = (1 - progress) * 95 + mouseParallax.y * 14;
  const nearScaleY = 0.7 + progress * 0.65;
  const nearScaleX = 1 + progress * 0.28;

  // 2. CINEMATIC CLOUD FLY-THROUGH (Camera penetrates & zooms through cloud ceiling)
  // As altitude descends from 1200m -> 600m (progress 0 -> 0.5), clouds zoom past the camera (1.0 -> 2.8x)
  // and part to the left & right, creating an immersive flight-through sensation!
  const cloudFlyProgress = Math.min(1, progress / 0.5);
  const cloudZoomScale = 1 + cloudFlyProgress * 1.9; // 1.0x to 2.9x
  const cloudLeftOffset = -cloudFlyProgress * 28 + mouseParallax.x * 14;
  const cloudRightOffset = cloudFlyProgress * 28 + mouseParallax.x * 14;
  const cloudOpacity =
    progress < 0.2
      ? 0.7 + progress * 1.5 // gets denser on initial approach
      : Math.max(0.04, 1 - (progress - 0.2) * 2.8); // rapidly punches through and dissolves below cloud base

  // 3. TOPOGRAPHIC CONTOUR PERSPECTIVE ZOOM
  const contourZoomScale = 0.88 + progress * 0.45;

  // 4. DRONE PERSPECTIVE ALTITUDE SCALE & POSITION
  const droneYOffset = -120 + progress * 160 + mouseParallax.y * 18;
  const droneXOffset = mouseParallax.x * 24;
  const droneScale = 0.88 + progress * 0.3; // zooms slightly closer in perspective as it descends

  return (
    <>
      {/* Background container */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: dynamicSky }}
        aria-hidden="true"
      >
        {/* Sky layer with CSS scroll timeline support */}
        <div className="absolute inset-0 sky-scroll" />

        {/* Stars (fade in during night approach) */}
        <div
          className="absolute inset-0 transition-opacity duration-700 stars-scroll"
          style={{
            opacity: isNight ? Math.min(1, (progress - 0.6) * 2.5) : 0,
            transform: `translate(${mouseParallax.x * 8}px, ${mouseParallax.y * 6}px)`,
          }}
        >
          <span className="star" style={{ left: '7%', top: '10%' }} />
          <span className="star" style={{ left: '19%', top: '24%', animationDelay: '-1s' }} />
          <span className="star" style={{ left: '33%', top: '7%', animationDelay: '-2s' }} />
          <span className="star" style={{ left: '47%', top: '29%', animationDelay: '-0.6s' }} />
          <span className="star" style={{ left: '60%', top: '13%', animationDelay: '-1.4s' }} />
          <span className="star" style={{ left: '72%', top: '33%', animationDelay: '-2.6s' }} />
          <span className="star" style={{ left: '85%', top: '9%', animationDelay: '-0.3s' }} />
          <span className="star" style={{ left: '93%', top: '22%', animationDelay: '-1.9s' }} />
          <span className="star" style={{ left: '14%', top: '41%', animationDelay: '-2.9s' }} />
          <span className="star" style={{ left: '54%', top: '45%', animationDelay: '-0.8s' }} />
        </div>

        {/* Sun (descends and sets toward the horizon during descent + parallax shift) */}
        <div
          className="absolute rounded-full pointer-events-none sun-scroll"
          style={{
            left: '12vw',
            top: '110px',
            width: '84px',
            height: '84px',
            background: progress > 0.5 ? '#D99E78' : '#F6E7BD',
            opacity: Math.max(0, 1 - progress * 1.55),
            transform: `translate(${progress * 26 + mouseParallax.x * 2}vw, ${
              progress * 260 + mouseParallax.y * 14
            }px) scale(${Math.max(0.7, 1 - progress * 0.35)})`,
            transition: 'background 0.5s ease',
          }}
        />

        {/* Moon (rises during low-altitude night approach + parallax shift) */}
        <div
          className="absolute rounded-full pointer-events-none moon-scroll"
          style={{
            right: '14vw',
            top: '120px',
            width: '64px',
            height: '64px',
            background: '#E6E9EF',
            boxShadow: 'inset -12px -5px 0 0 #C9CEDA',
            opacity: progress > 0.65 ? Math.min(1, (progress - 0.65) * 3) : 0,
            transform: `translate(${(1 - progress) * 3 - mouseParallax.x * 1.5}vw, ${
              (1 - progress) * 35 - mouseParallax.y * 12
            }px) scale(${0.8 + Math.min(0.3, progress * 0.3)})`,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* CINEMATIC CLOUD FLY-THROUGH (Diving through the cloud layer with dynamic zoom & parting) */}
        <div
          className="absolute inset-0 pointer-events-none haze-scroll transition-opacity duration-300"
          style={{ opacity: cloudOpacity }}
        >
          {/* Left Cloud Bank — Zooms up and parts to the left */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              width: '80vw',
              height: '240px',
              top: '16%',
              left: '-15vw',
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,.62), rgba(255,255,255,0) 70%)',
              transform: `translate(${cloudLeftOffset}vw, ${
                -(progress * 190) + mouseParallax.y * 12
              }px) scale(${cloudZoomScale})`,
              transformOrigin: '20% 40%',
              transition: 'transform 0.1s ease-out',
            }}
          />

          {/* Right Cloud Bank — Zooms up and parts to the right */}
          <div
            className="absolute rounded-full will-change-transform"
            style={{
              width: '80vw',
              height: '240px',
              top: '40%',
              left: '30vw',
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,.58), rgba(255,255,255,0) 70%)',
              transform: `translate(${cloudRightOffset}vw, ${
                -(progress * 190) + mouseParallax.y * 12
              }px) scale(${cloudZoomScale})`,
              transformOrigin: '80% 40%',
              transition: 'transform 0.1s ease-out',
            }}
          />

          {/* Center Cloud Vortex / Atmosphere Puff — Zooms directly towards camera */}
          {progress < 0.38 && (
            <div
              className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
              style={{
                width: '60vw',
                height: '180px',
                background:
                  'radial-gradient(ellipse at center, rgba(255,255,255,.35), rgba(255,255,255,0) 65%)',
                transform: `scale(${1 + progress * 4.5})`,
                opacity: Math.max(0, 0.6 - progress * 1.8),
                filter: 'blur(16px)',
              }}
            />
          )}
        </div>

        {/* Topographic Contour Lines (perspective zoom-tunnel shift) */}
        <div
          className="absolute left-0 right-0 top-0 h-full pointer-events-none contour-color-scroll"
          style={{
            color: isNight ? '#DCE3EE' : '#14181F',
            opacity: 0.9,
            transition: 'color 0.5s ease',
          }}
        >
          <svg
            className="absolute left-0 top-0 w-full h-[1900px] opacity-[0.11] contour-move-scroll will-change-transform"
            viewBox="0 0 1440 1900"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            style={{
              transform: `translate(${mouseParallax.x * 12}px, ${
                -(progress * 340) + mouseParallax.y * 10
              }px) scale(${contourZoomScale})`,
              transformOrigin: '50% 20%',
              transition: 'transform 0.12s ease-out',
            }}
          >
            <path d="M-50 100 C 300 40, 600 170, 900 70 S 1300 150, 1500 90" />
            <path d="M-50 230 C 280 170, 640 300, 940 200 S 1320 270, 1500 220" />
            <path d="M-50 370 C 320 310, 600 430, 920 340 S 1300 410, 1500 360" />
            <path d="M-50 520 C 260 460, 660 580, 960 490 S 1340 560, 1500 510" />
            <path d="M-50 660 C 340 600, 620 720, 900 630 S 1280 700, 1500 650" />
            <path d="M-50 810 C 300 750, 640 870, 940 780 S 1320 850, 1500 800" />
            <path d="M-50 960 C 280 900, 600 1020, 920 930 S 1300 1000, 1500 950" />
            <path d="M-50 1110 C 320 1050, 660 1170, 960 1080 S 1340 1150, 1500 1100" />
            <path d="M-50 1260 C 300 1200, 620 1320, 900 1230 S 1280 1300, 1500 1250" />
            <path d="M-50 1410 C 260 1350, 640 1470, 940 1380 S 1320 1450, 1500 1400" />
            <path d="M-50 1560 C 340 1500, 600 1620, 920 1530 S 1300 1600, 1500 1550" />
            <path d="M-50 1710 C 300 1650, 660 1770, 960 1680 S 1340 1750, 1500 1700" />
          </svg>
        </div>

        {/* MOUNTAINS DOLLY-ZOOM SILHOUETTES (Expand in 3D perspective toward viewer on descent) */}
        <svg
          className="absolute left-0 right-0 bottom-0 w-full h-[320px] block pointer-events-none"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* Far mountain ridge — zooms with subtle horizontal and vertical expansion */}
          <g
            className="far-rise-scroll will-change-transform"
            style={{
              transform: `translateY(${farTranslateY}px) scale(${farScaleX}, ${farScaleY})`,
              transformOrigin: '50% 100%',
              transition: 'transform 0.15s ease-out',
            }}
          >
            <path
              className="far-scroll transition-colors duration-500"
              style={{ fill: dynamicFar }}
              d="M0 190 L140 130 L260 175 L400 105 L540 180 L690 120 L830 185 L980 100 L1120 170 L1260 115 L1360 160 L1440 125 V320 H0Z"
            />
          </g>

          {/* Near mountain ridge — surges forward dramatically with powerful dolly-zoom */}
          <g
            className="near-rise-scroll will-change-transform"
            style={{
              transform: `translateY(${nearTranslateY}px) scale(${nearScaleX}, ${nearScaleY})`,
              transformOrigin: '50% 100%',
              transition: 'transform 0.15s ease-out',
            }}
          >
            <path
              className="near-scroll transition-colors duration-500"
              style={{ fill: dynamicNear }}
              d="M0 250 L180 195 L330 240 L520 185 L700 245 L880 190 L1060 248 L1240 195 L1440 240 V320 H0Z"
            />
          </g>
        </svg>
      </div>

      {/* Patrol Drone UAV (Altitude descent tracking + perspective scale) */}
      <div
        className="fixed left-0 bottom-[160px] z-[1] pointer-events-none w-[130px] drone-color-scroll"
        style={{
          color: isNight ? '#E8ECF2' : '#14181F',
          transition: 'color 0.5s ease',
        }}
        aria-hidden="true"
      >
        <div
          className="drone-path-scroll will-change-transform"
          style={{
            transform: `translate(${droneXOffset}px, ${droneYOffset}px) scale(${droneScale})`,
            transition: 'transform 0.18s ease-out',
          }}
        >
          <div className="bobber">
            <svg
              viewBox="0 0 260 130"
              width="130"
              height="65"
              className="block overflow-visible"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Drone Body & Arms */}
              <path d="M72 62 H188" />
              <rect x="60" y="52" width="14" height="14" rx="3" />
              <rect x="186" y="52" width="14" height="14" rx="3" />

              {/* Spinning Propellers */}
              <ellipse className="prop" cx="67" cy="44" rx="46" ry="3.5" strokeWidth="2.2" />
              <ellipse
                className="prop"
                cx="193"
                cy="44"
                rx="46"
                ry="3.5"
                strokeWidth="2.2"
                style={{ animationDelay: '-0.04s' }}
              />

              {/* Central Fuselage */}
              <rect x="94" y="48" width="72" height="30" rx="14" />
              <path d="M108 63 H152" strokeWidth="2" />
              <circle className="led" cx="124" cy="63" r="2.6" fill="currentColor" stroke="none" />

              {/* Landing Gear & Gimbal Sensor */}
              <path d="M104 78 L95 104 M156 78 L165 104 M86 104 H112 M148 104 H174" />
              <circle cx="130" cy="90" r="8" />
              <circle cx="130" cy="90" r="2.6" fill="currentColor" stroke="none" />

              {/* Aerodynamic Micro-Wind Streamlines (Unobtrusive background airflow) */}
              <path
                d="M28 44 Q 8 40, -20 48 M232 44 Q 252 40, 280 48"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                className="opacity-30 animate-pulse"
              />

              {/* Landing Searchlight / Beam when close to ground */}
              {isNearGround && (
                <path
                  d="M122 98 L90 145 M138 98 L170 145"
                  stroke={isNight ? '#38BDF8' : '#F59E0B'}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="opacity-75 animate-pulse"
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
