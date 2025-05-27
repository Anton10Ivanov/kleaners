
import environmentUtils from '@/utils/environment';

/**
 * Animation utilities with fallbacks for Framer Motion reliability
 */
export const animationUtils = {
  // Check if Framer Motion is available
  isFramerMotionAvailable: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    try {
      // Check if Framer Motion is loaded
      return typeof window !== 'undefined' && 
             'React' in window && 
             document.querySelector('script[src*="framer-motion"]') !== null;
    } catch {
      return false;
    }
  },

  // Check if animations should be enabled
  shouldEnableAnimations: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
    
    // Check if device has sufficient performance
    const hasPerformance = 'requestAnimationFrame' in window && 
                          'performance' in window;
    
    return hasPerformance && animationUtils.isFramerMotionAvailable();
  },

  // Get safe animation variants
  getSafeVariants: (variants: any) => {
    if (!animationUtils.shouldEnableAnimations()) {
      // Return static variants when animations are disabled
      return {
        initial: {},
        animate: {},
        exit: {}
      };
    }
    
    return variants;
  },

  // Safe animation props with fallbacks
  getSafeAnimationProps: (props: any = {}) => {
    const animationsEnabled = animationUtils.shouldEnableAnimations();
    
    if (!animationsEnabled) {
      // Return props without animation when disabled
      const { initial, animate, exit, transition, variants, ...safeProps } = props;
      return safeProps;
    }
    
    return props;
  },

  // Monitor animation performance
  monitorAnimationPerformance: (): void => {
    if (environmentUtils.isServerSide()) return;
    
    let animationCount = 0;
    const startTime = performance.now();
    
    // Monitor animation frame rate
    const checkPerformance = () => {
      animationCount++;
      
      if (animationCount % 60 === 0) { // Check every 60 frames
        const currentTime = performance.now();
        const fps = 60000 / (currentTime - startTime);
        
        if (fps < 30) {
          console.warn('Animation performance degraded, consider reducing motion');
        }
      }
      
      if (animationCount < 600) { // Monitor for 10 seconds at 60fps
        requestAnimationFrame(checkPerformance);
      }
    };
    
    requestAnimationFrame(checkPerformance);
  }
};

export default animationUtils;
