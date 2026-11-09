export type CompetencyGroup = 
  | 'avionics-robotics' 
  | 'frontend' 
  | 'software-eng' 
  | 'data-ai' 
  | 'programming';

export type ProficiencyLevel = 'operational' | 'advanced' | 'experimental';

export interface Competency {
  readonly id: string;
  readonly category: string;
  readonly group: CompetencyGroup;
  readonly skills: readonly string[];
  readonly proficiencyLevel: ProficiencyLevel;
  readonly semanticColorKey: string;
}
