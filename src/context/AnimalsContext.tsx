import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { SEED_ANIMALS } from '../data/animals';
import { usePersistedState } from '../hooks/usePersistedState';
import { deletePhoto } from '../utils/photos';
import type { Animal, NewAnimalInput } from '../types';

interface AnimalsContextValue {
  animals: Animal[];
  loaded: boolean;
  favoriteIds: string[];
  foundIds: string[];
  isUserAnimal: (id: string) => boolean;
  addAnimal: (input: NewAnimalInput) => Animal;
  removeAnimal: (id: string) => void;
  moveAnimal: (id: string, latitude: number, longitude: number) => void;
  toggleFavorite: (id: string) => void;
  toggleFound: (id: string) => void;
}

const AnimalsContext = createContext<AnimalsContextValue | null>(null);

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

// Everything is stored on the device. Bundled (seed) animals stay in code; only what the user
// creates or changes (own animals, favorites, found status) is persisted.
export function AnimalsProvider({ children }: { children: ReactNode }) {
  const userAnimals = usePersistedState<Animal[]>('@petfound/user-animals', []);
  const favorites = usePersistedState<string[]>('@petfound/favorite-animals', []);
  const found = usePersistedState<string[]>('@petfound/found-animals', []);

  const { value: userAnimalList, setValue: setUserAnimals } = userAnimals;
  const { setValue: setFavorites } = favorites;
  const { setValue: setFound } = found;

  const animals = useMemo(() => [...SEED_ANIMALS, ...userAnimalList], [userAnimalList]);
  const loaded = userAnimals.loaded && favorites.loaded && found.loaded;

  const isUserAnimal = useCallback((id: string) => id.startsWith('user-'), []);

  const addAnimal = useCallback(
    (input: NewAnimalInput) => {
      const animal: Animal = { ...input, id: `user-${Date.now()}` };
      setUserAnimals((prev) => [...prev, animal]);
      return animal;
    },
    [setUserAnimals]
  );

  const removeAnimal = useCallback(
    (id: string) => {
      const target = userAnimalList.find((a) => a.id === id);
      if (!target) return;
      deletePhoto(target.photo);
      setUserAnimals((prev) => prev.filter((a) => a.id !== id));
      setFavorites((prev) => prev.filter((x) => x !== id));
      setFound((prev) => prev.filter((x) => x !== id));
    },
    [userAnimalList, setUserAnimals, setFavorites, setFound]
  );

  const moveAnimal = useCallback(
    (id: string, latitude: number, longitude: number) =>
      setUserAnimals((prev) => prev.map((a) => (a.id === id ? { ...a, latitude, longitude } : a))),
    [setUserAnimals]
  );

  const toggleFavorite = useCallback((id: string) => setFavorites((prev) => toggle(prev, id)), [setFavorites]);
  const toggleFound = useCallback((id: string) => setFound((prev) => toggle(prev, id)), [setFound]);

  const value = useMemo<AnimalsContextValue>(
    () => ({
      animals,
      loaded,
      favoriteIds: favorites.value,
      foundIds: found.value,
      isUserAnimal,
      addAnimal,
      removeAnimal,
      moveAnimal,
      toggleFavorite,
      toggleFound,
    }),
    [animals, loaded, favorites.value, found.value, isUserAnimal, addAnimal, removeAnimal, moveAnimal, toggleFavorite, toggleFound]
  );

  return <AnimalsContext.Provider value={value}>{children}</AnimalsContext.Provider>;
}

export function useAnimals() {
  const ctx = useContext(AnimalsContext);
  if (!ctx) throw new Error('useAnimals must be used inside AnimalsProvider');
  return ctx;
}
