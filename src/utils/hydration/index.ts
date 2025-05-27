
import environmentUtils from '@/utils/environment';

/**
 * Hydration utilities for server-side rendering safeguards
 */
export const hydrationUtils = {
  // Check if component has hydrated
  isHydrated: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    return typeof window !== 'undefined' && 
           window.document && 
           window.document.readyState === 'complete';
  },

  // Wait for hydration to complete
  waitForHydration: (timeout: number = 3000): Promise<boolean> => {
    return new Promise((resolve) => {
      if (environmentUtils.isServerSide()) {
        resolve(false);
        return;
      }

      if (hydrationUtils.isHydrated()) {
        resolve(true);
        return;
      }

      const startTime = Date.now();
      
      const checkHydration = () => {
        if (hydrationUtils.isHydrated()) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          console.warn('Hydration timeout - component may not be properly hydrated');
          resolve(false);
          return;
        }
        
        requestAnimationFrame(checkHydration);
      };
      
      checkHydration();
    });
  },

  // Safe component renderer that handles hydration mismatches
  safeRender: (serverContent: () => React.ReactNode, clientContent: () => React.ReactNode) => {
    if (environmentUtils.isServerSide()) {
      return serverContent();
    }
    
    // Use client content after hydration
    return hydrationUtils.isHydrated() ? clientContent() : serverContent();
  },

  // Detect hydration mismatches
  detectHydrationMismatch: (): void => {
    if (environmentUtils.isServerSide()) return;
    
    window.addEventListener('error', (event) => {
      if (event.message.includes('hydrat') || 
          event.message.includes('mismatch')) {
        console.error('Hydration mismatch detected:', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        });
      }
    });
  },

  // Safe state initialization for hydration
  useSafeState: <T>(serverState: T, clientState: T): T => {
    if (environmentUtils.isServerSide()) {
      return serverState;
    }
    
    return hydrationUtils.isHydrated() ? clientState : serverState;
  }
};

export default hydrationUtils;
