
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ServiceAreaFormValues } from '@/types/serviceAreas';

interface ServiceAreaFormProps {
  onSubmit: (values: ServiceAreaFormValues) => Promise<boolean>;
  loading: boolean;
}

export const ServiceAreaForm: React.FC<ServiceAreaFormProps> = ({ 
  onSubmit,
  loading
}) => {
  const [postalCode, setPostalCode] = useState('');
  const [travelDistance, setTravelDistance] = useState(15);
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postalCode.trim()) {
      toast.error('Please enter a postal code');
      return;
    }
    
    await onSubmit({
      postal_code: postalCode,
      travel_distance: travelDistance
    });
    setPostalCode('');
  };
  
  return (
    <div className="px-2 sm:px-1">
      <h3 className="text-lg font-medium mb-3 sm:mb-4">Add New Service Area</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-4 gap-6'}`}>
          {/* Postal Code */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-2'}`}>
            <Label htmlFor="postalCode" className="text-sm font-medium mb-1.5 block">
              Postal Code
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="postalCode"
                placeholder="e.g. 10115"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>
          
          {/* Travel Distance */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-2'}`}>
            <div className="flex justify-between items-center mb-1.5">
              <Label htmlFor="travelDistance" className="text-sm font-medium">
                Travel Distance
              </Label>
              <span className="text-sm font-medium text-primary">{travelDistance} km</span>
            </div>
            <Input
              id="travelDistance"
              type="range"
              min={1}
              max={50}
              step={1}
              value={travelDistance}
              onChange={(e) => setTravelDistance(parseInt(e.target.value))}
              className="py-2 h-10"
            />
          </div>
        </div>
        
        <div className={`${isMobile ? 'pt-1' : 'pt-4'} flex justify-end`}>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Service Area
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
