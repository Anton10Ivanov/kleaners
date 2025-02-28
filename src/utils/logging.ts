
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
  context?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    context,
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
  
  switch (entry.level) {
    case "debug":
      console.debug(prefix, entry.message, entry.context || "");
      break;
    case "info":
      console.info(prefix, entry.message, entry.context || "");
      break;
    case "warn":
      console.warn(prefix, entry.message, entry.context || "");
      break;
    case "error":
      console.error(prefix, entry.message, entry.context || "");
      break;
  }

  // Here you could add sending logs to an external service
  // sendToLogService(entry);
}

// Public logger API
export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    logMessage(createLogEntry("debug", message, context));
  },
  
  info: (message: string, context?: Record<string, unknown>) => {
    logMessage(createLogEntry("info", message, context));
  },
  
  warn: (message: string, context?: Record<string, unknown>) => {
    logMessage(createLogEntry("warn", message, context));
  },
  
  error: (message: string, context?: Record<string, unknown>) => {
    logMessage(createLogEntry("error", message, context));
  },
};
