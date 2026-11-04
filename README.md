# PET Found

React Native app built with Expo SDK 57 and TypeScript. It helps users find lost
animals, register reports, and manage animals available for adoption.

The project has no backend. Data and photos are stored locally on the device.

## Requirements

- Node.js (LTS recommended; no fixed version is required by this project)
- npm
- Expo Go on a physical Android or iOS device
- A computer and phone connected to the same Wi-Fi network

## Main versions

- Expo SDK `57.0.30`
- React Native `0.86.3`
- React `19.2.3`
- TypeScript `6.0.3`

## Setup and run

```bash
npm install
npm start
```

Scan the QR code shown by Expo with Expo Go. The app may request permission to
use the device location and photo library.

For web:

```bash
npm run web
```

Android map tiles require a Google Maps API key. Add it to the Android
configuration in [app.json](./app.json) before creating a native Android build.

## Useful scripts

```bash
npm run typecheck
npm run doctor
```

- `typecheck` checks the TypeScript code.
- `doctor` checks the Expo project configuration.

## Project structure

- `App.tsx` – application providers and navigation
- `src/navigation/` – bottom-tab navigation
- `src/screens/` – application screens
- `src/components/` – reusable components
- `src/context/` – local state for lost and adoption animals
- `src/data/` – bundled sample data

## Local storage

- Lost animals, favorites, found status, and adoption animals use AsyncStorage.
- User-selected photos are copied to the app's document directory.
