
import { TimingThresholds, PerformanceResult, OperationType } from './types';
import { getOperationType } from './operation-utils';
import { PerformanceReporter } from './reporting';

/**
 * Core performance monitoring functionality
 
export class PerformanceMonitor {
  private timings: Map<string, number> = new Map();
  private results: Record<string, number> = {};
  private importantMarks: Set<string> = new Set();
  private thresholds: TimingThresholds = {
    import: 300,  // 300ms threshold for imports
    render: 50,   // 50ms threshold for renders
    interaction: 100, // 100ms threshold for user interactions
    default: 100  // 100ms default threshold
  };
  private enabled: boolean = true;
  private reporter: PerformanceReporter = new PerformanceReporter();
  
  /**
   * Mark a component or operation as important for performance monitoring
   * @param markName - Name of the mark to track as important
   
  public markAsImportant(markName: string): void {
    this.importantMarks.add(markName);
    // Marked as important for performance monitoring - removed console.log for production
  }
  
  /**
   * Start timing an operation
   * @param key - Unique identifier for the operation
   
  public startTiming(key: string): void {
    if (!this.enabled) return;
    
    this.timings.set(key, performance.now());
  }
  
  /**
   * End timing an operation and record the result
   * @param key - Unique identifier for the operation
   * @returns Duration in milliseconds
   
  public endTiming(key: string): number {
    if (!this.enabled || !this.timings.has(key)) return 0;
    
    const startTime = this.timings.get(key) as number;
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Store the result
    this.results[key] = duration;
    
    // Remove the timing
    this.timings.delete(key);
    
    // Log performance issues
    this.checkPerformance(key, duration);
    
    return duration;
  }
  
  /**
   * Check if an operation's duration exceeds its threshold
   * @param key - Unique identifier for the operation
   * @param duration - Duration in milliseconds
   
  private checkPerformance(key: string, duration: number): void {
    const operationType = getOperationType(key);
    const threshold = this.getThreshold(operationType);
    
    if (duration > threshold) {
      console.warn(`Performance issue: ${key} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
    }
  }
  
  /**
   * Get threshold for an operation type
   * @param type - Type of operation
   * @returns Threshold in milliseconds
   
  public getThreshold(type: string): number {
    return this.thresholds[type] || this.thresholds.default;
  }
  
  /**
   * Set threshold for an operation type
   * @param type - Type of operation
   * @param threshold - Threshold in milliseconds
   
  public setThreshold(type: string, threshold: number): void {
    this.thresholds[type] = threshold;
  }
  
  /**
   * Enable or disable performance monitoring
   * @param enabled - Whether monitoring is enabled
   
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  /**
   * Log all recorded timing results to the console
   
  public logResults(): void {
    this.reporter.logResults(this.results, this.getThreshold.bind(this), this.enabled);
  }
  
  /**
   * Get all recorded timing results
   * @returns Record of timing results
   
  public getResults(): Record<string, PerformanceResult> {
    const results: Record<string, PerformanceResult> = {};
    
    Object.entries(this.results).forEach(([key, duration]) => {
      const operationType = getOperationType(key) as OperationType;
      const threshold = this.getThreshold(operationType);
      
      results[key] = {
        key,
        duration,
        threshold,
        operationType,
        timestamp: Date.now()
      };
    });
    
    return results;
  }
}
