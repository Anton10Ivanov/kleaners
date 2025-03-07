
/**
 * Type utilities for better type safety across the application
 */

import { ErrorSeverity } from "@/schemas/booking";

/**
 * Type guard to check if a value is a valid ErrorSeverity
 */
export const isErrorSeverity = (value: unknown): value is ErrorSeverity => {
  return typeof value === 'string' && Object.values(ErrorSeverity).includes(value as ErrorSeverity);
};

/**
 * Converts a boolean to a string representation
 * This is a type-safe replacement for the existing boolToString function
 */
export const boolToString = (value: boolean): string => {
  return value ? "true" : "false";
};

/**
 * Type guard to check if a value is a non-nullable object
 */
export const isObject = <T extends object>(value: unknown): value is T => {
  return value !== null && typeof value === 'object';
};

/**
 * Enforces type safety when accessing object properties
 */
export const getTypeSafeProperty = <T extends object, K extends keyof T>(
  obj: T | null | undefined, 
  key: K, 
  defaultValue: T[K]
): T[K] => {
  if (!obj) return defaultValue;
  return obj[key] !== undefined ? obj[key] : defaultValue;
};
