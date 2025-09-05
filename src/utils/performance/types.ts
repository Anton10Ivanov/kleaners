
/**
 * Types for the performance monitoring system
 */

export interface TimingThresholds {
  import: number;  // milliseconds
  render: number;
  interaction: number;
  [key: string]: number;
}

export type OperationType = 'import' | 'render' | 'interaction' | 'default';

export interface PerformanceResult {
  key: string;
  duration: number;
  threshold: number;
  operationType: OperationType;
  timestamp: number;
}

export interface GroupedResults {
  'Component Imports': Record<string, number>;
  'Component Renders': Record<string, number>;
  'Interactions': Record<string, number>;
  'Other': Record<string, number>;
}
