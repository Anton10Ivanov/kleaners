
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFormData, Frequency } from '@/schemas/booking';

interface BookingState {
  currentStep: number;
  formData: Partial<BookingFormData>;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  resetForm: () => void;
}

const initialFormData: Partial<BookingFormData> = {
  service: undefined,
  postalCode: '',
  frequency: Frequency.OneTime,
  hours: 2,
  bedrooms: 1,
  bathrooms: 1,
  extras: [],
  totalAmount: 0,
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
          formData: { ...state.formData, ...data } 
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
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useBookingStore;
