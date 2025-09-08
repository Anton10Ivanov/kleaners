'use client'


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Schedule {
  id: string;
  provider_id: string;
  day: string;
  start_time: string;
  end_time: string;
}

export const useProviderSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const fetchSchedule = async (): Promise<Schedule[]> => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please log in again");
        return [];
      }
      
      const { data, error } = await supabase
        .from('provider_schedules')
        .select('*')
        .eq('provider_id', user.id);
        
      if (error) {
        console.error('Error fetching schedule:', error);
        toast.error("Failed to load schedule");
        return [];
      }
      
      setSchedules(data || []);
      return data || [];
    } catch (error) {
      console.error('Error in fetchSchedule:', error);
      toast.error("An error occurred while loading schedule");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const saveSchedule = async (scheduleData: Omit<Schedule, 'id' | 'provider_id'>[]) => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please log in again");
        return false;
      }
      
      // Delete existing schedules
      const { error: deleteError } = await supabase
        .from('provider_schedules')
        .delete()
        .eq('provider_id', user.id);
        
      if (deleteError) {
        console.error('Error deleting existing schedules:', deleteError);
        toast.error("Failed to update schedule");
        return false;
      }
      
      // Insert new schedules
      if (scheduleData.length > 0) {
        const dataWithProvider = scheduleData.map(schedule => ({
          ...schedule,
          provider_id: user.id
        }));
        
        const { error: insertError } = await supabase
          .from('provider_schedules')
          .insert(dataWithProvider);
          
        if (insertError) {
          console.error('Error inserting schedules:', insertError);
          toast.error("Failed to save schedule");
          return false;
        }
      }
      
      toast.success("Schedule updated successfully");
      return true;
    } catch (error) {
      console.error('Error in saveSchedule:', error);
      toast.error("An error occurred while saving schedule");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    schedules,
    fetchSchedule,
    saveSchedule
  };
};
