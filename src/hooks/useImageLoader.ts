
import { useState, useEffect, useCallback } from 'react';
import environmentUtils from '@/utils/environment';

interface UseImageLoaderOptions {
  fallbackSrc?: string;
  preload?: boolean;
  onLoad?: () => void;
  onError?: (error: Event) => void;
}

export const useImageLoader = (src: string, options: UseImageLoaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState<string>('');

  const { fallbackSrc, preload = true, onLoad, onError } = options;

  // Resolve the image path based on environment
  useEffect(() => {
    if (!src) return;
    
    const resolved = environmentUtils.resolveImagePath(src);
    setResolvedSrc(resolved);
    
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Preload image if enabled
  useEffect(() => {
    if (!resolvedSrc || !preload || environmentUtils.isServerSide()) return;

    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setHasError(false);
      onLoad?.();
    };
    
    const handleError = (event: Event) => {
      setHasError(true);
      setIsLoaded(false);
      onError?.(event);
      
      // Try fallback if available
      if (fallbackSrc && fallbackSrc !== resolvedSrc) {
        const fallbackResolved = environmentUtils.resolveImagePath(fallbackSrc);
        setResolvedSrc(fallbackResolved);
      }
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = resolvedSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [resolvedSrc, preload, fallbackSrc, onLoad, onError]);

  const retry = useCallback(() => {
    setHasError(false);
    setIsLoaded(false);
    
    // Force reload by changing the src slightly
    if (resolvedSrc) {
      const url = new URL(resolvedSrc, window.location.origin);
      url.searchParams.set('retry', Date.now().toString());
      setResolvedSrc(url.toString());
    }
  }, [resolvedSrc]);

  return {
    src: resolvedSrc,
    isLoaded,
    hasError,
    retry
  };
};

export default useImageLoader;
