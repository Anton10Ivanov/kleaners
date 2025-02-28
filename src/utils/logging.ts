
/**
 * Centralized logging utility for the application
 * Provides consistent log formatting and could be extended to send logs to external services
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
  component?: string;
  userId?: string;
  sessionId?: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Set minimum log level based on environment
const MIN_LOG_LEVEL: LogLevel = 
  import.meta.env.MODE === "production" ? "info" : "debug";

/**
 * Creates a formatted log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  component?: string,
  userId?: string,
  sessionId?: string
): LogEntry {
  return {
    level,
    message,
    context,
    component,
    userId,
    sessionId,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Logs a message if the log level is high enough
 */
function logMessage(entry: LogEntry): void {
  if (LOG_LEVELS[entry.level] < LOG_LEVELS[MIN_LOG_LEVEL]) {
    return;
  }

  const prefix = `[${entry.level.toUpperCase()}][${entry.timestamp}]`;
  const componentInfo = entry.component ? `[${entry.component}]` : '';
  const userInfo = entry.userId ? `[User: ${entry.userId}]` : '';
  const sessionInfo = entry.sessionId ? `[Session: ${entry.sessionId}]` : '';
  
  const logPrefix = `${prefix}${componentInfo}${userInfo}${sessionInfo}`;
  
  switch (entry.level) {
    case "debug":
      console.debug(logPrefix, entry.message, entry.context || "");
      break;
    case "info":
      console.info(logPrefix, entry.message, entry.context || "");
      break;
    case "warn":
      console.warn(logPrefix, entry.message, entry.context || "");
      break;
    case "error":
      console.error(logPrefix, entry.message, entry.context || "");
      break;
  }

  // Here you could add sending logs to an external service
  // sendToLogService(entry);
}

/**
 * Gets the current user session info for logging
 * Can be extended to integrate with auth system
 */
function getSessionInfo(): { userId?: string; sessionId?: string } {
  // This can be extended to get real user/session info from auth context
  // For now, return empty to avoid undefined errors
  return {};
}

// Public logger API
export const logger = {
  debug: (message: string, context?: Record<string, unknown>, component?: string) => {
    const { userId, sessionId } = getSessionInfo();
    logMessage(createLogEntry("debug", message, context, component, userId, sessionId));
  },
  
  info: (message: string, context?: Record<string, unknown>, component?: string) => {
    const { userId, sessionId } = getSessionInfo();
    logMessage(createLogEntry("info", message, context, component, userId, sessionId));
  },
  
  warn: (message: string, context?: Record<string, unknown>, component?: string) => {
    const { userId, sessionId } = getSessionInfo();
    logMessage(createLogEntry("warn", message, context, component, userId, sessionId));
  },
  
  error: (message: string, context?: Record<string, unknown>, component?: string) => {
    const { userId, sessionId } = getSessionInfo();
    logMessage(createLogEntry("error", message, context, component, userId, sessionId));
  },
  
  // Component-specific logger factory
  forComponent: (componentName: string) => ({
    debug: (message: string, context?: Record<string, unknown>) => {
      logger.debug(message, context, componentName);
    },
    info: (message: string, context?: Record<string, unknown>) => {
      logger.info(message, context, componentName);
    },
    warn: (message: string, context?: Record<string, unknown>) => {
      logger.warn(message, context, componentName);
    },
    error: (message: string, context?: Record<string, unknown>) => {
      logger.error(message, context, componentName);
    }
  })
};

// Export some utility functions for testing and monitoring
export const logStats = {
  getMinLogLevel: () => MIN_LOG_LEVEL,
  setTestLogLevel: (level: LogLevel) => {
    // This would be used only in testing environments
    if (import.meta.env.MODE !== 'production') {
      // In a real implementation, we would have a way to override MIN_LOG_LEVEL
      console.info(`Would set log level to ${level} in test environment`);
    }
  }
};
