import type { ReactNode } from "react";
import { View } from "react-native";

import { Typography } from "../ui";
import { cn } from "../../lib/cn";

type EmptyStateProps = {
  className?: string;
  description?: string;
  icon?: ReactNode;
  title?: string;
};

export function EmptyState({
  className,
  title = "Nothing to see yet",
  description = "Pull to refresh or check back later.",
  icon,
}: EmptyStateProps) {
  return (
    <View className={cn("items-center gap-3", className)}>
      {icon}
      <Typography variant="title" className="text-center">
        {title}
      </Typography>
      <Typography variant="muted" className="text-center">
        {description}
      </Typography>
    </View>
  );
}
