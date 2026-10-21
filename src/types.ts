export type Species = 'dog' | 'cat';

/**
 * A bundled asset (`require()` result, a number) or a string.
 * Strings are either a file name inside the app's photo directory (photos
 * picked by the user) or a full URI.
 */
export type Photo = number | string;

export interface Animal {
  id: string;
  name: string;
  description: string;
  species: Species;
  latitude: number;
  longitude: number;
  photo: Photo | null;
}

export type NewAnimalInput = Omit<Animal, 'id'>;

export interface Ngo {
  id: string;
  name: string;
  description: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
