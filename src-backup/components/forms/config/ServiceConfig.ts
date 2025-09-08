import { Home, Building2, Sparkles } from 'lucide-react';
import { 
  HomeCleaningSchema, 
  DeepCleaningSchema, 
  MoveInOutSchema, 
  PostConstructionSchema,
  type HomeBookingForm,
  type DeepCleaningBookingForm,
  type MoveInOutBookingForm,
  type PostConstructionBookingForm
} from '@/schemas/bookingSchemas';

export interface ServiceConfig {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  defaultHours: number;
  maxHours: number;
  schema: any;
  formData: any;
}

export const serviceConfig: Record<string, ServiceConfig> = {
  'home-cleaning': {
    title: 'Home Cleaning Service',
    description: 'Regular residential cleaning for your home',
    icon: Home,
    color: 'bg-blue-500',
    defaultHours: 2,
    maxHours: 8,
    schema: HomeCleaningSchema,
    formData: {} as HomeBookingForm
  },
  'deep-cleaning': {
    title: 'Deep Cleaning Service',
    description: 'Comprehensive deep cleaning for thorough results',
    icon: Sparkles,
    color: 'bg-purple-500',
    defaultHours: 4,
    maxHours: 12,
    schema: DeepCleaningSchema,
    formData: {} as DeepCleaningBookingForm
  },
  'move-in-out': {
    title: 'Move In/Out Cleaning',
    description: 'Complete cleaning for property transitions',
    icon: Home,
    color: 'bg-orange-500',
    defaultHours: 6,
    maxHours: 16,
    schema: MoveInOutSchema,
    formData: {} as MoveInOutBookingForm
  },
  'post-construction': {
    title: 'Post-Construction Cleaning',
    description: 'Specialized cleaning after construction work',
    icon: Building2,
    color: 'bg-green-500',
    defaultHours: 8,
    maxHours: 20,
    schema: PostConstructionSchema,
    formData: {} as PostConstructionBookingForm
  }
};

export const getServiceConfig = (serviceType: string): ServiceConfig => {
  return serviceConfig[serviceType] || serviceConfig['home-cleaning'];
};
