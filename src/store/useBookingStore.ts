
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
  service: ServiceType.Home,
  postalCode: '',
  frequency: Frequency.OneTime,
  hours: 2,
  bedrooms: 1,
  bathrooms: 1,
  extras: [],
  totalAmount: 0,
};

/**
 * Migration function to handle old service values
 */
const migrateServiceValue = (service: string | undefined): string => {
  if (!service) return ServiceType.Home;
  
  switch (service) {
    case 'regular':
      return ServiceType.Home;
    case 'business':
      return ServiceType.Office;
    default:
      return service;
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
            service: data.service ? migrateServiceValue(data.service) : state.formData.service
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
          service: migrateServiceValue(state.formData.service)
        },
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useBookingStore;
