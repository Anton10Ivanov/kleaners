import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { queryKeys } from '@/providers/QueryProvider';

// Generic optimized query hook with better caching and error handling
export function useOptimizedQuery<TData, TError = Error>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Partial<UseQueryOptions<TData, TError>>
) {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors except 408, 429
      if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error.status)) {
        return false;
      }
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
}

// Optimized mutation hook with better error handling and cache invalidation
export function useOptimizedMutation<TData, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
    invalidateQueries?: readonly unknown[][];
    successMessage?: string;
    errorMessage?: string;
  } & Partial<UseMutationOptions<TData, TError, TVariables>>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Show success toast if message provided
      if (options?.successMessage) {
        toast({
          title: 'Success',
          description: options.successMessage,
        });
      }
      
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom success handler
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      // Show error toast
      const errorMessage = options?.errorMessage || 'An error occurred';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
      
      // Call custom error handler
      options?.onError?.(error, variables);
    },
    retry: 1,
    ...options,
  });
}

// Optimized clients hook using the new pattern
export function useOptimizedClients() {
  const queryClient = useQueryClient();
  
  const { data: clients = [], isLoading, error } = useOptimizedQuery(
    queryKeys.clients.all,
    async () => {
      // This would be replaced with actual Supabase call
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes for frequently changing data
    }
  );
  
  const createClient = useOptimizedMutation(
    async (clientData: any) => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('clients')
        .insert(clientData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    {
      successMessage: 'Client created successfully',
      errorMessage: 'Failed to create client',
      invalidateQueries: [queryKeys.clients.all],
    }
  );
  
  const updateClient = useOptimizedMutation(
    async ({ id, ...clientData }: any) => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    {
      successMessage: 'Client updated successfully',
      errorMessage: 'Failed to update client',
      invalidateQueries: [queryKeys.clients.all],
    }
  );
  
  const deleteClient = useOptimizedMutation(
    async (id: string) => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    {
      successMessage: 'Client deleted successfully',
      errorMessage: 'Failed to delete client',
      invalidateQueries: [queryKeys.clients.all],
    }
  );
  
  return {
    clients,
    isLoading,
    error,
    createClient: createClient.mutate,
    updateClient: updateClient.mutate,
    deleteClient: deleteClient.mutate,
    isCreating: createClient.isPending,
    isUpdating: updateClient.isPending,
    isDeleting: deleteClient.isPending,
  };
}

// Optimized providers hook
export function useOptimizedProviders() {
  const { data: providers = [], isLoading, error } = useOptimizedQuery(
    queryKeys.providers.all,
    async () => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  );
  
  const updateProvider = useOptimizedMutation(
    async ({ id, ...providerData }: any) => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('service_providers')
        .update(providerData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    {
      successMessage: 'Provider updated successfully',
      errorMessage: 'Failed to update provider',
      invalidateQueries: [queryKeys.providers.all],
    }
  );
  
  return {
    providers,
    isLoading,
    error,
    updateProvider: updateProvider.mutate,
    isUpdating: updateProvider.isPending,
  };
}

// Optimized bookings hook with advanced filtering
export function useOptimizedBookings(filters: Record<string, any> = {}) {
  const { data: bookings = [], isLoading, error } = useOptimizedQuery(
    queryKeys.bookings.list(filters),
    async () => {
      const { supabase } = await import('@/integrations/supabase/client');
      let query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.dateFrom) {
        query = query.gte('created_at', filters.dateFrom);
      }
      if (filters.dateTo) {
        query = query.lte('created_at', filters.dateTo);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    {
      staleTime: 1 * 60 * 1000, // 1 minute for real-time data
    }
  );
  
  const updateBookingStatus = useOptimizedMutation(
    async ({ id, status }: { id: string; status: string }) => {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    {
      successMessage: 'Booking status updated successfully',
      errorMessage: 'Failed to update booking status',
      invalidateQueries: [
        queryKeys.bookings.all,
        queryKeys.bookings.stats(),
      ],
    }
  );
  
  return {
    bookings,
    isLoading,
    error,
    updateBookingStatus: updateBookingStatus.mutate,
    isUpdatingStatus: updateBookingStatus.isPending,
  };
}
