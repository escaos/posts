type LogContext = Record<string, unknown>;

export function log(error: unknown, context: LogContext = {}) {
  if (__DEV__) {
    console.error("[log]", { error, context });
  }
}

export function logWarning(message: string, context: LogContext = {}) {
  if (__DEV__) {
    console.warn("[log]", { message, context });
  }
}
