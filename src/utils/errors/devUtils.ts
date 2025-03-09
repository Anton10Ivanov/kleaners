
/**
 * Developer debugging utility - logs debug information during development
 */
export const devDebug = (context: string, data: unknown, type: 'log' | 'info' | 'warn' | 'error' = 'log') => {
  if (import.meta.env.DEV) {
    const prefix = `[DEV-DEBUG][${context}]`;
    switch (type) {
      case 'info':
        console.info(prefix, data);
        break;
      case 'warn':
        console.warn(prefix, data);
        break;
      case 'error':
        console.error(prefix, data);
        break;
      case 'log':
      default:
        console.log(prefix, data);
    }
  }
};

/**
 * Utility for measuring performance of operations during development
 */
export const measurePerformance = (name: string, operation: () => any) => {
  if (import.meta.env.DEV) {
    console.time(`[PERF][${name}]`);
    const result = operation();
    console.timeEnd(`[PERF][${name}]`);
    return result;
  }
  return operation();
};
