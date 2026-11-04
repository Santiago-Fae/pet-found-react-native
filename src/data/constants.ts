import type { Coordinates } from '../types';

export const COLORS = {
  primary: '#007AFF',
  accent: '#df7f04',
  warning: '#ffb81f',
  success: 'green',
  muted: '#666',
  ngoCard: '#D5D8E5',
  ngoText: '#30283D',
} as const;

/** Fallback map center until the user grants location permission. */
// Caxias do Sul, RS — used while the user has not granted location access.
export const DEFAULT_COORDINATES: Coordinates = { latitude: -29.1678, longitude: -51.1794 };

export const DEFAULT_DELTAS = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 } as const;
