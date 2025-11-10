import { forwardRef, type ReactNode } from "react";
import { Text, type TextProps } from "react-native";

import { cn } from "../../lib/cn";

type TypographyVariant = "title" | "subtitle" | "body" | "muted" | "caption";

type TypographyProps = Omit<TextProps, "children"> & {
  children: ReactNode;
  className?: string;
  variant?: TypographyVariant;
};

const variantClassNames: Record<TypographyVariant, string> = {
  title: "text-2xl font-semibold text-foreground tracking-tight",
  subtitle: "text-lg font-medium text-slate-300 dark:text-slate-200",
  body: "text-base text-slate-200 dark:text-slate-100",
  muted: "text-sm text-slate-400 dark:text-slate-400",
  caption:
    "text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400",
};

export const Typography = forwardRef<Text, TypographyProps>(function Typography(
  { variant = "body", className, children, ...props },
  ref,
) {
  return (
    <Text
      ref={ref}
      className={cn(variantClassNames[variant], className)}
      {...props}
    >
      {children}
    </Text>
  );
});
