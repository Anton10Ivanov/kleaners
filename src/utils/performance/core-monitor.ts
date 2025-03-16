
import { TimingThresholds, OperationType } from './types';
import { getOperationType } from './operation-utils';

/**
 * Core timing and monitoring functionality
 */
export class CoreMonitor {
  private timers: Record<string, number> = {};
  private results: Record<string, number> = {};
  private enabled: boolean = false;
  private thresholds: TimingThresholds = {
    import: 300, // milliseconds
    render: 100,
    interaction: 50
  };

  /**
   * Enable or disable performance monitoring
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    
    if (enabled) {
      console.info('Performance monitoring enabled');
    }
  }

  /**
   * Set performance thresholds for different operations
   */
  public setThresholds(thresholds: Partial<TimingThresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  /**
   * Start timing a component or operation
   */
  public startTiming(key: string): void {
    if (!this.enabled) return;
    this.timers[key] = performance.now();
  }

  /**
   * End timing a component or operation and record the result
   */
  public endTiming(key: string): number | undefined {
    if (!this.enabled || this.timers[key] === undefined) return;
    
    const endTime = performance.now();
    const duration = endTime - this.timers[key];
    this.results[key] = duration;
    
    // Check against thresholds
    const operationType = getOperationType(key);
    const threshold = this.getThresholdForKey(key);
    
    if (duration > threshold) {
      console.warn(`⚠️ Performance warning: ${key} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
    } else {
      console.info(`✅ ${key} - ${duration.toFixed(2)}ms`);
    }
    
    delete this.timers[key];
    return duration;
  }

  /**
   * Get the appropriate threshold for a given key
   */
  private getThresholdForKey(key: string): number {
    const type = getOperationType(key);
    return this.thresholds[type] || 100;
  }

  /**
   * Get the timing result for a specific component or operation
   */
  public getResult(key: string): number | undefined {
    return this.results[key];
  }

  /**
   * Get all timing results
   */
  public getAllResults(): Record<string, number> {
    return { ...this.results };
  }

  /**
   * Clear all timing data
   */
  public clearAll(): void {
    this.timers = {};
    this.results = {};
  }

  /**
   * Get current thresholds
   */
  public getThresholds(): TimingThresholds {
    return { ...this.thresholds };
  }

  /**
   * Check if monitoring is enabled
   */
  public isEnabled(): boolean {
    return this.enabled;
  }
}
