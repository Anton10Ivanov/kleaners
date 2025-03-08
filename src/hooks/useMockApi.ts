
import { setupWorker, http } from 'msw';
import { dev } from '@/lib/utils';

/**
 * A hook to facilitate working with MSW for API mocking
 */
export const useMockApi = () => {
  /**
   * Register a new mock API endpoint
   */
  const registerMock = (method: string, url: string, responseData: any) => {
    if (!dev) {
      console.warn('Mock APIs can only be registered in development mode');
      return;
    }
    
    // In a real implementation, you would integrate this with your MSW worker
    console.log(`Registered mock ${method} handler for ${url}`);
  };
  
  /**
   * Check if MSW is active
   */
  const isMockActive = () => {
    return dev && window.location.search.includes('mock=true');
  };
  
  return {
    registerMock,
    isMockActive
  };
};

export default useMockApi;
