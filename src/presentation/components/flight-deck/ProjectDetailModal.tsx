'use client';

import React from 'react';
import Link from 'next/link';
import type { ProjectDTO } from '@/application/dto/ProjectDTO';
import { Modal } from '@/presentation/components/ui/Modal';
import { Badge } from '@/presentation/components/ui/Badge';

export interface ProjectDetailModalProps {
  project: ProjectDTO | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={Boolean(project)}
      onClose={onClose}
      subtitle={`DOKUMEN STUDI KASUS AVIONIK // ${project.id}`}
      title={project.title}
    >
      <div className="flex flex-col gap-6">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#4A5160] pb-3 border-b border-[#CFCBC0]/60">
          <div className="flex items-center gap-2">
            <span className="mono font-medium text-[#14181F]">{project.role}</span>
            <span>&bull;</span>
            <span className="mono">{project.period}</span>
          </div>
          <Badge variant={project.statusType === 'completed' ? 'filled' : 'outline'}>
            {project.status}
          </Badge>
        </div>

        {/* Executive Summary */}
        <div>
          <h4 className="mono text-[11px] uppercase tracking-[0.08em] text-[#4A5160] mb-2">
            Ikhtisar Rekayasa
          </h4>
          <p className="m-0 text-[15px] leading-[1.7] text-[#2B3342]">
            {project.description}
          </p>
        </div>

        {/* Detailed Case Study / Engineering Deep-Dive */}
        {project.caseStudyContent && (
          <div className="bg-[#FBFAF7] border border-[#CFCBC0] rounded-[3px] p-4">
            <h4 className="mono text-[11px] uppercase tracking-[0.08em] text-[#4A5160] mb-2">
              Spesifikasi &amp; Implementasi Sistem
            </h4>
            <p className="m-0 text-[14px] leading-[1.7] text-[#14181F]">
              {project.caseStudyContent}
            </p>
          </div>
        )}

        {/* Metrics & Benchmarks */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h4 className="mono text-[11px] uppercase tracking-[0.08em] text-[#4A5160] mb-2">
              Metrik Telemetri &amp; Kinerja
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((metric) => (
                <Badge key={metric} variant="tactical">
                  {metric}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h4 className="mono text-[11px] uppercase tracking-[0.08em] text-[#4A5160] mb-2">
            Teknologi &amp; Instrumen
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="mono text-[11px] bg-[#EAE6DD] text-[#14181F] border border-[#CFCBC0] rounded-[2px] px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#14181F]">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="btn btn-ink text-[13px] min-h-[38px] px-4 no-underline"
            >
              Buka Halaman Penuh &rarr;
            </Link>
            {project.repositoryUrl && project.repositoryUrl !== '#' && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line text-[13px] min-h-[38px] px-4"
              >
                GitHub &rarr;
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line text-[13px] min-h-[38px] px-4"
              >
                Demo &rarr;
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mono text-[12px] text-[#4A5160] hover:text-[#14181F] underline ml-auto"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </Modal>
  );
};
