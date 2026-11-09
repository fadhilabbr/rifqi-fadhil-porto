import { FLIGHT_DECK_CONSTANTS } from '../constants/flight-deck';

export function calculateAltitudeFromProgress(progress: number): {
  altitudeMeters: number;
  formattedText: string;
} {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  // Inversi: Scroll ke bawah = Descent dari 1200m ke 0m (Touchdown)
  const altitudeMeters = Math.round((1 - clampedProgress) * FLIGHT_DECK_CONSTANTS.ALTITUDE_MAX_METERS);
  const paddedMeters = String(altitudeMeters).padStart(4, '0');

  return {
    altitudeMeters,
    formattedText: `ALT ${paddedMeters} M`,
  };
}

export function formatWibTime(date: Date = new Date()): string {
  try {
    const formatted = new Intl.DateTimeFormat('id-ID', {
      timeZone: FLIGHT_DECK_CONSTANTS.TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
    return formatted.replace('.', ':');
  } catch {
    return '--:--';
  }
}
