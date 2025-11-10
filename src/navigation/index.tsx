import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import { FeedScreen } from "../screens/FeedScreen";
import { PostDetailScreen } from "../screens/PostDetailScreen";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc",
          },
        }}
      >
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ title: "Feed" }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: "Post" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
