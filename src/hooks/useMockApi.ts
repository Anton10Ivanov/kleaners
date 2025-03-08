
import { http } from 'msw';
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
  
  // Extended functionality for DevTools component
  const isAvailable = () => dev;
  const isEnabled = () => isMockActive();
  const toggleMockApi = () => {
    if (!dev) return;
    
    const url = new URL(window.location.href);
    if (url.searchParams.has('mock')) {
      url.searchParams.delete('mock');
    } else {
      url.searchParams.set('mock', 'true');
    }
    window.location.href = url.toString();
  };
  
  return {
    registerMock,
    isMockActive,
    isAvailable,
    isEnabled,
    toggleMockApi
  };
};

export default useMockApi;
