
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';
import { ServiceAreasList } from './ServiceAreasList';
import { ServiceAreaForm } from './ServiceAreaForm';
import { useServiceAreas } from '@/hooks/useServiceAreas';
import { motion } from 'framer-motion';

export const ServiceAreasTab: React.FC = () => {
  const { serviceAreas, loading, addServiceArea, removeServiceArea } = useServiceAreas();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border shadow-md bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="text-xl flex items-center gap-2 text-primary-hover">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            Service Coverage
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Define the areas where you provide cleaning services
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
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
    </motion.div>
  );
};
