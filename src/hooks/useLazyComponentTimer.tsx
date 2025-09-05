
import { lazy, ComponentType, Suspense } from 'react';
import { performanceMonitor } from '@/utils/performance';
import { SectionLoading } from '@/components/ui/section-loading';

/**
 * Custom hook for lazy loading components with built-in performance tracking
 * 
 * @param importFunc - Dynamic import function for the component
 * @param componentName - Name of the component for tracking
 * @param fallback - Optional custom loading component
 * @returns The lazy loaded component wrapped in a Suspense
 */
export function useLazyComponentTimer<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string,
  fallback: React.ReactNode = <SectionLoading />
) {
  // Track import performance
  const timerKey = `${componentName}-import`;
  
  // Create a wrapper around the import function to measure performance
  const timedImport = async () => {
    performanceMonitor.startTiming(timerKey);
    try {
      const module = await importFunc();
      return module;
    } finally {
      performanceMonitor.endTiming(timerKey);
    }
  };
  
  // Create the lazy component with performance tracking
  const LazyComponent = lazy(timedImport);
  
  // Return a component that includes the Suspense boundary
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default useLazyComponentTimer;
