export type ExperienceType = 'organization' | 'education' | 'engineering' | 'competition';

export interface Experience {
  readonly id: string;
  readonly type: ExperienceType;
  readonly title: string;
  readonly organization: string;
  readonly location: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly description: string;
  readonly highlights?: readonly string[];
}
