
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Schedule {
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export const useProviderSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveSchedule = async (schedules: Schedule[]) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // First delete existing schedules for this provider
      await supabase
        .from('provider_schedules')
        .delete()
        .eq('provider_id', user.id);

      // Insert new schedules
      const { error } = await supabase
        .from('provider_schedules')
        .insert(
          schedules.map(schedule => ({
            provider_id: user.id,
            ...schedule
          }))
        );

      if (error) throw error;
      
      toast.success('Schedule saved successfully');
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('Failed to save schedule');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchedule = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('provider_schedules')
        .select('*')
        .eq('provider_id', user.id);

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast.error('Failed to fetch schedule');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { saveSchedule, fetchSchedule, isLoading };
};
