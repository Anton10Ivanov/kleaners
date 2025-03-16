
/**
 * Web Vitals integration for performance monitoring
 */
export class WebVitalsMonitor {
  private enabled: boolean = false;
  
  /**
   * Enable Web Vitals monitoring
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  /**
   * Mark a component as important for Core Web Vitals
   * and monitor its performance more closely
   */
  public markAsImportant(componentName: string, startTimingFn: (key: string) => void): void {
    if (!this.enabled) return;
    
    // Use Web Vitals API if available
    if ('PerformanceObserver' in window) {
      try {
        // Monitor LCP for this component
        startTimingFn(`${componentName}-LCP`);
      } catch (err) {
        console.error('Performance monitoring error:', err);
      }
    }
  }
}
