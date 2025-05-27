
import environmentUtils from '@/utils/environment';

/**
 * State management utilities for consistent state across environments
 */
export const stateUtils = {
  // Safe localStorage access with fallbacks
  getStorageItem: (key: string, defaultValue: any = null): any => {
    if (environmentUtils.isServerSide()) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get storage item ${key}:`, error);
      return defaultValue;
    }
  },

  setStorageItem: (key: string, value: any): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set storage item ${key}:`, error);
      return false;
    }
  },

  removeStorageItem: (key: string): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove storage item ${key}:`, error);
      return false;
    }
  },

  // Safe session storage access
  getSessionItem: (key: string, defaultValue: any = null): any => {
    if (environmentUtils.isServerSide()) return defaultValue;
    
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get session item ${key}:`, error);
      return defaultValue;
    }
  },

  setSessionItem: (key: string, value: any): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set session item ${key}:`, error);
      return false;
    }
  },

  // State synchronization across tabs
  syncStateAcrossTabs: (key: string, callback: (newValue: any) => void): (() => void) => {
    if (environmentUtils.isServerSide()) return () => {};
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const newValue = JSON.parse(event.newValue);
          callback(newValue);
        } catch (error) {
          console.warn(`Failed to parse storage change for ${key}:`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  },

  // URL state management
  getUrlParams: (): URLSearchParams => {
    if (environmentUtils.isServerSide()) return new URLSearchParams();
    
    return new URLSearchParams(window.location.search);
  },

  setUrlParam: (key: string, value: string): void => {
    if (environmentUtils.isServerSide()) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url.toString());
  },

  removeUrlParam: (key: string): void => {
    if (environmentUtils.isServerSide()) return;
    
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState({}, '', url.toString());
  },

  // State validation and cleanup
  validateState: (state: any, schema: any): boolean => {
    try {
      // Basic validation - can be extended with more sophisticated validation
      if (typeof state !== typeof schema) return false;
      
      if (typeof state === 'object' && state !== null) {
        return Object.keys(schema).every(key => key in state);
      }
      
      return true;
    } catch {
      return false;
    }
  },

  // Clean up expired state
  cleanupExpiredState: (keys: string[], maxAge: number = 24 * 60 * 60 * 1000): void => {
    if (environmentUtils.isServerSide()) return;
    
    keys.forEach(key => {
      try {
        const item = localStorage.getItem(`${key}_timestamp`);
        if (item) {
          const timestamp = parseInt(item);
          if (Date.now() - timestamp > maxAge) {
            localStorage.removeItem(key);
            localStorage.removeItem(`${key}_timestamp`);
          }
        }
      } catch (error) {
        console.warn(`Failed to cleanup expired state for ${key}:`, error);
      }
    });
  }
};

export default stateUtils;
