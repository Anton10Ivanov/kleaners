
import environmentUtils from '@/utils/environment';

/**
 * Script loading utilities for consistent dependency loading
 */
export const scriptUtils = {
  // Check if GPT Engineer script is loaded
  isGPTEngineerLoaded: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    const scripts = document.querySelectorAll('script[src*="gptengineer"]');
    return scripts.length > 0;
  },

  // Check if all critical scripts are loaded
  areCriticalScriptsLoaded: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    // Simplified to only check for React (GPT Engineer script removed)
    return typeof window.React !== 'undefined' || document.querySelector('script[src*="react"]');
  },

  // Wait for scripts to load
  waitForScripts: (timeout: number = 10000): Promise<boolean> => {
    return new Promise((resolve) => {
      if (environmentUtils.isServerSide()) {
        resolve(false);
        return;
      }

      const startTime = Date.now();
      
      const checkScripts = () => {
        if (scriptUtils.areCriticalScriptsLoaded()) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          console.warn('Scripts loading timeout');
          resolve(false);
          return;
        }
        
        setTimeout(checkScripts, 100);
      };
      
      checkScripts();
    });
  },

  // Monitor script loading errors
  monitorScriptErrors: (): void => {
    if (environmentUtils.isServerSide()) return;
    
    window.addEventListener('error', (event) => {
      if (event.target && (event.target as any).tagName === 'SCRIPT') {
        console.error('Script loading error:', {
          src: (event.target as any).src,
          error: event.error,
          message: event.message
        });
      }
    });
  },

  // Verify script loading order - simplified since GPT Engineer script was removed
  verifyLoadingOrder: (): boolean => {
    if (environmentUtils.isServerSide()) return true;
    
    // Always return true since we no longer depend on GPT Engineer script
    return true;
  }
};

export default scriptUtils;
