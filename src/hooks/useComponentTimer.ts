
import { useEffect, useRef } from 'react';
import { performanceMonitor } from '@/utils/performance';

/**
 * Hook to measure component render and mount times
 * @param componentName - Name of the component to measure
 */
export function useComponentTimer(componentName: string) {
  const timerRef = useRef<string>(`${componentName}-render`);
  const mountTimeRef = useRef<number>(performance.now());
  
  // Start timing on initial render
  useEffect(() => {
    const mountDuration = performance.now() - mountTimeRef.current;
    performanceMonitor.startTiming(timerRef.current);
    
    return () => {
      performanceMonitor.endTiming(timerRef.current);
    };
  }, []);
  
  return {
    startTimer: (label: string) => performanceMonitor.startTiming(`${componentName}-${label}`),
    endTimer: (label: string) => performanceMonitor.endTiming(`${componentName}-${label}`)
  };
}

export default useComponentTimer;
