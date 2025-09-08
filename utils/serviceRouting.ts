import { ServiceType } from '@/schemas/booking';

/**
 * Service routing utilities for enum-to-route mapping
 * Maintains type safety while enabling proper navigation
 

// Route-to-Enum mapping for URL parsing
export const routeToServiceType: Record<string, ServiceType> = {
  '/booking/home-cleaning': ServiceType.Home,
  '/booking/office-cleaning': ServiceType.Office,
  '/booking/deep-cleaning': ServiceType.DeepCleaning,
  '/booking/move-in-out': ServiceType.MoveInOut,
  '/booking/post-construction': ServiceType.PostConstruction,
  '/booking/home-cleaning22': 'home-cleaning-22' as ServiceType,
};

// Enum-to-Route mapping for navigation
export const serviceTypeToRoute: Record<string, string> = {
  [ServiceType.Home]: '/booking/home-cleaning',
  [ServiceType.Office]: '/booking/office-cleaning',
  [ServiceType.DeepCleaning]: '/booking/deep-cleaning',
  [ServiceType.MoveInOut]: '/booking/move-in-out',
  [ServiceType.PostConstruction]: '/booking/post-construction',
  'home-cleaning-22': '/booking/home-cleaning22',
};

/**
 * Get service type from current route
 
export const getServiceTypeFromRoute = (pathname: string): ServiceType | null => {
  return routeToServiceType[pathname] || null;
};

/**
 * Get route from service type
 
export const getRouteFromServiceType = (serviceType: ServiceType | string): string => {
  return serviceTypeToRoute[serviceType] || '/booking/home-cleaning';
};

/**
 * Check if a route is a valid service booking route
 
export const isValidServiceRoute = (pathname: string): boolean => {
  return pathname in routeToServiceType;
};

/**
 * Get all available service routes
 
export const getAllServiceRoutes = (): string[] => {
  return Object.keys(routeToServiceType);
};

/**
 * Get all available service types
 
export const getAllServiceTypes = (): (ServiceType | string)[] => {
  return Object.keys(serviceTypeToRoute);
};

/**
 * Service type display names for UI
 
export const serviceTypeDisplayNames: Record<string, string> = {
  [ServiceType.Home]: 'Home Cleaning',
  [ServiceType.Office]: 'Office Cleaning',
  [ServiceType.DeepCleaning]: 'Deep Cleaning',
  [ServiceType.MoveInOut]: 'Move In/Out Cleaning',
  [ServiceType.PostConstruction]: 'Post-Construction Cleaning',
  'home-cleaning-22': 'Home Cleaning 22',
};

/**
 * Get display name for service type
 
export const getServiceTypeDisplayName = (serviceType: ServiceType | string): string => {
  return serviceTypeDisplayNames[serviceType] || serviceType;
};
