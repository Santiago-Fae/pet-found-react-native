import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { SEED_ADOPTION_ANIMALS } from '../data/adoptionAnimals';
import { usePersistedState } from '../hooks/usePersistedState';
import { deletePhoto } from '../utils/photos';
import type { AdoptionAnimal, NewAdoptionAnimalInput } from '../types';

interface AdoptionContextValue {
  animals: AdoptionAnimal[];
  loaded: boolean;
  addAnimal: (input: NewAdoptionAnimalInput) => void;
  updateAnimal: (id: string, input: NewAdoptionAnimalInput) => void;
  removeAnimal: (id: string) => void;
}

const AdoptionContext = createContext<AdoptionContextValue | null>(null);

export function AdoptionProvider({ children }: { children: ReactNode }) {
  const state = usePersistedState<AdoptionAnimal[]>('@petfound/adoption-animals', SEED_ADOPTION_ANIMALS);
  const { value: animals, setValue, loaded } = state;

  const addAnimal = useCallback(
    (input: NewAdoptionAnimalInput) => {
      setValue((previous) => [...previous, { ...input, id: `adoption-${Date.now()}` }]);
    },
    [setValue]
  );

  const updateAnimal = useCallback(
    (id: string, input: NewAdoptionAnimalInput) => {
      setValue((previous) =>
        previous.map((animal) => {
          if (animal.id !== id) return animal;
          if (animal.photo !== input.photo) deletePhoto(animal.photo);
          return { ...animal, ...input };
        })
      );
    },
    [setValue]
  );

  const removeAnimal = useCallback(
    (id: string) => {
      setValue((previous) => {
        const target = previous.find((animal) => animal.id === id);
        if (target) deletePhoto(target.photo);
        return previous.filter((animal) => animal.id !== id);
      });
    },
    [setValue]
  );

  const value = useMemo(
    () => ({ animals, loaded, addAnimal, updateAnimal, removeAnimal }),
    [animals, loaded, addAnimal, updateAnimal, removeAnimal]
  );

  return <AdoptionContext.Provider value={value}>{children}</AdoptionContext.Provider>;
}

export function useAdoption() {
  const context = useContext(AdoptionContext);
  if (!context) throw new Error('useAdoption must be used inside AdoptionProvider');
  return context;
}
