
import { useState, useEffect } from 'react';
import { dev } from '@/lib/utils';

/**
 * Example hook demonstrating how to use MSW with a typical data fetch pattern
 */
export function useUserExampleData() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // This request will be intercepted by MSW in development
      const response = await fetch('/api/profile');
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      dev.log('Data fetched successfully (intercepted by MSW if enabled)', result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(new Error(errorMessage));
      dev.log('Error fetching data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}
