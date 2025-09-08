
import { groupResultsByCategory } from './operation-utils';

/**
 * Performance reporting functionality
 
export class PerformanceReporter {
  /**
   * Log all timing results to the console in a structured format
   
  public logResults(results: Record<string, number>, getThreshold: (key: string) => number, enabled: boolean): void {
    if (!enabled || Object.keys(results).length === 0) return;
    
    console.group('🔍 Performance Monitoring Results');
    
    // Group results by category
    const categories = groupResultsByCategory(results);
    
    // Log each category
    Object.entries(categories).forEach(([category, items]) => {
      if (Object.keys(items).length > 0) {
        console.group(`${category}:`);
        Object.entries(items)
          .sort(([, a], [, b]) => b - a) // Sort by duration (descending)
          .forEach(([key, duration]) => {
            const formattedDuration = duration.toFixed(2);
            const threshold = getThreshold(key);
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
}
