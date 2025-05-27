
/**
 * Environment detection utilities for consistent rendering
 * across different deployment contexts
 */

export const environmentUtils = {
  // Detect if we're in Lovable's internal sandbox
  isLovableSandbox: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.includes('lovable') || 
           window.location.hostname.includes('gptengineer');
  },

  // Detect if we're in a preview/new window context
  isPreviewWindow: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.opener !== null || 
           window.location.search.includes('preview=true') ||
           window.location.hostname !== 'localhost';
  },

  // Get the appropriate base URL for assets
  getAssetBaseUrl: (): string => {
    if (typeof window === 'undefined') return '';
    
    // For Lovable sandbox, use relative paths
    if (environmentUtils.isLovableSandbox()) {
      return '';
    }
    
    // For preview windows, ensure we use the correct origin
    if (environmentUtils.isPreviewWindow()) {
      return window.location.origin;
    }
    
    return '';
  },

  // Resolve image paths based on environment
  resolveImagePath: (imagePath: string): string => {
    if (!imagePath) return '';
    
    // If already absolute, return as-is
    if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
      return imagePath;
    }
    
    const baseUrl = environmentUtils.getAssetBaseUrl();
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    return `${baseUrl}${cleanPath}`;
  },

  // Check if we're in SSR context
  isServerSide: (): boolean => {
    return typeof window === 'undefined';
  },

  // Feature flags based on environment
  features: {
    enableAnimations: (): boolean => {
      if (environmentUtils.isServerSide()) return false;
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    
    enablePreloading: (): boolean => {
      return !environmentUtils.isServerSide();
    }
  }
};

export default environmentUtils;
