'use client'


import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ServiceArea, ServiceAreaFormValues } from '@/types/serviceAreas';
import { fetchServiceAreas as fetchAreas, addServiceArea as addArea, removeServiceArea as removeArea } from '@/services/serviceAreasService';

// Re-export the types for backward compatibility
export type { ServiceArea, ServiceAreaFormValues };

export const useServiceAreas = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServiceAreas = async () => {
    try {
      setLoading(true);
      const areasData = await fetchAreas();
      setServiceAreas(areasData);
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
      await addArea(values);
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
      await removeArea(id);
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
