// Image optimization utilities
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  blur?: boolean;
  placeholder?: boolean;
}

export interface OptimizedImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  alt: string;
  width: number;
  height: number;
}

// Generate responsive image sources
export function generateResponsiveImage(
  baseUrl: string,
  options: ImageOptimizationOptions = {}
): OptimizedImage {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    blur = false,
    placeholder = true
  } = options;

  // Generate different sizes for responsive images
  const sizes = [320, 640, 800, 1024, 1280, 1600];
  const srcSet = sizes
    .filter(size => size <= width * 2) // Don't generate sizes larger than 2x the base width
    .map(size => {
      const aspectRatio = height / width;
      const newHeight = Math.round(size * aspectRatio);
      return `${baseUrl}?w=${size}&h=${newHeight}&q=${quality}&f=${format} ${size}w`;
    })
    .join(', ');

  // Generate placeholder if requested
  const placeholderUrl = placeholder && blur
    ? `${baseUrl}?w=20&h=${Math.round(20 * (height / width))}&q=10&f=${format}&blur=5`
    : undefined;

  return {
    src: `${baseUrl}?w=${width}&h=${height}&q=${quality}&f=${format}`,
    srcSet,
    sizes: '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 800px) 800px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1600px',
    placeholder: placeholderUrl,
    alt: '', // Should be provided by the component
    width,
    height
  };
}

// Lazy load image with intersection observer
export function useLazyImage(
  src: string,
  options: ImageOptimizationOptions = {}
): {
  ref: React.RefObject<HTMLImageElement>;
  src: string;
  loaded: boolean;
  error: boolean;
} {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = loaded ? generateResponsiveImage(src, options).src : '';

  return {
    ref,
    src: optimizedSrc,
    loaded,
    error
  };
}

// Preload critical images
export function preloadImage(src: string, options: ImageOptimizationOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const optimizedSrc = generateResponsiveImage(src, options).src;
    
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${optimizedSrc}`));
    img.src = optimizedSrc;
  });
}

// Preload multiple images
export function preloadImages(
  images: Array<{ src: string; options?: ImageOptimizationOptions }>
): Promise<void[]> {
  return Promise.all(
    images.map(({ src, options }) => preloadImage(src, options))
  );
}

// Generate image placeholder
export function generateImagePlaceholder(
  width: number,
  height: number,
  text?: string
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add text if provided
  if (text) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }

  return canvas.toDataURL('image/png');
}

// Image optimization hook
export function useImageOptimization(
  src: string,
  options: ImageOptimizationOptions = {}
) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [optimizedImage, setOptimizedImage] = React.useState<OptimizedImage | null>(null);

  React.useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setError(false);

    try {
      const optimized = generateResponsiveImage(src, options);
      setOptimizedImage(optimized);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  }, [src, JSON.stringify(options)]);

  return {
    optimizedImage,
    isLoading,
    error
  };
}

// WebP support detection
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// AVIF support detection
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABgAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAABoAAAAAFwaXptAAAAAAABAAAAAAAAAQAAABAAAAAAAAAAAAAA';
  });
}

// Get optimal image format
export async function getOptimalImageFormat(): Promise<'webp' | 'avif' | 'jpeg'> {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
}

// React import for hooks
import React from 'react';
