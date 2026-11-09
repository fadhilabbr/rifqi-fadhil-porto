export type FlightPhase = 'STANDBY' | 'CLIMB' | 'CRUISE' | 'DESCENT' | 'APPROACH';

export interface TelemetryState {
  progress: number;
  altitudeMeters: number;
  altitudeText: string;
  markerTop: string;
  phase: FlightPhase;
}
