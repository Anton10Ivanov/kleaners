
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

/**
 * Configuration for API query
 */
interface UseApiQueryConfig<TData, TVariables> {
  /**
   * Unique key for the query
   */
  queryKey: QueryKey;
  
  /**
   * Function to fetch data
   */
  fetchFn: () => Promise<TData>;
  
  /**
   * Function to update data (optional)
   */
  updateFn?: (variables: TVariables) => Promise<TData>;
  
  /**
   * Success message for updates
   */
  successMessage?: string;
  
  /**
   * Error message for fetch failures
   */
  fetchErrorMessage?: string;
  
  /**
   * Error message for update failures
   */
  updateErrorMessage?: string;
}

/**
 * useApiQuery hook
 * 
 * A reusable hook for implementing consistent data fetching and mutation patterns
 * with React Query across the application.
 * 
 * @template TData - The type of data returned by the API
 * @template TVariables - The type of variables passed to the update function
 * @param {UseApiQueryConfig<TData, TVariables>} config - Configuration for the API query
 * @returns Object with data, loading states, and methods to interact with the API
 */
export function useApiQuery<TData, TVariables = unknown>({
  queryKey,
  fetchFn,
  updateFn,
  successMessage = "Operation successful",
  fetchErrorMessage = "Failed to load data",
  updateErrorMessage = "Failed to update data"
}: UseApiQueryConfig<TData, TVariables>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query hook
  const query = useQuery({
    queryKey,
    queryFn: fetchFn,
    onError: (error: Error) => {
      console.error(`Error fetching data for ${queryKey}:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: fetchErrorMessage
      });
    }
  });

  // Mutation hook (only if updateFn is provided)
  const mutation = updateFn ? useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      // Invalidate the query to refetch fresh data
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: successMessage
      });
    },
    onError: (error: Error) => {
      console.error(`Error updating data for ${queryKey}:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: updateErrorMessage
      });
    }
  }) : null;

  return {
    // Query results
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    
    // Mutation results (if available)
    update: mutation?.mutate,
    isUpdating: mutation?.isPending,
    
    // Utility function to manually update the cached data
    setData: (data: TData) => queryClient.setQueryData(queryKey, data)
  };
}
