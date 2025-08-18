import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/schemas/booking';
import useBookingStore from '@/store/useBookingStore';
import { useEffect } from 'react';

export const useBookingForm = () => {
  // Get state and actions from our Zustand store
  const { 
    currentStep, 
    formData, 
    postalCode,
    selectedService,
    setCurrentStep, 
    updateFormData, 
    setPostalCode,
    setSelectedService,
    resetForm 
  } = useBookingStore();

  // Initialize form with react-hook-form
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: formData as BookingFormData,
  });

  // Sync form values with Zustand store
  useEffect(() => {
    // Update form with persisted data when mounting
    if (Object.keys(formData).length > 0) {
      Object.entries(formData).forEach(([key, value]) => {
        // Only set values that exist in the form
        if (value !== undefined) {
          form.setValue(key as any, value);
        }
      });
    }
  }, []);

  // Watch for form value changes and update store
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as Partial<BookingFormData>);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  // Step navigation
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleReset = () => {
    resetForm();
    form.reset();
  };

  return {
    form,
    currentStep,
    formData,
    postalCode,
    selectedService,
    handleNextStep,
    handleBackStep,
    handleReset,
    setPostalCode,
    setSelectedService,
    watch: form.watch,
    setValue: form.setValue,
    getValues: form.getValues,
  };
};

export default useBookingForm;
