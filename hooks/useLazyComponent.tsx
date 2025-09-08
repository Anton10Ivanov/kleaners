
import { lazy, ComponentType, Suspense } from 'react';
import { SectionLoading } from '@/components/ui/section-loading';

/**
 * Custom hook for lazy loading components with a consistent loading state
 * 
 * @param importFunc - Dynamic import function for the component
 * @param fallback - Optional custom loading component
 * @returns The lazy loaded component wrapped in a Suspense
 
export function useLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <SectionLoading />
) {
  const LazyComponent = lazy(importFunc);
  
  // Return a component that includes the Suspense boundary
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default useLazyComponent;
