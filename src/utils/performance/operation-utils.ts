
import { OperationType } from './types';

/**
 * Utility functions for performance operations
 */

/**
 * Determine operation type from timing key
 */
export function getOperationType(key: string): OperationType {
  if (key.includes('-import')) return 'import';
  if (key.includes('-render')) return 'render';
  if (key.includes('-interaction')) return 'interaction';
  return 'default';
}

/**
 * Group results by category for reporting
 */
export function groupResultsByCategory(results: Record<string, number>): Record<string, Record<string, number>> {
  const categories: Record<string, Record<string, number>> = {
    'Component Imports': {},
    'Component Renders': {},
    'Interactions': {},
    'Other': {}
  };
  
  Object.entries(results).forEach(([key, duration]) => {
    if (key.includes('-import')) {
      categories['Component Imports'][key] = duration;
    } else if (key.includes('-render')) {
      categories['Component Renders'][key] = duration;
    } else if (key.includes('-interaction')) {
      categories['Interactions'][key] = duration;
    } else {
      categories['Other'][key] = duration;
    }
  });
  
  return categories;
}
