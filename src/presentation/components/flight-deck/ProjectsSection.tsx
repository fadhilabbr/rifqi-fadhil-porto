'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { ProjectDTO } from '@/application/dto/ProjectDTO';
import { ParallaxSectionWatermark } from './ParallaxSectionWatermark';

interface ProjectsSectionProps {
  projects: readonly ProjectDTO[];
  progress?: number;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  progress = 0,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="s1" className="sec panel reveal mt-10 p-9 sm:p-10 relative overflow-hidden">
      {/* Parallax Depth Zoom Watermark */}
      <ParallaxSectionWatermark
        number="01"
        label="MISSIONS & PROJECTS"
        targetProgress={0.25}
        currentProgress={progress}
      />

      {/* Section Header */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-baseline justify-between pb-5.5 mb-7 border-b border-[#14181F]">
        <h2 className="m-0 font-serif font-normal text-[clamp(30px,4vw,44px)] tracking-[-0.02em]">
          <span className="mono text-[13px] tracking-[0.1em] mr-3.5 text-[#4A5160]">
            01
          </span>
          Proyek
        </h2>
        <span className="mono text-[12px] tracking-[0.08em] uppercase text-[#4A5160]">
          {projects.length} pekerjaan terpilih
        </span>
      </div>

      {/* Projects Grid following Flight Deck Formal reference mockup */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        {projects.map((project) => {
          const isTagFilled = project.statusType === 'completed';
          const isOpen = openId === project.id;

          return (
            <article
              key={project.id}
              className="pcard text-left relative flex flex-col gap-3.5"
              data-expanded={isOpen}
            >
              {/* Top Row: Code Identifier + Status Tag */}
              <div className="flex justify-between items-center gap-3">
                <span className="mono text-[12px] text-[#4A5160] font-medium">
                  {project.id}
                </span>
                <span className={`tag ${isTagFilled ? 'tag-fill' : ''}`}>
                  {project.status}
                </span>
              </div>

              {/* Title with link to case study */}
              <h3 className="m-0 font-serif font-medium text-[25px] leading-[1.15] tracking-[-0.01em]">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-inherit no-underline hover:text-[#2F5D8A] transition-colors"
                >
                  {project.title}
                </Link>
              </h3>

              {/* Short Description */}
              <p className="m-0 text-[15px] leading-[1.65] text-[#2B3342] text-pretty">
                {project.description}
              </p>

              {/* Expanded In-Card Detail (Accordion) */}
              {isOpen && (
                <div className="dtl flex flex-col gap-3 border-t border-[#CFCBC0] pt-4">
                  <p className="m-0 text-[15px] leading-[1.7] text-[#2B3342] text-pretty">
                    {project.caseStudyContent || project.description}
                  </p>
                  <div className="mono text-[12px] text-[#4A5160] tracking-[0.04em]">
                    PERAN &bull; {project.role}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="ul text-[14px] font-medium min-h-[44px] inline-flex items-center self-start text-[#14181F] hover:text-[#2F5D8A] transition-colors"
                  >
                    Buka studi kasus &rarr;
                  </Link>
                </div>
              )}

              {/* In-Card Accordion Toggle Button */}
              <button
                type="button"
                className="more"
                aria-expanded={isOpen}
                onClick={() => toggleProject(project.id)}
                style={{ marginTop: 'auto' }}
              >
                {isOpen ? 'Tutup rincian \u25B4' : 'Lihat rincian +'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
