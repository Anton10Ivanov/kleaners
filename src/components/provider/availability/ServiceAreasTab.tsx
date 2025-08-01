
import React from 'react';
import { ServiceAreaForm } from './ServiceAreaForm';
import { ServiceAreasList } from './ServiceAreasList';
import { Card, CardContent } from '@/components/ui/card';
import { useServiceAreas } from '@/hooks/useServiceAreas';

export const ServiceAreasTab: React.FC = () => {
  const { 
    serviceAreas, 
    loading, 
    addServiceArea, 
    removeServiceArea 
  } = useServiceAreas();

  return (
    <Card className="border shadow-md bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6 sm:space-y-8">
          <ServiceAreaForm 
            onSubmit={addServiceArea}
            loading={loading}
          />
          
          <ServiceAreasList 
            serviceAreas={serviceAreas}
            onRemove={removeServiceArea}
            loading={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
};
