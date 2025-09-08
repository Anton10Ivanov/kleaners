
import { useState, useEffect } from 'react';

// Simple browser check that doesn't interfere with HMR
export const isBrowser = typeof window !== 'undefined';

// Simplified hydration detection that doesn't block fast refresh
export const isHydrating = false;

// No-op functions in development to prevent HMR interference
export const markHydrationComplete = () => {
  // No-op in development
};

export const afterHydration = (callback: () => void) => {
  if (isBrowser) {
    callback();
  }
};

export const isHydrated = (): boolean => {
  return isBrowser;
};

export const detectHydrationMismatch = (): void => {
  // No-op in development
};

export const waitForHydration = (timeout: number = 5000): Promise<boolean> => {
  return Promise.resolve(true);
};

// Simplified hook that doesn't interfere with component updates
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(isBrowser);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
};

// Extend window type
declare global {
  interface Window {
    __INITIAL_RENDER_COMPLETE__?: boolean;
  }
}

// Export object for backward compatibility
const hydrationUtils = {
  isBrowser,
  isHydrating,
  markHydrationComplete,
  afterHydration,
  useHydrated,
  isHydrated,
  detectHydrationMismatch,
  waitForHydration
};

export default hydrationUtils;
