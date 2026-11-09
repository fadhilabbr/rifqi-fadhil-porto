import { z } from 'zod';

export const TransmissionInputSchema = z.object({
  senderName: z
    .string()
    .min(2, { message: 'Nama/Callsign wajib minimal 2 karakter.' })
    .max(80, { message: 'Nama/Callsign maksimal 80 karakter.' }),
  senderCallsign: z
    .string()
    .max(20, { message: 'Callsign maksimal 20 karakter.' })
    .optional(),
  senderEmail: z
    .string()
    .email({ message: 'Frekuensi email tidak valid. Masukkan format email yang benar.' }),
  subject: z
    .string()
    .min(3, { message: 'Subjek transmisi minimal 3 karakter.' })
    .max(120, { message: 'Subjek transmisi maksimal 120 karakter.' }),
  priority: z.enum(['routine', 'priority', 'flight-clearance'], {
    message: 'Pilih tingkat prioritas penerbangan yang valid.',
  }),
  message: z
    .string()
    .min(10, { message: 'Isi dispatch pesan minimal 10 karakter.' })
    .max(2000, { message: 'Isi dispatch pesan maksimal 2000 karakter.' }),
});

export type TransmissionInputDTO = z.infer<typeof TransmissionInputSchema>;

export interface TransmissionResponseDTO {
  readonly success: boolean;
  readonly transmissionId?: string;
  readonly acknowledgementCode?: string;
  readonly timestamp?: string;
  readonly errors?: Record<string, string[]>;
  readonly message: string;
}
