import { environmentUtils } from "@/utils/environment";
import { PerformanceMonitor } from './core-monitor';
import routerUtils from '@/utils/router';
import styleUtils from '@/utils/styles';
import scriptUtils from '@/utils/scripts';

// Create a singleton instance of the performance monitor
export const performanceMonitor = new PerformanceMonitor();

// Export the class for advanced usage
export { PerformanceMonitor } from './core-monitor';
export * from './types';
export * from './operation-utils';
export * from './reporting';

// Performance monitoring disabled to prevent blocking React rendering
// This was causing white screen issues by blocking the main application

