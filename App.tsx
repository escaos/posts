import "./global.css";

import { useMemo } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import { AppErrorBoundary } from "./src/components/app-error-boundary";
import { AppNavigator } from "./src/navigation";
import { AppProviders, queryClient } from "./src/providers/app-providers";

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === "dark";

  const statusBarStyle = useMemo(
    () => (isDarkMode ? "light-content" : "dark-content"),
    [isDarkMode],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={statusBarStyle} />
        <AppErrorBoundary
          onReset={() => {
            queryClient.clear();
          }}
        >
          <AppProviders>
            <AppNavigator />
          </AppProviders>
        </AppErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
