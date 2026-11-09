export type TransmissionPriority = 'routine' | 'priority' | 'flight-clearance';

export interface Transmission {
  readonly id: string;
  readonly senderName: string;
  readonly senderCallsign?: string;
  readonly senderEmail: string;
  readonly subject: string;
  readonly priority: TransmissionPriority;
  readonly message: string;
  readonly transmittedAt: Date;
}
