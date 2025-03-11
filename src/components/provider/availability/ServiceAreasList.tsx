
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
      <div className="col-span-full py-8 px-4 text-center border border-dashed rounded-xl bg-muted/20">
        <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
          <MapPin className="h-7 w-7 text-primary mx-auto opacity-80" />
        </div>
        <p className="text-muted-foreground font-medium">No service areas added yet.</p>
        <p className="text-sm text-muted-foreground mt-1">Add your first service area below.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {serviceAreas.map((area, index) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Card 
            className="p-4 border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/10 p-1.5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </span>
                  {area.postal_code}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center">
                  Travel radius: <span className="font-medium ml-1 text-foreground">{area.travel_distance} km</span>
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemove(area.id)}
                disabled={loading}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1 -mr-2 opacity-70 hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
