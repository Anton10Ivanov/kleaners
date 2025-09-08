
import environmentUtils from '@/utils/environment';

/**
 * Optimized Animation utilities - CSS-based animations only
 * Phase 2: Removed framer-motion dependency for performance
 
export const animationUtils = {
  // Check if animations should be enabled
  shouldEnableAnimations: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
    
    return true;
  },

  // Get animation class for essential animations only
  getAnimationClass: (type: 'page' | 'modal' | 'none' = 'none'): string => {
    if (!animationUtils.shouldEnableAnimations()) return '';
    
    switch (type) {
      case 'page':
        return 'page-transition';
      case 'modal':
        return 'modal-transition';
      default:
        return '';
    }
  },

  // Get safe CSS props (removes animation classes if disabled)
  getSafeProps: (props: any = {}) => {
    const animationsEnabled = animationUtils.shouldEnableAnimations();
    
    if (!animationsEnabled) {
      // Remove animation classes when disabled
      const { className, ...safeProps } = props;
      if (className) {
        const filteredClassName = className
          .split(' ')
          .filter((cls: string) => !cls.includes('animate-') && !cls.includes('transition-'))
          .join(' ');
        return { ...safeProps, className: filteredClassName };
      }
      return safeProps;
    }
    
    return props;
  }
};

export default animationUtils;
