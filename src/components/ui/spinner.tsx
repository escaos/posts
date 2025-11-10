import { ActivityIndicator, View } from "react-native";

import { cn } from "../../lib/cn";

type SpinnerProps = {
  className?: string;
  size?: "small" | "large";
};

export function Spinner({ className, size = "small" }: SpinnerProps) {
  return (
    <View className={cn("items-center justify-center", className)}>
      <ActivityIndicator size={size} />
    </View>
  );
}
import { ActivityIndicator, View } from 'react-native';

import { cn } from '@/lib/cn';

type SpinnerProps = {
  className?: string;
  size?: 'small' | 'large';
};

export function Spinner({ className, size = 'small' }: SpinnerProps) {
  return (
    <View className={cn('items-center justify-center', className)}>
      <ActivityIndicator size={size} />
    </View>
  );
}

