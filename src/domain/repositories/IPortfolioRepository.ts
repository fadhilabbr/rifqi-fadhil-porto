import type { Profile } from '../entities/Profile';
import type { Project, ProjectCategory } from '../entities/Project';
import type { Competency } from '../entities/Competency';
import type { Experience } from '../entities/Experience';

export interface IPortfolioRepository {
  getProfile(): Promise<Profile>;
  getProjects(filter?: { category?: ProjectCategory; featured?: boolean }): Promise<readonly Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getCompetencies(): Promise<readonly Competency[]>;
  getExperiences(): Promise<readonly Experience[]>;
}
