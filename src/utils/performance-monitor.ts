
/**
 * Utility for monitoring component performance and load times
 */
class PerformanceMonitor {
  private timers: Record<string, number> = {};
  private results: Record<string, number> = {};
  private enabled: boolean = false;

  /**
   * Enable or disable performance monitoring
   * @param enabled - Whether monitoring should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    
    if (enabled) {
      console.info('Performance monitoring enabled');
    }
  }

  /**
   * Start timing a component or operation
   * @param key - Identifier for the component or operation
   */
  public startTiming(key: string): void {
    if (!this.enabled) return;
    this.timers[key] = performance.now();
    console.info(`⏱️ Started timing: ${key}`);
  }

  /**
   * End timing a component or operation and record the result
   * @param key - Identifier for the component or operation
   */
  public endTiming(key: string): number | undefined {
    if (!this.enabled || !this.timers[key]) return;
    
    const endTime = performance.now();
    const duration = endTime - this.timers[key];
    this.results[key] = duration;
    
    console.info(`⏱️ Finished timing: ${key} - ${duration.toFixed(2)}ms`);
    delete this.timers[key];
    
    return duration;
  }

  /**
   * Get the timing result for a specific component or operation
   * @param key - Identifier for the component or operation
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
   * Log all timing results to the console
   */
  public logResults(): void {
    if (!this.enabled) return;
    
    console.group('🔍 Performance Monitoring Results');
    Object.entries(this.results).forEach(([key, duration]) => {
      console.info(`${key}: ${duration.toFixed(2)}ms`);
    });
    console.groupEnd();
  }
}

// Create a singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Enable in development mode
if (import.meta.env.DEV) {
  performanceMonitor.setEnabled(true);
}

export default performanceMonitor;
