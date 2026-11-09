import type { Competency } from '@/domain/entities/Competency';

export interface RadarBlipDTO {
  readonly left: string;
  readonly top: string;
  readonly delay: string;
  readonly azimuthDegrees: number;
  readonly rangeKilometers: number;
}

export interface CompetencyRadarDTO {
  readonly id: string;
  readonly category: string;
  readonly group: string;
  readonly skills: readonly string[];
  readonly skillsFormatted: string;
  readonly proficiencyLevel: string;
  readonly colorToken: string;
  readonly blip: RadarBlipDTO;
}

const RADAR_LAYOUT_MAP: Record<string, RadarBlipDTO> = {
  'c-front': { left: '64%', top: '24%', delay: '-0.6s', azimuthDegrees: 48, rangeKilometers: 14.2 },
  'c-uav':   { left: '76%', top: '62%', delay: '-1.4s', azimuthDegrees: 124, rangeKilometers: 21.0 },
  'c-sys':   { left: '32%', top: '72%', delay: '-2.1s', azimuthDegrees: 220, rangeKilometers: 18.5 },
  'c-ai':    { left: '26%', top: '34%', delay: '-0.9s', azimuthDegrees: 310, rangeKilometers: 16.8 },
  'c-code':  { left: '52%', top: '48%', delay: '-1.8s', azimuthDegrees: 15, rangeKilometers: 5.4 },
};

const COLOR_TOKEN_MAP: Record<string, string> = {
  'avionics-robotics': '#2F6B57', // Radar green
  'frontend': '#2F5D8A',          // Cyan / flight blue
  'software-eng': '#7A3E3E',      // Tactical red
  'data-ai': '#5B4A86',           // Telemetry purple
  'programming': '#8A6A2F',       // Core gold
};

export function mapCompetencyToRadarDTO(entity: Competency): CompetencyRadarDTO {
  const blip = RADAR_LAYOUT_MAP[entity.id] ?? {
    left: '50%',
    top: '50%',
    delay: '0s',
    azimuthDegrees: 0,
    rangeKilometers: 10.0,
  };

  return {
    id: entity.id,
    category: entity.category,
    group: entity.group,
    skills: entity.skills,
    skillsFormatted: entity.skills.join(' · '),
    proficiencyLevel: entity.proficiencyLevel,
    colorToken: COLOR_TOKEN_MAP[entity.group] ?? '#2F5D8A',
    blip,
  };
}
