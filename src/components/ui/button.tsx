import { type ElementRef, forwardRef, type ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = Omit<PressableProps, "children"> & {
  className?: string;
  labelClassName?: string;
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-primary rounded-xl px-4 py-3 items-center justify-center active:bg-blue-600",
  secondary:
    "border border-muted rounded-xl px-4 py-3 items-center justify-center bg-transparent active:bg-muted/40",
  ghost:
    "rounded-xl px-4 py-3 items-center justify-center bg-transparent active:bg-muted/30",
};

const textClassNames: Record<ButtonVariant, string> = {
  primary: "text-primary-foreground",
  secondary: "text-foreground",
  ghost: "text-foreground",
};

const disabledClassName = "opacity-40";

export const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  function Button(
    {
      className,
      labelClassName,
      variant = "primary",
      children,
      disabled,
      ...rest
    },
    ref,
  ) {
    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        className={cn(
          variantClassNames[variant],
          disabled ? disabledClassName : undefined,
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        <Text
          className={cn(
            "text-base font-semibold",
            textClassNames[variant],
            labelClassName,
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  },
);
