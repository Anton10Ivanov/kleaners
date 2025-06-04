
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export const useMobileOptimizations = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(hasTouch);
  }, []);

  // Mobile-optimized spacing
  const getMobileSpacing = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    if (!isMobile) {
      const spacingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8', xl: 'p-12' };
      return spacingMap[size];
    }
    
    const mobileSpacingMap = { sm: 'p-2', md: 'p-3', lg: 'p-4', xl: 'p-6' };
    return mobileSpacingMap[size];
  };

  // Mobile-optimized text sizes
  const getMobileTextSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    if (!isMobile) {
      const textMap = { sm: 'text-sm', md: 'text-base', lg: 'text-lg', xl: 'text-xl' };
      return textMap[size];
    }
    
    const mobileTextMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base', xl: 'text-lg' };
    return mobileTextMap[size];
  };

  // Mobile-optimized button sizing
  const getMobileButtonSize = (size: 'sm' | 'md' | 'lg') => {
    if (!isMobile) {
      const buttonMap = { sm: 'h-9 px-3', md: 'h-10 px-4', lg: 'h-11 px-8' };
      return buttonMap[size];
    }
    
    const mobileButtonMap = { sm: 'h-10 px-3', md: 'h-12 px-4', lg: 'h-14 px-6' };
    return mobileButtonMap[size];
  };

  // Animation preferences
  const getAnimationDuration = (duration: 'fast' | 'normal' | 'slow') => {
    if (prefersReducedMotion) return '0ms';
    
    const durationMap = { fast: '150ms', normal: '300ms', slow: '500ms' };
    return durationMap[duration];
  };

  return {
    isMobile,
    isTablet,
    touchDevice,
    prefersReducedMotion,
    getMobileSpacing,
    getMobileTextSize,
    getMobileButtonSize,
    getAnimationDuration,
  };
};
