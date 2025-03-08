
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

interface VacationRequest {
  id: string;
  provider_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  provider_name?: string;
}

interface UpdateVacationStatusParams {
  id: string;
  status: 'approved' | 'rejected';
}

export const useProviderVacation = (providerId?: string) => {
  const queryClient = useQueryClient();

  // For development purposes, use a default provider ID if none is provided
  const effectiveProviderId = providerId || 'dev-provider-id';

  // Fetch vacation requests for a specific provider
  const { 
    data: vacationRequests = [], 
    isLoading: isLoadingVacations,
    error: vacationsError
  } = useQuery({
    queryKey: ['providerVacations', effectiveProviderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_vacation_requests')
        .select('*')
        .eq('provider_id', effectiveProviderId);
        
      if (error) throw error;
      return data as VacationRequest[];
    },
    enabled: !!effectiveProviderId,
  });

  // Fetch all vacation requests (for admin)
  const {
    data: allVacationRequests = [],
    isLoading: isLoadingAllVacations,
    error: allVacationsError
  } = useQuery({
    queryKey: ['allVacationRequests'],
    queryFn: async () => {
      // In a real app, you'd want to add security here
      const { data, error } = await supabase
        .from('provider_vacation_requests')
        .select(`
          *,
          service_providers(first_name, last_name)
        `);
        
      if (error) throw error;
      
      // Format the data to include provider name
      return data.map(request => ({
        ...request,
        provider_name: request.service_providers ? 
          `${request.service_providers.first_name} ${request.service_providers.last_name}` : 
          'Unknown Provider'
      })) as VacationRequest[];
    }
  });

  // Submit a new vacation request
  const { mutate: submitVacationRequest } = useMutation({
    mutationFn: async (dateRange: DateRange) => {
      if (!dateRange.from || !effectiveProviderId) {
        throw new Error('Invalid request data');
      }
      
      const { data, error } = await supabase
        .from('provider_vacation_requests')
        .insert({
          provider_id: effectiveProviderId,
          start_date: dateRange.from.toISOString(),
          end_date: (dateRange.to || dateRange.from).toISOString(),
          status: 'pending'
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Vacation request submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['providerVacations', effectiveProviderId] });
    },
    onError: (error) => {
      console.error('Error submitting vacation request:', error);
      toast.error('Failed to submit vacation request');
    }
  });

  // Update vacation request status (for admin)
  const { mutate: updateVacationStatus } = useMutation({
    mutationFn: async ({ id, status }: UpdateVacationStatusParams) => {
      const { data, error } = await supabase
        .from('provider_vacation_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      const action = variables.status === 'approved' ? 'approved' : 'rejected';
      toast.success(`Vacation request ${action}`);
      queryClient.invalidateQueries({ queryKey: ['allVacationRequests'] });
    },
    onError: (error) => {
      console.error('Error updating vacation request:', error);
      toast.error('Failed to update vacation request');
    }
  });

  return {
    vacationRequests,
    isLoadingVacations,
    vacationsError,
    allVacationRequests,
    isLoadingAllVacations,
    allVacationsError,
    submitVacationRequest,
    updateVacationStatus
  };
};
