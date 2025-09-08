import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Optimized React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time - how long data stays in cache after becoming unused
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error.status)) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch configuration
      refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
      refetchOnReconnect: true,    // Refetch when connection is restored
      refetchOnMount: true,        // Always refetch on component mount
      
      // Network mode - continue showing cached data when offline
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      
      // Network mode for mutations
      networkMode: 'online',
      
      // Global mutation error handler
      onError: (error: any) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// Enhanced query key factory for consistent caching
export const queryKeys = {
  // User-related queries
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  
  // Client-related queries
  clients: {
    all: ['clients'] as const,
    lists: () => [...queryKeys.clients.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.clients.lists(), { filters }] as const,
    details: () => [...queryKeys.clients.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.clients.details(), id] as const,
  },
  
  // Provider-related queries
  providers: {
    all: ['providers'] as const,
    lists: () => [...queryKeys.providers.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.providers.lists(), { filters }] as const,
    details: () => [...queryKeys.providers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.providers.details(), id] as const,
    verification: (id: string) => [...queryKeys.providers.detail(id), 'verification'] as const,
  },
  
  // Booking-related queries
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.bookings.lists(), { filters }] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
    stats: () => [...queryKeys.bookings.all, 'stats'] as const,
  },
  
  // Service-related queries
  services: {
    all: ['services'] as const,
    lists: () => [...queryKeys.services.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.services.lists(), { filters }] as const,
    categories: () => [...queryKeys.services.all, 'categories'] as const,
  },
} as const;

// Prefetch utilities for common data
export const prefetchQueries = {
  // Prefetch user data on app start
  prefetchUserData: async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(userId),
      queryFn: () => {
        // This would be replaced with actual API call
        return Promise.resolve(null);
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  },
  
  // Prefetch dashboard data
  prefetchDashboardData: async () => {
    const prefetchPromises = [
      queryClient.prefetchQuery({
        queryKey: queryKeys.bookings.stats(),
        queryFn: () => Promise.resolve(null),
        staleTime: 2 * 60 * 1000, // 2 minutes for stats
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.bookings.lists(),
        queryFn: () => Promise.resolve(null),
        staleTime: 5 * 60 * 1000,
      }),
    ];
    
    await Promise.allSettled(prefetchPromises);
  },
};

// Cache invalidation utilities
export const invalidateQueries = {
  // Invalidate all user-related data
  invalidateUserData: (userId?: string) => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    }
  },
  
  // Invalidate booking data
  invalidateBookings: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
  },
  
  // Invalidate provider data
  invalidateProviders: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.providers.all });
  },
};

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};

// Export the query client for direct access when needed
export { queryClient };
