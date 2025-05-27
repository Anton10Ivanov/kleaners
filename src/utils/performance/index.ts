
import { environmentUtils } from "@/utils/environment";
import { PerformanceMonitor } from './core-monitor';

// Create a singleton instance of the performance monitor
export const performanceMonitor = new PerformanceMonitor();

// Export the class for advanced usage
export { PerformanceMonitor } from './core-monitor';
export * from './types';
export * from './operation-utils';
export * from './reporting';

// Auto-initialize when imported
if (typeof window !== 'undefined') {
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
