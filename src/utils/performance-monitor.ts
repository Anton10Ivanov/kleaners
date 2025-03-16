
/**
 * Enhanced utility for monitoring component performance and load times
 * with support for visualization and reporting
 */
class PerformanceMonitor {
  private timers: Record<string, number> = {};
  private results: Record<string, number> = {};
  private enabled: boolean = false;
  private thresholds: Record<string, number> = {
    import: 300, // milliseconds
    render: 100,
    interaction: 50
  };

  /**
   * Enable or disable performance monitoring
   * @param enabled - Whether monitoring should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    
    if (enabled) {
      console.info('Performance monitoring enabled');
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
  public setThresholds(thresholds: Partial<Record<string, number>>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  /**
   * Start timing a component or operation
   * @param key - Identifier for the component or operation
   */
  public startTiming(key: string): void {
    if (!this.enabled) return;
    this.timers[key] = performance.now();
  }

  /**
   * End timing a component or operation and record the result
   * @param key - Identifier for the component or operation
   */
  public endTiming(key: string): number | undefined {
    if (!this.enabled || this.timers[key] === undefined) return;
    
    const endTime = performance.now();
    const duration = endTime - this.timers[key];
    this.results[key] = duration;
    
    // Check against thresholds
    const operationType = this.getOperationType(key);
    const threshold = this.thresholds[operationType] || 100;
    
    if (duration > threshold) {
      console.warn(`⚠️ Performance warning: ${key} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
    } else {
      console.info(`✅ ${key} - ${duration.toFixed(2)}ms`);
    }
    
    delete this.timers[key];
    return duration;
  }

  /**
   * Get operation type from key name to apply correct threshold
   */
  private getOperationType(key: string): string {
    if (key.includes('-import')) return 'import';
    if (key.includes('-render')) return 'render';
    if (key.includes('-interaction')) return 'interaction';
    return 'default';
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
   * Mark a component as important for Core Web Vitals
   * and monitor its performance more closely
   * @param componentName - Name of the component to monitor
   */
  public markAsImportant(componentName: string): void {
    if (!this.enabled) return;
    
    // Use Web Vitals API if available
    if ('PerformanceObserver' in window) {
      try {
        // Monitor LCP for this component
        this.startTiming(`${componentName}-LCP`);
      } catch (err) {
        console.error('Performance monitoring error:', err);
      }
    }
  }

  /**
   * Log all timing results to the console in a structured format
   */
  public logResults(): void {
    if (!this.enabled || Object.keys(this.results).length === 0) return;
    
    console.group('🔍 Performance Monitoring Results');
    
    // Group results by category
    const categories: Record<string, Record<string, number>> = {
      'Component Imports': {},
      'Component Renders': {},
      'Interactions': {},
      'Other': {}
    };
    
    Object.entries(this.results).forEach(([key, duration]) => {
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
    
    // Log each category
    Object.entries(categories).forEach(([category, items]) => {
      if (Object.keys(items).length > 0) {
        console.group(`${category}:`);
        Object.entries(items)
          .sort(([, a], [, b]) => b - a) // Sort by duration (descending)
          .forEach(([key, duration]) => {
            const formattedDuration = duration.toFixed(2);
            const threshold = this.getThresholdForKey(key);
            const isSlow = duration > threshold;
            
            if (isSlow) {
              console.warn(`⚠️ ${key}: ${formattedDuration}ms (threshold: ${threshold}ms)`);
            } else {
              console.info(`✅ ${key}: ${formattedDuration}ms`);
            }
          });
        console.groupEnd();
      }
    });
    
    console.groupEnd();
  }
  
  /**
   * Get the appropriate threshold for a given key
   */
  private getThresholdForKey(key: string): number {
    const type = this.getOperationType(key);
    return this.thresholds[type] || 100;
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
