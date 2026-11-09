import type { Transmission } from '../entities/Transmission';

export interface TransmissionResult {
  readonly success: boolean;
  readonly transmissionId: string;
  readonly acknowledgementCode: string;
  readonly timestamp: Date;
  readonly error?: string;
}

export interface ITransmissionService {
  sendTransmission(transmission: Transmission): Promise<TransmissionResult>;
}
