export type ProjectStatusType = 'active' | 'completed' | 'in-development' | 'classified';
export type ProjectCategory = 'web' | 'robotics-uav' | 'systems' | 'competition';

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly period: string;
  readonly status: string;
  readonly statusType: ProjectStatusType;
  readonly description: string;
  readonly caseStudyContent?: string;
  readonly org?: string;
  readonly field?: string;
  readonly tasks?: readonly string[];
  readonly result?: string;
  readonly challenge?: string;
  readonly approach?: string;
  readonly technologies: readonly string[];
  readonly metrics?: readonly string[];
  readonly demoUrl?: string;
  readonly repositoryUrl?: string;
  readonly thumbnailUrl?: string;
  readonly featured: boolean;
}
