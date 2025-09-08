
import { useToast } from '@/hooks/use-toast';
import { 
  UseQueryOptions, 
  useQuery, 
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query';

/**
 * Configuration options for useApiQuery hook
 * @template TData The type of data returned by the query
 
export interface UseApiQueryOptions<TData> {
  /** Unique query key for caching 
  queryKey: string[];
  
  /** Function that fetches the data 
  queryFn: () => Promise<TData>;
  
  /** Initial data to use before the query resolves 
  initialData?: TData;
  
  /** Whether to automatically refetch on window focus 
  refetchOnWindowFocus?: boolean;
  
  /** How long the data should be considered fresh (in ms) 
  staleTime?: number;
  
  /** Whether to retry failed queries 
  retry?: boolean | number;
  
  /** Custom error handler 
  onErrorHandler?: (error: Error) => void;
  
  /** Whether to enable the query 
  enabled?: boolean;
}

/**
 * Custom hook for data fetching with standardized error handling and toast notifications
 * 
 * @template TData The type of data returned by the query
 * @param {UseApiQueryOptions<TData>} options Configuration options
 * @returns {UseQueryResult<TData, Error>} Query result with data and status
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useApiQuery({
 *   queryKey: ['users', userId],
 *   queryFn: () => fetchUserById(userId),
 *   onErrorHandler: (error) => console.error('Custom error handling:', error)
 * });
 * ```
 
export function useApiQuery<TData>(
  options: UseApiQueryOptions<TData>
): UseQueryResult<TData, Error> {
  const { toast } = useToast();
  const { 
    queryKey, 
    queryFn, 
    initialData, 
    refetchOnWindowFocus = false,
    staleTime = 5 * 60 * 1000, // 5 minutes default
    retry = 1,
    onErrorHandler,
    enabled = true
  } = options;

  // Create the query options for @tanstack/react-query
  const queryOptions: UseQueryOptions<TData, Error, TData, QueryKey> = {
    queryKey,
    queryFn,
    initialData,
    refetchOnWindowFocus,
    staleTime,
    retry,
    enabled,
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
    
    meta: {
      onError: (error: Error) => {
        // Show a toast notification
        toast({
          title: "Error",
          description: error.message || "An error occurred fetching data",
          variant: "destructive",
        });
        
        // Call the custom error handler if provided
        if (onErrorHandler) {
          onErrorHandler(error);
        }
      }
    }
  };

  return useQuery(queryOptions);
}
