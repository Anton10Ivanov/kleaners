
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';
import { ServiceAreasList } from './ServiceAreasList';
import { ServiceAreaForm } from './ServiceAreaForm';
import { useServiceAreas } from '@/hooks/useServiceAreas';

export const ServiceAreasTab: React.FC = () => {
  const { serviceAreas, loading, addServiceArea, removeServiceArea } = useServiceAreas();

  return (
    <Card className="border shadow-sm bg-card hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Service Coverage
        </CardTitle>
        <CardDescription>Define the areas where you provide cleaning services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ServiceAreasList 
            serviceAreas={serviceAreas} 
            onRemove={removeServiceArea}
            loading={loading}
          />
          
          <Separator className="my-6" />
          
          <ServiceAreaForm 
            onSubmit={addServiceArea}
            loading={loading} 
          />
        </div>
      </CardContent>
    </Card>
  );
};
