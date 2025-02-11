
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { bookingSchema, type BookingFormData } from '../schemas/booking';
import { toast } from "sonner";

export const useBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: undefined,
      postalCode: '',
      frequency: 'onetime',
      hours: 2,
      bedrooms: 1,
      bathrooms: 1,
      extras: [],
      date: undefined,
    }
  });

  const { handleSubmit, watch, setValue, getValues, formState: { errors } } = form;

  const handleNextStep = () => {
    const currentService = watch('service');
    const currentPostalCode = watch('postalCode');

    // For step 1, only validate service and postalCode
    if (currentStep === 1) {
      if (!currentService) {
        toast.error("Please select a service type");
        return;
      }
      if (!currentPostalCode) {
        toast.error("Please enter your postal code");
        return;
      }
      if (currentService === 'moving') {
        toast.error("Move In/Out cleaning is currently not available");
        return;
      }
      // If validation passes, move to next step
      setCurrentStep(2);
      return;
    }

    // For other steps, use the form's handleSubmit
    handleSubmit(() => {
      if (Object.keys(errors).length > 0) {
        toast.error("Please fill in all required fields correctly");
        return;
      }
      setCurrentStep(prev => prev + 1);
    })();
  };

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  useEffect(() => {
    const formData = getValues();
    localStorage.setItem('bookingProgress', JSON.stringify({
      step: currentStep,
      formData: {
        ...formData,
        date: formData.date?.toISOString(),
      }
    }));
  }, [currentStep, getValues]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('bookingProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress) as {
          step: number;
          formData: Partial<BookingFormData> & { date?: string };
        };
        
        if (parsed.formData) {
          Object.entries(parsed.formData).forEach(([key, value]) => {
            if (key === 'date' && typeof value === 'string') {
              setValue(key as keyof BookingFormData, new Date(value));
            } else if (value !== undefined) {
              setValue(key as keyof BookingFormData, value as any);
            }
          });
        }
        
        if (typeof parsed.step === 'number') {
          setCurrentStep(parsed.step);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
        localStorage.removeItem('bookingProgress');
      }
    }
  }, [setValue]);

  return {
    form,
    currentStep,
    handleNextStep,
    handleBackStep,
    watch,
    setValue
  };
};
