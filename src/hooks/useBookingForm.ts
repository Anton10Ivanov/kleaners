
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { bookingSchema, type BookingFormData, Frequency } from '../schemas/booking';
import { toast } from "sonner";

export const useBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: undefined,
      postalCode: '',
      frequency: Frequency.Onetime,
      hours: 2,
      bedrooms: 1,
      bathrooms: 1,
      extras: [],
      date: undefined,
      businessType: undefined,
      propertySize: undefined,
      specialRequirements: '',
    }
  });

  const { handleSubmit, watch, setValue, getValues, formState: { errors } } = form;

  const handleNextStep = () => {
    console.log('Incrementing step from:', currentStep);
    setCurrentStep(prevStep => {
      const nextStep = prevStep + 1;
      console.log('New step will be:', nextStep);
      return nextStep;
    });
  };

  const handleBackStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  useEffect(() => {
    console.log('Current step updated to:', currentStep);
  }, [currentStep]);

  // Set default frequency to weekly for business cleaning
  useEffect(() => {
    const service = watch('service');
    if (service === 'business') {
      setValue('frequency', Frequency.Weekly);
    }
  }, [watch('service'), setValue]);

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

