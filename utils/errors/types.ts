
/**
 * Error severity levels for the application
 
export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM", 
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING"
}

/**
 * Error context information
 
export interface ErrorContext {
  component?: string;
  action?: string;
  details?: Record<string, unknown>;
}

/**
 * Standardized error object
 
export interface AppError {
  message: string;
  severity: ErrorSeverity;
  code?: string;
  context?: ErrorContext;
  timestamp: number;
}
