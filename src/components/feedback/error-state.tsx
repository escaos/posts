import type { ReactNode } from "react";
import { View } from "react-native";

import { Button, Typography } from "../ui";
import { cn } from "../../lib/cn";

type ErrorStateProps = {
  className?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  title?: string;
  action?: ReactNode;
};

export function ErrorState({
  className,
  title = "Something went wrong",
  message = "Please try again in a moment.",
  retryLabel = "Retry",
  onRetry,
  action,
}: ErrorStateProps) {
  return (
    <View className={cn("items-center gap-3", className)}>
      <Typography variant="title" className="text-center">
        {title}
      </Typography>
      <Typography variant="muted" className="text-center">
        {message}
      </Typography>
      {action}
      {onRetry ? <Button onPress={onRetry}>{retryLabel}</Button> : null}
    </View>
  );
}
