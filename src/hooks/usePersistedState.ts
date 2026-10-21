import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * `useState` that is stored on the device with AsyncStorage.
 * `loaded` becomes true once the saved value has been read; nothing is written before that.
 */
export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (!cancelled && raw != null) setValue(JSON.parse(raw) as T);
      })
      .catch((e) => console.warn(`Could not load "${key}":`, e))
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(key, JSON.stringify(value)).catch((e) => console.warn(`Could not save "${key}":`, e));
  }, [key, value, loaded]);

  return { value, setValue: setValue as Dispatch<SetStateAction<T>>, loaded };
}
