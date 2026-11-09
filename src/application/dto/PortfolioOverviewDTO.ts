import type { ProfileDTO } from './ProfileDTO';
import type { ProjectDTO } from './ProjectDTO';
import type { CompetencyRadarDTO } from './CompetencyRadarDTO';
import type { ExperienceDTO } from './ExperienceDTO';

export interface PortfolioOverviewDTO {
  readonly profile: ProfileDTO;
  readonly projects: readonly ProjectDTO[];
  readonly competencies: readonly CompetencyRadarDTO[];
  readonly experiences: readonly ExperienceDTO[];
}
