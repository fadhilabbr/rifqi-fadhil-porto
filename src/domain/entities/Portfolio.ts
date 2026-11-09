export * from './Project';
export * from './Competency';
export * from './Experience';
export * from './Transmission';
export * from './Profile';

import type { Project } from './Project';
import type { Competency } from './Competency';
import type { Experience } from './Experience';
import type { Profile } from './Profile';

export interface PortfolioData {
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly competencies: readonly Competency[];
  readonly experiences: readonly Experience[];
}
