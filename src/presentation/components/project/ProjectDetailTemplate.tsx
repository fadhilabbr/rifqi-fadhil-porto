'use client';

import React from 'react';
import Link from 'next/link';
import type { ProjectDTO } from '@/application/dto/ProjectDTO';
import { useCopyClipboard } from '@/presentation/hooks/useCopyClipboard';
import { useWibClock } from '@/presentation/hooks/useWibClock';
import { useScrollTelemetry } from '@/presentation/hooks/useScrollTelemetry';
import { Icon } from '@iconify/react';

interface ProjectDetailTemplateProps {
  project: ProjectDTO;
  prevProject?: { slug: string; title: string; id: string } | null;
  nextProject?: { slug: string; title: string; id: string } | null;
  email?: string;
}

export const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({
  project,
  prevProject,
  nextProject,
  email = 'rifqifadhilabrar@gmail.com',
}) => {
  const { copied, copy } = useCopyClipboard(1800);
  const timeText = useWibClock();
  const { altitudeText, markerTop } = useScrollTelemetry();
  const isCompleted = project.statusType === 'completed';
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(
    'Halo Rifqi, soal proyek ' + project.title
  )}`;

  const tasks =
    project.tasks && project.tasks.length > 0
      ? project.tasks
      : [
          'Menerapkan desain UI menjadi halaman web responsif',
          'Membangun fitur interaktif navigasi dan komponen avionik',
          'Mengoptimalkan layout responsif di berbagai resolusi layar perangkat',
        ];

  return (
    <div className="relative w-full font-sans text-[#14181F] overflow-x-clip min-h-screen">
      {/* 1. Latar Belakang Avionik (Langit, Kontur, Pegunungan) */}
      <div className="bg" aria-hidden="true">
        <div className="sky" />
        <div className="stars">
          <span className="star" style={{ left: '7%', top: '10%' }} />
          <span className="star" style={{ left: '19%', top: '24%', animationDelay: '-1s' }} />
          <span className="star" style={{ left: '33%', top: '7%', animationDelay: '-2s' }} />
          <span className="star" style={{ left: '47%', top: '29%', animationDelay: '-0.6s' }} />
          <span className="star" style={{ left: '60%', top: '13%', animationDelay: '-1.4s' }} />
          <span className="star" style={{ left: '72%', top: '33%', animationDelay: '-2.6s' }} />
          <span className="star" style={{ left: '85%', top: '9%', animationDelay: '-0.3s' }} />
          <span className="star" style={{ left: '93%', top: '22%', animationDelay: '-1.9s' }} />
        </div>
        <div className="sun" />
        <div className="moon" />
        <div className="hazewrap">
          <div className="hz" style={{ top: '18%', left: '-10vw' }} />
          <div
            className="hz"
            style={{
              top: '44%',
              left: '30vw',
              animationDuration: '60s',
              animationDirection: 'alternate-reverse',
            }}
          />
        </div>
        <div className="contourbox">
          <svg
            className="contour"
            viewBox="0 0 1440 1900"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
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
          </svg>
        </div>
        <svg className="mount" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path
            className="far"
            d="M0 190 L140 130 L260 175 L400 105 L540 180 L690 120 L830 185 L980 100 L1120 170 L1260 115 L1360 160 L1440 125 V300 H0Z"
          />
          <path
            className="near"
            d="M0 250 L180 195 L330 240 L520 185 L700 245 L880 190 L1060 248 L1240 195 L1440 240 V300 H0Z"
          />
        </svg>
      </div>

      {/* 2. Drone Berpatroli */}
      <div className="drone" aria-hidden="true">
        <div className="dronepath">
          <div className="bobber">
            <svg
              viewBox="0 0 260 130"
              width="110"
              height="55"
              style={{ display: 'block', overflow: 'visible' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M72 62 H188" />
              <rect x="60" y="52" width="14" height="14" rx="3" />
              <rect x="186" y="52" width="14" height="14" rx="3" />
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
              <rect x="94" y="48" width="72" height="30" rx="14" />
              <path d="M108 63 H152" strokeWidth="2" />
              <circle className="led" cx="124" cy="63" r="2.6" fill="currentColor" stroke="none" />
              <path d="M104 78 L95 104 M156 78 L165 104 M86 104 H112 M148 104 H174" />
              <circle cx="130" cy="90" r="8" />
              <circle cx="130" cy="90" r="2.6" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Bar Header Navigasi */}
      <header className="bar">
        <div className="max-w-[1240px] mx-auto py-1.5 px-6 flex flex-wrap gap-x-7 gap-y-1 items-center justify-between">
          <Link
            href="/"
            className="text-inherit no-underline min-h-[44px] flex items-center font-serif text-[20px] font-medium tracking-[-0.01em]"
          >
            Rifqi Fadhil Abrar
          </Link>

          <nav
            className="navwrap flex gap-x-6 text-[14px] font-medium"
            aria-label="Navigasi utama"
          >
            <Link className="nl min-h-[44px] flex items-center" href="/">
              Beranda
            </Link>
            <Link
              className="nl min-h-[44px] flex items-center"
              href="/#s1"
              aria-current="page"
            >
              Proyek
            </Link>
            <Link className="nl min-h-[44px] flex items-center" href="/#s4">
              Kontak
            </Link>
          </nav>

          <div className="mono readout flex gap-4 text-[12px] tracking-[0.05em] text-[#4A5160]">
            <span>MLG {timeText} WIB</span>
            <span>ALT {altitudeText}</span>
          </div>
        </div>
      </header>

      {/* 4. Altimeter HUD di Sisi Kanan */}
      <div
        className="alt"
        aria-hidden="true"
        style={{
          position: 'fixed',
          right: '20px',
          top: '100px',
          bottom: '60px',
          width: '44px',
          zIndex: 41,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          color: '#fff',
        }}
      >
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', background: '#fff' }} />
        <div
          style={{
            position: 'absolute',
            right: '1px',
            top: 0,
            bottom: 0,
            width: '10px',
            background: 'repeating-linear-gradient(180deg,#fff 0 1px,transparent 1px 14px)',
          }}
        />
        <div style={{ position: 'absolute', right: 0, top: markerTop, width: '44px', height: 0 }}>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '-6px',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '11px solid #fff',
            }}
          />
        </div>
      </div>

      {/* 5. Konten Utama Proyek */}
      <main
        id="isi"
        className="relative z-[2] max-w-[1160px] mx-auto pt-[108px] px-7 pb-18 box-border"
      >
        {/* Breadcrumb Navigation */}
        <nav
          className="mono in flex flex-wrap gap-x-2.5 gap-y-1 items-center text-[12px] tracking-[0.05em] text-[#2B3342] mb-5.5"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="ul min-h-[44px] inline-flex items-center text-inherit hover:text-[#2F5D8A]"
          >
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/#s1"
            className="ul min-h-[44px] inline-flex items-center text-inherit hover:text-[#2F5D8A]"
          >
            Proyek
          </Link>
          <span aria-hidden="true">/</span>
          <span
            aria-current="page"
            className="bg-[#F6F4EF] border border-[#CFCBC0] rounded-[3px] py-1 px-2.5 text-[#14181F]"
          >
            {project.slug}
          </span>
        </nav>

        {/* Header Proyek Panel */}
        <section
          className="panel in p-9 sm:p-11 pb-10"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-wrap gap-2.5 items-center mb-5.5">
            <span className="mono text-[12px] text-[#4A5160] font-medium">
              {project.id}
            </span>
            <span className={isCompleted ? 'tag tag-fill' : 'tag'}>
              {project.status}
            </span>
          </div>

          <h1 className="m-0 mb-5 font-serif font-normal text-[clamp(34px,5.4vw,68px)] leading-[1.03] tracking-[-0.03em] max-w-[900px] text-balance">
            {project.title}
          </h1>

          <p className="m-0 text-[18px] sm:text-[20px] leading-[1.65] text-[#2B3342] max-w-[720px] text-pretty">
            {project.description}
          </p>

          <dl className="m-0 mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-7 border-t border-[#14181F]">
            <div className="py-4 border-b border-[#CFCBC0]">
              <dt className="lab">Peran</dt>
              <dd className="m-0 mt-1.5 text-[16px] text-[#14181F]">
                {project.role}
              </dd>
            </div>
            <div className="py-4 border-b border-[#CFCBC0]">
              <dt className="lab">Periode</dt>
              <dd className="m-0 mt-1.5 text-[16px] text-[#14181F]">
                {project.period}
              </dd>
            </div>
            <div className="py-4 border-b border-[#CFCBC0]">
              <dt className="lab">Organisasi</dt>
              <dd className="m-0 mt-1.5 text-[16px] text-[#14181F]">
                {project.org || 'Universitas Brawijaya'}
              </dd>
            </div>
            <div className="py-4 border-b border-[#CFCBC0]">
              <dt className="lab">Bidang</dt>
              <dd className="m-0 mt-1.5 text-[16px] text-[#14181F]">
                {project.field || project.category}
              </dd>
            </div>
          </dl>

          <figure className="m-0 mt-9">
            <div className="relative aspect-[16/8] bg-[#E6E2D8] border border-[#CFCBC0] overflow-hidden flex items-center justify-center">
              <span className="mono text-[13px] tracking-[0.08em] text-[#4A5160] text-center p-5">
                [Gambar utama proyek &mdash; rasio 2:1]
              </span>
            </div>
            <figcaption className="mono mt-3 text-[11px] tracking-[0.08em] uppercase text-[#2B3342]">
              Fig. 01 &mdash; [Keterangan gambar]
            </figcaption>
          </figure>
        </section>

        {/* Isi Proyek & Lembar Data (Sticky Aside) */}
        <section className="mt-12 flex flex-wrap gap-10 items-start">
          {/* Kolom Kiri: Uraian Proyek */}
          <div className="panel reveal flex-1 basis-[560px] min-w-0 p-8 sm:p-11 flex flex-col gap-11">
            {/* 01 · Ringkasan */}
            <div className="flex flex-col gap-3.5">
              <span className="lab">01 &bull; Ringkasan</span>
              <h2 className="h2">Tentang proyek ini</h2>
              <p className="m-0 text-[17px] leading-[1.75] text-[#232A36] text-pretty">
                {project.caseStudyContent || project.description}
              </p>
            </div>

            {/* 02 · Tanggung jawab */}
            <div className="flex flex-col gap-3.5">
              <span className="lab">02 &bull; Tanggung jawab</span>
              <h2 className="h2">Apa yang saya kerjakan</h2>
              <ul className="m-0 p-0 list-none flex flex-col border-t border-[#CFCBC0]">
                {tasks.map((task, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 py-4 border-b border-[#CFCBC0] text-[16px] leading-[1.6]"
                  >
                    <span className="mono text-[12px] text-[#4A5160] pt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 03 · Tantangan */}
            <div className="flex flex-col gap-3.5">
              <span className="lab">03 &bull; Tantangan</span>
              <h2 className="h2">Masalah yang dihadapi</h2>
              <div className="ph">
                [Tulis 2&mdash;3 kalimat tentang tantangan utama di proyek ini, misalnya kendala teknis atau batasan waktu.]
              </div>
            </div>

            {/* 04 · Pendekatan */}
            <div className="flex flex-col gap-3.5">
              <span className="lab">04 &bull; Pendekatan</span>
              <h2 className="h2">Cara saya menyelesaikannya</h2>
              <div className="ph">
                [Jelaskan keputusan teknis dan alasannya. Kalau ada diagram atau cuplikan kode, taruh di sini.]
              </div>
            </div>

            {/* 05 · Hasil */}
            <div className="flex flex-col gap-3.5">
              <span className="lab">05 &bull; Hasil</span>
              <h2 className="h2">Apa yang dicapai</h2>
              {project.result && (
                <p className="m-0 text-[17px] leading-[1.75] text-[#232A36] text-pretty">
                  {project.result}
                </p>
              )}
              <div className="ph">
                [Tambahkan hasil yang bisa dibuktikan: dampak bagi pengguna, tautan peluncuran, atau umpan balik dari tim.]
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Lembar Data (Sticky Aside) */}
          <aside className="side panel reveal flex-none basis-[320px] min-w-[260px] sticky top-24 p-7 pb-6 flex flex-col gap-5.5">
            <span className="lab">Lembar data</span>

            <div className="flex flex-col gap-3">
              <span className="lab tracking-[0.06em]">Teknologi</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.length > 0
                  ? project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tag"
                        style={{
                          borderStyle: 'dashed',
                          borderColor: '#8D93A0',
                          color: '#4A5160',
                        }}
                      >
                        [{tech}]
                      </span>
                    ))
                  : ['[Teknologi 1]', '[Teknologi 2]', '[Teknologi 3]'].map((placeholder, idx) => (
                      <span
                        key={idx}
                        className="tag"
                        style={{
                          borderStyle: 'dashed',
                          borderColor: '#8D93A0',
                          color: '#4A5160',
                        }}
                      >
                        {placeholder}
                      </span>
                    ))}
              </div>
            </div>

            <div className="flex flex-col border-t border-[#14181F]">
              <a
                className="ul flex justify-between gap-3 items-center min-h-[48px] border-b border-[#CFCBC0] no-underline text-[15px] group hover:text-[#1F3A5F] transition-colors"
                href={project.demoUrl || '#'}
                target={project.demoUrl ? '_blank' : undefined}
                rel={project.demoUrl ? 'noopener noreferrer' : undefined}
              >
                <span>Demo langsung {project.demoUrl ? '' : '[LINK]'}</span>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="w-4 h-4 shrink-0 text-[#14181F] group-hover:text-[#1F3A5F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="ul flex justify-between gap-3 items-center min-h-[48px] border-b border-[#CFCBC0] no-underline text-[15px] group hover:text-[#1F3A5F] transition-colors"
                href={project.repositoryUrl || '#'}
                target={project.repositoryUrl ? '_blank' : undefined}
                rel={project.repositoryUrl ? 'noopener noreferrer' : undefined}
              >
                <span>Repositori {project.repositoryUrl ? '' : '[LINK]'}</span>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="w-4 h-4 shrink-0 text-[#14181F] group-hover:text-[#1F3A5F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                className="ul flex justify-between gap-3 items-center min-h-[48px] border-b border-[#CFCBC0] no-underline text-[15px] group hover:text-[#1F3A5F] transition-colors"
                href="#"
              >
                <span>Desain UI [LINK]</span>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="w-4 h-4 shrink-0 text-[#14181F] group-hover:text-[#1F3A5F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mono text-[11px] tracking-[0.05em] leading-[1.7] text-[#4A5160]">
              Tautan dan teknologi diisi dari data proyek (slug: /proyek/{project.slug}).
            </div>
          </aside>
        </section>

        {/* Galeri Gambar */}
        <section className="panel reveal mt-12 p-9 sm:p-11 pb-10 flex flex-col gap-6.5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-baseline justify-between pb-4.5 border-b border-[#14181F]">
            <h2 className="h2">Galeri</h2>
            <span className="lab">Fig. 02 &mdash; 04</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4.5">
            <div className="shot">[Screenshot 1]</div>
            <div className="shot">[Screenshot 2]</div>
            <div className="shot">[Screenshot 3]</div>
          </div>
        </section>

        {/* Navigasi Proyek Sebelumnya / Berikutnya */}
        <section className="reveal mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="nav-card"
            >
              <span className="lab">&larr; Proyek sebelumnya &bull; {prevProject.id}</span>
              <span className="font-serif font-medium text-[24px] leading-[1.15] tracking-[-0.01em]">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="nav-card text-right items-end"
            >
              <span className="lab">Proyek berikutnya &bull; {nextProject.id} &rarr;</span>
              <span className="font-serif font-medium text-[24px] leading-[1.15] tracking-[-0.01em]">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </section>

        {/* CTA Bagian Bawah */}
        <section className="panel reveal mt-12 p-10 sm:p-11 flex flex-wrap gap-6 sm:gap-10 items-center justify-between">
          <h2 className="m-0 font-serif font-normal text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.025em] max-w-[560px] text-balance">
            Tertarik dengan proyek serupa? Mari berdiskusi.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-ink" href={mailHref}>
              [email.kamu@contoh.com]
            </a>
            <button
              className="btn btn-line"
              type="button"
              onClick={() => copy(email)}
              aria-live="polite"
            >
              {copied ? 'Email tersalin ✓' : 'Salin email'}
            </button>
          </div>
        </section>

        {/* Footer Halaman Proyek */}
        <footer className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-between items-center">
          <span className="mono text-[12px] tracking-[0.06em] bg-[#F6F4EF] border border-[#CFCBC0] rounded-[3px] py-2 px-3.5">
            &copy; 2026 RIFQI FADHIL ABRAR
          </span>
          <Link
            href="/#s1"
            className="mono text-[12px] tracking-[0.06em] bg-[#F6F4EF] border border-[#CFCBC0] rounded-[3px] px-3.5 min-h-[44px] inline-flex items-center no-underline text-[#14181F] hover:border-[#14181F] transition-colors"
          >
            &larr; SEMUA PROYEK
          </Link>
        </footer>
      </main>
    </div>
  );
};
