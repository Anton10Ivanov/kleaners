import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Group service pages by category for better code splitting
const CleaningServices = lazy(() => import('./CleaningServices'));
const SpecializedServices = lazy(() => import('./SpecializedServices'));
const CommercialServices = lazy(() => import('./CommercialServices'));
const MaintenanceServices = lazy(() => import('./MaintenanceServices'));

// Loading component
const ServiceLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading service...</p>
    </div>
  </div>
);

// Service page loader component
export const ServicePageLoader: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  
  if (!serviceType) {
    return <div>Service not found</div>;
  }
  const getServiceComponent = () => {
    switch (serviceType) {
      // Basic cleaning services
      case 'home-cleaning':
      case 'deep-cleaning':
      case 'move-in-out':
      case 'office-cleaning':
      case 'window-cleaning':
      case 'stairwell-cleaning':
        return CleaningServices;
      
      // Specialized services
      case 'industrial-cleaning':
      case 'intensive-cleaning':
      case 'ventilation-cleaning':
      case 'disinfection-cleaning':
      case 'construction-cleaning':
      case 'care-facility-cleaning':
      case 'trade-fair-cleaning':
      case 'hoarder-cleaning':
      case 'multi-surface-cleaning':
      case 'pet-hair-removal':
      case 'underground-garage-cleaning':
      case 'vehicle-cleaning':
      case 'holiday-apartment-cleaning':
      case 'glass-cleaning-winter-garden':
      case 'medical-practice-cleaning':
      case 'stone-surface-cleaning':
      case 'graffiti-removal':
      case 'roof-cleaning':
      case 'household-clearance':
      case 'mold-removal':
      case 'facade-cleaning':
      case 'kindergarten-cleaning':
      case 'carpet-cleaning':
      case 'upholstery-cleaning':
      case 'sidewalk-cleaning':
      case 'crime-scene-cleaning':
      case 'pipe-cleaning':
        return SpecializedServices;
      
      // Commercial services
      case 'commercial-cleaning':
      case 'business-cleaning':
        return CommercialServices;
      
      // Maintenance services
      case 'pool-cleaning':
      case 'gardening':
        return MaintenanceServices;
      
      default:
        return CleaningServices;
    }
  };

  const ServiceComponent = getServiceComponent();

  return (
    <Suspense fallback={<ServiceLoading />}>
      <ServiceComponent serviceType={serviceType} />
    </Suspense>
  );
};

export default ServicePageLoader;
