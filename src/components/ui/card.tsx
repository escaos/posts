import type { PropsWithChildren } from "react";
import { Text, View, type TextProps, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

type NativeViewProps = ViewProps & { className?: string };
type NativeTextProps = TextProps & { className?: string };

export function Card({ className, ...props }: PropsWithChildren<NativeViewProps>) {
  return (
    <View
      className={cn(
        "rounded-3xl border border-muted/40 bg-slate-900/70 p-6 dark:bg-slate-900/60",
        "shadow-lg shadow-slate-950/40",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: PropsWithChildren<NativeViewProps>) {
  return (
    <View
      className={cn("mb-4 gap-2", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: PropsWithChildren<NativeViewProps>) {
  return (
    <View
      className={cn("gap-3", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: PropsWithChildren<NativeViewProps>) {
  return (
    <View
      className={cn("mt-4 flex-row items-center justify-between", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: PropsWithChildren<NativeTextProps>) {
  return (
    <Text
      className={cn(
        "text-xl font-semibold text-foreground dark:text-slate-100",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: PropsWithChildren<NativeTextProps>) {
  return (
    <Text
      className={cn("text-sm text-slate-400 dark:text-slate-300/80", className)}
      {...props}
    />
  );
}
