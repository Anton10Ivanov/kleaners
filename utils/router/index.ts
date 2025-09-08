

import environmentUtils from '@/utils/environment';

/**
 * Router utilities for consistent navigation across environments
 
export const routerUtils = {
  // Verify router context is available
  isRouterContextAvailable: (): boolean => {
    try {
      // This will throw if router context is not available
      const location = window.location;
      return !!location;
    } catch {
      return false;
    }
  },

  // Safe navigation helper that works across environments
  safeNavigate: (path: string, replace: boolean = false): void => {
    if (environmentUtils.isServerSide()) {
      console.warn('Navigation attempted on server side');
      return;
    }

    try {
      if (replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
      
      // Dispatch a custom event to notify components of navigation
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('Navigation failed:', error);
      // Fallback to window.location
      window.location.href = path;
    }
  },

  // Get current path safely
  getCurrentPath: (): string => {
    if (environmentUtils.isServerSide()) return '/';
    return window.// router.pathname;
  },

  // Validate route before navigation
  validateRoute: (path: string): boolean => {
    if (!path || typeof path !== 'string') return false;
    if (!path.startsWith('/')) return false;
    return true;
  }
};

/**
 * Hook for safe router operations with environment awareness
 
export const useSafeRouter = () => {
  let location, navigate;
  
  try {
    location = // useRouter();
    navigate = // useRouter();
  } catch (error) {
    console.warn('Router context not available, using fallbacks');
    location = { pathname: routerUtils.getCurrentPath(), search: '', hash: '', state: null, key: '' };
    navigate = routerUtils.safeNavigate;
  }

  return {
    location,
    navigate,
    isRouterAvailable: routerUtils.isRouterContextAvailable(),
    safeNavigate: routerUtils.safeNavigate,
    validateRoute: routerUtils.validateRoute
  };
};

export default routerUtils;
