import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 30_000),
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
  },
});

function useAppFocusTracking() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      focusManager.setFocused(nextAppState === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

export function AppProviders({ children }: PropsWithChildren) {
  useAppFocusTracking();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
