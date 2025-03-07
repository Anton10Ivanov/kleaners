
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Development utilities to enhance developer experience
 */
export const dev = {
  /**
   * Log data only in development mode
   */
  log: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.log(`[DEV] ${message}`, data);
    }
  },
  
  /**
   * Measure execution time of a function in development
   */
  measure: <T>(label: string, fn: () => T): T => {
    if (!import.meta.env.DEV) return fn();
    
    console.time(`⏱️ ${label}`);
    const result = fn();
    console.timeEnd(`⏱️ ${label}`);
    return result;
  },
  
  /**
   * Add visual debug outlines to elements
   * Usage: className={dev.outline()}
   */
  outline: (color = 'red') => {
    return import.meta.env.DEV ? `outline outline-1 outline-${color}-500` : '';
  },
  
  /**
   * Feature flags for development
   */
  features: {
    enableNewUI: import.meta.env.DEV && localStorage.getItem('dev-enable-new-ui') === 'true',
    debugForms: import.meta.env.DEV && localStorage.getItem('dev-debug-forms') === 'true',
  }
};

/**
 * Type guard to check if a value is not undefined or null
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/**
 * Creates a debounced version of a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
