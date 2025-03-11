
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin, LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ServiceArea } from '@/types/serviceAreas';

interface ServiceAreasListProps {
  serviceAreas: ServiceArea[];
  onRemove: (id: string) => Promise<boolean>;
  loading: boolean;
}

export const ServiceAreasList: React.FC<ServiceAreasListProps> = ({ 
  serviceAreas, 
  onRemove,
  loading
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 px-1">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (serviceAreas.length === 0) {
    return (
      <div className="text-center py-8 px-4 border border-dashed rounded-xl bg-muted/20 mx-1">
        <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
          <MapPin className="h-7 w-7 text-primary mx-auto opacity-80" />
        </div>
        <p className="text-muted-foreground font-medium">No service areas added yet</p>
        <p className="text-sm text-muted-foreground mt-1">Add postal codes where you can provide services</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-1">
      <h3 className="text-lg font-medium mb-3">Your Service Areas</h3>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-3`}>
        <AnimatePresence>
          {serviceAreas.map((area) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="border rounded-lg p-3 bg-card hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
                    {area.postal_code}
                  </Badge>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(area.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-1">
                  {area.city && <p className="font-medium">{area.city}</p>}
                  <p className="text-xs text-muted-foreground">
                    Travel up to {area.travel_distance} km
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
