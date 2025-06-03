
import { useState, useEffect } from 'react';

/**
 * Hydration utilities for managing server-side rendering and client-side hydration
 */

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Check if we're during hydration phase
export const isHydrating = isBrowser && !window.__INITIAL_RENDER_COMPLETE__;

// Mark hydration as complete
export const markHydrationComplete = () => {
  if (isBrowser) {
    window.__INITIAL_RENDER_COMPLETE__ = true;
  }
};

// Safe function to run code only after hydration
export const afterHydration = (callback: () => void) => {
  if (!isBrowser) return;
  
  if (isHydrating) {
    // Wait for next tick to ensure hydration is complete
    setTimeout(callback, 0);
  } else {
    callback();
  }
};

// Hook for components that need to wait for hydration
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
    markHydrationComplete();
  }, []);
  
  return hydrated;
};

// Extend window type for TypeScript
declare global {
  interface Window {
    __INITIAL_RENDER_COMPLETE__?: boolean;
  }
}

export default {
  isBrowser,
  isHydrating,
  markHydrationComplete,
  afterHydration,
  useHydrated
};
