# PET Found

React Native (Expo SDK 58, TypeScript) app to search, pin and view lost animals.
There is no backend: all data lives on the device.

## Run

```bash
npm install
npx expo start
```

Android maps need a Google Maps API key: set `expo.android.config.googleMaps.apiKey` in `app.json`.

## Scripts

- `npm run typecheck` – TypeScript check
- `npm run doctor` – `expo-doctor`

## Structure

- `App.tsx` – providers and root navigator
- `src/navigation/` – bottom tabs (Map, New animal, NGOs) and route types
- `src/screens/` – one file per screen
- `src/components/` – reusable UI
- `src/context/AnimalsContext.tsx` – animals state (seed data + user animals, favorites, found status)
- `src/hooks/usePersistedState.ts` – `useState` backed by AsyncStorage
- `src/utils/photos.ts` – copies picked photos into the app's document directory
- `src/data/` – bundled seed data and constants

## Local storage

| What | Where |
| --- | --- |
| Animals you register, favorites, found status | AsyncStorage (`@petfound/*` keys) |
| NGO favorites | AsyncStorage (`@petfound/favorite-ngos`) |
| Animal photos | `Paths.document/photos/` (only the file name is stored) |
