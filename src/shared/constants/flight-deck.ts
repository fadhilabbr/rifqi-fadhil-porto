export const FLIGHT_DECK_CONSTANTS = {
  CALLSIGN: 'RF-2026',
  ORIGIN_AIRPORT: 'Lhokseumawe (WITM)',
  DESTINATION_AIRPORT: 'Malang (MLG / WARA)',
  ALTITUDE_MAX_METERS: 1200,
  TIMEZONE: 'Asia/Jakarta',
  STATION_CODE: 'MLG',
  DEFAULT_ALTITUDE_TEXT: 'ALT 1200 M',
} as const;

export const FLIGHT_NAV_SECTIONS = [
  { id: 's1', label: 'Proyek', checkpointAltitude: 900, description: 'Rekayasa Perangkat Lunak & UAV' },
  { id: 's2', label: 'Kompetensi', checkpointAltitude: 600, description: 'Radar Keahlian & Teknologi' },
  { id: 's3', label: 'Pengalaman', checkpointAltitude: 300, description: 'Log Penerbangan & Organisasi' },
  { id: 's4', label: 'Transmisi', checkpointAltitude: 0, description: 'Pendaratan & Kontak Radio' },
] as const;
