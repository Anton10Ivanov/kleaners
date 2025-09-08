
// Mock service worker browser setup
export const worker = {
  start: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  resetHandlers: () => {},
  use: () => {}
};

// Export function for checking if MSW is active
export const isMockServiceWorkerActive = (): boolean => {
  return false; // Mock implementation
};

export default worker;
