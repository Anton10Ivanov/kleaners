
import { useState, useEffect } from 'react';
import { http } from 'msw';
import { dev } from '@/lib/utils';

// Example of how to use MSW for mocking API calls
export const useMswExample = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from API or mock
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add mock handler (this would typically be in a separate file)
  const addMockHandler = (mockHandler: any) => {
    if (dev) {
      // In a real app, you would add this to your MSW worker
      console.log('Added mock handler:', mockHandler);
    }
  };

  return { data, loading, error, addMockHandler };
};
