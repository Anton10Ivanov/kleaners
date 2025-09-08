
import hydrationUtils from '../hydration';

// Re-export hydration utilities
export const {
  isBrowser,
  isHydrating,
  markHydrationComplete,
  afterHydration,
  useHydrated,
  isHydrated,
  detectHydrationMismatch,
  waitForHydration
} = hydrationUtils;

// Performance monitoring
export const performanceMonitor = {
  startTiming: (key: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${key}-start`);
    }
  },
  
  endTiming: (key: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${key}-end`);
      performance.measure(key, `${key}-start`, `${key}-end`);
    }
  },
  
  getTiming: (key: string): number => {
    if (typeof performance !== 'undefined') {
      const entries = performance.getEntriesByName(key, 'measure');
      return entries.length > 0 ? entries[0].duration : 0;
    }
    return 0;
  }
};

export default {
  ...hydrationUtils,
  performanceMonitor
};
