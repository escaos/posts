import { Component, type ErrorInfo, type ReactNode } from "react";
import { View } from "react-native";
import { log } from "../lib/logger";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

type AppErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode;
  onReset?: () => void;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    log(error, { scope: "AppErrorBoundary", info });
  }

  handleReset = () => {
    this.setState({ error: null }, () => {
      this.props.onReset?.();
    });
  };

  renderFallback(error: Error) {
    if (this.props.fallback) {
      return this.props.fallback({
        error,
        reset: this.handleReset,
      });
    }

    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background-light px-6 dark:bg-background">
        <Typography variant="title" className="text-center">
          Something went wrong
        </Typography>
        <Typography variant="muted" className="text-center">
          {error.message}
        </Typography>
        <Button onPress={this.handleReset} variant="secondary">
          Try again
        </Button>
      </View>
    );
  }

  render(): ReactNode {
    if (this.state.error) {
      return this.renderFallback(this.state.error);
    }

    return this.props.children;
  }
}
