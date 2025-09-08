import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFormData, Frequency, ServiceType } from '@/schemas/booking';
import { formPersistence } from '@/utils/formPersistence';

interface BookingState {
  currentStep: number;
  formData: Partial<BookingFormData>;
  
  // Hero form state
  postalCode: string;
  selectedService: string;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setPostalCode: (code: string) => void;
  setSelectedService: (service: string) => void;
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
      postalCode: '',
      selectedService: '',
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setPostalCode: (code: string) => {
        set({ postalCode: code });
        // Also update formData for consistency
        const newFormData = { ...get().formData, postalCode: code };
        set({ formData: newFormData });
        formPersistence.save(newFormData);
      },
      
      setSelectedService: (service: string) => {
        set({ selectedService: service });
        // Also update formData for consistency
        const newFormData = { 
          ...get().formData, 
          service: service,
          serviceType: migrateServiceValue(service)
        };
        set({ formData: newFormData });
        formPersistence.save(newFormData);
      },
      
      updateFormData: (data) => {
        const newFormData = { 
          ...get().formData, 
          ...data,
          // Migrate service value if needed
          serviceType: data.serviceType ? migrateServiceValue(data.serviceType as string) : get().formData.serviceType
        };
        
        set({ formData: newFormData });
        
        // Sync hero form state if postal code or service is updated
        if (data.postalCode && data.postalCode !== get().postalCode) {
          set({ postalCode: data.postalCode });
        }
        if (data.service && data.service !== get().selectedService) {
          set({ selectedService: data.service });
        }
        
        // Auto-save to enhanced persistence
        formPersistence.save(newFormData);
      },
      
      resetForm: () => {
        set({ 
          currentStep: 1, 
          formData: { ...initialFormData },
          postalCode: '',
          selectedService: ''
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
          const migratedData = {
            ...get().formData, 
            ...persistedData,
            serviceType: migrateServiceValue(persistedData.serviceType as string)
          };
          
          set({ 
            formData: migratedData,
            postalCode: persistedData.postalCode || '',
            selectedService: persistedData.service || ''
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
