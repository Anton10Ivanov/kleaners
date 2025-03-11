
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { type ServiceArea } from '@/hooks/useServiceAreas';

interface ServiceAreasListProps {
  serviceAreas: ServiceArea[];
  onRemove: (id: string) => void;
  loading?: boolean;
}

export const ServiceAreasList: React.FC<ServiceAreasListProps> = ({
  serviceAreas,
  onRemove,
  loading = false
}) => {
  if (serviceAreas.length === 0) {
    return (
      <div className="col-span-full py-6 text-center border border-dashed rounded-lg bg-muted/30">
        <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-60" />
        <p className="text-muted-foreground">No service areas added yet.</p>
        <p className="text-sm text-muted-foreground">Add your first service area below.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {serviceAreas.map((area) => (
        <Card 
          key={area.id} 
          className="p-4 border border-border/50 hover:border-primary/30 transition-all hover:shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="font-medium flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {area.postal_code}
              </h4>
              <p className="text-sm text-muted-foreground">
                Travel radius: {area.travel_distance} km
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemove(area.id)}
              disabled={loading}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1 -mr-2"
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
