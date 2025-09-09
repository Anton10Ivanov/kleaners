
/**
 * Type utilities for better type safety across the application
 

import { ErrorSeverity } from "@/types/enums";

/**
 * Type guard to check if a value is a valid ErrorSeverity
 
export const isErrorSeverity = (value: unknown): value is ErrorSeverity => {
  return typeof value === 'string' && Object.values(ErrorSeverity).includes(value as ErrorSeverity);
};

/**
 * Converts a boolean to a string representation
 * This is a type-safe replacement for the existing boolToString function
 
export const boolToString = (value: boolean): string => {
  return value ? "true" : "false";
};

/**
 * Type guard to check if a value is a non-nullable object
 
export const isObject = <T extends object>(value: unknown): value is T => {
  return value !== null && typeof value === 'object';
};

/**
 * Enforces type safety when accessing object properties
 
export const getTypeSafeProperty = <T extends object, K extends keyof T>(
  obj: T | null | undefined, 
  key: K, 
  defaultValue: T[K]
): T[K] => {
  if (!obj) return defaultValue;
  return obj[key] !== undefined ? obj[key] : defaultValue;
};

/**
 * Type guard to check if a key exists in an object
 
export const hasProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> => {
  return prop in obj;
};

/**
 * Safely cast a value to a specific type
 * Returns the default value if the cast fails
 
export function safeCast<T>(value: unknown, defaultValue: T): T {
  try {
    return value as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Assert that a value is not null or undefined
 * Throws an error if the value is null or undefined
 
export function assertDefined<T>(value: T | null | undefined, message = 'Value is undefined or null'): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

/**
 * Transforms an object type to make all properties optional and nullable
 
export type Nullable<T> = { 
  [P in keyof T]?: T[P] | null 
};

/**
 * Transforms an object type to make all properties required and non-nullable
 
export type Required<T> = { 
  [P in keyof T]-?: T[P] 
};

/**
 * Pick properties from an object type that match a specific value type
 
export type PickByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
};

/**
 * Recursively make all properties in an object optional
 */
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
