'use client'

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveInOutSchema, type MoveInOutBookingForm } from '@/schemas/bookingSchemas';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';
import { UnifiedBookingForm, UnifiedBookingFormData } from '@/components/forms/UnifiedBookingForm';
import { motion } from 'framer-motion';

const MoveInOutBookingRefactored = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useRouter();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(MoveInOutSchema),
    defaultValues: {
      // Service details
      serviceType: "move-in-out",
      serviceCategory: "residential",
      hours: 6,
      frequency: 'one-time',
      
      // Property details
      propertySize: 100,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: 'apartment',
      cleaningPace: 'thorough',
      dirtinessLevel: 4,
      
      // Location
      postalCode: '',
      address: '',
      city: '',
      accessMethod: '',
      
      // Scheduling
      selectedDate: new Date(),
      selectedTime: '',
      timeSlot: '',
      
      // Contact information
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      
      // Additional details
      extras: [],
      specialInstructions: '',
      suppliesProvided: false,
      insurance: true,
      
      // Pricing
      estimatedPrice: 150,
      finalPrice: 150,
      
      ...enhancedFormPersistence.load('move-in-out'), // Load persisted data
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = enhancedFormPersistence.createAutoSave(
      form,
      'move-in-out',
      30000 // 30 seconds
    );
    autoSaveInstance.start();
    setAutoSave(autoSaveInstance);

    return () => {
      autoSaveInstance.stop();
    };
  }, [form]);

  // Save on step changes
  useEffect(() => {
    if (autoSave) {
      autoSave.saveNow();
    }
  }, [currentStep, autoSave]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      // Convert to the expected format for the existing submission hook
      const convertedData: MoveInOutBookingForm = {
        serviceType: data.serviceType as any,
        propertySize: data.propertySize,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        cleaningType: data.extras.includes('deep') ? 'deep' : 'standard',
        includeAppliances: data.extras.includes('appliances'),
        includeCarpets: data.extras.includes('carpets'),
        includeWindows: data.extras.includes('windows'),
        moveType: data.extras.includes('move-in') ? 'move-in' : 'move-out',
        postalCode: data.postalCode,
        selectedDate: data.selectedDate,
        selectedTime: data.selectedTime,
        address: data.address,
        city: data.city,
        accessMethod: data.accessMethod,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      };
      
      await submitBooking(convertedData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StandardizedBookingForm
            form={form}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onNext={handleNext}
            currentStep={currentStep}
            totalSteps={4}
            serviceType="move-in-out"
            serviceCategory="residential"
            isLoading={isLoading}
            className="max-w-4xl mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MoveInOutBookingRefactored;
