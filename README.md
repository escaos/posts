# Posts Mobile App

A React Native 0.82 application that showcases a performant feed/detail experience powered by [JSONPlaceholder](https://jsonplaceholder.typicode.com/). The project embraces modern tooling (Biome, Lefthook, NativeWind, React Query) to keep developer workflows fast and the UI consistent across platforms.

## Features

- **Feed screen** – paginated-style FlatList with pull-to-refresh, sensible rendering config, and memoized row components to minimise re-renders.
- **Detail screen** – full post body plus comment thread, with graceful empty/loading/error states.
- **React Query data layer** – shared query keys, backoff retry strategy, 60s `staleTime`, 5m cache GC, and prefetching of detail + comments on press-in.
- **NativeWind UI kit** – reusable `Button`, `Card`, `Typography`, `Spinner`, and feedback components that provide a consistent design language, dark-mode ready.
- **Error handling** – render-level `AppErrorBoundary` and network-level `HttpError` logging through a mocked `log(error, context)` helper.
- **Tooling + DX** – Biome for format/lint, TypeScript path typing, Lefthook Git hooks, Jest + React Testing Library for unit tests.

## Tech Stack

- React 19.1 / React Native 0.82
- TypeScript 5.8
- React Navigation (native stack)
- @tanstack/react-query 5.x
- NativeWind + Tailwind CSS 3
- Biome (code formatting & lint)
- Jest, @testing-library/react-native

## Getting Started

### Prerequisites

- Node 22 (see `.nvmrc`)
- Xcode (iOS) / Android Studio (Android)
- Ruby + Bundler (for CocoaPods)

Follow the official [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) if you have not already.

### Installation

```sh
# install JS deps
npm install

# install native iOS pods (first time or after native deps change)
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running

```sh
# start Metro bundler
npm start

# launch platform targets (in separate terminals)
npm run ios     # iOS simulator / device
npm run android # Android emulator / device
```

Metro will hot-reload your changes. Use the standard RN dev menus (`Cmd+R`, `Cmd+D`, etc.) for reloads and debugging.

## Scripts

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `npm start`        | Start Metro bundler                                      |
| `npm run ios`      | Build & launch the iOS app                               |
| `npm run android`  | Build & launch the Android app                           |
| `npm run lint`     | Run Biome lint/format checks (summary reporter)          |
| `npm run lint:fix` | Apply Biome fixes                                        |
| `npm run format`   | Format entire project with Biome                         |
| `npm run typecheck`| Type-check with `tsc --noEmit`                           |
| `npm run test`     | Execute Jest unit tests                                  |
| `npm run test:watch` | Run tests in watch mode                                |

> `npm run prepare` automatically installs Lefthook so Git hooks stay in sync.

## Project Structure

```
src/
  api/          // HTTP layer, typed endpoints, shared DTOs
  components/   // UI primitives and feedback utilities
  constants/    // Query key factories and other shared constants
  features/     // React Query hooks and domain logic
  navigation/   // App navigator + route typings
  providers/    // Cross-cutting providers (QueryClient, focus tracking)
  screens/      // Feed & Post detail screens
  types/        // NativeWind + RN type augmentation
lib/            // Shared helpers (logger, classnames)
jest/           // Jest setup & mocks
```

## Data & Caching

- All network calls go through `src/api/http.ts`, which adds a 15s timeout and surfaces errors as `HttpError` instances.
- React Query caches responses with `staleTime: 60_000` (1 minute) and `gcTime: 5 * 60_000` (5 minutes).
- Feed rows prefetch both the detail and comments queries during `onPressIn`, creating the “hover/press warm-up” requested.
- Errors are logged via `log(error, context)` so an analytics/observability layer can later consume the data.

## Styling

- NativeWind + Tailwind provide utility classes (`className`) for RN primitives via `nativewind-env.d.ts`.
- `global.css` and `tailwind.config.js` define theme tokens for backgrounds, foregrounds, and accent colors.
- UI primitives (`Button`, `Card`, `Typography`, etc.) ensure dark-mode friendly defaults and consistent spacing.

## Testing

- Unit tests reside under `__tests__/`. The existing `App.test.tsx` exercises the feed happy-path via a mocked `fetch`.
- Run tests with `npm run test`. Jest may report open handles if React Native internals leave async callbacks alive; re-run with `npx jest --detectOpenHandles` to investigate when needed.
- Jest setup mocks `react-native-safe-area-context`, `react-native-screens`, and resets the shared QueryClient after each spec.

## Quality Gates

- **Biome** handles formatting (`npm run format`) and linting (`npm run lint`). The config lives in `biome.json`.
- **Lefthook** enforces lint + tests on `pre-commit`, and type-checking on `pre-push`.
- **TypeScript** ensures strict typing through `npm run typecheck`.

## API

All data is sourced from `https://jsonplaceholder.typicode.com/`:

- `GET /posts`
- `GET /posts/:id`
- `GET /posts/:id/comments`

Consider replacing the endpoints or wrapping them with an API gateway before shipping to production.

## Logging & Error Handling

- Render failures are caught by `AppErrorBoundary`, logged, and surfaced with a reset action.
- Network errors bubble through React Query’s error states and render via shared `ErrorState` components.
- The `log` helper currently proxies to `console` in dev; swap this implementation to wire into your preferred monitoring platform.

## Roadmap Ideas

- Add pagination/infinite scroll for the feed.
- Extend tests to cover error and empty states.
- Replace JSONPlaceholder with a secured backend service.
- Integrate analytics/telemetry inside the logger.

## Resources

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [React Query docs](https://tanstack.com/query/latest)
- [NativeWind docs](https://nativewind.dev)
- [React Navigation docs](https://reactnavigation.org/docs/getting-started)
