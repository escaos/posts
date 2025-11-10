import type { ReactNode } from "react";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-safe-area-context", () => {
  const actual = jest.requireActual("react-native-safe-area-context");

  return {
    ...actual,
    SafeAreaProvider: ({ children }: { children: ReactNode }) => children,
    SafeAreaView: ({ children }: { children: ReactNode }) => children,
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});

const fetchMock = jest.fn();

global.fetch = fetchMock as unknown as typeof fetch;

beforeEach(() => {
  fetchMock.mockReset();
});
