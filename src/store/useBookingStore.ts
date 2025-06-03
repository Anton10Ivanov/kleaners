
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { ServiceType } from '@/types/enums';

interface BookingState {
  currentStep: number;
  formData: Partial<BookingFormData>;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  resetForm: () => void;
}

const initialFormData: Partial<BookingFormData> = {
  serviceType: ServiceType.Home,
  postalCode: '',
  frequency: Frequency.OneTime,
  hours: 2,
  bedrooms: 1,
  bathrooms: 1,
  extras: [],
};

/**
 * Migration function to handle old service values
 */
const migrateServiceValue = (service: string | undefined): ServiceType => {
  if (!service) return ServiceType.Home;
  
  switch (service) {
    case 'regular':
      return ServiceType.Home;
    case 'business':
      return ServiceType.Office;
    default:
      return service as ServiceType;
  }
};

/**
 * Booking store using Zustand
 * Persists booking form state to localStorage
 */
const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: { ...initialFormData },
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateFormData: (data) => 
        set((state) => ({ 
          formData: { 
            ...state.formData, 
            ...data,
            // Migrate service value if needed
            serviceType: data.serviceType ? migrateServiceValue(data.serviceType as string) : state.formData.serviceType
          } 
        })),
      
      resetForm: () => 
        set({ 
          currentStep: 1, 
          formData: { ...initialFormData } 
        }),
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        formData: {
          ...state.formData,
          serviceType: migrateServiceValue(state.formData.serviceType as string)
        },
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useBookingStore;
