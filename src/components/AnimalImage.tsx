import { Image, type StyleProp, type ImageStyle } from 'react-native';
import { toImageSource } from '../utils/photos';
import type { Photo } from '../types';

export default function AnimalImage({ photo, style }: { photo: Photo | null; style?: StyleProp<ImageStyle> }) {
  const source = toImageSource(photo);
  return source ? <Image source={source} style={style} /> : null;
}
