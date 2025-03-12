
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { ServiceArea } from '@/types/serviceAreas';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceAreasListProps {
  serviceAreas: ServiceArea[];
  onRemove: (id: string) => void;
  loading: boolean;
}

export const ServiceAreasList: React.FC<ServiceAreasListProps> = ({ 
  serviceAreas, 
  onRemove,
  loading
}) => {
  if (loading && serviceAreas.length === 0) {
    return <ServiceAreasListSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Service Areas</CardTitle>
      </CardHeader>
      <CardContent>
        {serviceAreas.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>You haven't added any service areas yet.</p>
            <p className="text-sm mt-1">Add postal codes where you're willing to work.</p>
          </div>
        ) : (
          <div className="divide-y">
            {serviceAreas.map((area) => (
              <div key={area.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{area.postal_code}</p>
                  <p className="text-sm text-gray-500">
                    {area.city && `${area.city}, `} 
                    {area.travel_distance} km travel distance
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(area.id)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ServiceAreasListSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
