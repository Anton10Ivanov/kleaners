
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';

export interface VacationRequest {
  id: string;
  provider_id: string;
  provider_name?: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const useProviderVacation = (providerId?: string) => {
  const queryClient = useQueryClient();
  
  // Get vacation requests for a specific provider
  const getProviderVacationRequests = async () => {
    if (!providerId) return [];
    
    const { data, error } = await supabase
      .from('provider_vacation_requests')
      .select('*')
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as VacationRequest[];
  };
  
  // Create a vacation request
  const createVacationRequest = async (dateRange: DateRange) => {
    if (!providerId || !dateRange.from || !dateRange.to) {
      throw new Error('Invalid vacation request data');
    }
    
    const { data, error } = await supabase
      .from('provider_vacation_requests')
      .insert({
        provider_id: providerId,
        start_date: dateRange.from.toISOString(),
        end_date: dateRange.to.toISOString(),
        status: 'pending'
      })
      .select();
      
    if (error) throw error;
    return data[0] as VacationRequest;
  };
  
  // Get all vacation requests (admin only)
  const getAllVacationRequests = async () => {
    const { data, error } = await supabase
      .from('provider_vacation_requests')
      .select(`
        id,
        provider_id,
        start_date,
        end_date,
        status,
        created_at
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Get provider names
    if (data && data.length > 0) {
      const providerIds = [...new Set(data.map(req => req.provider_id))];
      
      const { data: providersData, error: providersError } = await supabase
        .from('service_providers')
        .select('id, first_name, last_name')
        .in('id', providerIds);
        
      if (providersError) {
        console.error("Error fetching provider names:", providersError);
      }
      
      // Map provider names to vacation requests
      return data.map(request => {
        const provider = providersData?.find(p => p.id === request.provider_id);
        return {
          ...request,
          provider_name: provider ? `${provider.first_name} ${provider.last_name}` : 'Unknown Provider'
        };
      }) as VacationRequest[];
    }
    
    return [] as VacationRequest[];
  };
  
  // Update vacation request status (admin only)
  const updateVacationRequestStatus = async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
    const { data, error } = await supabase
      .from('provider_vacation_requests')
      .update({ status })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data[0] as VacationRequest;
  };
  
  // Query hook for provider's vacation requests
  const providerVacationsQuery = useQuery({
    queryKey: ['provider-vacations', providerId],
    queryFn: getProviderVacationRequests,
    enabled: !!providerId,
  });
  
  // Query hook for all vacation requests (admin)
  const allVacationsQuery = useQuery({
    queryKey: ['admin-vacations'],
    queryFn: getAllVacationRequests,
  });
  
  // Mutation for creating vacation request
  const createVacationMutation = useMutation({
    mutationFn: createVacationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-vacations', providerId] });
      toast.success('Vacation request submitted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to submit vacation request: ${error.message}`);
    },
  });
  
  // Mutation for updating vacation request status
  const updateVacationStatusMutation = useMutation({
    mutationFn: updateVacationRequestStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-vacations'] });
      toast.success(`Vacation request ${data.status}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update vacation request: ${error.message}`);
    },
  });
  
  return {
    // Provider specific
    providerVacations: providerVacationsQuery.data || [],
    isLoadingProviderVacations: providerVacationsQuery.isLoading,
    providerVacationError: providerVacationsQuery.error,
    submitVacationRequest: createVacationMutation.mutate,
    
    // Admin specific
    allVacationRequests: allVacationsQuery.data || [],
    isLoadingAllVacations: allVacationsQuery.isLoading,
    allVacationsError: allVacationsQuery.error,
    updateVacationStatus: updateVacationStatusMutation.mutate,
  };
};
