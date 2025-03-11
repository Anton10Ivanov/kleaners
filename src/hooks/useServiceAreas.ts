
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceArea {
  id: string;
  provider_id: string;
  postal_code: string;
  travel_distance: number;
  created_at: string;
}

export interface ServiceAreaFormValues {
  postal_code: string;
  travel_distance: number;
}

export const useServiceAreas = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServiceAreas = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please login again");
        return;
      }
      
      const { data: areasData, error: areasError } = await supabase
        .from('provider_service_areas')
        .select('*')
        .eq('provider_id', user.id);
        
      if (!areasError && areasData) {
        setServiceAreas(areasData);
      } else if (areasError) {
        console.error("Error fetching service areas:", areasError);
      }
    } catch (error) {
      console.error("Error fetching service areas:", error);
      toast.error("Failed to load service areas");
    } finally {
      setLoading(false);
    }
  };

  const addServiceArea = async (values: ServiceAreaFormValues) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please login again");
        return;
      }
      
      const { error } = await supabase
        .from('provider_service_areas')
        .insert({
          provider_id: user.id,
          postal_code: values.postal_code,
          travel_distance: values.travel_distance,
        });
        
      if (error) {
        throw error;
      }
      
      toast.success("Service area added");
      await fetchServiceAreas();
      return true;
    } catch (error) {
      console.error("Error adding service area:", error);
      toast.error("Failed to add service area");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeServiceArea = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('provider_service_areas')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast.success("Service area removed");
      await fetchServiceAreas();
      return true;
    } catch (error) {
      console.error("Error removing service area:", error);
      toast.error("Failed to remove service area");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceAreas();
  }, []);

  return {
    serviceAreas,
    loading,
    fetchServiceAreas,
    addServiceArea,
    removeServiceArea
  };
};
