import type { ReactNode } from "react";
import "react-native-gesture-handler/jestSetup";

import { queryClient } from "../src/providers/app-providers";

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

jest.mock("react-native-screens", () => {
  const actual = jest.requireActual("react-native-screens");

  return {
    ...actual,
    enableScreens: jest.fn(),
  };
});

const fetchMock = jest.fn();

global.fetch = fetchMock as unknown as typeof fetch;

beforeEach(() => {
  fetchMock.mockReset();
});

afterEach(() => {
  queryClient.clear();
});
