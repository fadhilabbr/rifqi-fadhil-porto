import type { ExperienceType } from '@/domain/entities/Experience';

export interface ExperienceDTO {
  readonly id: string;
  readonly type: ExperienceType;
  readonly title: string;
  readonly organization: string;
  readonly location: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly description: string;
  readonly highlights: readonly string[];
}
