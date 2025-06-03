
// Mock service worker browser setup
export const worker = {
  start: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  resetHandlers: () => {},
  use: () => {}
};

export default worker;
