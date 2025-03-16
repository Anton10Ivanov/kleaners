
import { lazy, ComponentType, Suspense, useEffect, useRef } from 'react';
import { SectionLoading } from '@/components/ui/section-loading';
import { performanceMonitor } from '@/utils/performance-monitor';

/**
 * Custom hook that combines lazy loading with performance monitoring
 * 
 * @param componentName - Name of the component for tracking
 * @param importFunc - Dynamic import function for the component
 * @param fallback - Optional custom loading component
 * @returns The lazy loaded component wrapped in a Suspense with performance tracking
 */
export function useLazyComponentTimer<T extends ComponentType<any>>(
  componentName: string,
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <SectionLoading />
) {
  // Create lazy component
  const LazyComponent = lazy(() => {
    // Start timing when import begins
    performanceMonitor.startTiming(`${componentName}-import`);
    
    return importFunc().then(module => {
      // End timing when import completes
      performanceMonitor.endTiming(`${componentName}-import`);
      return module;
    });
  });
  
  // Return a component that includes Suspense and timing logic
  return (props: React.ComponentProps<T>) => {
    const mountedRef = useRef(false);
    const renderTimerKey = `${componentName}-render`;
    
    // Track initial render time
    useEffect(() => {
      if (!mountedRef.current) {
        performanceMonitor.endTiming(renderTimerKey);
        mountedRef.current = true;
      }
      
      return () => {
        mountedRef.current = false;
      };
    }, [renderTimerKey]);
    
    // Start render timer
    performanceMonitor.startTiming(renderTimerKey);
    
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default useLazyComponentTimer;
