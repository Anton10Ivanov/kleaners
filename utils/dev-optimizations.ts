
// Development optimizations for better live preview
if (import.meta.env.DEV) {
  // Disable React StrictMode in development for better performance
  // (Uncomment if you experience double-rendering issues)
  // window.__REACT_STRICT_MODE__ = false;
  
  // Enable performance monitoring in development
  if (typeof window !== 'undefined') {
    window.__DEV_PERFORMANCE__ = true;
  }
  
  // Optimize console logging in development
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    if (args[0]?.includes?.('Service Worker')) return;
    originalConsoleLog(...args);
  };
}
