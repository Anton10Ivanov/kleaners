import { environmentUtils } from "@/utils/environment";

// Performance monitoring utilities
type OperationName = string;

interface PerformanceEntry {
  startTime: number;
  duration: number;
}

interface PerformanceMetrics {
  [key: string]: PerformanceEntry[];
}

export const performanceMonitor = {
  importantMarks: new Set<string>(),
  metrics: {} as PerformanceMetrics,

  markAsImportant: (markName: string) => {
    performanceMonitor.importantMarks.add(markName);
    console.log(`Marked ${markName} as important for performance monitoring.`);
  },

  measureOperation: (operationName: OperationName, operation: () => void) => {
    const startTime = performance.now();
    operation();
    const duration = performance.now() - startTime;

    if (!performanceMonitor.metrics[operationName]) {
      performanceMonitor.metrics[operationName] = [];
    }

    performanceMonitor.metrics[operationName]?.push({ startTime, duration });
    console.debug(`Operation ${operationName} took ${duration.toFixed(2)} ms`);
  },

  reportMetrics: () => {
    console.groupCollapsed('Performance Metrics Report');
    Object.keys(performanceMonitor.metrics).forEach(key => {
      const entries = performanceMonitor.metrics[key];
      const totalTime = entries.reduce((sum, entry) => sum + entry.duration, 0);
      const averageTime = totalTime / entries.length;
      console.log(`${key}: ${entries.length} calls, avg: ${averageTime.toFixed(2)}ms, total: ${totalTime.toFixed(2)}ms`);
    });
    console.groupEnd();
  },

  // Enhanced environment-aware initialization
  init: () => {
    if (typeof window === 'undefined') return;
    
    // Add environment context to performance reporting
    const environmentContext = {
      isLovableSandbox: window.location.hostname.includes('lovable'),
      isPreviewWindow: window.opener !== null,
      hostname: window.location.hostname,
      userAgent: navigator.userAgent
    };
    
    console.log('Performance Monitor initialized with context:', environmentContext);
    
    // Monitor hydration issues specific to preview windows
    if (environmentContext.isPreviewWindow) {
      console.log('Preview window detected - enabling enhanced monitoring');
      
      // Check for hydration mismatches
      window.addEventListener('error', (event) => {
        if (event.message.includes('hydrat')) {
          console.error('Hydration error detected in preview window:', event);
        }
      });
    }
  }
};

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  performanceMonitor.init();
}
