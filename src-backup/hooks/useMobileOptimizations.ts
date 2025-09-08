
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * Mobile detection hook with temporary legacy functions
 * These functions will be deprecated in favor of unified responsive design
 */
export const useMobileOptimizations = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(hasTouch);
  }, []);

  // Temporary legacy functions - use standard Tailwind responsive classes instead
  const getMobileSpacing = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    return `card-spacing-xs sm:card-spacing-sm md:card-spacing-md lg:card-spacing-lg`; // Unified responsive spacing
  };

  const getMobileTextSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    return `text-sm sm:text-base md:text-lg lg:text-xl`; // Unified responsive text
  };

  const getMobileButtonSize = (size: 'sm' | 'md' | 'lg') => {
    return `h-10 px-4 sm:h-11 sm:px-6`; // Unified responsive buttons
  };

  return {
    isMobile,
    isTablet,
    touchDevice,
    prefersReducedMotion,
    getMobileSpacing,
    getMobileTextSize,
    getMobileButtonSize,
  };
};
