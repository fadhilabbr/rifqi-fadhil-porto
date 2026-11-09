'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CompetencyRadarDTO } from '@/application/dto/CompetencyRadarDTO';

interface TargetBlip {
  id: string;
  category: string;
  skillUnlocked: string;
  color: string;
  x: number; // 0 to 1 relative to center (-1 to 1)
  y: number;
  vx: number;
  vy: number;
  radius: number;
  points: number;
  isLocked: boolean;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  color: string;
}

interface RadarGameProps {
  competencies: readonly CompetencyRadarDTO[];
  onExitGame: () => void;
}

export const RadarGame: React.FC<RadarGameProps> = ({ competencies, onExitGame }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'ended'>('ready');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [interceptedCount, setInterceptedCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetsRef = useRef<TargetBlip[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const sweepAngleRef = useRef(0);
  const lastSpawnTime = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Crosshair coordinates
  const crosshairRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Web Audio Synthesizer (pure procedural sounds without external assets)
  const playTone = useCallback(
    (freq: number, type: OscillatorType = 'sine', duration = 0.12, gain = 0.1) => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        amp.gain.setValueAtTime(gain, ctx.currentTime);
        amp.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(amp);
        amp.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Fallback gracefully if browser audio is restricted
      }
    },
    [soundEnabled]
  );

  const playLockSuccessSound = useCallback(() => {
    playTone(587.33, 'triangle', 0.08, 0.12); // D5
    setTimeout(() => {
      playTone(880, 'sine', 0.14, 0.15); // A5
    }, 70);
  }, [playTone]);

  const playSweepChirp = useCallback(() => {
    playTone(320, 'sine', 0.05, 0.03);
  }, [playTone]);

  // Spawn a target at the radar perimeter moving toward center
  const spawnTarget = useCallback(() => {
    if (competencies.length === 0) return;
    const randomComp = competencies[Math.floor(Math.random() * competencies.length)];
    const randomSkill =
      randomComp.skillsFormatted.split(', ')[
        Math.floor(Math.random() * randomComp.skillsFormatted.split(', ').length)
      ] || randomComp.category;

    // Random angle at radius 0.88 - 0.95
    const angle = Math.random() * Math.PI * 2;
    const r = 0.88;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;

    // Velocity directing toward center with slight spiral drift
    const speed = 0.0022 + Math.random() * 0.0015;
    const targetAngle = angle + Math.PI + (Math.random() - 0.5) * 0.4;
    const vx = Math.cos(targetAngle) * speed;
    const vy = Math.sin(targetAngle) * speed;

    targetsRef.current.push({
      id: `${Date.now()}-${Math.random()}`,
      category: randomComp.category,
      skillUnlocked: randomSkill,
      color: randomComp.colorToken || '#2F5D8A',
      x,
      y,
      vx,
      vy,
      radius: 0.07,
      points: 100,
      isLocked: false,
    });
  }, [competencies]);

  // Start game loop
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    setInterceptedCount(0);
    targetsRef.current = [];
    floatingTextsRef.current = [];
    lastSpawnTime.current = Date.now();

    // Initial targets
    for (let i = 0; i < 4; i++) {
      spawnTarget();
    }

    playTone(440, 'triangle', 0.15, 0.15);
  }, [spawnTarget, playTone]);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('ended');
          playTone(220, 'sawtooth', 0.4, 0.2);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, playTone]);

  // Intercept click on radar canvas
  const handleRadarClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const clickY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Check hit against active targets
    let hit = false;
    targetsRef.current = targetsRef.current.filter((target) => {
      if (target.isLocked) return true;
      const dx = target.x - clickX;
      const dy = target.y - clickY;
      const dist = Math.hypot(dx, dy);

      // Hit threshold
      if (dist < target.radius * 1.5) {
        hit = true;
        target.isLocked = true;

        const earnedPoints = target.points * combo;
        setScore((prev) => {
          const newScore = prev + earnedPoints;
          setHighScore((hs) => Math.max(hs, newScore));
          return newScore;
        });
        setCombo((prev) => Math.min(prev + 1, 5));
        setInterceptedCount((prev) => prev + 1);

        // Add floating text
        floatingTextsRef.current.push({
          id: Date.now() + Math.random(),
          text: `+${earnedPoints} [${target.skillUnlocked}]`,
          x: target.x,
          y: target.y,
          opacity: 1,
          color: target.color,
        });

        playLockSuccessSound();
        return false; // remove hit target
      }
      return true;
    });

    if (!hit) {
      // Combo reset on miss
      setCombo(1);
      playTone(180, 'square', 0.08, 0.06);
    }
  };

  // Crosshair tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    crosshairRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = width / 2 - 10;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Radar Circular Background
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#111722';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#2F5D8A';
      ctx.stroke();
      ctx.clip(); // Keep drawing within radar circle

      // 2. Range Rings
      const ringSteps = [0.25, 0.5, 0.75, 1.0];
      ringSteps.forEach((step, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * step, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 3 ? '#38BDF8' : 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Range Labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.font = '9px monospace';
        ctx.fillText(`${(step * 40).toFixed(0)}KM`, centerX + 4, centerY - radius * step + 12);
      });

      // 3. Azimuth Crosshair Axes
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Degree Labels
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('000° N', centerX, centerY - radius + 16);
      ctx.fillText('180° S', centerX, centerY + radius - 8);
      ctx.textAlign = 'left';
      ctx.fillText('090° E', centerX + radius - 45, centerY - 4);
      ctx.textAlign = 'right';
      ctx.fillText('270° W', centerX - radius + 45, centerY - 4);

      // 4. Sweeping Radar Line & Beam
      sweepAngleRef.current = (sweepAngleRef.current + 0.035) % (Math.PI * 2);
      const sweepX = centerX + Math.cos(sweepAngleRef.current) * radius;
      const sweepY = centerY + Math.sin(sweepAngleRef.current) * radius;

      // Conic gradient sweep beam
      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
      sweepGradient.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      sweepGradient.addColorStop(1, 'rgba(56, 189, 248, 0.02)');

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sweepAngleRef.current - 0.5, sweepAngleRef.current);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Leading beam line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 5. Spawn new targets periodically during playing
      if (gameState === 'playing') {
        const now = Date.now();
        if (now - lastSpawnTime.current > 1800 && targetsRef.current.length < 8) {
          spawnTarget();
          lastSpawnTime.current = now;
          playSweepChirp();
        }
      }

      // 6. Update & Render Target Blips
      targetsRef.current.forEach((t) => {
        if (gameState === 'playing') {
          t.x += t.vx;
          t.y += t.vy;

          // If reached center, bounce slightly outward
          const distFromCenter = Math.hypot(t.x, t.y);
          if (distFromCenter < 0.12) {
            t.vx *= -1;
            t.vy *= -1;
          }
        }

        const screenX = centerX + t.x * radius;
        const screenY = centerY + t.y * radius;

        // Draw glowing blip
        ctx.beginPath();
        ctx.arc(screenX, screenY, 6, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.fill();

        // Pulsing radar glow
        ctx.beginPath();
        ctx.arc(screenX, screenY, 11, 0, Math.PI * 2);
        ctx.strokeStyle = t.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Category Tag
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(t.category, screenX, screenY + 18);
      });

      // 7. Render Floating Reward Texts
      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => {
        const screenX = centerX + ft.x * radius;
        const screenY = centerY + ft.y * radius - (1 - ft.opacity) * 30;

        ctx.fillStyle = ft.color;
        ctx.globalAlpha = ft.opacity;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, screenX, screenY);
        ctx.globalAlpha = 1.0;

        ft.opacity -= 0.022;
        return ft.opacity > 0;
      });

      // 8. Player Crosshair Aim
      const aimX = centerX + crosshairRef.current.x * radius;
      const aimY = centerY + crosshairRef.current.y * radius;

      ctx.beginPath();
      ctx.arc(aimX, aimY, 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#FBBF24'; // Amber crosshair
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Crosshair tick marks
      ctx.beginPath();
      ctx.moveTo(aimX - 18, aimY);
      ctx.lineTo(aimX - 6, aimY);
      ctx.moveTo(aimX + 6, aimY);
      ctx.lineTo(aimX + 18, aimY);
      ctx.moveTo(aimX, aimY - 18);
      ctx.lineTo(aimX, aimY - 6);
      ctx.moveTo(aimX, aimY + 6);
      ctx.lineTo(aimX, aimY + 18);
      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, spawnTarget, playSweepChirp]);

  return (
    <div
      ref={containerRef}
      className="panel p-6 sm:p-8 bg-[#0E131D] text-[#F8FAFC] border border-[#2F5D8A]/60 rounded-[6px] shadow-2xl relative overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#2F5D8A]/40">
        <div className="flex items-center gap-3">
          <span className="mono text-[12px] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/40 px-2.5 py-0.5 rounded-[2px] font-bold">
            AVIONICS INTERCEPT // MINI-GAME
          </span>
          <span className="mono text-[11px] text-[#94A3B8] hidden sm:inline">
            FREKUENSI RADAR MALANG MLG-121.5
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="mono text-[11px] border border-[#475569] text-[#CBD5E1] px-2.5 py-1 rounded-[2px] hover:border-[#38BDF8] transition-colors"
            style={{ color: '#CBD5E1' }}
          >
            SFX: {soundEnabled ? 'ON 🔊' : 'OFF 🔇'}
          </button>

          {/* Exit Game Mode button */}
          <button
            type="button"
            onClick={onExitGame}
            className="mono text-[11px] border border-[#EF4444]/60 text-[#FCA5A5] px-2.5 py-1 rounded-[2px] hover:bg-[#EF4444]/20 transition-colors"
            style={{ color: '#FCA5A5' }}
          >
            [KELUAR GAME]
          </button>
        </div>
      </div>

      {/* Main Game Cockpit Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-center">
        {/* Left: Radar Canvas Display */}
        <div className="flex flex-col items-center relative">
          <div className="relative w-full max-w-[360px] aspect-square">
            <canvas
              ref={canvasRef}
              width={360}
              height={360}
              onClick={handleRadarClick}
              onMouseMove={handleMouseMove}
              className="w-full h-full rounded-full cursor-crosshair touch-none shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            />

            {/* Ready State Overlay */}
            {gameState === 'ready' && (
              <div className="absolute inset-0 rounded-full bg-[#0E131D]/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 border border-[#38BDF8]/40">
                <span className="mono text-[11px] text-[#38BDF8] tracking-widest uppercase mb-1">
                  MISI TAKTIS // TELEMETRI RADAR
                </span>
                <h3 className="font-serif text-[24px] text-white font-normal mb-2">
                  Kunci Sinyal Kompetensi
                </h3>
                <p className="text-[12px] text-[#CBD5E1] max-w-[240px] leading-relaxed mb-5">
                  Arahkan reticle crosshair dan klik blip radar sebelum mencapai pusat pangkalan.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center justify-center font-sans font-semibold rounded-[3px] bg-[#38BDF8] text-[#0E131D] hover:bg-[#0284C7] hover:text-white transition-all text-[13px] min-h-[40px] px-6 border-none shadow-[0_0_15px_rgba(56,189,248,0.5)] cursor-pointer"
                  style={{ color: '#0E131D' }}
                >
                  MULAI MISI [30 DETIK] &rarr;
                </button>
              </div>
            )}

            {/* Game Over / Mission Debriefing Overlay */}
            {gameState === 'ended' && (
              <div className="absolute inset-0 rounded-full bg-[#0E131D]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border border-[#F59E0B]/50 animate-fadeIn">
                <span className="mono text-[10px] text-[#FBBF24] tracking-widest uppercase mb-1">
                  MISSION ACCOMPLISHED // DEBRIEF
                </span>
                <h3 className="font-serif text-[26px] text-white font-normal mb-1">
                  {score >= 1200 ? 'ACE ENGINEER' : score >= 600 ? 'FLIGHT OFFICER' : 'CADET PILOT'}
                </h3>
                <div className="mono text-[28px] font-bold text-[#38BDF8] mb-1">
                  {score} <span className="text-[12px] font-normal text-[#94A3B8]">PTS</span>
                </div>
                <div className="mono text-[11px] text-[#CBD5E1] mb-4">
                  DECODED: {interceptedCount} KOMPETENSI
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startGame}
                    className="inline-flex items-center justify-center font-sans font-semibold rounded-[3px] bg-[#38BDF8] text-[#0E131D] hover:bg-[#0284C7] hover:text-white transition-all text-[12px] min-h-[36px] px-4 border-none shadow-[0_0_12px_rgba(56,189,248,0.4)] cursor-pointer"
                    style={{ color: '#0E131D' }}
                  >
                    MAIN LAGI
                  </button>
                  <button
                    type="button"
                    onClick={onExitGame}
                    className="inline-flex items-center justify-center font-sans font-medium rounded-[3px] border border-[#64748B] bg-transparent text-white hover:bg-white/10 hover:border-white transition-all text-[12px] min-h-[36px] px-4 cursor-pointer"
                    style={{ color: '#FFFFFF' }}
                  >
                    INSPEKSI
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick HUD below canvas */}
          <div className="mono text-[11px] text-[#94A3B8] mt-3 flex justify-between w-full max-w-[360px] px-2">
            <span>RADAR: 360&deg; CONTINUOUS</span>
            <span>DECODED: {interceptedCount} TARGETS</span>
          </div>
        </div>

        {/* Right: Tactical Scoreboard & Mission Stats */}
        <div className="flex flex-col gap-4 bg-[#141B28] p-5 rounded-[4px] border border-[#2F5D8A]/40">
          <div className="flex items-center justify-between border-b border-[#334155] pb-3">
            <span className="mono text-[11px] text-[#94A3B8] uppercase">WAKTU TERSISA</span>
            <span
              className={`mono text-[22px] font-bold ${
                timeLeft <= 5 ? 'text-[#EF4444] animate-ping' : 'text-[#38BDF8]'
              }`}
            >
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#334155] pb-3">
            <span className="mono text-[11px] text-[#94A3B8] uppercase">SKOR MISI</span>
            <span className="mono text-[22px] font-bold text-[#FBBF24]">{score}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#334155] pb-3">
            <span className="mono text-[11px] text-[#94A3B8] uppercase">COMBO MULTIPLIER</span>
            <span className="mono text-[16px] font-bold text-[#34D399]">{combo}x LOCK</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#334155] pb-3">
            <span className="mono text-[11px] text-[#94A3B8] uppercase">SKOR TERTINGGI</span>
            <span className="mono text-[16px] text-[#CBD5E1]">{highScore} PTS</span>
          </div>

          {/* Instructions Box */}
          <div className="mt-2 p-3 bg-[#0E131D] rounded border border-[#1E293B] text-[12px] leading-relaxed text-[#94A3B8]">
            <span className="mono font-semibold text-[#38BDF8] block mb-1">
              CARA BERMAIN:
            </span>
            &bull; Klik blip target berwarna di dalam radar sebelum mencapai titik tengah.<br />
            &bull; Setiap target membuka teknologi keahlian Rifqi Fadhil.<br />
            &bull; Pertahankan kombo tanpa meleset untuk melipatgandakan poin!
          </div>

          {gameState === 'playing' && (
            <button
              type="button"
              onClick={() => setGameState('ended')}
              className="mono text-[11px] text-[#EF4444] hover:underline text-center mt-1 cursor-pointer"
              style={{ color: '#EF4444' }}
            >
              Hentikan Misi Lebih Awal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
