
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
    
    const criticalScripts = [
      'gptengineer', // GPT Engineer script
      'react', // React in global scope
    ];
    
    return criticalScripts.every(script => {
      if (script === 'react') {
        return typeof window.React !== 'undefined' || document.querySelector('script[src*="react"]');
      }
      return document.querySelector(`script[src*="${script}"]`);
    });
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

  // Verify script loading order
  verifyLoadingOrder: (): boolean => {
    if (environmentUtils.isServerSide()) return true;
    
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const gptScript = scripts.find(script => script.getAttribute('src')?.includes('gptengineer'));
    
    if (!gptScript) {
      console.warn('GPT Engineer script not found');
      return false;
    }
    
    // Check if GPT script loads before main app script
    const appScript = scripts.find(script => 
      script.getAttribute('src')?.includes('main') || 
      script.getAttribute('src')?.includes('index')
    );
    
    if (appScript && gptScript) {
      const gptIndex = scripts.indexOf(gptScript);
      const appIndex = scripts.indexOf(appScript);
      
      if (gptIndex > appIndex) {
        console.warn('GPT Engineer script should load before main app script');
        return false;
      }
    }
    
    return true;
  }
};

export default scriptUtils;
