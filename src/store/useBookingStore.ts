
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { ServiceType } from '@/types/enums';
import { formPersistence } from '@/utils/formPersistence';

interface BookingState {
  currentStep: number;
  formData: Partial<BookingFormData>;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  resetForm: () => void;
  
  // Enhanced persistence
  saveFormData: () => void;
  loadFormData: () => void;
  hasPersistedData: () => boolean;
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
 * Enhanced booking store with improved persistence
 */
const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: { ...initialFormData },
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateFormData: (data) => {
        const newFormData = { 
          ...get().formData, 
          ...data,
          // Migrate service value if needed
          serviceType: data.serviceType ? migrateServiceValue(data.serviceType as string) : get().formData.serviceType
        };
        
        set({ formData: newFormData });
        
        // Auto-save to enhanced persistence
        formPersistence.save(newFormData);
      },
      
      resetForm: () => {
        set({ 
          currentStep: 1, 
          formData: { ...initialFormData } 
        });
        formPersistence.clear();
      },
      
      saveFormData: () => {
        const { formData } = get();
        formPersistence.save(formData);
      },
      
      loadFormData: () => {
        const persistedData = formPersistence.load();
        if (persistedData) {
          set({ 
            formData: { 
              ...get().formData, 
              ...persistedData,
              serviceType: migrateServiceValue(persistedData.serviceType as string)
            } 
          });
        }
      },
      
      hasPersistedData: () => {
        return formPersistence.hasValidData();
      }
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
