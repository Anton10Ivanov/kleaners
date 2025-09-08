
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, LoaderCircle } from 'lucide-react';
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
    <div className="px-2 sm:px-1 bg-white rounded-lg card-spacing-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Service Area</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-6'}`}>
          {/* Postal Code */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-2'} form-spacing-normal`}>
            <Label htmlFor="postalCode" className="text-sm font-semibold text-gray-800">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              placeholder="e.g. 10115"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
            />
          </div>
          
          {/* Travel Distance */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-2'} form-spacing-normal`}>
            <div className="flex justify-between items-center">
              <Label htmlFor="travelDistance" className="text-sm font-semibold text-gray-800">
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
              className="h-12 rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-gray-400"
            />
          </div>
        </div>
        
        <div className={`${isMobile ? 'pt-2' : 'pt-4'} flex justify-end`}>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-white hover:bg-primary/90 h-12 w-full sm:w-auto rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
