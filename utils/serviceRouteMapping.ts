import { ServiceType } from '@/schemas/booking';

// Route-to-Enum mapping for converting URLs to enum values
export const routeToServiceType: Record<string, ServiceType> = {
  '/booking/home-cleaning': ServiceType.Home,
  '/booking/office-cleaning': ServiceType.Office,
  '/booking/deep-cleaning': ServiceType.DeepCleaning,
  '/booking/move-in-out': ServiceType.MoveInOut
};

// Enum-to-Route mapping for navigation
export const serviceTypeToRoute: Record<ServiceType, string> = {
  [ServiceType.Home]: '/booking/home-cleaning',
  [ServiceType.Office]: '/booking/office-cleaning',
  [ServiceType.DeepCleaning]: '/booking/deep-cleaning',
  [ServiceType.MoveInOut]: '/booking/move-in-out',
  [ServiceType.PostConstruction]: '/booking/post-construction'
};

// Utility to get service type from current route
export const getServiceTypeFromRoute = (pathname: string): ServiceType | null => {
  return routeToServiceType[pathname] || null;
};

// Utility to get route from service type
export const getRouteFromServiceType = (serviceType: ServiceType): string => {
  return serviceTypeToRoute[serviceType] || '/booking';
};

// Utility to navigate to service-specific booking
export const getBookingRoute = (serviceType: ServiceType): string => {
  return getRouteFromServiceType(serviceType);
};
