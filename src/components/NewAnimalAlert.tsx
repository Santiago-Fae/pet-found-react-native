import { useCallback, useEffect, useState } from 'react';
import { useAnimals } from '../context/AnimalsContext';
import AlertBanner from './AlertBanner';
import type { Animal } from '../types';

const INTERVAL_MS = 60000;

// Local-only demo behavior: every minute, announce a random not-yet-found animal as "lost nearby".
export default function NewAnimalAlert() {
  const { animals, foundIds } = useAnimals();
  const [current, setCurrent] = useState<Animal | null>(null);

  useEffect(() => {
    const lost = animals.filter((a) => !foundIds.includes(a.id));
    if (!lost.length) return undefined;
    const id = setInterval(() => setCurrent(lost[Math.floor(Math.random() * lost.length)] ?? null), INTERVAL_MS);
    return () => clearInterval(id);
  }, [animals, foundIds]);

  const close = useCallback(() => setCurrent(null), []);

  return current ? <AlertBanner animal={current} onClose={close} /> : null;
}
