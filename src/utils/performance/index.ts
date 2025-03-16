
import { CoreMonitor } from './core-monitor';
import { PerformanceReporter } from './reporting';
import { WebVitalsMonitor } from './web-vitals';
import { TimingThresholds } from './types';
import { getOperationType } from './operation-utils';

/**
 * Enhanced utility for monitoring component performance and load times
 * with support for visualization and reporting
 */
class PerformanceMonitor {
  private coreMonitor: CoreMonitor;
  private reporter: PerformanceReporter;
  private webVitals: WebVitalsMonitor;

  constructor() {
    this.coreMonitor = new CoreMonitor();
    this.reporter = new PerformanceReporter();
    this.webVitals = new WebVitalsMonitor();
  }

  /**
   * Enable or disable performance monitoring
   * @param enabled - Whether monitoring should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.coreMonitor.setEnabled(enabled);
    this.webVitals.setEnabled(enabled);
    
    if (enabled) {
      // Report performance data to console on page load complete
      window.addEventListener('load', () => {
        setTimeout(() => this.logResults(), 1000);
      });
    }
  }

  /**
   * Set performance thresholds for different operations
   * @param thresholds - Object containing threshold values in milliseconds
   */
  public setThresholds(thresholds: Partial<TimingThresholds>): void {
    this.coreMonitor.setThresholds(thresholds);
  }

  /**
   * Start timing a component or operation
   * @param key - Identifier for the component or operation
   */
  public startTiming(key: string): void {
    this.coreMonitor.startTiming(key);
  }

  /**
   * End timing a component or operation and record the result
   * @param key - Identifier for the component or operation
   */
  public endTiming(key: string): number | undefined {
    return this.coreMonitor.endTiming(key);
  }

  /**
   * Get the timing result for a specific component or operation
   * @param key - Identifier for the component or operation
   */
  public getResult(key: string): number | undefined {
    return this.coreMonitor.getResult(key);
  }

  /**
   * Get all timing results
   */
  public getAllResults(): Record<string, number> {
    return this.coreMonitor.getAllResults();
  }

  /**
   * Clear all timing data
   */
  public clearAll(): void {
    this.coreMonitor.clearAll();
  }

  /**
   * Mark a component as important for Core Web Vitals
   * and monitor its performance more closely
   * @param componentName - Name of the component to monitor
   */
  public markAsImportant(componentName: string): void {
    this.webVitals.markAsImportant(componentName, (key) => this.startTiming(key));
  }

  /**
   * Log all timing results to the console in a structured format
   */
  public logResults(): void {
    const results = this.coreMonitor.getAllResults();
    const getThreshold = (key: string) => {
      const type = getOperationType(key);
      return this.coreMonitor.getThresholds()[type] || 100;
    };
    this.reporter.logResults(results, getThreshold, this.coreMonitor.isEnabled());
  }
}

// Create a singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Enable in development mode with appropriate thresholds
if (import.meta.env.DEV) {
  performanceMonitor.setEnabled(true);
  performanceMonitor.setThresholds({
    import: 500,  // Lazy-loaded imports can take longer
    render: 100,  // Component initial renders
    interaction: 50 // User interactions should be fast
  });
  
  // Mark important components for monitoring
  performanceMonitor.markAsImportant('Hero');
  performanceMonitor.markAsImportant('BookingForm');
}

export default performanceMonitor;
