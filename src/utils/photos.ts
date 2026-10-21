import { Directory, File, Paths } from 'expo-file-system';
import type { ImageSourcePropType } from 'react-native';
import type { Photo } from '../types';

const photosDir = () => new Directory(Paths.document, 'photos');

const isUri = (value: string) => value.includes('://');

/**
 * Copies a picked image (usually a cache file the OS may delete) into the app's
 * document directory and returns the stored file name. Falls back to the original
 * URI if the copy is not possible (e.g. on web).
 */
export function savePhoto(sourceUri: string): string {
  try {
    const dir = photosDir();
    if (!dir.exists) dir.create({ intermediates: true });
    const extension = sourceUri.split('?')[0]?.split('.').pop()?.toLowerCase();
    const fileName = `${Date.now()}.${extension && extension.length <= 5 ? extension : 'jpg'}`;
    new File(sourceUri).copy(new File(dir, fileName));
    return fileName;
  } catch (e) {
    console.warn('Could not store the photo locally:', e);
    return sourceUri;
  }
}

export function deletePhoto(photo: Photo | null) {
  if (typeof photo !== 'string' || isUri(photo)) return;
  try {
    const file = new File(photosDir(), photo);
    if (file.exists) file.delete();
  } catch (e) {
    console.warn('Could not delete the photo:', e);
  }
}

/** Turns any stored `Photo` into something `<Image source>` accepts. */
export function toImageSource(photo: Photo | null): ImageSourcePropType | null {
  if (photo == null) return null;
  if (typeof photo === 'number') return photo;
  return { uri: isUri(photo) ? photo : new File(photosDir(), photo).uri };
}
