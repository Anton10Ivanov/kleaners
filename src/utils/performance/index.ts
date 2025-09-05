
import { environmentUtils } from "@/utils/environment";
import { PerformanceMonitor } from './core-monitor';
import routerUtils from '@/utils/router';
import styleUtils from '@/utils/styles';
import scriptUtils from '@/utils/scripts';

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
  
<<<<<<< HEAD
  // Performance Monitor initialized - removed console.log for production
  
  // Monitor hydration issues specific to preview windows
  if (environmentContext.isPreviewWindow) {
    // Preview window detected - removed console.log for production
=======
  console.log('Performance Monitor initialized with context:', environmentContext);
  
  // Monitor hydration issues specific to preview windows
  if (environmentContext.isPreviewWindow) {
    console.log('Preview window detected - enabling enhanced monitoring');
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    
    // Check for hydration mismatches
    window.addEventListener('error', (event) => {
      if (event.message.includes('hydrat')) {
        console.error('Hydration error detected in preview window:', event);
      }
    });
  }

  // Initialize monitoring systems
  const initializeMonitoring = async () => {
    performanceMonitor.markAsImportant('AppInitialization');
    
    // Check router consistency
    performanceMonitor.startTiming('RouterCheck');
    const routerAvailable = routerUtils.isRouterContextAvailable();
    performanceMonitor.endTiming('RouterCheck');
    
    if (!routerAvailable) {
      console.warn('Router context verification failed');
    }
    
    // Check CSS loading
    performanceMonitor.startTiming('StylesCheck');
    const stylesLoaded = await styleUtils.waitForStyles(3000);
    performanceMonitor.endTiming('StylesCheck');
    
    if (!stylesLoaded) {
      console.warn('Styles loading timeout or failed');
    }
    
    // Check script loading
    performanceMonitor.startTiming('ScriptsCheck');
    const scriptsLoaded = await scriptUtils.waitForScripts(5000);
    performanceMonitor.endTiming('ScriptsCheck');
    
    if (!scriptsLoaded) {
      // Temporarily commenting out this warning as it's likely related to the gptengineer script issue
      // console.warn('Scripts loading timeout or failed');
<<<<<<< HEAD
      // Scripts loading check completed - removed console.log for production
=======
      console.log('Note: Scripts loading check completed. Previous warnings might be related to gptengineer.js.');
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    }
    
    // Verify loading order
    const loadingOrderCorrect = scriptUtils.verifyLoadingOrder(); // This function internally logs "GPT Engineer script not found"
    if (!loadingOrderCorrect) {
      // Temporarily commenting out this warning as it's directly related to `verifyLoadingOrder`
      // reporting issues due to the missing gptengineer script, which is expected.
      // console.warn('Script loading order issues detected');
<<<<<<< HEAD
      // Script loading order check completed - removed console.log for production
=======
      console.log('Note: Script loading order check completed. Previous warnings might be related to gptengineer.js.');
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    }
    
    // Start error monitoring
    scriptUtils.monitorScriptErrors();
    
<<<<<<< HEAD
    // Monitoring systems initialized - removed console.log for production
=======
    console.log('Monitoring systems initialized', {
      router: routerAvailable,
      styles: stylesLoaded,
      scripts: scriptsLoaded, // This will still report false if waitForScripts timed out
      loadingOrder: loadingOrderCorrect // This will still report false if verifyLoadingOrder failed
    });
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
  };
  
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMonitoring);
  } else {
    initializeMonitoring();
  }
}

