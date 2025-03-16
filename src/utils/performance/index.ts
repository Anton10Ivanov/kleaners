
import { PerformanceMonitor } from './core-monitor';
import { WebVitalsMonitor } from './web-vitals';

/**
 * Main performance monitoring system
 * Provides a centralized way to track and report performance metrics
 */

// Create singleton instances
const monitor = new PerformanceMonitor();
const webVitals = new WebVitalsMonitor();

// Export the performance monitor instance
export const performanceMonitor = {
  /**
   * Start timing an operation
   * @param key - Unique identifier for the operation
   */
  startTiming: (key: string) => monitor.startTiming(key),
  
  /**
   * End timing an operation and record the result
   * @param key - Unique identifier for the operation
   * @returns Duration in milliseconds
   */
  endTiming: (key: string) => monitor.endTiming(key),
  
  /**
   * Set a threshold for a specific operation type
   * @param type - Type of operation
   * @param threshold - Threshold in milliseconds
   */
  setThreshold: (type: string, threshold: number) => monitor.setThreshold(type, threshold),
  
  /**
   * Enable or disable performance monitoring
   * @param enabled - Whether monitoring is enabled
   */
  setEnabled: (enabled: boolean) => {
    monitor.setEnabled(enabled);
    webVitals.setEnabled(enabled);
  },
  
  /**
   * Mark a component as important for Core Web Vitals
   * @param componentName - Name of the component
   */
  markAsImportant: (componentName: string) => 
    webVitals.markAsImportant(componentName, monitor.startTiming.bind(monitor)),
  
  /**
   * Log all recorded timing results to the console
   */
  logResults: () => monitor.logResults(),

  /**
   * Get all recorded timing results
   * @returns Record of timing results
   */
  getResults: () => monitor.getResults()
};
