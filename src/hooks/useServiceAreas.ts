
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ServiceArea, ServiceAreaFormValues } from '@/types/serviceAreas';
import { fetchServiceAreas, addServiceArea, removeServiceArea } from '@/services/serviceAreasService';

export const useServiceAreas = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServiceAreas();
  }, []);

  const loadServiceAreas = async () => {
    try {
      setLoading(true);
      const areas = await fetchServiceAreas();
      setServiceAreas(areas);
    } catch (error) {
      console.error('Error loading service areas:', error);
      toast.error('Failed to load service areas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddServiceArea = async (values: ServiceAreaFormValues) => {
    try {
      setLoading(true);
      await addServiceArea(values);
      toast.success('Service area added successfully');
      await loadServiceAreas();
    } catch (error) {
      console.error('Error adding service area:', error);
      toast.error('Failed to add service area');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveServiceArea = async (id: string) => {
    try {
      setLoading(true);
      await removeServiceArea(id);
      toast.success('Service area removed successfully');
      setServiceAreas(serviceAreas.filter(area => area.id !== id));
    } catch (error) {
      console.error('Error removing service area:', error);
      toast.error('Failed to remove service area');
    } finally {
      setLoading(false);
    }
  };

  return {
    serviceAreas,
    loading,
    addServiceArea: handleAddServiceArea,
    removeServiceArea: handleRemoveServiceArea,
    refreshServiceAreas: loadServiceAreas
  };
};
