
import { supabase } from '@/integrations/supabase/client';
import { ServiceArea, ServiceAreaFormValues } from '@/types/serviceAreas';

export const fetchServiceAreas = async (): Promise<ServiceArea[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not found, please login again");
  }
  
  const { data, error } = await supabase
    .from('provider_service_areas')
    .select('*')
    .eq('provider_id', user.id);
    
  if (error) {
    throw error;
  }
  
  return data || [];
};

export const addServiceArea = async (values: ServiceAreaFormValues): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not found, please login again");
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
  
  return true;
};

export const removeServiceArea = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('provider_service_areas')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
  
  return true;
};
