
import environmentUtils from '@/utils/environment';
import routerUtils from '@/utils/router';
import styleUtils from '@/utils/styles';
import scriptUtils from '@/utils/scripts';
import animationUtils from '@/utils/animations';
import hydrationUtils from '@/utils/hydration';
import stateUtils from '@/utils/state';
import { performanceMonitor } from '@/utils/performance';

/**
 * Comprehensive reliability utilities for preview window consistency
 */
export const reliabilityUtils = {
  // Initialize all reliability systems
  initialize: async (): Promise<void> => {
    if (environmentUtils.isServerSide()) return;
    
    console.log('Initializing reliability systems...');
    
    // Start performance monitoring
    performanceMonitor.markAsImportant('ReliabilityInitialization');
    
    // Initialize hydration detection
    hydrationUtils.detectHydrationMismatch();
    
    // Wait for critical systems
    const [stylesReady, scriptsReady, hydrationReady] = await Promise.all([
      styleUtils.waitForStyles(3000),
      scriptUtils.waitForScripts(5000),
      hydrationUtils.waitForHydration(3000)
    ]);
    
    // Monitor animation performance
    if (animationUtils.shouldEnableAnimations()) {
      animationUtils.monitorAnimationPerformance();
    }
    
    // Clean up old state
    stateUtils.cleanupExpiredState(['user_preferences', 'booking_data', 'provider_data']);
    
    // Verify all systems
    const systemStatus = {
      router: routerUtils.isRouterContextAvailable(),
      styles: stylesReady,
      scripts: scriptsReady,
      hydration: hydrationReady,
      animations: animationUtils.shouldEnableAnimations(),
      environment: {
        isPreviewWindow: environmentUtils.isPreviewWindow(),
        isLovableSandbox: environmentUtils.isLovableSandbox()
      }
    };
    
    console.log('Reliability systems initialized:', systemStatus);
    
    // Report any issues
    if (!stylesReady) console.warn('Styles failed to load properly');
    if (!scriptsReady) console.warn('Scripts failed to load properly');
    if (!hydrationReady) console.warn('Hydration may be incomplete');
  },

  // Health check for all systems
  healthCheck: (): Record<string, boolean> => {
    return {
      router: routerUtils.isRouterContextAvailable(),
      styles: styleUtils.areStylesLoaded(),
      scripts: scriptUtils.areCriticalScriptsLoaded(),
      hydration: hydrationUtils.isHydrated(),
      animations: animationUtils.shouldEnableAnimations()
    };
  },

  // Get system status report
  getStatusReport: (): Record<string, any> => {
    const health = reliabilityUtils.healthCheck();
    
    return {
      health,
      environment: {
        isServerSide: environmentUtils.isServerSide(),
        isPreviewWindow: environmentUtils.isPreviewWindow(),
        isLovableSandbox: environmentUtils.isLovableSandbox(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR'
      },
      performance: {
        // Add performance metrics if available
        loadTime: typeof performance !== 'undefined' ? performance.now() : 0
      }
    };
  }
};

// Auto-initialize when imported in browser environment
if (typeof window !== 'undefined') {
  // Delay initialization to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reliabilityUtils.initialize);
  } else {
    reliabilityUtils.initialize();
  }
}

export {
  environmentUtils,
  routerUtils,
  styleUtils,
  scriptUtils,
  animationUtils,
  hydrationUtils,
  stateUtils,
  performanceMonitor
};

export default reliabilityUtils;
